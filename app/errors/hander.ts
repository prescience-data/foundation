import chalk from "chalk"

import CoreErrorHandler from "../../core/errors/hander"
import { log } from "../../core/services"
import * as Errors from "./index"

export const ErrorHandler = (err: Error): void => {
  if (err instanceof Errors.DemoFailedError) {
    log.error(
      chalk.red(
        `This is a demo error handler. \n Use this section to provide rich feedback before dumping the error.`
      )
    )
  }

  CoreErrorHandler(err)
}
