// Error class for global error handler
class AppError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.operationalError = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
