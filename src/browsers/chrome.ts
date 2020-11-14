import { Browser, LaunchOptions } from "puppeteer"
import puppeteer from "puppeteer-extra"
import stealth from "puppeteer-extra-plugin-stealth"
import merge from "ts-deepmerge"

import { options } from "../config"
import logger from "../services/logger"

/**
 * Provides a chrome browser based on the users settings.
 * @return {Promise<Browser>}
 */
export const Chrome = async (
  launchOptions: LaunchOptions = {}
): Promise<Browser> => {
  // Merge any overrides provided.
  const mergedOptions: LaunchOptions = merge(options, launchOptions)
  // Before we start, let's enable the Stealth plugin.
  puppeteer.use(stealth())
  // Inform user of launch settings.
  logger.info(`Launching Chrome executable ${mergedOptions.executablePath}`)
  // Launch a new Chrome browser from settings.
  return await puppeteer.launch(mergedOptions)
}

export default Chrome
