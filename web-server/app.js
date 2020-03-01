const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');

const {
  handleRefreshTokens,
  handleAccessTokens
} = require('./controllers/auth.controller');

const userRouter = require('./routes/user.routes');
const tourRouter = require('./routes/tour.routes');
const bookingRouter = require('./routes/booking.routes');
const reviewRouter = require('./routes/review.routes');

const { sendNewRefreshToken } = require('./controllers/auth.controller');
const globalErrorHandler = require('./middlewares/globalErrorHandler');
const logger = require('./utils/utils.server');

/**
 * dotenv config has to be set here in app.js instead of  server.js
 * because app.js uses env variables that will be undefined
 * when server.js runs if dotenv config is set in server.js
 * app.js is a dependency of server.js so it will be executed on import
 * by that time all env variables are undefined if dotenv config
 * is set in server.js instead of app.js
 * */
// development env config (if running outside docker container)
// dotenv.config({ path: path.join(__dirname, 'config.env') });

// express app declaration
const app = express();

// middlewares
app.use(morgan('combined', { stream: logger.stream }));
app.use(helmet());
app.use(xss());
// mongo query sanitization
app.use(mongoSanitize());
// enable compression
app.use(compression());
// ratelimiter
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 1000,
  message:
    'You have exceeded your request limit for using the api.Please try again after some time.'
});

app.use('/api', limiter);
// prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'price',
      'ratingAvg',
      'ratingCount',
      'maxGroupSize',
      'duration',
      'difficulty'
    ]
  })
);

// cookie-parser
app.use(cookieParser());
// body-parsers
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false, limit: '10kb' }));

// MIDDLEWARE TO HANDLE REFRESH TOKENS
app.use(handleRefreshTokens, sendNewRefreshToken);
// MIDDLEWARE TO HANDLE REFRESH TOKENS
app.use(handleAccessTokens);

// temp route
app.get('/_/api/', (req, res, next) => {
  res.status(200).json({
    status: 'success',
    apiVersion: 1,
    message: 'API listening for request'
  });
});

// RESOURE ENDPOINTS
app.use('/_/api/v1/users', userRouter);
app.use('/_/api/v1/reviews', reviewRouter);
app.use('/_/api/v1/tours', tourRouter);
app.use('/_/api/v1/bookings', bookingRouter);

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
