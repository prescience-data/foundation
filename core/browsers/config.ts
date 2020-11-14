import { resolve } from "app-root-path"
import { LaunchOptions } from "puppeteer"
import merge from "ts-deepmerge"

import { env, log } from "../services"

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
  log.info(`Getting Chrome's executable path for ${os}`)
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
    case "Alpine":
    case "Ubuntu":
    case "Linux":
      return "/usr/bin/google-chrome"
  }

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
 * You can use this function in a bot script to apply overrides to the base launch options.
 *
 * @example const browser = await Chrome(makeLaunchOptions({userDataDir: "path/to/profile"})
 * @param {LaunchOptions} overrides
 * @return {LaunchOptions}
 */
export const makeLaunchOptions = (
  overrides: LaunchOptions = {}
): LaunchOptions => {
  return merge(options, overrides)
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
  executablePath: getBrowserExecutablePath(env.OS),
  userDataDir: getUserDataDir(),
  defaultViewport: defaultViewport,
}
