// backend/routes/api/users.js
const express = require('express')

const { setTokenCookie } = require('../../utils/auth');
const { User } = require('../../db/models');

const { Op } = require("sequelize");

const router = express.Router();

// Sign up
router.post(
    '/',
    // validateSignup,
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