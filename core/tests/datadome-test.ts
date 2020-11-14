import chalk from "chalk"
import { Page } from "puppeteer"

import { ElementNotFoundError } from "../errors"
import { log } from "../services"
import { PageLogic } from "../types"

/**
 * Interact with the DataDome homepage and test for captcha.
 *
 * @see https://datadome.co
 * @param {Page} page
 * @param {number} delay
 * @return {Promise<Record<string, any>>}
 * @constructor
 */
export const DataDomeTest: PageLogic = async (
  page: Page,
  delay = 1000
): Promise<Record<string, any>> => {
  // Load the test page.
  log.info(`Loading datadome.co demo test...`)
  await page.goto("https://datadome.co", { waitUntil: "networkidle2" })
  await page.waitForTimeout(delay)
  const button = await page.$("#menu-item-18474")
  if (!button) {
    throw new ElementNotFoundError("Menu Button", button)
  }
  await button.click({ delay: 10 })
  await page.waitForNavigation({ waitUntil: "networkidle2" })
  await page.waitForTimeout(500)
  const result = !!(await page.$(
    `iframe[src^="https://geo.captcha-delivery.com/captcha/"]`
  ))
  await page.waitForTimeout(1000)
  // Notify and return result.
  if (result) {
    log.info(chalk.green(`Success! Retrieved test page.`))
    log.info(`Hit DataDome captcha? ${result}`)
    return { result: result }
  } else {
    log.error(chalk.red(`Failed! No results were found.`))
    return {}
  }
}

export default DataDomeTest
