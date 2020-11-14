import chalk from "chalk"
import { Page } from "puppeteer"

import { ElementNotFoundError } from "../errors"
import { log } from "../services"
import { PageLogic } from "../types"
import { whitespace } from "../utils"

/**
 * Test PixelScan page.
 *
 * @see https://pixelscan.net
 * @param {Page} page
 * @param {number} delay
 * @return {Promise<Record<string, any>>}
 * @constructor
 */
export const PixelScanTest: PageLogic = async (
  page: Page,
  delay = 2000
): Promise<Record<string, any>> => {
  // Load the test page.
  log.info(`Loading pixelscan.net test...`)
  await page.goto("https://pixelscan.net", { waitUntil: "networkidle2" })
  await page.waitForTimeout(delay)
  // Extract the result element text.
  const element = await page.$("#consistency h1")
  if (!element) {
    throw new ElementNotFoundError(`Consistency Tag`, element)
  }
  // Clean the text.
  const result = whitespace(
    await page.evaluate((element) => element.textContent, element)
  )
  // Notify and return result.
  if (result) {
    log.info(chalk.green(`Success! Retrieved test page.`))
    log.info(result)
    return { result: result }
  } else {
    log.error(chalk.red(`Failed! No results were found.`))
    return {}
  }
}

export default PixelScanTest
