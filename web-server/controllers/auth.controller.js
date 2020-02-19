/* eslint-disable camelcase */
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const AppError = require('../utils/utils.AppError');
const { catchAsyncError } = require('../utils/utils.functions');
const {
  verifyUserExist,
  auth,
  signUserWith,
  sendNewAccessToken
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
