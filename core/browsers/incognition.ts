import { Browser } from "puppeteer"
import puppeteer from "puppeteer-extra"
import stealth from "puppeteer-extra-plugin-stealth"

import { log } from "../services"
import { Settings } from "./types"

/**
 * Provides an Incognition browser instance.
 * Connects to a CDP socket, so browser must be running prior to bot.
 *
 * @see https://incogniton.com/knowledge%20center/selenium-browser-automation
 * @param {Settings} settings
 * @return {Promise<Browser>}
 */

export const IncognitionBrowser = async (
  settings: Settings
): Promise<Browser> => {
  // Tip: You will need to heavily configure Stealth's settings to avoid override your Incognition settings.
  puppeteer.use(stealth())
  // Inform user of launch settings.
  log.info(`Connecting to Incognition on ${settings.port || 35000}`)
  // Connect to a running browser.
  return await puppeteer.connect({
    browserWSEndpoint: await getIncognitionWebSocket(settings),
    defaultViewport: null,
  })
}

/**
 * Retrieves a CDP websocket from a running MultiLogin browser.
 * @param {Settings} settings
 * @return {Promise<string>}
 */
export const getIncognitionWebSocket = async (
  settings: Settings
): Promise<string> => {
  return `http://localhost:${
    settings.port || 35000
  }/automation/launch/puppeteer/${settings.profileId}`
}

export default IncognitionBrowser
