// Error class for global error handler
class AppError extends Error {
  constructor(statusCode, message, errorName = null) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.operationalError = true;
    this.errorName = errorName;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
