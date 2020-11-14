import chalk from "chalk"
import { Page } from "puppeteer"

import { ElementNotFoundError } from "../errors/scrapes"
import logger from "../services/logger"
import { whitespace } from "../utils"

/**
 * Tests the FingerprintJS Pro product demo.
 *
 * @param {Page} page
 * @param {number} delay
 * @return {Promise<Record<string, any>>}
 */
export const fingerprintjs = async (
  page: Page,
  delay = 4000
): Promise<Record<string, any>> => {
  // Load the test page.
  logger.info(`Loading fingerprintjs.com demo test...`)
  await page.goto("https://fingerprintjs.com/demo", {
    waitUntil: "networkidle2",
  })
  await page.waitForTimeout(delay)
  // Extract the result text.
  await page.waitForSelector("table.table-compact")
  const element = await page.$(
    "table.table-compact > tbody > tr:nth-child(4) > td.miriam"
  )
  if (!element) {
    throw new ElementNotFoundError(`Results Table`, element)
  }
  const result = whitespace(
    await page.evaluate((element) => element.textContent, element)
  ).toLowerCase()

  // Notify and return result.
  if (result) {
    logger.info(chalk.green(`Success! Retrieved test page.`))
    logger.info(result)
    return { result: result }
  } else {
    logger.error(chalk.red(`Failed! No results were found.`))
    return {}
  }
}

export default fingerprintjs
