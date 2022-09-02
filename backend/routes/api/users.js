// backend/routes/api/users.js
const express = require('express')

const { setTokenCookie } = require('../../utils/auth');
const { User } = require('../../db/models');

const { Op } = require("sequelize");

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const router = express.Router();

const validateSignup = [
    check('email')
        .notEmpty()
        .isEmail()
        .withMessage('Email is invalid'),
    check('username').isLength({min:4,max:30})
            .withMessage('Username must be between 4 and 30 characters long'),
    check('username')
        .custom(username => {
            if(typeof username !== 'string'){
                throw new Error('Invalid Username')
            }
            return true;
        })
        .notEmpty()
        .withMessage('Username is required'),
    check('firstName').isLength({min:1,max:30})
            .withMessage('First Name must be between 1 and 30 characters long'),
    check('firstName')
        .custom(firstName => {
            if(typeof firstName !== 'string'){
                throw new Error('Invalid First Name')
            }
            return true;
        })
        .notEmpty()
        .withMessage('First Name is required'),
    check('lastName').isLength({min:1,max:30})
            .withMessage('Last Name must be between 1 and 30 characters long'),
    check('lastName')
        .custom(lastName => {
            if(typeof lastName !== 'string'){
                throw new Error('Invalid Last Name')
            }
            return true;
        })
        .notEmpty()
        .withMessage('Last Name is required'),
    handleValidationErrors
];

// Sign up
router.post(
    '/',
    validateSignup,
    async (req, res) => {

        const { email, password, username, firstName, lastName } = req.body;

        if(!username || !email){
            res.status(400);
            return res.json({
                "message": "Validation error",
                "statusCode": 400,
                "errors": {
                  "email": "Invalid email",
                  "username": "Username is required",
                  "firstName": "First Name is required",
                  "lastName": "Last Name is required"
                }
            })
        }

        let userWithUsernameOrEmail = await User.findOne({
            where: {
                [Op.or]: [{email}, {username}]
            },
            attributes: {
                include: ['username', 'email']
            }
        });

        // user with email or username already exist
        if(userWithUsernameOrEmail){

            userWithUsernameOrEmail = userWithUsernameOrEmail.toJSON();

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


            let user;
            try{
                user = await User.signup({ email, username, password, firstName, lastName });
            }catch(err){
                res.status(400);
                return res.json({
                    "message": "Validation error",
                    "statusCode": 400,
                    "errors": {
                      "email": "Invalid email",
                      "username": "Username is required",
                      "firstName": "First Name is required",
                      "lastName": "Last Name is required"
                    }
                });
            }
    
            const token = await setTokenCookie(res, user);
            
            user = user.toJSON();
            user.token = token;
    
            return res.json(user);
        }

    }
);

module.exports = router;