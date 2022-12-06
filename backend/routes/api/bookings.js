// backend/routes/api/bookings.js
const express = require('express')

const { requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Booking} = require('../../db/models');
const { Op } = require("sequelize");
const { validateBooking, validateBookingEndDate } = require('../../utils/inputValidators');

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

async function getConflictingBookings(spotId, startDate, endDate, bookingId){

    const conflictingBookings = await Booking.findOne({
        where: {
            spotId,
            id: {
                [Op.ne]: bookingId
            }, 
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

router.put('/:bookingId', requireAuth, validateBooking, validateBookingEndDate, async (req, res, next) => {

    const booking = await Booking.findByPk(req.params.bookingId);

    if(booking){

        if(booking.userId !== req.user.id){

            res.status(403);
            return res.json({
                "message": "Forbidden",
                "statusCode": 403
            });
        }

        let currentDate = new Date();
        currentDate = currentDate.toISOString();
        currentDate = currentDate.substring(0, 10);

        if(booking.endDate < currentDate){

            res.status(403);
            return res.json({
                "message": "Past bookings can't be modified",
                "statusCode": 403
            });
        }

        const {startDate, endDate} = req.body;

        const conflictingBooking = await getConflictingBookings(booking.spotId, startDate, endDate, booking.id);

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

        booking.startDate = startDate;
        booking.endDate = endDate;
        await booking.save();

        return res.json(booking);

    }else{

        res.status(404);
        return res.json({
            "message": "Booking couldn't be found",
            "statusCode": 404
        });
    }
});

router.delete('/:bookingId', requireAuth, async (req, res, next) => {

    const booking = await Booking.findByPk(req.params.bookingId, {
        include: {
            model: Spot
        }
    });

    if(booking){

        if(booking.userId === req.user.id || booking.Spot.ownerId === req.user.id){

            let currentDate = new Date();
            currentDate = currentDate.toISOString();
            currentDate = currentDate.substring(0, 10);

            if(booking.startDate <= currentDate){

                res.status(403);
                return res.json({
                    "message": "Bookings that have been started can't be deleted",
                    "statusCode": 403
                });
            }

            await booking.destroy();

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
            "message": "Booking couldn't be found",
            "statusCode": 404
        });
    }
});

module.exports = router;