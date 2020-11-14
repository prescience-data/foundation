import chalk from "chalk"

import { log } from "../services"
import * as Errors from "./index"

export const CoreErrorHandler = (err: Error): void => {
  if (err instanceof Errors.ElementNotFoundError) {
    log.error(
      chalk.red(
        `Test failed due to a missing element on page. \n Check your page logic methods to determine why.`
      )
    )
  }

  if (err instanceof Errors.BrowserNotFoundError) {
    log.error(
      chalk.red(
        `Browser could not be found, check your OS in your env file. \n This is generally due to Node not picking it up automatically.`
      )
    )
  }

  if (err instanceof Errors.ScrapeFailedError) {
    log.error(
      chalk.red(
        `Your scrape failed because no data was returned at termination. \n Check your page logic methods to determine why.`
      )
    )
  }

  log.error(err.message)

  console.log(err)
}

export default CoreErrorHandler
