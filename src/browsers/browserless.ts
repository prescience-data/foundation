import { Browser } from "puppeteer"
import puppeteer from "puppeteer-extra"
import stealth from "puppeteer-extra-plugin-stealth"

import env from "../services/env"
import logger from "../services/logger"

/**
 * Connects to a Browserless websocket.
 * Must provide a valid token either directly or in .env variables.
 *
 * @see https://docs.browserless.io/
 * @param {string} token
 * @return {Promise<Browser>}
 * @constructor
 */
export const BrowserlessBrowser = async (token?: string): Promise<Browser> => {
  // Install the Stealth plugin.
  puppeteer.use(stealth())
  // Generate a value websocket url string.
  const endpoint = getBrowserlessWebSocket(token)
  // Inform user of launch settings.
  logger.info(`Connecting to Browserless endpoint ${endpoint}`)
  // Connect to a running browser.
  return await puppeteer.connect({
    browserWSEndpoint: endpoint,
    defaultViewport: null,
  })
}

/**
 * Constructs a websocket url string for Browserless.
 *
 * @param {string} token
 * @return {string}
 */
export const getBrowserlessWebSocket = (token?: string): string => {
  token = token ? token : `${env.BROWSERLESS_TOKEN}`
  return `wss://chrome.browserless.io?token=${token}`
}

export default BrowserlessBrowser
