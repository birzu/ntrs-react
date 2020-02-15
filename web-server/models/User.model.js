const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    minlength: [4, 'Username should be atleast 4 characters long'],
    maxlength: [15, 'Username should not exceed 15 characters in length'],
    required: [true, 'Username is required'],
    match: [/^[A-Za-z0-9_]{4,15}$/, 'Invalid username']
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    required: [true, 'Email is required'],
    validate: [isEmail, 'Invalid email']
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    minlength: [8, 'password must be at least 8 characters long'],
    match: [
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/,
      'Weak password, please use a stronger password with at least one uppecase letter, one lowercase letter and a number'
    ],
    select: false
  },
  passwordConfirmation: {
    type: String,
    required: [true, 'please confirm password'],
    validate: {
      // eslint-disable-next-line object-shorthand
      validator: function(val) {
        return this.password === val;
      },
      message: 'Password and passwordConfirmation must match'
    }
  },
  avatar: {
    type: String,
    default: 'user-img-default.png'
  },
  role: {
    type: String,
    enum: {
      values: ['admin', 'lead-guide', 'guide', 'user'],
      message: 'Invalid role'
    },
    default: 'user',
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  passwordChangedAt: {
    type: Date,
    select: false
  },
  updatedAt: {
    type: Date,
    default: undefined
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

// methods
userSchema.methods.compareHash = function(candidate, hash) {
  return bcrypt.compare(candidate, hash);
};

// DOCUMENT MIDDLEWARES

// pre-save hooks
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  // hash the password for new user creation or if user
  // changes the password
  this.password = await bcrypt.hash(this.password, 14);
  // set passwordConfirmation to undefined
  this.passwordConfirmation = undefined;
  next();
});

// updates the updatedAt property if modified
userSchema.pre('save', function(next) {
  if (!this.isModified()) return next();
  this.updatedAt = Date.now();
  next();
});

// modifies passwordChangedAt value
userSchema.pre('save', function(next) {
  if (!this.isModified('password') || this.isNew) return next();
  // update the passwordChangedAt field
  this.passwordChangedAt = Date.now() - 1500;
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
