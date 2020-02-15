const express = require('express');
const {
  createTour,
  getAllTours,
  updateTour,
  getTourById,
  deleteTourById
} = require('../controllers/tour.controller');

const router = express.Router();

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
