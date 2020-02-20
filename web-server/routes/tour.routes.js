const express = require('express');
const {
  createTour,
  getAllTours,
  updateTour,
  getTourById,
  deleteTourById
} = require('../controllers/tour.controller');
const reviewRouter = require('./review.routes');

const router = express.Router();

router.use('/:tourId/reviews', reviewRouter);

router
  .route('/')
  .get(getAllTours)
  .post(createTour);

router
  .route('/:id')
  .get(getTourById)
  .patch(updateTour)
  .delete(deleteTourById);

module.exports = router;
