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
    cookieName: 'llaid',
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
    cookieName: 'slaid',
    options: {
      maxAge: 15 * 60 * 60 * 1000,
      httpOnly: true
      // secure: req.secure || req.headers['x-forwared-proto'] === 'https'
    }
  });
  return accessToken;
};
// // create access token
// const createToken = (payload, secret, options) => {
//   if (options.tokenType === 'refresh') {
//     return promisify(jwt.sign)(payload, process.env.REFRESH_TOKEN_SECRET, {
//       expiresIn: options.expiresIn
//     });
//   }
//   if (options.tokenType === 'access') {
//     return promisify(jwt.sign)(payload, process.env.ACCESS_TOKEN_SECRET, {
//       expiresIn: options.expiresIn
//     });
//   }
// };

// const verifyToken = (token, secret) => {
//   return promisify(jwt.verify)(token, secret);
// };

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
    const { llaid } = req.cookies;
    if (!llaid) return;
    const decoded = await auth.verifyToken(
      llaid,
      process.env.REFRESH_TOKEN_SECRET
    );
    if (!decoded) return;
    const { id, version } = decoded;
    if (id !== user.id || version === user.tokenVersion) return;
    // at this point in the fn the user has valid id and refresh token is also valid
    // but refreshToken is of a previous version
    // create a new refresh token and store as cookie
    await createRefreshTokenAndSendCookie(user, res);
    console.log('I RAN');
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
    return next(new AppError(400, 'Invalid email or password'));

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
      // eslint-disable-next-line no-underscore-dangle
      user: { ...user._doc, password: undefined, __v: undefined }
    }
  });
};

// revoke token refreshToken
const revokeRefreshTokens = async userId => {
  console.log('i ran');
  await User.findByIdAndUpdate(userId, { $inc: { tokenVersion: 1 } });
};

const restoreRefreshToken = async (user, req, res) => {
  // FOR 1ST TIME LOGIN OR IF THE REFRESH TOKEN DOES NOT EXIST CREATE A NEW REFRESH TOKEN
  const { llaid } = req.cookies;
  if (!llaid) {
    // assign refresh token if 1st time login or cookie has expired
    await createRefreshTokenAndSendCookie(user, res);
  } else if (llaid) {
    // assign refresh token if cookie has expired
    try {
      await auth.verifyToken(llaid, process.env.REFRESH_TOKEN_SECRET);
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
exports.auth = auth;
exports.createAccessTokenAndSendCookie = createAccessTokenAndSendCookie;
exports.createRefreshTokenAndSendCookie = createRefreshTokenAndSendCookie;
exports.verifyUserExist = verifyUserExist;
exports.validateRefreshToken = validateRefreshToken;
exports.validateUserCredentialsAndRespond = validateUserCredentialsAndRespond;
exports.sendOnSuccessfulLogin = sendOnSuccessfulLogin;
exports.revokeRefreshTokens = revokeRefreshTokens;
exports.signUserWith = signUserWith;
