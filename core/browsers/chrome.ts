import { Browser, LaunchOptions } from "puppeteer"
import puppeteer from "puppeteer-extra"
import stealth from "puppeteer-extra-plugin-stealth"
import merge from "ts-deepmerge"

import { log } from "../services"
import { getLaunchOptions } from "./config"
import { BrowserLauncher, ExecutablePaths } from "./types"

/**
 * Provides a Chrome browser based on the users settings.
 * @return {Promise<Browser>}
 */
export const ChromeBrowser: BrowserLauncher = async (
  launchOptions: LaunchOptions = {}
): Promise<Browser> => {
  // Inform user of browser type.
  log.info(`Booting a new Chrome browser.`)
  // Merge any overrides provided.
  const defaultOptions: LaunchOptions = getLaunchOptions("Chrome")
  const mergedOptions: LaunchOptions = merge(defaultOptions, launchOptions)
  // Before we start, let's enable the Stealth plugin.
  puppeteer.use(stealth())
  // Inform user of launch settings.
  log.info(`Launching Chrome executable ${mergedOptions.executablePath}`)
  // Launch a new Chrome browser from settings.
  return await puppeteer.launch(mergedOptions)
}

/**
 * Provides a list of cross platform executable paths.
 *
 * @type {{linux: string, windows: string, mac: string}}
 */
export const chromeExecutablePaths: ExecutablePaths = {
  windows: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  linux: "/usr/bin/google-chrome",
  mac: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
}

export default ChromeBrowser
