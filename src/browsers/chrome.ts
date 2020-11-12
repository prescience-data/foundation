import { Browser } from "puppeteer"
import puppeteer from "puppeteer-extra"
import stealth from "puppeteer-extra-plugin-stealth"

import { options } from "../config"
import logger from "../services/logger"

/**
 * Provides a chrome browser based on the users settings.
 * @return {Promise<Browser>}
 */
export const Chrome = async (): Promise<Browser> => {
  // Before we start, let's enable the Stealth plugin.
  puppeteer.use(stealth())
  // Inform user of launch settings.
  logger.info(`Launching Chrome executable ${options.executablePath}`)
  // Launch a new Chrome browser from settings.
  return await puppeteer.launch(options)
}

export default Chrome
