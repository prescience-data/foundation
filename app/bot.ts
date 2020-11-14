import chalk from "chalk"
import { Browser, Page } from "puppeteer"
import { argv } from "yargs"

import { Chrome } from "../core/browsers"
import { ElementNotFoundError, ScrapeFailedError } from "../core/errors"
import { log } from "../core/services"
import { storeScrape } from "./database/scrapes"
import { getPrivacyPolicyHeadingText } from "./modules/startpage-demo"

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

  // Specify an optional command via the cli: npm run bot -- --command=demo
  const command = `${argv.command}`

  try {
    /**
     * Tip: If you have multi-step logic, you can provide the page to a class and run each step sequentially.
     *   const startpageDemo = new StartpageDemo(page)
     *   const result = await startpageDemo.getPrivacyPolicyHeadingText()
     */
    switch (command) {
      case "foobar":
        log.error(`You haven't build this command yet!`)
        break
      case "demo":
      default:
        // Abstract your business logic to modular calls like so:
        const result = await getPrivacyPolicyHeadingText(page)
        // If a result was returned, store it in the database.
        if (result) {
          log.info(`Saving result to database.`)
          await storeScrape(result.url, result.html)
        }
    }
  } catch (err) {
    // Notify of any critical errors. Note that because we typed our errors, we can see what caused it.
    if (err instanceof ElementNotFoundError) {
      log.error(chalk.red(`Test failed due to a missing element on page.`))
    } else if (err instanceof ScrapeFailedError) {
      log.error(chalk.red(`Scrape failed due to missing target output.`))
    } else {
      log.error(
        chalk.bgRed.white(`Encountered an unexpected error while running test.`)
      )
    }
    log.error(err.message)
  }

  // Clean up before exit.
  await browser.close()

  // Complete!
})().then(() => {
  process.exit()
})