// backend/routes/api/spots.js
const express = require('express')

const { requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, sequelize } = require('../../db/models');

const router = express.Router();

router.get('/current', requireAuth, async (req, res, next) => {

    const reviews = await User.findByPk(req.user.id, {
        include: {
            
        }
    });

    res.json(reviews);
});


module.exports = router;