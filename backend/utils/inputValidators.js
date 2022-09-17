const { check } = require('express-validator');
const { handleValidationErrors } = require('./validation');

const validateSpot = [
    check('address')
        .isLength({min:1,max:255})
        .withMessage('Address must be between 1 and 255 characters long'),
    check('address')
        .custom(address => {
            if(typeof address !== 'string'){
                throw new Error('Invalid Address')
            }
            return true;
        })
        .notEmpty()
        .withMessage('Street address is required'),
    check('city')
        .isLength({min:1,max:255})
        .withMessage('City must be between 1 and 255 characters long'),
    check('city')
        .custom(city => {
            if(typeof city !== 'string'){
                throw new Error('Invalid City')
            }
            return true;
        })
        .notEmpty()
        .withMessage('City is required'),
    check('state')
        .isLength({min:1,max:255})
        .withMessage('State must be between 1 and 255 characters long'),
    check('state')
        .custom(state => {
            if(typeof state !== 'string'){
                throw new Error('Invalid State')
            }
            return true;
        })
        .notEmpty()
        .withMessage('State is required'),
    check('country')
        .isLength({min:1,max:255})
        .withMessage('Country must be between 1 and 255 characters long'),
    check('country')
        .custom(country => {
            if(typeof country !== 'string'){
                throw new Error('Invalid Country')
            }
            return true;
        })
        .notEmpty()
        .withMessage('Country is required'),
    check('name')
        .isLength({min:1,max:49})
        .withMessage('Name must be between 1 and 49 characters long'),
    check('name')
        .custom(name => {
            if(typeof name !== 'string'){
                throw new Error('Invalid Name')
            }
            return true;
        })
        .notEmpty()
        .withMessage('Name is required'),
    check('description')
        .isLength({min:1,max:255})
        .withMessage('Description must be between 1 and 255 characters long'),
    check('description')
        .custom(description => {
            if(typeof description !== 'string'){
                throw new Error('Invalid Description')
            }
            return true;
        })
        .notEmpty()
        .withMessage('Description is required'),
    check('lat')
        .isDecimal()
        .custom(lat => {
            if(lat < -90 || lat > 90){
                throw new Error('Latitude is not valid')
            }
            return true;
        })
        .notEmpty()
        .withMessage('Latitude is not valid'),
    check('lng')
        .isDecimal()
        .custom(lng => {
            if(lng < -180 || lng > 180){
                throw new Error('Longitude is not valid')
            }
            return true;
        })
        .notEmpty()
        .withMessage('Longitude is not valid'),
    check('price')
        .isDecimal()
        .custom(price => {
            if(price < 0){
                throw new Error('Price must be greater than or equal to 0')
            }
            return true;
        })
        .notEmpty()
        .withMessage("Price per day is required"),
    handleValidationErrors
];

const validateReview = [
    check('review')
        .isLength({min:1,max:255})
        .withMessage('Review must be between 1 and 255 characters long'),
    check('review')
        .custom(review => {
            if(typeof review !== 'string'){
                throw new Error('Invalid Review')
            }
            return true;
        })
        .notEmpty()
        .withMessage("Review text is required"),
    check('stars')
        .isInt({ min: 1, max: 5 })
        .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
];

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

const validateBooking = [
    check('startDate')
        .isDate({format: "YYYY-MM-DD"})
        .notEmpty()
        .matches(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)
        .withMessage('Invalid Start Date'),
    check('endDate')
        .isDate({format: "YYYY-MM-DD"})
        .notEmpty()
        .matches(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)
        .withMessage('Invalid End Date'),
    handleValidationErrors
];

const validateBookingEndDate = [

    check('endDate')
        .custom((endDate, { req }) => {
            if(endDate <= req.body.startDate){
                throw new Error("endDate cannot be on or before startDate")
            }
            return true;
        }),
    handleValidationErrors
];

const validateImage = [
    check('url')
        .isLength({min:1,max:255})
        .withMessage('URL must be between 1 and 255 characters long'),
    check('url')
        .custom(url => {   
            if(typeof url !== 'string'){
                throw new Error('Invalid URL')
            }
            return true;
        })
        .notEmpty()
        .withMessage('URL is required'),
    handleValidationErrors
];

module.exports = {
    validateSpot,
    validateReview,
    validateSignup,
    validateLogin,
    validateBooking,
    validateBookingEndDate,
    validateImage
}