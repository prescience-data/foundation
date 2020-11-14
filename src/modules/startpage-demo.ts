import chalk from "chalk"
import { ElementHandle, Page } from "puppeteer"

import { ElementNotFoundError, ScrapeFailedError } from "../errors/scrapes"
import logger from "../services/logger"
import { ScrapeResult } from "../types"
import { delay } from "../utils"

/**
 * Extracts the heading from the Privacy Policy page of `startpage.com`.
 *
 * @param {Page} page
 * @return {Promise<string>}
 */
export const getPrivacyPolicyHeadingText = async (
  page: Page
): Promise<ScrapeResult> => {
  const targetUrl = "https://www.startpage.com/en/privacy-policy/"
  // As a short demo, let's visit a website.
  logger.info(`Loading the startpage.com website as a demo...`)
  await page.goto("https://www.startpage.com/", { waitUntil: "networkidle2" })

  // Find privacy policy link and click.
  logger.info(`Searching for the privacy policy link.`)
  const privacyPolicyElement: ElementHandle<Element> | null = await page.$(
    `div.footer-home a[href="${targetUrl}"]`
  )

  // Abort if not found.
  if (!privacyPolicyElement) {
    throw new ElementNotFoundError("Privacy Policy", privacyPolicyElement)
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
    return {
      url: "https://www.startpage.com/en/privacy-policy/",
      html: heading,
    }
  } else {
    logger.error(chalk.red(`Failed! Heading text was empty.`))
    throw new ScrapeFailedError(targetUrl, heading)
  }
}

/**
 * Build a simple container for multi-page steps.
 *
 * @param {Page} page
 * @return {{getPrivacyPolicyHeadingText: Promise<string>}}
 * @constructor
 */
export class StartpageDemo {
  /**
   * Storage for scraping results.
   *
   * @type {ScrapeResult[]}
   */
  public results: ScrapeResult[] = []

  /**
   * Constructor
   *
   * @param {Page} page
   */
  constructor(protected readonly page: Page) {}

  /**
   * Perform the function then return self to allow chaining.
   *
   * @example await startpageDemo.getPrivacyPolicyHeadingText().hasMoreThanOneResult() => false
   * @return {Promise<StartpageDemo>}
   */
  public async getPrivacyPolicyHeadingText(): Promise<StartpageDemo> {
    const result: ScrapeResult = await getPrivacyPolicyHeadingText(this.page)
    if (result) {
      this.results.push(result)
    }
    return this
  }

  /**
   * Random demo truthy style check.
   *
   * @return {boolean}
   */
  public hasMoreThanOneResult(): boolean {
    return this.results.length > 1
  }
}
