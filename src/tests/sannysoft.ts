import chalk from "chalk"
import { Page } from "puppeteer"

import logger from "../services/logger"

/**
 * Page function to extract result from SannySoft tables.
 *
 * @return {any}
 */
const extractResultsFromPage = () => {
  // Setup local variables.
  const results: any = []
  let rows: any
  let cols: any = []
  // Query all tables.
  const tables = document.querySelectorAll("table")
  // Loop through all the tables...
  for (let i = 0; i < 3; i++) {
    if (tables[i]) {
      rows = tables[i].querySelectorAll("tr")
      // Loop through all the rows...
      rows.forEach((row: Element) => {
        // Validate and store each column...
        cols = row.querySelectorAll("td")
        if (cols[0]) {
          results.push({
            name: cols[0]
              ? cols[0].textContent.replace(/\s/g, " ").trim()
              : null,
            result: cols[1]
              ? cols[1].textContent
                  .replace(/\s/g, " ")
                  .replace(/  +/g, " ")
                  .replace(/['"]+/g, "")
                  .trim()
              : null,
          })
        }
      })
    }
  }
  return results
}

/**
 * Extracts and displays the test result from SannySoft.
 *
 * @param {Page} page
 * @return {Promise<string>}
 */
export const sannysoft = async (page: Page): Promise<Record<string, any>> => {
  // Load the test page.
  logger.info(`Loading the bot.sannysoft.com test page...`)
  await page.goto("https://bot.sannysoft.com", {
    waitUntil: "networkidle2",
  })
  // Wait for the on page tests to run.
  await page.waitForTimeout(5000)
  // Extract test results from page.
  const result = await page.evaluate(extractResultsFromPage)
  // Notify and return result.
  if (result) {
    logger.info(chalk.green(`Success! Retrieved test page.`))
    console.log({ result: result })
    return result
  } else {
    logger.error(chalk.red(`Failed! Heading text was empty.`))
    return {}
  }
}

export default sannysoft
