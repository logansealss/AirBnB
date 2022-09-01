// backend/routes/api/bookings.js
const express = require('express')

const { requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, ReviewImage, Booking, sequelize } = require('../../db/models');

const router = express.Router();

router.get('/current', requireAuth, async (req, res, next) => {

    const bookings = await Booking.findAll({
        where: {
            userId: req.user.id
        },
        include: {
            model: Spot,
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'description']
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
    });

    for(let i = 0; i < bookings.length; i++){

        const bookingsObj = bookings[i].toJSON();
        const previewImageUrlObj = bookingsObj.Spot.SpotImages[0];

        if(previewImageUrlObj){
            bookingsObj.Spot.previewImage = previewImageUrlObj.url;
        }else{
            bookingsObj.Spot.previewImage = null;
        }

        delete bookingsObj.Spot.SpotImages;
        bookings[i] = bookingsObj;
    }

    return res.json({Bookings: bookings});
});

module.exports = router;