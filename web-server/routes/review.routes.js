const express = require('express');
const {
  protectRoutes,
  restrictAccessTo
} = require('../controllers/auth.controller');
const {
  createReviewByUser,
  getAllReviews,
  deleteReviewById,
  getReviewById,
  updateReviewByUser
} = require('../controllers/review.controller');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(protectRoutes, restrictAccessTo(['user']), createReviewByUser);

router
  .route('/:reviewId')
  .patch(protectRoutes, restrictAccessTo(['user']), updateReviewByUser);

router.use(protectRoutes, restrictAccessTo(['admin']));
router.route('/').get(getAllReviews);

router
  .route('/:id')
  .get(getReviewById)
  .delete(deleteReviewById);

module.exports = router;
