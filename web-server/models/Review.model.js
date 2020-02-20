const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  _user: {
    type: mongoose.Schema.ObjectId,
    required: [true, 'A review must have a reference to the author user']
  },
  _tour: {
    type: mongoose.Schema.ObjectId,
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
    type: String,
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

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
