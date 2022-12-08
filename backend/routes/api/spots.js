// backend/routes/api/spots.js
const express = require('express')

const { requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, sequelize, ReviewImage, Booking } = require('../../db/models');
const { Op } = require("sequelize");
const { validateReview, validateSpot, validateBooking, validateBookingEndDate } = require('../../utils/inputValidators');
const { singleMulterUpload, singlePublicFileUpload } = require("../../awsS3")
sequelize.Sequelize.DataTypes.postgres.DECIMAL.parse = parseFloat;

const router = express.Router();

async function getSpotsWithRatingPreview(queryOptions = {}){

    const spots = await Spot.findAll({
        include: {
            model: SpotImage,
            where: {
                preview: true
            },
            attributes: ['url'],
            limit: 1
        },
        ...queryOptions,
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

        if(curSpotObj.avgRating){
            curSpotObj.avgRating = curSpotObj.avgRating.toFixed(2);
        }

        if(curSpotObj.SpotImages.length > 0){
            curSpotObj.previewImage = curSpotObj.SpotImages[0].url;
            delete curSpotObj.SpotImages;
        }else{
            curSpotObj.previewImage = null;
            delete curSpotObj.SpotImages;
        }

        curSpotObj.price = curSpotObj.price.toFixed(0);

        spots[i] = curSpotObj;
    }

    return spots;
}

router.get('/current', requireAuth, async (req, res, next) => {

    const queryOptions = {
        where: {
            ownerId: req.user.id
        }
    };

    const userSpots = await getSpotsWithRatingPreview(queryOptions);

    return res.json({
        Spots: userSpots
    });

});

router.get('/:id/reviews', async (req, res, next) => {

    const spot = await Spot.findByPk(req.params.id);

    if(spot){

        const spotObj = spot.toJSON();
        const reviews = await Review.findAll({
            where: {
                spotId: spotObj.id
            },
            include: [{
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },{
                model: ReviewImage,
                attributes: ['id', 'url']
            }]
        });

        return res.json({Reviews: reviews});

    }else{
        res.status(404);
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        });
    }
});

router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {

    const spot = await Spot.findByPk(req.params.spotId);

    if(spot){
        if(spot.ownerId === req.user.id){

            const spotBookings = await Booking.findAll({
                where: {
                    spotId: spot.id
                },
                include: {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName']
                }
            });

            return res.json({Bookings: spotBookings});
        }else{

            const userSpotBookings = await Booking.findAll({
                where: {
                    spotId: spot.id,
                    userId: req.user.id
                },
                attributes: ['spotId', 'startDate', 'endDate']
            });

            return res.json({Bookings: userSpotBookings});
        }

    }else{
        res.status(404);
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        });
    }
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

        if(spotResult.avgStarRating){
            spotResult.avgStarRating = spotResult.avgStarRating.toFixed(2);
        }

        spotResult.price = spotResult.price.toFixed(0);

        res.json(spotResult);
    }else{

        res.status(404);
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        });
    }
});

function isNumberBetween(num, low, high = Number.MAX_SAFE_INTEGER){

    return !Number.isNaN(num) && num >= low && num <= high;
}

router.get('/', async (req, res, next) => {

    let   { page, size, minLat, 
              maxLat, minLng, maxLng, 
              minPrice, maxPrice } = req.query;

    if(page === undefined){
        page = 1;
    }else{
        page = parseInt(page);
    }
    if(size === undefined){
        size = 20;
    }else{
        size = parseInt(size);
    }

    const errorObj = {};

    const queryOptions = {
        where: {
            lat: {

            },
            lng: {

            },
            price: {

            }
        }
    };

    if(!Number.isInteger(size) || !isNumberBetween(size, 1, 20)){
        errorObj.size = "Size must be greater than or equal to 1"
    }else{
        queryOptions.limit = size;
    }

    if(!Number.isInteger(page) || !isNumberBetween(page, 1, 20)){
        errorObj.page = "Page must be greater than or equal to 1"
    }else{
        queryOptions.offset = (page - 1) * size;
    }

    if(minLat !== undefined){
        minLat = parseFloat(minLat);

        if(!isNumberBetween(minLat, -90, 90)){
            errorObj.minLat = "Minimum latitude is invalid"
        }else{
            queryOptions.where.lat[Op.gte] = minLat;
        }
    }

    if(maxLat !== undefined){
        maxLat = parseFloat(maxLat);

        if(!isNumberBetween(maxLat, -90, 90)){
            errorObj.maxLat = "Maximum latitude is invalid"
        }else{
            queryOptions.where.lat[Op.lte] = maxLat;
        }
    }

    if(minLng !== undefined){
        minLng = parseFloat(minLng);

        if(!isNumberBetween(minLng, -180, 180)){
            errorObj.minLng = "Minimum longitude is invalid"
        }else{
            queryOptions.where.lng[Op.gte] = minLng;
        }
    }

    if(maxLng !== undefined){
        maxLng = parseFloat(maxLng);
        if(!isNumberBetween(maxLng, -180, 180)){
            errorObj.maxLng = "Maximum longitude is invalid"
        }else{
            queryOptions.where.lng[Op.lte] = maxLng;
        }
    }

    if(minPrice !== undefined){
        minPrice = parseFloat(minPrice);

        if(!isNumberBetween(minPrice, 0)){
            errorObj.minPrice = "Minimum price must be greater than or equal to 0"
        }else{
            queryOptions.where.price[Op.gte] = minPrice;
        }
    }

    if(maxPrice !== undefined){
        maxPrice = parseFloat(maxPrice);
        if(!isNumberBetween(maxPrice, 0)){
            errorObj.maxPrice = "Maximum price must be greater than or equal to 0"
        }else{
            queryOptions.where.price[Op.lte] = maxPrice;
        }
    }

    if(Object.keys(errorObj).length){

        res.status(400);
        return res.json({
            "message": "Validation Error",
            "statusCode": 400,
            "errors": errorObj
        });
    }

    if(minLat === undefined && maxLat === undefined){

        delete queryOptions.where.lat;
    }

    if(minLng === undefined && maxLng === undefined){

        delete queryOptions.where.lng;
    }

    if(minPrice === undefined && maxPrice === undefined){

        delete queryOptions.where.price;
    }

    const allSpots = await getSpotsWithRatingPreview(queryOptions);
    
    res.json({
        Spots: allSpots,
        page,
        size
    });
});

async function getConflictingBookings(spotId, startDate, endDate){

    const conflictingBookings = await Booking.findOne({
        where: {
            spotId,
            [Op.or]: [{
                    startDate: {
                        [Op.lte]: endDate,
                        [Op.gte]: startDate
                    }
                },{
                    endDate: {
                        [Op.lte]: endDate,
                        [Op.gte]: startDate
                    }
                },{
                    startDate: {
                        [Op.lte]: startDate
                    },
                    endDate: {
                        [Op.gte]: startDate
                    }
                },{
                    startDate: {
                        [Op.lte]: endDate
                    },
                    endDate: {
                        [Op.gte]: endDate
                    }
                }
            ],
        }
    });

    return conflictingBookings;
}

router.post('/:spotId/bookings', requireAuth, validateBooking, validateBookingEndDate, async (req, res, next) => {

    const spot = await Spot.findByPk(req.params.spotId);

    if(spot){

        if(spot.ownerId === req.user.id){

            res.status(403);
            return res.json({
                "message": "Forbidden",
                "statusCode": 403
            });
        }else{

            const {startDate, endDate} = req.body;

            const conflictingBooking = await getConflictingBookings(spot.id, startDate, endDate);

            if(conflictingBooking){

                const errorObj = {};

                if((conflictingBooking.startDate <= startDate && conflictingBooking.endDate >= startDate) || 
                   (startDate <= conflictingBooking.endDate && endDate >= conflictingBooking.endDate)){
                    errorObj.startDate = "Start date conflicts with an existing booking";
                }
                if((conflictingBooking.startDate <= endDate && conflictingBooking.endDate >= endDate) || 
                   (startDate <= conflictingBooking.startDate && endDate >= conflictingBooking.startDate)){
                    errorObj.endDate = "End date conflicts with an existing booking";
                }

                res.status(403);
                return res.json({
                    "message": "Sorry, this spot is already booked for the specified dates",
                    "statusCode": 403,
                    "errors": errorObj
                });
            }

            let newBooking = await Booking.create({
                    spotId: spot.id,
                    userId: req.user.id,
                    startDate,
                    endDate
            });
            
            return res.json(newBooking);
        }
    }else{

        res.status(404);
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        });
    }
});

router.post('/:id/reviews', requireAuth, validateReview, async (req, res, next) => {

    const spot = await Spot.findByPk(req.params.id);

    if(spot){
        const spotObj = spot.toJSON();

        const userSpotReview = await Review.findOne({
            where: {
                userId: req.user.id,
                spotId: spotObj.id
            }
        });

        if(userSpotReview){
            res.status(403);
            return res.json({
                "message": "User already has a review for this spot",
                "statusCode": 403
            });

        }else{

            const {review, stars} = req.body;

            const newReview = await spot.createReview({
                userId: req.user.id,
                review,
                stars
            });

            res.status(201);
            return res.json(newReview);
        }

    }else{
        res.status(404);
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        });
    }
});

router.post('/:id/images', requireAuth, singleMulterUpload("image"), async (req, res, next) => {

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
            
            const preview = req.body.preview;

            if(preview === "true"){
                const previewImage = await SpotImage.findOne({
                    where: {
                        spotId: spot.id,
                        preview: true
                    }
                });

                if(previewImage){

                    await previewImage.update({
                        preview: false
                    });
                }
            }else{
                preview = false;
            }

            const url = await singlePublicFileUpload(req.file);

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

router.post('/', requireAuth, validateSpot, async (req, res, next) => {

    const   {address, city, state, 
            country, lat, lng, name, 
            description, price} = req.body;

    let newSpot = await Spot.create({
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

    res.status(201);
    res.json(newSpot);
}); 

router.put('/:id', requireAuth, validateSpot, async (req, res, next) => {

    const   {address, city, state, 
            country, lat, lng, name, 
            description, price} = req.body;

    const curSpot = await Spot.findByPk(req.params.id);

    if(curSpot){

        if(curSpot.ownerId !== req.user.id){

            res.status(403);
            return res.json({
                "message": "Forbidden",
                "statusCode": 403
            });
        }

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