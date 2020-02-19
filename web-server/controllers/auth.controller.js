/* eslint-disable camelcase */
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const AppError = require('../utils/utils.AppError');
const {
  catchAsyncError,
  randomString,
  hashToken,
  resetCookies
} = require('../utils/utils.functions');
const {
  verifyUserExist,
  auth,
  signUserWith,
  sendNewAccessToken,
  revokeRefreshTokens
} = require('../utils/utils.auth');

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
  // TODO: if success send welcome email
  // send the response data
  res.status(201).json({
    status: 'success',
    data: {
      registrationComplete: true
    }
  });
});

// middleware for signin endpoint
exports.signin = catchAsyncError(async (req, res, next) => {
  try {
    // get the required values from req.body
    const { email, username, password } = req.body;
    // perform a check where password must exist and either
    // email or username is provided
    if (!(email || username) || !password)
      return next(
        new AppError(
          400,
          'Please provide valid credentials(an username or email and password) for login'
        )
      );
    // if email and username both specified on request return with next(err) call
    if (email && username)
      return next(
        new AppError(
          400,
          'Please provide either username or email with password to login, but not both'
        )
      );

    // sign user with correct login type
    // with username and password if provided
    // of with email and password if provided
    if (email && password) {
      await signUserWith('email', { email, password }, req, res, next);
    } else if (username && password) {
      await signUserWith('username', { username, password }, req, res, next);
    }
  } catch (error) {
    console.log(error.name, error.message);
  }
});

// middleware to check if user is authenticated and has valid credentials
exports.protectRoutes = catchAsyncError(async (req, res, next) => {
  // if token is not present in either cookie or Authorization header
  // return with next(err) call
  if (!req.headers.authorization && !req.cookies.access_token)
    return next(
      new AppError(
        400,
        'Login is required to process this request, please login and try again'
      )
    );

  let token;
  let decoded;
  // 1st check (cookie)
  const { access_token } = req.cookies;
  // 2nd check (header)
  const { authorization } = req.headers;
  // if cookie doesn't exist  and authorization header is not in proper format
  // return with next(err) call
  if (!access_token && !authorization.startsWith('Bearer ')) {
    return next(
      new AppError(400, 'Invalid credentials, please login and try again')
    );
  }

  if (access_token) {
    token = access_token;
    decoded = await auth.verifyToken(token, process.env.ACCESS_TOKEN_SECRET);
    await verifyUserExist(decoded, req, next);
    next();
  } else if (authorization && authorization.startsWith('Bearer ')) {
    // eslint-disable-next-line prefer-destructuring
    token = authorization.split(' ')[1];
    decoded = await auth.verifyToken(token, process.env.ACCESS_TOKEN_SECRET);
    await verifyUserExist(decoded, req, next);
    next();
  }
});

// middleware to check refresh tokens and send new access tokens
exports.handleRefreshTokens = async (req, res, next) => {
  /**
   * CASES WHERE REFRESH TOKEN WILL GENERATE A NEW ACCESS TOKEN
   * -- cookie obj contains the refresh token(alias: rid)
   * -- refresh Token is valid and there is no access token in cookies
   * -- refresh Token is valid and access token has expired
   *
   */
  const { rid, access_token } = req.cookies;
  if (!rid) return next();

  // if refreshToken in rid is valid and request doesn't have a access_token as cookie
  // send a new cookie with access_token
  if (!access_token) {
    try {
      await sendNewAccessToken(res, { refreshToken: rid });
      // after sending new access token rediret to original url
      // so that the new cookie doesn't conflict with protectRoutes middlewares
      return res.redirect(req.originalUrl);
    } catch (error) {
      console.log(error.name);
    }
  } else if (access_token) {
    // if refreshToken and access_token both exist
    try {
      // try to verify the accessToken and see if it has expired
      await auth.verifyToken(access_token, process.env.ACCESS_TOKEN_SECRET);
    } catch (error) {
      // issue an new accessToken if the token has expired but valid
      if (error.name === 'TokenExpiredError') {
        try {
          const { id } = jwt.decode(access_token);
          console.log(id);
          await sendNewAccessToken(res, { refreshToken: rid });
          return res.redirect(req.originalUrl);
        } catch (err) {
          console.log(err);
        }
      } else {
        throw new Error(error);
      }
    }
  }
  // at this point next only gets called if their is any error
  // like malformed jwt or invalid userId or user does not exist
  // because on successful accessToken reassign the request gets redirected
  // to the originalUrl
  next();
};

// MIDDLWARE FOR THE ROUTE FOR A FORGOT PASSWORD REQUESTE
exports.onForgotPassword = catchAsyncError(async (req, res, next) => {
  // request has to contain a email and only a email
  const { email } = req.body;
  if (!email)
    return next(
      new AppError(400, 'Please provide your email to reset password ')
    );
  // if email exist try to verify that the user exist and active
  const user = await User.findOne({ email });

  if (!user) return next(new AppError(400, 'Invalid email or username'));

  // on successful validation that the user exist create and send a resetToken
  // Hash the token and store it in user's profile
  const resetToken = randomString(64, 'hex');
  const hash = hashToken(resetToken);
  user.resetToken = hash;
  user.resetTokenExpiresAt = Date.now() + 15 * 60 * 1000;
  // validateBeforeSave options can be set to false because we are not taking any input and saving
  await user.save({ validateBeforeSave: false });
  // TEMP
  res.status(200).json({
    status: 'success',
    message: `password reset token for email ${email}, make a request to the request url with the token to reset your password`,
    resetUrl: `http://example.localhost/api/v1/me/resetpassword/${resetToken}`
  });
  // TODO : send token in email
});

// MIDDLWARE FOR THE ROUTE TO RESET THE USER'S PASSWORD
// chain resetPassword middleware after onResetPassword middleware
exports.onResetPassword = catchAsyncError(async (req, res, next) => {
  // validate token
  const { token } = req.params;
  if (!token)
    return next(
      new AppError(400, 'Invalid resetToken or resetToken has already expired')
    );
  // hash the token
  const hash = hashToken(token);
  // find the correct user
  const user = await User.findOne({
    resetToken: hash,
    resetTokenExpiresAt: { $gt: Date.now() }
  });
  if (!user)
    return next(
      new AppError(400, 'Invalid resetToken or resetToken has already expired')
    );
  // on success add the user to req and
  req.userToUpdatedPassword = user;
  next();
});

exports.resetPassword = catchAsyncError(async (req, res, next) => {
  // request must containe newPassword, passwordConfirmation
  const { newPassword, passwordConfirmation } = req.body;
  const user = req.userToUpdatedPassword;

  if (!newPassword || !passwordConfirmation)
    return next(
      new AppError(
        400,
        'newPassword and passwordConfirmation fields must not be empty'
      )
    );
  // NO NEED FOR OTHER VALIDATION OR SANITIZATION
  // VALIDATION AND SANITIZATION IS ALREADY DONE THROUGH SCHEMA
  // #########################################################################
  // on successful validation update the users password
  user.password = newPassword;
  user.passwordConfirmation = passwordConfirmation;
  user.resetToken = undefined;
  user.resetTokenExpiresAt = undefined;
  try {
    await user.save();
    // revoke refreshToken on save
    await revokeRefreshTokens(user.id);
    // on successful save reset Cookies
    resetCookies(res);
    res.status(200).json({
      status: 'success',
      message:
        'password updated successfully, please login with your new password'
    });
  } catch (error) {
    throw Error(error);
  }
});

// SIGNOUT ROUTE FOR USER
// METHOD HAS TO BE GET
// chain the middleware after protectRoutes
exports.signOut = catchAsyncError(async (req, res, next) => {
  resetCookies(res);
  res.status(200).json({
    status: 'success',
    message: 'You have been logged out successfully'
  });
});

// AUTHORIZATION HANDLER
// chain after protectRoutes to restrict access to user based on user roles
// args array of roles, enum ['admin', 'user', 'guide', 'lead-guide']
exports.restrictAccessTo = roles =>
  catchAsyncError(async (req, res, next) => {
    // query for the user based on the userId
    const userId = req.userProfile.id;
    const user = await User.findById(userId).select('+role');
    // user is guranteed to exist
    if (!roles.includes(user.role))
      return next(new AppError(403, 'not authorized'));
    // else call next
    next();
  });
