import chalk from "chalk"
import { ElementHandle, Page } from "puppeteer"

import logger from "../services/logger"
import { delay } from "../utils"

/**
 * Extracts the heading from the Privacy Policy page of `startpage.com`.
 *
 * @param {Page} page
 * @return {Promise<string>}
 */
export const getPrivacyPolicyHeadingText = async (
  page: Page
): Promise<string> => {
  // As a short demo, let's visit a website.
  logger.info(`Loading the startpage.com website as a demo...`)
  await page.goto("https://www.startpage.com/", { waitUntil: "networkidle2" })

  // Find privacy policy link and click.
  logger.info(`Searching for the privacy policy link.`)
  const privacyPolicyElement: ElementHandle<Element> | null = await page.$(
    `div.footer-home a[href="https://www.startpage.com/en/privacy-policy/"]`
  )

  // Abort if not found.
  if (!privacyPolicyElement) {
    throw new Error(`Could not find privacy policy link.`)
  }

  // Scroll to the element.
  // TODO: Provide example of a proper scroll-to function to avoid sending on page script.

  // Click the link.
  await privacyPolicyElement.click(delay(5, 10))

  // Wait for the next page to load.
  await page.waitForNavigation({ waitUntil: "networkidle2" })

  // Get the heading element text from the Privacy Policy page.
  const heading: string = (
    await page.evaluate(() => {
      const h1 = document.querySelector("h1")
      return h1 ? h1.innerHTML : "null"
    })
  ).toString()

  // Notify and return result.
  if (heading) {
    logger.info(chalk.green(`Success! Retrieved heading text: ${heading}`))
    return heading
  } else {
    logger.error(chalk.red(`Failed! Heading text was empty.`))
    return ""
  }
}

/**
 * An empty example of a different piece of logic.
 *
 * @param {Page} page
 * @return {Promise<boolean>}
 */
export const someTruthyCheck = async (page: Page): Promise<boolean> => {
  const element = await page.$(`div#doesNotExist`)

  return !!element
}

/**
 * Build a simple container for multi-page steps.
 *
 * @param {Page} page
 * @return {{getPrivacyPolicyHeadingText: Promise<string>}}
 * @constructor
 */
export class StartpageDemo {
  constructor(protected readonly page: Page) {}

  async getPrivacyPolicyHeadingText(): Promise<string> {
    return await getPrivacyPolicyHeadingText(this.page)
  }

  async someTruthyCheck(): Promise<boolean> {
    return await someTruthyCheck(this.page)
  }
}
