const path = require('path');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const userRouter = require('./routes/user.routes');
const tourRouter = require('./routes/tour.routes');
const bookingRouter = require('./routes/booking.routes');
const reviewRouter = require('./routes/review.routes');
const globalErrorHandler = require('./middlewares/globalErrorHandler');

const app = express();

// middlewares
app.use(helmet());
// for env dev
app.use(morgan('dev'));
// body-parsers
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false, limit: '10kb' }));

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
