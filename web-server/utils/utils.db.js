const AppError = require('../utils/utils.AppError');
// handler datebase errors
exports.handleDatabaseError = err => {
  switch (err.name) {
    case 'MongoError':
      if (err.code === 11000) {
        const resourceName = err.errmsg
          .match(/(natours-react)\.(\w+)/)[2]
          .split('')
          .slice(0, -1)
          .join('');
        const keyName = Object.keys(err.keyValue)[0];
        const message = `A ${resourceName} with ${keyName} "${err.keyValue[keyName]}" already exists`;
        return new AppError(400, message);
      }
      break;
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
