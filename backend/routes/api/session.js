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
    [restoreUser],
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
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Please provide a valid email or username.'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a password.'),
    handleValidationErrors
];

function isStringWithChars(input){
    return (typeof input === 'string' && input.length > 0);
}

// Log in
router.post(
    '/',
    async (req, res, next) => {
        const { credential, password } = req.body;

        let user;

        try{
            user = await User.login({ credential, password });
        
        }catch(err){
            // credential or password not provided
            res.status(400);
            return res.json({
                "message": "Validation error",
                "statusCode": 400,
                "errors": {
                  "credential": "Email or username is required",
                  "password": "Password is required"
                }
            });
        }
        
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