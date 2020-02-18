const { promisify } = require('util');
const jwt = require('jsonwebtoken');

// Auth class for creating and verifying different auth tokens
class Auth {
  // tokenOptions { tokenType, { expiresIn, ...otherOptions}}
  constructor(secret = '') {
    this.secret = secret;
  }

  createToken(payload, tokenOptions) {
    const { tokenType, expiresIn } = tokenOptions;
    const refreshTokenSecret = this.secret
      ? this.secret
      : process.env.REFRESH_TOKEN_SECRET;
    const accessTokenSecret = this.secret
      ? this.secret
      : process.env.ACCESS_TOKEN_SECRET;
    if (tokenType === 'refresh') {
      return promisify(jwt.sign)(payload, refreshTokenSecret, {
        expiresIn
      });
    }
    if (tokenType === 'access') {
      return promisify(jwt.sign)(payload, accessTokenSecret, {
        expiresIn
      });
    }
  }

  // default access token creator
  createAccessToken(payload) {
    return this.createToken(payload, {
      tokenType: 'access',
      expiresIn: '15m'
    });
  }

  // default refresh token creator
  createRefreshToken(payload) {
    return this.createToken(payload, {
      tokenType: 'refresh',
      expiresIn: '15d'
    });
  }

  // token validator
  verifyToken(token, secret) {
    return promisify(jwt.verify)(token, secret);
  }
}

module.exports = Auth;
