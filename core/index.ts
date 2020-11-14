import * as Browsers from "./browsers"
import Errors from "./errors"
import * as Services from "./services"
import Tests from "./tests"

/** Browsers **/
export const Chrome = Browsers.Chrome
export const MultiLogin = Browsers.MultiLogin
export const Incognition = Browsers.Incognition
export const Browserless = Browsers.Browserless

/** Services **/
export const db = Services.db
export const log = Services.log
export const env = Services.env

/** Tests **/
export const DataDome = Tests.DataDomeTest
export const FingerprintJs = Tests.FingerprintJsTest
export const Headless = Tests.HeadlessTest
export const PixelScan = Tests.PixelScanTest
export const ReCaptcha = Tests.ReCaptchaTest
export const SannySoft = Tests.SannySoftTest

/** Errors **/
export const ElementNotFoundError = Errors.ElementNotFoundError
export const ScrapeFailedError = Errors.ScrapeFailedError
