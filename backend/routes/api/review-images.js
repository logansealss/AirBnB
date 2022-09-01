// backend/routes/api/review-images.js
const express = require('express')

const { requireAuth } = require('../../utils/auth');
const { Review, ReviewImage } = require('../../db/models');

const router = express.Router();

router.delete('/:imageId', requireAuth, async (req, res, next) => {

    const imageWithReview = await ReviewImage.findByPk(req.params.imageId, {
        include: {
            model: Review,
            attributes: ['userId']
        }
    });

    if(imageWithReview){

        if(req.user.id === imageWithReview.Review.userId){

            await imageWithReview.destroy();
            return res.json({
                "message": "Successfully deleted",
                "statusCode": 200
            });
        }else{

            res.status(403);
            return res.json({
                "message": "Forbidden",
                "statusCode": 403
            });
        }
    }else{

        res.status(404);
        return res.json({
            "message": "Review Image couldn't be found",
            "statusCode": 404
        });
    }
})

module.exports = router;
