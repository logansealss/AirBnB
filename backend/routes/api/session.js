// backend/routes/api/session.js
const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { validateLogin } = require('../../utils/inputValidators');


const router = express.Router();

// Restore session user
router.get(
    '/',
    [restoreUser],
    (req, res) => {
        const { user } = req;
        if (user) {
            return res.json(
                user.toSafeObject()
            );
        } else return res.json(null);
    }
);

// Log in
router.post(
    '/',
    validateLogin,
    async (req, res, next) => {
        const { credential, password } = req.body;

        let user;

        user = await User.login({ credential, password });
        
        if (!user) {
            res.status(401);
            return res.json({
                "message": "Invalid credentials",
                "statusCode": 401
            });
        }

        const token = await setTokenCookie(res, user);

        const userObj = user.toJSON();
        userObj.token = token;

        return res.json(
            userObj
        );
    }
);

// Log out
router.delete(
    '/',
    (_req, res) => {
        res.clearCookie('token');
        return res.json({ message: 'success' });
    }
);

module.exports = router;