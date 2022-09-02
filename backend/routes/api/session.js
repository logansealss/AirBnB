// backend/routes/api/session.js
const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Restore session user
router.get(
    '/',
    [restoreUser, requireAuth],
    (req, res) => {
        const { user } = req;
        if (user) {
            return res.json(
                user.toSafeObject()
            );
        } else return res.json({});
    }
);

const validateLogin = [
    check('credential')
        .custom(credential => {
            if(typeof credential !== 'string'){
                throw new Error('Invalid credential')
            }
            return true;
        })
        .notEmpty()
        .withMessage('Email or username is required'),
    check('password')
        .custom(password => {
            if(typeof password !== 'string'){
                throw new Error('Invalid password')
            }
            return true;
        })
        .notEmpty()
        .withMessage('Password is required'),
    handleValidationErrors
];

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