import { resolve } from "app-root-path"
import { LaunchOptions } from "puppeteer"
import merge from "ts-deepmerge"

import BrowserNotFoundError from "../errors/browser-not-found"
import { env, log } from "../services"
import { braveExecutablePaths } from "./brave"
import { chromeExecutablePaths } from "./chrome"
import { edgeExecutablePaths } from "./edge"
import { ExecutablePaths, OSList } from "./types"

/**
 * Default screen size.
 * @type {{width: number, height: number}}
 */
export const defaultViewport = {
  width: parseInt(env.BROWSER_WIDTH || "1366"),
  height: parseInt(env.BROWSER_HEIGHT || "768"),
}

/**
 * Retrieves the browser executable path required in launch options.
 *
 * @param {"Chrome" | "Brave" | "Edge"} browser
 * @param {"Mac" | "OSX" | "Darwin" | "Windows" | "Windows_NT" | "Linux" | "Ubuntu" | "Alpine" | string} os
 * @return {string}
 */
export const getBrowserExecutablePath = (
  browser: "Chrome" | "Brave" | "Edge" = "Chrome",
  os?: OSList | string
): string => {
  os = os ? os : `${env.OS}`
  log.info(`Getting ${browser}'s executable path for ${os}`)
  if (!os) {
    if (env.BROWSER_EXEC_PATH) {
      return env.BROWSER_EXEC_PATH
    }
    throw new BrowserNotFoundError(browser, os)
  }

  // Load the cross-platform executable paths for the selected browser.
  let paths: ExecutablePaths
  switch (browser) {
    case "Brave":
      paths = braveExecutablePaths
      break
    case "Edge":
      paths = edgeExecutablePaths
      break
    case "Chrome":
    default:
      paths = chromeExecutablePaths
  }

  // Switch through possible OS values to find an executable path.
  switch (os) {
    case "Mac":
    case "OSX":
    case "Darwin":
      if (paths.mac) {
        return paths.mac
      }
      break
    case "Windows":
    case "Windows_NT":
      if (paths.windows) {
        return paths.windows
      }
      break
    case "Alpine":
    case "Ubuntu":
    case "Linux":
      if (paths.linux) {
        return paths.linux
      }
      break
  }

  // If we cannot resolve an executable path, abort.
  throw new Error(`Could not resolve an executable path for ${os}.`)
}

/**
 * Builds the launch arguments set.
 * You can import this for use in a primary build script when making launch options.
 *
 * @param {string[]} overrides
 * @return {string[]}
 */
export const getLaunchArgs = (overrides: string[] = []): string[] => {
  // Define initial recommended arguments.
  let args: string[] = [
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--disable-sync",
    "--ignore-certificate-errors",
  ]
  // Add custom user agent if defined.
  if (env.BROWSER_USER_AGENT) {
    args.push(`--user-agent=${env.BROWSER_USER_AGENT}`)
  }
  // Set locale information.
  args.push(`--lang=${env.BROWSER_LANG || "en-US,en;q=0.9"}`)
  // Apply any overrides provided.
  args = args.concat(overrides)
  // Return the final argument set.
  return args
}

/**
 * Use this function to resolve a user profile directory in the storage folder for a provided profile name.
 * Generally you would store your profile ids/names in a database to call them when needed.
 * This is not required for anti-detect browsers such as MultiLogin etc as they handle their own isolation.
 *
 * @param {string} id
 * @return {string}
 */
export const getUserDataDir = (id = "default"): string => {
  return resolve(`storage/profiles/${id}`)
}

/**
 * Provides the launch options for Puppeteer.
 *
 * @type {LaunchOptions}
 */
export const options: LaunchOptions = {
  headless: env.BROWSER_HEADLESS === "true",
  ignoreHTTPSErrors: true,
  args: getLaunchArgs(),
  userDataDir: getUserDataDir(),
  defaultViewport: defaultViewport,
}

/**
 * Builds the launch options for a specific browser.
 *
 * @param {"Chrome" | "Brave" | "Edge"} browser
 * @param {"Mac" | "OSX" | "Darwin" | "Windows" | "Windows_NT" | "Linux" | "Ubuntu" | "Alpine"} os
 * @return {LaunchOptions}
 */
export const getLaunchOptions = (
  browser: "Chrome" | "Brave" | "Edge" = "Chrome",
  os?:
    | "Mac"
    | "OSX"
    | "Darwin"
    | "Windows"
    | "Windows_NT"
    | "Linux"
    | "Ubuntu"
    | "Alpine"
): LaunchOptions => {
  return merge(options, {
    executablePath: getBrowserExecutablePath(browser, os),
  })
}
