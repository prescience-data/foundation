import chalk from "chalk"
import { Page } from "puppeteer"

import logger from "../services/logger"
import { whitespace } from "../utils"

/**
 * Test your recaptcha score.
 *
 * @param {Page} page
 * @return {Promise<string>}
 */
export const recaptcha = async (page: Page): Promise<Record<string, any>> => {
  // Load the test page.
  logger.info(`Loading the antcpt.com ReCAPTCHA test...`)
  await page.goto(
    "https://antcpt.com/eng/information/demo-form/recaptcha-3-test-score.html",
    { waitUntil: "networkidle2" }
  )
  await page.waitForTimeout(6000)
  const element = await page.$("#score")
  if (!element) {
    throw new Error(`Could not find score element.`)
  }
  const result: string = whitespace(
    await page.evaluate((element) => element.textContent, element)
  )

  // Notify and return result.
  if (result) {
    logger.info(chalk.green(`Success! Retrieved test page.`))
    result.includes("0.3") || result.includes("0.2") || result.includes("0.1")
      ? logger.info(chalk.bgRed(result))
      : logger.info(chalk.green(result))
    return { result: { score: result } }
  } else {
    logger.error(chalk.red(`Failed! No results were found.`))
    return {}
  }
}

export default recaptcha
