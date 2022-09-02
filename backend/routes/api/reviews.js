// backend/routes/api/reviews.js
const express = require('express')

const { requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, ReviewImage } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateReview = [
    check('review')
        .isLength({min:1,max:255})
        .withMessage('Review must be between 1 and 255 characters long'),
    check('review')
        .custom(review => {
            if(typeof review !== 'string'){
                throw new Error('Invalid Review')
            }
            return true;
        })
        .notEmpty()
        .withMessage("Review text is required"),
    check('stars')
        .isInt({ min: 1, max: 5 }),
    handleValidationErrors
];

const router = express.Router();

router.get('/current', requireAuth, async (req, res, next) => {

    const reviews = await Review.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {
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
        },
        {
            model: ReviewImage,
            attributes: ['id', 'url']
        }]
    });

    for(let i = 0; i < reviews.length; i++){

        const reviewObj = reviews[i].toJSON();

        const previewImageUrlObj = reviewObj.Spot.SpotImages[0];

        if(previewImageUrlObj){
            reviewObj.Spot.previewImage = previewImageUrlObj.url;
        }else{
            reviewObj.Spot.previewImage = null;
        }

        delete reviewObj.Spot.SpotImages;

        reviews[i] = reviewObj;
    }

    return res.json({Reviews: reviews});
});

router.post('/:id/images', requireAuth, async (req, res, next) => {

    const review = await Review.findByPk(req.params.id);
    const {url} = req.body;

    if(review){

        if(review.userId !== req.user.id){

            res.status(403);
            return res.json({
                "message": "Forbidden",
                "statusCode": 403
            });
        }

        const reviewCount = await ReviewImage.count({
            where: {
                reviewId: review.id
            }
        });

        if(reviewCount >= 10){

            res.status(403);
            return res.json({
                "message": "Maximum number of images for this resource was reached",
                "statusCode": 403
            });
        }

        const newReviewImage = await ReviewImage.create({
            url,
            reviewId: review.id
        });

        const newReviewImageObj = newReviewImage.toJSON();

        delete newReviewImageObj.createdAt;
        delete newReviewImageObj.updatedAt;
        delete newReviewImageObj.reviewId;

        res.json(newReviewImageObj);

    }else{

        res.status(404);
        return res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
        });
    }
});

router.put('/:reviewId', requireAuth, async (req, res, next) => {

    const {review, stars} = req.body;
    const userReview = await Review.findByPk(req.params.reviewId);

    if(userReview){

        if(userReview.userId !== req.user.id){
            res.status(403);
            return res.json({
                "message": "Forbidden",
                "statusCode": 403
            });
        }

        if(!review || !stars){
            res.status(400);
            return res.json({
                "message": "Validation error",
                "statusCode": 400,
                "errors": {
                  "review": "Review text is required",
                  "stars": "Stars must be an integer from 1 to 5",
                }
            });
        }

        try{

            await userReview.update({review, stars});

            return res.json(userReview);
        }catch(err){
            res.status(400);
            return res.json({
                "message": "Validation error",
                "statusCode": 400,
                "errors": {
                  "review": "Review text is required",
                  "stars": "Stars must be an integer from 1 to 5",
                }
            });
        }


    }else{

        res.status(404);
        return res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
        });
    }
});

router.delete('/:reviewId', requireAuth, async (req, res, next) => {

    const userReview = await Review.findByPk(req.params.reviewId);

    if(userReview){

        if(userReview.userId !== req.user.id){

            res.status(403);
            return res.json({
                "message": "Forbidden",
                "statusCode": 403
            });
        }

        await userReview.destroy();

        return res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        });
    }else{

        res.status(404);
        return res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
        });
    }
});


module.exports = router;