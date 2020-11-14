import chalk from "chalk"
import { Page } from "puppeteer"

import { ElementNotFoundError } from "../../core/errors"
import { log } from "../../core/services"
import { PageLogic } from "../../core/types"
import { whitespace } from "../../core/utils"

/**
 * As an example test, let's test your browser's headers...
 *
 * @see https://headers.cf
 * @param {Page} page
 * @return {Promise<Record<string, any>>}
 * @constructor
 */
export const DemoTest: PageLogic = async (
  page: Page
): Promise<Record<string, any>> => {
  // Load the test page.
  log.info(`Loading headers.cf demo test...`)
  await page.goto("https://headers.cf/?raw")
  const element = await page.$("body")
  if (!element) {
    throw new ElementNotFoundError(`Body`, element)
  }
  const headers: string = whitespace(
    await page.evaluate((element) => element.textContent, element)
  )
  if (!headers) {
    throw new ElementNotFoundError("Headers", headers)
  }
  // Split the headers string to an array.
  const result: string[] = headers
    .split("\n")
    .filter((header: string) => !!header)

  // Notify and return result.
  if (result) {
    log.info(chalk.green(`Success! Retrieved test page.`))
    for (let i = 0; i < result.length; i++) {
      if (result[i]) {
        log.debug(result[i])
      }
    }
    return { result: result }
  } else {
    log.error(chalk.red(`Failed! No results were found.`))
    return {}
  }
}

export default DemoTest
