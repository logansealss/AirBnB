// backend/routes/api/spot-images.js
const express = require('express')

const { requireAuth } = require('../../utils/auth');
const { Spot, SpotImage } = require('../../db/models');
const { getAwsKey } = require('../../awsS3Helper')
const { deleteFile } = require('../../awsS3')

const router = express.Router();

router.delete('/:imageId', requireAuth, async (req, res, next) => {

    const imageWithSpot = await SpotImage.findByPk(req.params.imageId, {
        include: {
            model: Spot,
            attributes: ['ownerId']
        }
    });

    if(imageWithSpot){

        if(req.user.id === imageWithSpot.Spot.ownerId){

            const awsKey = getAwsKey(imageWithSpot.url)

            if(awsKey){
                await deleteFile(awsKey)
            }

            await imageWithSpot.destroy();
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
            "message": "Spot Image couldn't be found",
            "statusCode": 404
        });
    }
})

module.exports = router;
