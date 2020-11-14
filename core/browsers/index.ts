import BrowserNotFoundError from "../errors/browser-not-found"
import BraveBrowser from "./brave"
import BrowserlessBrowser from "./browserless"
import ChromeBrowser from "./chrome"
import EdgeBrowser from "./edge"
import IncognitionBrowser from "./incognition"
import MultiLoginBrowser from "./mutlilogin"
import * as Types from "./types"

export const Brave = BraveBrowser
export const Browserless = BrowserlessBrowser
export const Chrome = ChromeBrowser
export const Edge = EdgeBrowser
export const Incognition = IncognitionBrowser
export const MultiLogin = MultiLoginBrowser

export const BrowserLauncher = (
  browser: Types.BrowserList | string
): Types.BrowserLauncher => {
  switch (browser) {
    case "Chrome":
      return ChromeBrowser
    case "Brave":
      return BraveBrowser
    case "Edge":
      return EdgeBrowser
    case "Browserless":
      return BrowserlessBrowser
    case "Incognition":
      return IncognitionBrowser
    case "MultiLogin":
      return MultiLoginBrowser
  }
  // If no valid browser was selected, abort.
  throw new BrowserNotFoundError(browser)
}
