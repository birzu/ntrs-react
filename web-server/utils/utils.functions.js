const crypto = require('crypto');
// Utility functions for the app
exports.catchAsyncError = fn => (req, res, next) => {
  return fn(req, res, next).catch(next);
};

exports.randomString = (bufferLength, encoding) => {
  return crypto.randomBytes(bufferLength).toString(encoding);
};

// not secure (DO NOT USE FOR HASHING PASSWORDS)
exports.hashToken = token => {
  return crypto
    .createHash('sha512')
    .update(token)
    .digest('hex');
};

/**
 * cookieOptions: {
 * 		cookieName: String,
 * 		cookie: String,
 * 		options: {
 * 			maxAge: Number(time in ms),
 * 			secure: Boolean,
 * 			httpOnly: Boolean,
 * 		}
 * }
 */
exports.sendCookie = (res, cookieOptions) => {
  const { cookie, cookieName, options } = cookieOptions;
  res.cookie(cookieName, cookie, options);
};

exports.resetCookies = res => {
  res.cookie('access_token', '', {
    maxAge: '5',
    httpOnly: true
    // secure: req.secure || req.headers['x-forwared-proto'] === 'https'
  });
  res.cookie('rid', '', {
    maxAge: '5',
    httpOnly: true
    // secure: req.secure || req.headers['x-forwared-proto'] === 'https'
  });
};
