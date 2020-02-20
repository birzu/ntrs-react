const Auth = require('../lib/auth');
const User = require('../models/User.model');
const AppError = require('../utils/utils.AppError');
const { sendCookie } = require('../utils/utils.functions');

// create a new auth instance
const auth = new Auth();
const createRefreshTokenAndSendCookie = async (user, res) => {
  const refreshToken = await auth.createRefreshToken({
    id: user.id,
    version: user.tokenVersion
  });
  sendCookie(res, {
    cookie: refreshToken,
    cookieName: 'rid',
    options: {
      maxAge: 30 * 86400 * 1000,
      httpOnly: true
      // secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
    }
  });
};

const createAccessTokenAndSendCookie = async (user, res) => {
  const accessToken = await auth.createAccessToken({ id: user.id });
  sendCookie(res, {
    cookie: accessToken,
    cookieName: 'access_token',
    options: {
      maxAge: 15 * 60 * 60 * 1000,
      httpOnly: true
      // secure: req.secure || req.headers['x-forwared-proto'] === 'https'
    }
  });
  return accessToken;
};

// validate user is active and password not changed after token assignment on login
const verifyUserExist = async (decoded, req, next) => {
  const userId = decoded.id;
  const user = await User.findById(userId);
  if (!user) {
    return next(
      new AppError(
        404,
        'user with the provided token does not exist. Please login again if you have set your account to inactive'
      )
    );
  }

  // TODO: perform check if user changed password after token assignment
  // on success put the user on req
  req.userProfile = user;
};

// validate refresh token
// This validates refresh token based on the token version
// and generates a new refresh token on signin if token from the cookie is valid
// and user id matches the id in token (ON SIGNIN)
// DO NOT USE OUTSIDE OF SIGNIN //
// THIS FUNCTION SHOULD ONLY RUN IF IT CAN VALIDATED THAT USER HAS CORRECT CREDENTIALS
// TO RECIVE A REFRESH TOKEN AND TO REGENERATE A REFRESH TOKEN
const validateRefreshToken = async (user, req, res) => {
  try {
    const { rid } = req.cookies;
    if (!rid) return;
    const decoded = await auth.verifyToken(
      rid,
      process.env.REFRESH_TOKEN_SECRET
    );
    if (!decoded) return;
    const { id, version } = decoded;
    if (id !== user.id || version === user.tokenVersion) return;
    // at this point in the fn the user has valid id and refresh token is also valid
    // but refreshToken is of a previous version
    // create a new refresh token and store as cookie
    await createRefreshTokenAndSendCookie(user, res);
  } catch (error) {
    // TODO: handle error
    return console.log(error);
  }
};

// find and verify user exist and password is valid
const validateUserCredentialsAndRespond = async (
  user,
  candidatePassword,
  res,
  next
) => {
  // if user exist compareHash with provided password
  const validPassword = await user.compareHash(
    candidatePassword,
    user.password
  );

  if (!validPassword)
    return next(
      new AppError(
        401,
        'Incorrect email or password while loging in, please try again'
      )
    );

  // on validation success send a new accessToken
  const accessToken = createAccessTokenAndSendCookie(user, res);
  return accessToken;
};

// on successful login
const sendOnSuccessfulLogin = (accessToken, user, res) => {
  res.status(200).json({
    status: 'success',
    message: 'login successful',
    accessToken,
    data: {
      user: {
        // eslint-disable-next-line no-underscore-dangle
        ...user._doc,
        tokenVersion: undefined,
        password: undefined,
        __v: undefined
      }
    }
  });
};

// revoke token refreshToken
const revokeRefreshTokens = async userId => {
  await User.findByIdAndUpdate(userId, { $inc: { tokenVersion: 1 } });
};

const restoreRefreshToken = async (user, req, res) => {
  // FOR 1ST TIME LOGIN OR IF THE REFRESH TOKEN DOES NOT EXIST CREATE A NEW REFRESH TOKEN
  const { rid } = req.cookies;
  if (!rid) {
    // assign refresh token if 1st time login or cookie has expired
    await createRefreshTokenAndSendCookie(user, res);
  } else if (rid) {
    // assign refresh token if cookie has expired
    try {
      await auth.verifyToken(rid, process.env.REFRESH_TOKEN_SECRET);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        await createRefreshTokenAndSendCookie(user, res);
      } else {
        throw new Error(error);
      }
    }
  }
};

// loginType: 'email' or 'username'
// credentials: { email || username: val, password: val}
const signUserWith = async (loginType, credentials, req, res, next) => {
  const { password } = credentials;
  // find user with correct loginType
  const user = await User.findOne({
    [loginType]: credentials[loginType]
  }).select('+password +tokenVersion');

  if (!user)
    return next(
      new AppError(
        400,
        `User with ${loginType} ${credentials[loginType]} does not exist`
      )
    );
  // validate user credentials and generate accessToken
  const accessToken = await validateUserCredentialsAndRespond(
    user,
    password,
    res,
    next
  );

  // if the function reaches this part, that means user has valid credentials
  // and can be assigned or resigned an refresh token if user's refresh token
  // has expired or the cookie has expired
  await restoreRefreshToken(user, req, res);

  if (accessToken) {
    await validateRefreshToken(user, req, res);
    sendOnSuccessfulLogin(accessToken, user, res);
  }
};

const sendNewAccessToken = async (res, config) => {
  // check if refresh_token is valid
  const decoded = await auth.verifyToken(
    config.refreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  if (decoded) {
    const id = config.userId || decoded.id;
    const user = await User.findById(id).select('+tokenVersion');
    // if user exist, refresh token is valid and tokenVersion matches
    if (user && decoded && decoded.version === user.tokenVersion) {
      await createAccessTokenAndSendCookie(user, res);
    }
  }
};

exports.auth = auth;
exports.verifyUserExist = verifyUserExist;
exports.sendNewAccessToken = sendNewAccessToken;
exports.sendOnSuccessfulLogin = sendOnSuccessfulLogin;
exports.revokeRefreshTokens = revokeRefreshTokens;
exports.signUserWith = signUserWith;
exports.validateRefreshToken = validateRefreshToken;
exports.createRefreshTokenAndSendCookie = createRefreshTokenAndSendCookie;
