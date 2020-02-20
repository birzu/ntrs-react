const AppError = require('../utils/utils.AppError');

// handle duplicate key error for reviews
const handleDuplicateKeyError = err => {
  if (err.code === 11000) {
    const resourceName = err.errmsg
      .match(/(natours-react)\.(\w+)/)[2]
      .split('')
      .slice(0, -1)
      .join('');
    if (
      Object.keys(err.keyPattern).includes('_user') &&
      Object.keys(err.keyPattern).includes('_tour')
    ) {
      const message = `${resourceName} can be created twice for same tour by the user`;
      return new AppError(400, message);
    }
    const keyName = Object.keys(err.keyValue)[0];
    const message = `A ${resourceName} with ${keyName} "${err.keyValue[keyName]}" already exists`;
    return new AppError(400, message);
  }
};
// handle datebase errors
exports.handleDatabaseError = err => {
  switch (err.name) {
    case 'MongoError':
      return handleDuplicateKeyError(err);
    case 'ValidationError':
      return new AppError(
        400,
        `Invalid field values. ${err.message.match(
          /(\w+\s\w+:\s)(.*)/.exec(err.message)[2]
        )}`
      );
    default:
      return err;
  }
};
