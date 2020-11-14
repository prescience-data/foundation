import { Browser, Page } from "puppeteer"
import { argv } from "yargs"

import { Chrome } from "../../core/browsers"
import { log } from "../../core/services"
import coreTests from "../../core/tests"
import myTests from "./index"

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

  // Get the  cli args.
  const test = `${argv.page}`

  // Run the selected coreTests, fallback to SannySoft.
  switch (test) {
    case "fingerprintjs":
      await coreTests.FingerprintJsTest(page)
      break
    case "datadome":
      await coreTests.DataDomeTest(page)
      break
    case "headless":
      await coreTests.HeadlessTest(page)
      break
    case "pixelscan":
      await coreTests.PixelScanTest(page)
      break
    case "recaptcha":
      await coreTests.ReCaptchaTest(page)
      break
    case "sannysoft":
      await coreTests.SannySoftTest(page)
      break
    default:
      await myTests.DemoTest(page)
  }

  // Notify user of completion.
  log.info(`Test completed, closing browser.`)

  // Clean up before exit.
  await browser.close()

  // Complete!
})().then(() => {
  process.exit()
})
