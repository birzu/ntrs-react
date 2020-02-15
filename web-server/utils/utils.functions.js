// Utility functions for the app
exports.catchAsyncError = fn => (req, res, next) => {
  return fn(req, res, next).catch(next);
};
