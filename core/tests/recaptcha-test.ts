import chalk from "chalk"
import { Page } from "puppeteer"

import { ElementNotFoundError } from "../errors"
import { log } from "../services"
import { PageLogic } from "../types"
import { whitespace } from "../utils"

/**
 * Test your Google ReCaptcha v3 score.
 *
 * @see https://antcpt.com/eng/information/demo-form/recaptcha-3-test-score.html
 * @param {Page} page
 * @param {number} delay
 * @return {Promise<Record<string, any>>}
 * @constructor
 */
export const RecaptchaTest: PageLogic = async (
  page: Page,
  delay = 6000
): Promise<Record<string, any>> => {
  // Load the test page.
  log.info(`Loading the antcpt.com ReCAPTCHA test...`)
  await page.goto(
    "https://antcpt.com/eng/information/demo-form/recaptcha-3-test-score.html",
    { waitUntil: "networkidle2" }
  )
  await page.waitForTimeout(delay)
  const element = await page.$("#score")
  if (!element) {
    throw new ElementNotFoundError(`Score`, element)
  }
  const result: string = whitespace(
    await page.evaluate((element) => element.textContent, element)
  )

  // Notify and return result.
  if (result) {
    log.info(chalk.green(`Success! Retrieved test page.`))
    result.includes("0.3") || result.includes("0.2") || result.includes("0.1")
      ? log.info(chalk.bgRed(result))
      : log.info(chalk.green(result))
    return { result: { score: result } }
  } else {
    log.error(chalk.red(`Failed! No results were found.`))
    return {}
  }
}

export default RecaptchaTest
