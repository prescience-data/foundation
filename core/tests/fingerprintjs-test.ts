import chalk from "chalk"
import { Page } from "puppeteer"

import { ElementNotFoundError } from "../errors"
import { log } from "../services"
import { PageLogic } from "../types"
import { whitespace } from "../utils"

/**
 * Tests the FingerprintJS Pro product demo.
 *
 * @see https://fingerprintjs.com/demo
 * @param {Page} page
 * @param {number} delay
 * @return {Promise<Record<string, any>>}
 * @constructor
 */
export const FingerprintJsTest: PageLogic = async (
  page: Page,
  delay = 3000
): Promise<Record<string, any>> => {
  // Load the test page.
  log.info(`Loading fingerprintjs.com demo test...`)
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
    log.info(chalk.green(`Success! Retrieved test page.`))
    log.info(result)
    return { result: result }
  } else {
    log.error(chalk.red(`Failed! No results were found.`))
    return {}
  }
}

export default FingerprintJsTest
