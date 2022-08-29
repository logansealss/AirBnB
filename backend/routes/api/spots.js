// backend/routes/api/users.js
const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, sequelize } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

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
            attributes: ['id', 'firstname', 'lastName']
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

module.exports = router;