import { Browser, Page } from "puppeteer"

import Chrome from "./browsers/chrome"
import { getPrivacyPolicyHeadingText } from "./modules/startpage-demo"
import DB from "./services/db"
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

  // Abstract your business logic to modular calls like so:
  const result = await getPrivacyPolicyHeadingText(page)
  /**
   * Tip: If you have multi-step logic, you can provide the page to a class and run each step sequentially.
   *   const startpageDemo = new StartpageDemo(page)
   *   const result = await startpageDemo.getPrivacyPolicyHeadingText()
   */

  // If a result was returned, store it in the database.
  if (result) {
    logger.info(`Saving result to database.`)
    DB.scrape.create({
      data: {
        url: "https://www.startpage.com/en/privacy-policy/",
        html: result,
      },
    })
  }

  // Clean up before exit.
  await browser.close()

  // Complete!
})().then(() => {
  process.exit()
})
