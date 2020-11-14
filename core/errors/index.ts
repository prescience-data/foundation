import BrowserNotFound from "./browser-not-found"
import ElementNotFound from "./element-not-found"
import ScrapeFailed from "./scrape-failed"

export const BrowserNotFoundError = BrowserNotFound
export const ElementNotFoundError = ElementNotFound
export const ScrapeFailedError = ScrapeFailed

export default {
  BrowserNotFoundError: BrowserNotFound,
  ElementNotFoundError: ElementNotFound,
  ScrapeFailedError: ScrapeFailed,
}
