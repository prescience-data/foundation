import { LaunchOptions } from "puppeteer"

import env from "./services/env"
import logger from "./services/logger"

/**
 * Default user agent string.
 * @todo Retrieve latest from npm package.
 * @type {string}
 */
export const defaultUserAgent: string =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.193 Safari/537.36"
/**
 * Default screen size.
 * @todo Resolve this from config.
 * @type {{width: number, height: number}}
 */
export const defaultViewport = { width: 1366, height: 768 }

/**
 * Retrieves the browser executable path required in launch options.
 *
 * @param {"OSX" | "Darwin" | "Windows" | "Windows_NT" | "Linux" | "Ubuntu" | "Alpine" | string} os
 * @return {string}
 */
export const getBrowserExecutablePath = (
  os?:
    | "OSX"
    | "Darwin"
    | "Windows"
    | "Windows_NT"
    | "Linux"
    | "Ubuntu"
    | "Alpine"
    | string
): string => {
  logger.info(`Getting Chrome's executable path for ${os}`)
  os = os ? os : env.OS
  if (!os) {
    if (env.BROWSER_EXEC_PATH) {
      return env.BROWSER_EXEC_PATH
    }
    throw new Error(`No browser exec path or os was defined.`)
  }
  switch (os) {
    case "OSX":
    case "Darwin":
      return "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
    case "Windows":
    case "Windows_NT":
      return "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
    case "Linux":
    case "Alpine":
    case "Ubuntu":
      return "/usr/bin/google-chrome"
  }

  throw new Error(`Could not resolve an executable path for ${os}.`)
}

/**
 * Provides the launch options for Puppeteer.
 * @type {LaunchOptions}
 */
export const options: LaunchOptions = {
  headless: env.BROWSER_HEADLESS === "true",
  ignoreHTTPSErrors: true,
  args: [
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--disable-sync",
    "--ignore-certificate-errors",
    "--user-agent=" + defaultUserAgent,
    "--lang=en-US,en;q=0.9",
  ],
  executablePath: getBrowserExecutablePath(env.OS || "win10"),
  userDataDir: "../storage/profiles/default",
  defaultViewport: defaultViewport,
}
