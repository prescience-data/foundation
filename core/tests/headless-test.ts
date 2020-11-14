import chalk from "chalk"
import { Page } from "puppeteer"

import { ElementNotFoundError } from "../errors"
import { log } from "../services"
import { PageLogic } from "../types"

/**
 * Original AreYouHeadless test by Antoine Vastel.
 *
 * @see https://arh.antoinevastel.com/bots/areyouheadless
 * @param {Page} page
 * @param {number} delay
 * @return {Promise<Record<string, any>>}
 * @constructor
 */
export const HeadlessTest: PageLogic = async (
  page: Page,
  delay = 1000
): Promise<Record<string, any>> => {
  // Load the test page.
  log.info(`Loading antoinevastel.com AreYouHeadless demo test...`)
  await page.goto("https://arh.antoinevastel.com/bots/areyouheadless", {
    waitUntil: "networkidle2",
  })
  await page.waitForTimeout(delay)
  await page.waitForSelector("#res")
  const element = await page.$("#res")
  if (!element) {
    throw new ElementNotFoundError("Result", element)
  }
  const result = await page.evaluate((element) => element.textContent, element)
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

export default HeadlessTest
