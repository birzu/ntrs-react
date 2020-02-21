/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const User = require('../models/User.model');
const Tour = require('../models/Tour.model');

const reviewSchema = new mongoose.Schema({
  _user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A review must have a reference to the author user']
  },
  _tour: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tour',
    required: [
      true,
      'A review must have a reference to the tour it was created for'
    ]
  },
  body: {
    type: String,
    minlength: [1, 'A review can be of length less than 1 character'],
    maxlength: [500, 'A review can be of length more than 500 characters']
  },
  rating: {
    type: Number,
    min: [1, 'A review can not have a rating below 1'],
    max: [5, 'A review can not have a rating above 5']
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: [
      true,
      'A review must hold the information of when it was created'
    ]
  },
  updatedAt: {
    type: Date,
    default: undefined
  }
});
// create a compound index for user and tour so that the one user can create only one review for
// one tour
reviewSchema.index({ _tour: 1, _user: 1 }, { unique: true });
// methods
reviewSchema.methods.calculateAvgRating = async function(tourId) {
  const stats = await this.model('Review').aggregate([
    {
      $match: { _tour: tourId }
    },
    {
      $group: {
        _id: tourId,
        nRating: { $sum: 1 },
        ratingAvg: { $avg: '$rating' }
      }
    }
  ]);
  // if stats has length that means that tour has some reviews
  if (stats.length) {
    const { nRating, ratingAvg } = stats[0];
    await Tour.findByIdAndUpdate(tourId, { ratingCount: nRating, ratingAvg });
  } else {
    // else there are no reviews so reset the ratingAvg and count
    await Tour.findByIdAndUpdate(tourId, {
      ratingCount: 0,
      ratingAvg: undefined
    });
  }
};

// DOCUMENT MIDDLEWARES
// post-save
reviewSchema.post('save', async function(doc) {
  const userId = doc._user;
  // add the id of the review to user and tour doc
  const user = await User.findById(userId).select('-__v +reviews');
  user.reviews = [...user.reviews, doc.id];
  await user.save({ validateBeforeSave: false });
  // calculate the ratingAvg and ratingCount
  await doc.calculateAvgRating(doc._tour);
});

// QUERY MIDDLEWARES
reviewSchema.post(/findOneAnd/, async function(doc) {
  await doc.calculateAvgRating(doc._tour);
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
