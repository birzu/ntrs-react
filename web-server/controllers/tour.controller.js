const Tour = require('../models/Tour.model');
const User = require('../models/User.model');
const AppError = require('../utils/utils.AppError');
const { catchAsyncError } = require('../utils/utils.functions');
const {
  createOne,
  getAll,
  updateOne,
  getOne,
  deleteOne
} = require('./_controller-wrappers');

exports.getAllTours = getAll(Tour, { resourceName: 'tours' });
exports.createTour = createOne(Tour, { resourceName: 'tour' });
exports.getTourById = getOne(Tour, { resourceName: 'tour' });

// FOR ADMIN USE ONLY
exports.updateTour = updateOne(Tour, { resourceName: 'tour' });
exports.deleteTourById = deleteOne(Tour, { resourceName: 'tour' });

// add new guide to tour
exports.addNewGuideToTour = catchAsyncError(async (req, res, next) => {
  // get the userId from req.body
  const { userId } = req.body;
  if (!userId)
    return next(
      new AppError(
        400,
        'Please provide an userId to add a new guide to the tour'
      )
    );
  const user = await User.findById(userId).select('+role');
  if (!user) return next(new AppError(404, 'User not found'));
  if (!['lead-guide', 'guide'].includes(user.role))
    return next(
      new AppError(
        400,
        'user does not meet the requirements or permission to be a guide'
      )
    );

  const { tourId } = req.params;
  const tour = await Tour.findById(tourId);
  if (!tour) return next(new AppError(404, 'Tour not found'));
  if (tour.guides.includes(userId)) {
    return next(
      new AppError(
        400,
        `User with id ${userId} already exists as a guide in the tour`
      )
    );
  }
  tour.guides.push(userId);
  await tour.save();
  res.status(200).json({
    status: 'success',
    message: 'Added new guide to tour. Tour updated successfully'
  });
});

exports.removeGuideFromTour = catchAsyncError(async (req, res, next) => {
  const { userId } = req.body;
  if (!userId)
    return next(
      new AppError(400, 'Please provide an userId remove a guide from the tour')
    );
  const { tourId } = req.params;
  const tour = await Tour.findById(tourId);
  if (!tour) return next(404, 'Tour not found');
  console.log(tour.guides);
  if (!tour.guides.includes(userId))
    return next(
      new AppError(
        400,
        'Provided userId does not exist as a guide in tour or invalid userId'
      )
    );
  // convert each element of tour.guides to string before using filter
  const newGuides = tour.guides
    .map(el => el.toString())
    .filter(guide => guide !== userId);
  console.log(newGuides);
  tour.guides = newGuides;
  await tour.save();
  res.status(200).json({
    status: 'success',
    message: `${userId} removed from tour guides`
  });
});
