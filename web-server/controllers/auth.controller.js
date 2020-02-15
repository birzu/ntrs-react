const User = require('../models/User.model');
const AppError = require('../utils/utils.AppError');
const { catchAsyncError } = require('../utils/utils.functions');

exports.register = catchAsyncError(async (req, res, next) => {
  // get the required fields from reqest body
  const { username, email, password, passwordConfirmation, avatar } = req.body;
  // if all required fields not provided return from fn
  if (!username || !email || !password || !passwordConfirmation)
    return next(new AppError(400, 'Please provide all required fields'));

  // try to create a new user based on the info provided
  const newUser = avatar
    ? await User.create({
        username,
        email,
        password,
        passwordConfirmation,
        avatar
      })
    : await User.create({ username, email, password, passwordConfirmation });

  // TODO: if success create accessToken and refreshToken add tokenVersion
  // TODO: if success send welcome email
  // send the response data
  res.status(201).json({
    status: 'success',
    data: {
      registrationComplete: true
    }
  });
});
