const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: [true, 'A tour name must be unique'],
      trim: true,
      minlength: [6, 'Tour name must be atleast 6 characters long'],
      maxlength: [30, 'Tour name must be 30 characters long at most']
    },
    summary: {
      type: String,
      required: [true, 'A tour must have a summary'],
      minlength: [10, 'Tour summary must be at least 10 characters long'],
      maxlength: [150, 'Tour summary must be at most 150 characters long']
    },
    description: {
      type: String,
      maxlength: [
        1000,
        'Tour description must be less than 500 characters long'
      ]
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: "Tour can have a difficulty of 'easy', 'medium' or 'difficult'"
      }
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have an image cover']
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price']
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a valid maxGroupSize'],
      min: [1, 'A tour must have a group size of at least 1 member']
    },
    memberCount: {
      type: Number,
      required: [true, "A tour must have information of it's member count"],
      min: [0, 'A tour can not have a negative memberCount'],
      default: 0
      // TODO: find a way to validate against maxGroupSize
    },
    ratingCount: {
      type: Number,
      default: 0,
      min: [0, "A tour's rating count can not be below 0"]
    },
    ratingAvg: {
      type: Number,
      default: undefined,
      min: [1, 'A tour can not have an average rating  below 1'],
      max: [5, 'A tour can not have an average rating above 5']
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      required: [
        true,
        'A tour must contain the information of when it was created'
      ]
    },
    duration: {
      type: Number,
      required: [true, "A tour must contain the information of it's duration"]
    },
    images: {
      type: [String]
    },
    startDates: {
      type: [Date]
    },
    slug: String
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// add virtual field reviews
tourSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: '_tour'
});
// DOCUMENT MIDDLEWARES
// pre-save hooks (only available for Model.create() and Model.prototype.save())
tourSchema.pre('save', function(next) {
  if (this.isNew) {
    this.slug = encodeURI(
      slugify(this.name, { lower: true, replacement: '-' })
    );
    next();
  }
  next();
});

// QUERY MIDDLEWARES
// pre-find hooks
tourSchema.pre(/find/, function(next) {
  this.select('-__v').populate('reviews');
  next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
