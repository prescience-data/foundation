import { LoggingWinston } from "@google-cloud/logging-winston"
import winston from "winston"

import env from "./env"

/**
 * Define primary transports.
 * @type {(winston.ConsoleTransportInstance | winston.FileTransportInstance)[]}
 */
const transports: (
  | winston.transports.StreamTransportInstance
  | LoggingWinston
)[] = [
  new winston.transports.Console({
    level: "debug",
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
  }),
  new winston.transports.File({
    filename: "logs/error.log",
    level: "error",
  }),
]

/**
 * Define Google Cloud logging settings.
 */
if (env && env.GOOGLE_PROJECT_ID && env.GOOGLE_LOGGING_KEYFILE) {
  transports.push(
    new LoggingWinston({
      level: env.GOOGLE_LOGGING_LEVEL || "error",
      projectId: env.GOOGLE_PROJECT_ID,
      keyFilename: env.GOOGLE_LOGGING_KEYFILE,
    })
  )
}

/**
 * Define Winston configuration.
 * @type {{transports: (winston.transports.StreamTransportInstance | LoggingWinston)[], level: *, format: Format}}
 */
const options: winston.LoggerOptions = {
  level: env.LOG_LEVEL || "info",
  format: winston.format.json(),
  transports: transports,
}

/**
 * Create logger instance.
 * @type {winston.Logger}
 */
export const logger: winston.Logger = winston.createLogger(options)

/**
 * Export default module.
 */
export default logger
