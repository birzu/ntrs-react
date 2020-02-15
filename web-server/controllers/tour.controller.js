const Tour = require('../models/Tour.model');
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
exports.updateTour = updateOne(Tour, { resourceName: 'tour' });
exports.deleteTourById = deleteOne(Tour, { resourceName: 'tour' });
