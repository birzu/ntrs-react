const express = require('express');
const {
  protectRoutes,
  restrictAccessTo
} = require('../controllers/auth.controller');
const {
  createReviewByUser,
  getAllReviews
} = require('../controllers/review.controller');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(protectRoutes, restrictAccessTo(['user']), createReviewByUser);

router.use(protectRoutes, restrictAccessTo(['admin']));
router.route('/').get(getAllReviews);

module.exports = router;
