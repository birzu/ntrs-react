const { handleDatabaseError } = require('../utils/utils.db');
// configure how errors are handled in dev and prod env
const handleErrorProd = (err, res) => {
  if (err.operationalError) {
    const { status, statusCode, message } = err;
    return res.status(statusCode).json({
      status,
      message
    });
  }
  const status = 'fail';
  const statusCode = 500;
  res.status(statusCode).json({
    status,
    message:
      'Something wrong happened while processing request, please try again'
  });
};

const handleErrorDev = (err, res) => {
  const statusCode = err.statusCode || 500;
  const status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
  const message =
    err.message ||
    'Something went wrong while processing request, please try again';
  res.status(statusCode).json({
    status,
    message,
    error: err
  });
};

// global error handler middleware
module.exports = (err, req, res, next) => {
  const error = handleDatabaseError(err);
  switch (process.env.NODE_ENV) {
    case 'development':
      handleErrorDev(err, res);
      break;
    case 'production':
      handleErrorProd(error, res);
      break;
    default:
      handleErrorProd(error, res);
  }
};
