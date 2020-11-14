import { Browser, LaunchOptions } from "puppeteer"
import puppeteer from "puppeteer-extra"
import stealth from "puppeteer-extra-plugin-stealth"
import merge from "ts-deepmerge"

import { log } from "../services"
import { getLaunchOptions } from "./config"
import { ExecutablePaths } from "./types"

/**
 * Provides a Brave browser based on the users settings.
 * @return {Promise<Browser>}
 */
export const BraveBrowser = async (
  launchOptions: LaunchOptions = {}
): Promise<Browser> => {
  // Inform user of browser type.
  log.info(`Booting a new Brave browser.`)
  // Merge any overrides provided.
  const defaultOptions: LaunchOptions = getLaunchOptions("Brave")
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
export const braveExecutablePaths: ExecutablePaths = {
  windows:
    "C:\\Program Files (x86)\\BraveSoftware\\Brave-Browser\\Application\\brave.exe",
  linux: "/usr/lib/brave-bin/brave",
  mac: "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
}

export default BraveBrowser
