// backend/routes/api/users.js
const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Op } = require("sequelize");

const router = express.Router();

const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Invalid email'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Username is required'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username is required'),
    check('firstName')
        .exists({ checkFalsy: true })
        .isLength({ min: 1 })
        .withMessage('First Name is required'),
    check('lastName')
        .exists({ checkFalsy: true })
        .isLength({ min: 1 })
        .withMessage('Last Name is required'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];

function isStringWithChars(input){
    return (typeof input === 'string' && input.length > 0);
}

// Sign up
router.post(
    '/',
    // validateSignup,
    async (req, res) => {

        const { email, password, username, firstName, lastName } = req.body;
        
        const inputErrorObject = {};
        
        if(!isStringWithChars(email)){
            inputErrorObject.email = 'Invalid email';
        }
        if(!isStringWithChars(username)){
            inputErrorObject.username = "Username is required";
        }
        if(!isStringWithChars(username)){
            inputErrorObject.firstName = "First Name is required";
        }
        if(!isStringWithChars(username)){
            inputErrorObject.lastName = "Last Name is required";
        }
        
        if(Object.keys(inputErrorObject).length > 0){
            res.status(400);
            res.json({
                "message": "Validation error",
                "statusCode": 400,
                "errors": inputErrorObject
            });
            return;
        }

        const userWithUsernameOrEmail = await User.findOne({
            where: {
                [Op.or]: [{username}, {email}]
            }
        });

        // user with email or username already exist
        if(userWithUsernameOrEmail){
            if(userWithUsernameOrEmail.email === email){
                res.status(403);
                res.json({
                    "message": "User already exists",
                    "statusCode": 403,
                    "errors": {
                      "email": "User with that email already exists"
                    }
                });
            }else{
                res.status(403);
                res.json(                {
                    "message": "User already exists",
                    "statusCode": 403,
                    "errors": {
                      "username": "User with that username already exists"
                    }
                });
            }
        }else{

            let user = await User.signup({ email, username, password, firstName, lastName });
    
            const token = await setTokenCookie(res, user);

            user = user.toJSON();

            user.token = token;
    
            return res.json(user);
        }

    }
);

module.exports = router;