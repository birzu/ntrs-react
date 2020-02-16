const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const AppError = require('../utils/utils.AppError');
const { catchAsyncError } = require('../utils/utils.functions');
const {
  verifyUserExist,
  auth,
  createAccessTokenAndSendCookie,
  signUserWith
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
});

// middleware to check if user is authenticated and has valid credentials
exports.protectRoutes = catchAsyncError(async (req, res, next) => {
  // if token is not present in either cookie or Authorization header
  // return with next(err) call
  if (!req.headers.authorization && !req.cookies.slaid)
    return next(
      new AppError(
        400,
        'Login is required to process this request, please login and try again'
      )
    );

  let token;
  let decoded;
  // 1st check (cookie)
  const { slaid } = req.cookies;
  // 2nd check (header)
  const { authorization } = req.headers;
  // if cookie doesn't exist  and authorization header is not in proper format
  // return with next(err) call
  if (!slaid && !authorization.startsWith('Bearer ')) {
    return next(
      new AppError(400, 'Invalid credentials, please login and try again')
    );
  }

  if (slaid) {
    token = slaid;
    decoded = await auth.verifyToken(token, process.env.ACCESS_TOKEN_SECRET);
    await verifyUserExist(decoded, req, next);
    next();
  } else if (authorization && authorization.startsWith('Bearer ')) {
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
   * -- refresh Token is valid and access token has expired
   */
  const { llaid, slaid } = req.cookies;
  if (!llaid || !slaid) return next();
  try {
    // try to verify the accessToken and see if it has expired
    await auth.verifyToken(slaid, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    // issue an new accessToken if the token has expired but valid
    if (error.name === 'TokenExpiredError') {
      try {
        const { id } = jwt.decode(slaid);
        const decoded = await auth.verifyToken(
          llaid,
          process.env.REFRESH_TOKEN_SECRET
        );
        const user = await User.findById(id);
        // if user exist, refresh token is valid and tokenVersion matches
        if (
          user &&
          decoded &&
          user.id === decoded.id &&
          decoded.version === user.tokenVersion
        ) {
          console.log(user, decoded, decoded.version);
          await createAccessTokenAndSendCookie(user, res);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      throw new Error(error);
    }
  } finally {
    next();
  }
};
