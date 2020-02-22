const Review = require('../models/Review.model');
const Tour = require('../models/Tour.model');
const User = require('../models/User.model');
const AppError = require('../utils/utils.AppError');
const { getAll, getOne, deleteOne } = require('./_controller-wrappers');
const { catchAsyncError } = require('../utils/utils.functions');

// create review by user
// login required
exports.createReviewByUser = catchAsyncError(async (req, res, next) => {
  // review must have a rating
  const { rating, body } = req.body;
  const { tourId } = req.params;
  // get the userId from req.userProfile
  const userId = req.userProfile.id;
  if (!rating) return next(new AppError(400, 'A review must have a rating'));
  const tour = await Tour.findById(tourId);
  if (!tour)
    return next(new AppError(400, 'invalid tourid or tour does not exist'));
  // TODO: validate the user has purchased the tour
  const review = await Review.create({
    rating,
    body,
    _user: userId,
    _tour: tour.id
  });
  res.status(201).json({
    status: 'success',
    data: {
      review
    }
  });
});

// update review by user
// login required
exports.updateReviewByUser = catchAsyncError(async (req, res, next) => {
  const { rating, body } = req.body;
  const { tourId, reviewId } = req.params;
  const userId = req.userProfile;
  const review = body ? { rating, body } : { rating };
  if (!rating) return next(new AppError(400, 'A review must have a rating'));
  const updatedReview = await Review.findOneAndUpdate(
    {
      _tour: tourId,
      _user: userId,
      _id: reviewId
    },
    review,
    { runValidators: true, new: true }
  );
  if (!updatedReview)
    return next(new AppError(400, 'invalid reviewId or review does not exist'));

  res.status(200).json({
    status: 'success',
    data: {
      review: updatedReview
    }
  });
});

// get all reviews (ADMIN ONLY ROUTE)
exports.getAllReviews = getAll(Review, { resourceName: 'reviews' });
// get review by id (ADMIN ONLY ROUTE)
exports.getReviewById = getOne(Review, { resourceName: 'review' });
// delete review by id (ADMIN ONLY ROUTE)
exports.deleteReviewById = deleteOne(Review, { resourceName: 'review' });
// only user should update the reviews
