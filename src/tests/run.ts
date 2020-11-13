import { Browser, Page } from "puppeteer"
import { argv } from "yargs"

import Chrome from "../browsers/chrome"
import logger from "../services/logger"
import tests from "./index"

;(async () => {
  /**
   * This is our main bot entry point.
   * Configuration should occur within your .env file or manually in the config.ts file.
   * See the browsers folder for additional browsers.
   */

  // Launch a Chrome browser based on our options.
  const browser: Browser = await Chrome()

  // Now lets resolve a page instance.
  const page: Page = await browser.newPage()

  const test: string = `${argv.page}`

  // Run the selected tests, fallback to SannySoft.
  switch (test) {
    case "pixelscan":
      await tests.pixelscan(page)
      break
    case "recaptcha":
      await tests.recaptcha(page)
      break
    case "sannysoft":
    default:
      await tests.sannysoft(page)
  }

  // Notify user of completion.
  logger.info(`Test completed, closing browser.`)

  // Clean up before exit.
  await browser.close()

  // Complete!
})().then(() => {
  process.exit()
})
