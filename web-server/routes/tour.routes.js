const express = require('express');
const {
  createTour,
  getAllTours,
  updateTour,
  getTourById,
  deleteTourById,
  addNewGuideToTour,
  removeGuideFromTour
} = require('../controllers/tour.controller');
const {
  protectRoutes,
  restrictAccessTo
} = require('../controllers/auth.controller');
const reviewRouter = require('./review.routes');

const router = express.Router();

router.use('/:tourId/reviews', reviewRouter);

router
  .route('/')
  .get(getAllTours)
  .post(protectRoutes, restrictAccessTo(['admin']), createTour);

router
  .route('/:id')
  .get(getTourById)
  .patch(protectRoutes, restrictAccessTo(['admin']), updateTour)
  .delete(protectRoutes, restrictAccessTo(['admin']), deleteTourById);

router.use(protectRoutes, restrictAccessTo(['admin']));
router
  .route('/:tourId/guides')
  .post(addNewGuideToTour)
  .delete(removeGuideFromTour);

module.exports = router;
