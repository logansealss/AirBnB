// backend/routes/api/spots.js
const express = require('express')

const { requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, sequelize } = require('../../db/models');
sequelize.Sequelize.DataTypes.postgres.DECIMAL.parse = parseFloat;

const router = express.Router();

async function getSpotsWithRatingPreview(ownerId){

    const whereObj = {};

    if(ownerId){

        whereObj.ownerId = ownerId;
    }

    const spots = await Spot.findAll({
        include: {
            model: SpotImage,
            where: {
                preview: true
            },
            attributes: ['url'],
            limit: 1
        },
        where: whereObj,
        order: [['id']]
    });

    for(let i = 0; i < spots.length; i++){

        const curSpotObj = spots[i].toJSON();

        const averageRating = await Review.findAll({
            where: {
                spotId: curSpotObj.id
            },
            attributes: [[sequelize.fn('AVG', sequelize.col("stars")), 'avgRating']],
        });

        curSpotObj.avgRating = averageRating[0].toJSON().avgRating;

        if(curSpotObj.SpotImages.length > 0){
            curSpotObj.previewImage = curSpotObj.SpotImages[0].url;
            delete curSpotObj.SpotImages;
        }else{
            curSpotObj.previewImage = null;
            delete curSpotObj.SpotImages;
        }

        spots[i] = curSpotObj;
    }

    return spots;
}

router.get('/current', requireAuth, async (req, res, next) => {

    const userSpots = await getSpotsWithRatingPreview(req.user.id);

    return res.json({
        Spots: userSpots
    });

});

router.get('/:id', async (req, res, next) => {

    const spot = await Spot.findByPk(req.params.id, {
        include: [{
            model: SpotImage,
            attributes: ['id', 'url', 'preview']
        },{
            model: User,
            as: 'Owner',
            attributes: ['id', 'firstName', 'lastName']
        }]
    });

    if(spot){

        const numReviews = await Review.count({
            where: {
                spotId: req.params.id
            }
        });

        const avgRating = await Review.findAll({
            where: {
                spotId: req.params.id
            },
            attributes: [[sequelize.fn('AVG', sequelize.col("stars")), 'avgRating']]
        });

        const spotResult = spot.toJSON();
        spotResult.numReviews = numReviews;
        spotResult.avgStarRating = avgRating[0].toJSON().avgRating;

        res.json(spotResult);
    }else{

        res.status(404);
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        });
    }
});

router.get('/', async (req, res, next) => {

    const allSpots = await getSpotsWithRatingPreview();
    
    res.json({
        Spots: allSpots
    });
});

router.post('/:id/images', requireAuth,async (req, res, next) => {

    const spot = await Spot.findByPk(req.params.id);
    
    if(spot){
        const spotObj = spot.toJSON();
        if(spotObj.ownerId !== req.user.id){
            res.status(403);
            return res.json({
                "message": "Forbidden",
                "statusCode": 403
            });
        }else{

            let {url, preview} = req.body;

            const newImage = await spot.createSpotImage({
                url,
                preview
            });

            const newImageObj = newImage.toJSON();
            delete newImageObj.createdAt;
            delete newImageObj.updatedAt;
            delete newImageObj.spotId;

            return res.json(newImageObj)
        }
    }else{
        res.status(404);
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        });
    }
});

router.post('/', requireAuth, async (req, res, next) => {

    const   {address, city, state, 
            country, lat, lng, name, 
            description, price} = req.body;

    let newSpot;
    try{
        newSpot = await Spot.create({
            ownerId: req.user.id,
            address, 
            city, 
            state, 
            country, 
            lat, 
            lng, 
            name, 
            description, 
            price,
        });
    }catch(err){
        res.status(400);
        return res.json({
            "message": "Validation Error",
            "statusCode": 400,
            "errors": {
              "address": "Street address is required",
              "city": "City is required",
              "state": "State is required",
              "country": "Country is required",
              "lat": "Latitude is not valid",
              "lng": "Longitude is not valid",
              "name": "Name must be less than 50 characters",
              "description": "Description is required",
              "price": "Price per day is required"
            }
        });
    }

    res.status(201);
    res.json(newSpot);
}); 

router.put('/:id', requireAuth, async (req, res, next) => {

    const   {address, city, state, 
            country, lat, lng, name, 
            description, price} = req.body;

    if  (address === undefined || city === undefined || state === undefined
        || country === undefined || lat === undefined || lng === undefined
        || name === undefined || description === undefined || price === undefined){

            res.status(400);
            return res.json({
                "message": "Validation Error",
                "statusCode": 400,
                "errors": {
                  "address": "Street address is required",
                  "city": "City is required",
                  "state": "State is required",
                  "country": "Country is required",
                  "lat": "Latitude is not valid",
                  "lng": "Longitude is not valid",
                  "name": "Name must be less than 50 characters",
                  "description": "Description is required",
                  "price": "Price per day is required"
                }
            });
    }

    const curSpot = await Spot.findByPk(req.params.id);

    if(curSpot){

        try{
            await curSpot.update({
                address, 
                city, 
                state, 
                country, 
                lat, 
                lng, 
                name, 
                description, 
                price,
            });

            return res.json(curSpot);
        }catch(err){
            res.status(400);
            return res.json({
                "message": "Validation Error",
                "statusCode": 400,
                "errors": {
                  "address": "Street address is required",
                  "city": "City is required",
                  "state": "State is required",
                  "country": "Country is required",
                  "lat": "Latitude is not valid",
                  "lng": "Longitude is not valid",
                  "name": "Name must be less than 50 characters",
                  "description": "Description is required",
                  "price": "Price per day is required"
                }
            });
        }

    }else{

        res.status(404);
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        });
    }
});

router.delete('/:id', requireAuth, async (req, res, next) => {

    const spot = await Spot.findByPk(req.params.id);

    if(spot){
        const spotObj = spot.toJSON();
        if(spotObj.ownerId !== req.user.id){
            res.status(403);
            return res.json({
                "message": "Forbidden",
                "statusCode": 403
            });
        }else{
            await spot.destroy();
            res.json({
                "message": "Successfully deleted",
                "statusCode": 200
            });
        }
    }else{
        res.status(404);
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        });
    }
});

module.exports = router;