const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const compression = require('compression');

const { handleRefreshTokens } = require('./controllers/auth.controller');

const userRouter = require('./routes/user.routes');
const tourRouter = require('./routes/tour.routes');
const bookingRouter = require('./routes/booking.routes');
const reviewRouter = require('./routes/review.routes');

const globalErrorHandler = require('./middlewares/globalErrorHandler');

/**
 * dotenv config has to be set here in app.js instead of  server.js
 * because app.js uses env variables that will be undefined
 * when server.js runs if dotenv config is set in server.js
 * app.js is a dependency of server.js so it will be executed on import
 * by that time all env variables are undefined if dotenv config
 * is set in server.js instead of app.js
 * */
// development env config
dotenv.config({ path: path.join(__dirname, 'config.env') });

// express app declaration
const app = express();

// middlewares
// for dev environment
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(helmet());
// enable compression
app.use(compression());

// cookie-parser
app.use(cookieParser());
// body-parsers
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false, limit: '10kb' }));

// MIDDLEWARE TO HANDLE REFRESH TOKESN
app.use(handleRefreshTokens);

// temp route
app.get('/', (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message: 'API listening for request'
  });
});

// RESOURE ENDPOINTS
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/bookings', bookingRouter);

// message for non-implemented routes
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'error',
    message: 'Route for requested resource does not exist.'
  });
});

// global error handler middlerware
app.use(globalErrorHandler);

module.exports = app;
