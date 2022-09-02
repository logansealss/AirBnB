// backend/utils/validation.js
const { validationResult } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, res, next) => {
    const validationErrors = validationResult(req);

    const errorObj = {};
    const validationErrorArray = validationErrors.array();

    if(validationErrorArray.length === 0){
        return next();
    }

    for(let i = 0; i < validationErrorArray.length; i++){

        const currentError =  validationErrorArray[i];
        errorObj[currentError.param] = currentError.msg;
    }

    res.status(400);
    return res.json({
        "message": "Validation error",
        "statusCode": 400,
        "errors": errorObj
    });
};

module.exports = {
  handleValidationErrors
};