const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

// variable that is true if environment is in production
const { environment } = require('./config');
const isProduction = environment === 'production';

// get the routes
const routes = require('./routes');

// initialize new express app
const app = express();

// connecting morgan middleware for logging information about
// requests and responses
app.use(morgan('dev'));

// cookie-parser middleware for parsing cookies
app.use(cookieParser());

// parsing JSON bodies of requests with 
// Content-Type of "app.ication/json"
app.use(express.json());

// Security Middleware
if (!isProduction) {
    // enable cors only in development
    app.use(cors());
}
// Security Middleware
if (!isProduction) {
    // enable cors only in development
    app.use(cors());
}
  
// helmet helps set a variety of headers to better secure your app
app.use(
    helmet.crossOriginResourcePolicy({ 
        policy: "cross-origin" 
    })
);

// Set the _csrf token and create req.csrfToken method
app.use(
    csurf({
        cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
        }
    })
);

app.use(routes);

module.exports = app;

  

