import { Browser, LaunchOptions } from "puppeteer"
import puppeteer from "puppeteer-extra"
import stealth from "puppeteer-extra-plugin-stealth"
import merge from "ts-deepmerge"

import { log } from "../services"
import { getLaunchOptions } from "./config"
import { BrowserLauncher, ExecutablePaths } from "./types"

/**
 * Provides a Edge browser based on the users settings.
 * @return {Promise<Browser>}
 */
export const EdgeBrowser: BrowserLauncher = async (
  launchOptions: LaunchOptions = {}
): Promise<Browser> => {
  // Inform user of browser type.
  log.info(`Booting a new Edge browser.`)
  // Merge any overrides provided.
  const defaultOptions: LaunchOptions = getLaunchOptions("Edge")
  const mergedOptions: LaunchOptions = merge(defaultOptions, launchOptions)
  // Before we start, let's enable the Stealth plugin.
  puppeteer.use(stealth())
  // Inform user of launch settings.
  log.info(`Launching Brave executable ${mergedOptions.executablePath}`)
  // Launch a new Brave browser from settings.
  return await puppeteer.launch(mergedOptions)
}

/**
 * Provides a list of cross platform executable paths.
 *
 * @type {{linux: string, windows: string, mac: string}}
 */
export const edgeExecutablePaths: ExecutablePaths = {
  windows: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  linux: null,
  mac:
    "/Applications/Microsoft\\ Edge\\ Canary.app/Contents/MacOS/Microsoft\\ Edge\\ Canary",
}

export default EdgeBrowser
