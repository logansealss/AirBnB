// backend/routes/api/spots.js
const express = require('express')

const { requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, ReviewImage } = require('../../db/models');

const router = express.Router();

router.get('/current', requireAuth, async (req, res, next) => {

    const reviews = await Review.findAll({
        where: {
            userId: req.user.id
        },
        attributes: {
            include: ['id']
        },
        include: [{
            model: User,
            attributes: ['id', 'firstName', 'lastName']
        },{
            model: Spot,
            attributes: {
                exclude: ['description', 'createdAt', 'updatedAt']
            },
            include: {
                model: SpotImage,
                where: {
                    preview: true
                },
                limit: 1,
                attributes: ['url']
            }
        }]
    });

    for(let i = 0; i < reviews.length; i++){

        const curReview = reviews[i].toJSON();

        const previewImage = curReview.Spot.SpotImages[0].url;

        curReview.Spot.previewImage = previewImage;
        delete curReview.Spot.SpotImages;

        const reviewImages = await ReviewImage.findAll({
            where: {
                reviewId: curReview.id
            },
            attributes: ['id', 'url']
        });

        curReview.ReviewImages = reviewImages;

        reviews[i] = curReview;
    }

    res.json({Reviews: reviews});
});


module.exports = router;