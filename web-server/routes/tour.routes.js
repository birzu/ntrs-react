const express = require('express');
const {
  createTour,
  getAllTours,
  updateTour,
  getTourById,
  deleteTourById,
  addNewGuideToTour,
  removeGuideFromTour,
  getTourStats,
  getMonthlyTourPlans,
  findTourInRadiusOf,
  calculateTourDistances
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

// GET tours within a certain radius
router.route('/within').get(protectRoutes, findTourInRadiusOf);
// GET distances from a certain point for the tours
router.route('/distance-from/').get(protectRoutes, calculateTourDistances);

router
  .route('/stats')
  .get(
    protectRoutes,
    restrictAccessTo(['admin', 'lead-guide', 'guide']),
    getTourStats
  );

router
  .route('/monthly-plans/:year')
  .get(
    protectRoutes,
    restrictAccessTo(['admin', 'lead-guide']),
    getMonthlyTourPlans
  );

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
