import { CDPSession, Page } from "puppeteer"

/**
 * Produces a random number between two numbers.
 * Can be set to float bu setting the third constructor item.
 *
 * @param {number} start
 * @param {number} end
 * @param {number} fractionDigits
 * @return {string}
 */
export const rand = (start: number, end: number, fractionDigits = 0) => {
  if (start > end) {
    throw new Error(`${start} is larger than ${end}.`)
  }
  return parseFloat(
    (Math.random() * (end - start) + start).toFixed(fractionDigits)
  )
}

/**
 * Shortcut to creating a simple options object with the delay param set.
 *
 * @param {number} start
 * @param {number} end
 * @return {{delay: number}}
 */
export const delay = (start: number, end?: number) => {
  return { delay: rand(start, end || start) }
}

/**
 * Makes a raw CDP call to retrieve the the object id for a particular item.
 *
 * @todo Clean this up.
 * @param {Page} page
 * @param {string} path
 * @return {Promise<any>}
 */
export const getNodeFor = async (page: Page, path: string): Promise<any> => {
  const cdp: CDPSession = await page.target().createCDPSession()
  const { result: nodeObject } = (await cdp.send("Runtime.evaluate", {
    expression: `document.querySelector('${path}')`,
  })) as { result: any }
  return nodeObject
}
