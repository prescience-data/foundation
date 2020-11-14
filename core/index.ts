import * as Browsers from "./browsers"
import Errors from "./errors"
import * as Services from "./services"
import Tests from "./tests"

/** Browsers **/
export const Brave = Browsers.Brave
export const Browserless = Browsers.Browserless
export const Chrome = Browsers.Chrome
export const Edge = Browsers.Edge
export const Incognition = Browsers.Incognition
export const MultiLogin = Browsers.MultiLogin

/** Services **/
export const db = Services.db
export const env = Services.env
export const log = Services.log

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
