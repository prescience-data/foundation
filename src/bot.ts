import { Browser, Page } from "puppeteer"
import { argv } from "yargs"

import { Chrome } from "./browsers"
import { getPrivacyPolicyHeadingText } from "./modules/startpage-demo"
import { storeScrape } from "./services/db"
import logger from "./services/logger"

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

  /**
   * Tip: If you have multi-step logic, you can provide the page to a class and run each step sequentially.
   *   const startpageDemo = new StartpageDemo(page)
   *   const result = await startpageDemo.getPrivacyPolicyHeadingText()
   */
  switch (command) {
    case "foobar":
      logger.error(`You haven't build this command yet!`)
      break
    case "demo":
    default:
      // Abstract your business logic to modular calls like so:
      const result = await getPrivacyPolicyHeadingText(page)
      // If a result was returned, store it in the database.
      if (result) {
        logger.info(`Saving result to database.`)
        await storeScrape(result.url, result.html)
      }
  }

  // Clean up before exit.
  await browser.close()

  // Complete!
})().then(() => {
  process.exit()
})
