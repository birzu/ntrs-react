const Review = require('../models/Review.model');
const Tour = require('../models/Tour.model');
const User = require('../models/User.model');
const AppError = require('../utils/utils.AppError');
const { getAll } = require('./_controller-wrappers');
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

// get all reviews (ADMIN ONLY ROUTE)
exports.getAllReviews = getAll(Review, { resourceName: 'reviews' });
