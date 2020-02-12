const path = require('path');
const express = require('express');
const helmet = require('helmet');
const userRouter = require('./routes/user.routes');
const tourRouter = require('./routes/tour.routes');
const bookingRouter = require('./routes/booking.routes');
const reviewRouter = require('./routes/review.routes');

const app = express();

// middlewares
app.use(helmet());

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

module.exports = app;
