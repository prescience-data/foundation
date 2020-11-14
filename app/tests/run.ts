import { Page } from "puppeteer"
import { argv } from "yargs"

import { BrowserLauncher } from "../../core/browsers"
import { log } from "../../core/services"
import { banner } from "../../core/services/log"
import coreTests from "../../core/tests"
import { ErrorHandler } from "../errors/hander"
import myTests from "./index"

;(async () => {
  /**
   * This is our main bot entry point.
   * Configuration should occur within your .env file or manually in the config.ts file.
   * See the browsers folder for additional browsers.
   */
  try {
    banner()

    const browser = await BrowserLauncher(
      argv.browser ? `${argv.browser}` : "Chrome"
    )()
    // Now lets resolve a page instance.
    const page: Page = await browser.newPage()

    // Get the  cli args.
    const test = `${argv.page}`

    // Run the selected tests, fallback to the demo test.
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
      case "demo":
      default:
        await myTests.DemoTest(page)
    }

    // Notify user of completion.
    log.info(`Test completed, closing browser.`)

    // Clean up before exit.
    await browser.close()
  } catch (err) {
    // Notify of any critical errors.
    ErrorHandler(err)
  }

  // Complete!
})().then(() => {
  process.exit()
})
