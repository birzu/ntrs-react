const winston = require('winston');
// LOGGER (use transport console if running on docker else use file transport)
const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console({
      level: 'info',
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
});

logger.stream = {
  write: info => {
    logger.info(info);
  }
};

module.exports = logger;
