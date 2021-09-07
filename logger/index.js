const winston = require("winston");

// logger
const logger = winston.createLogger({
  level: "info",
  transports: [new winston.transports.File({ filename: "logs/error.log", level: "error" })],
});
if (process.env.NODE_ENV !== "production") {
  // log to console if we are not in production
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

module.exports = logger;
