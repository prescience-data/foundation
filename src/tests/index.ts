import fingerprintjs from "./fingerprintjs"
import pixelscan from "./pixelscan"
import recaptcha from "./recaptcha"
import sannysoft from "./sannysoft"

export const FingerprintJS = fingerprintjs
export const PixelScan = pixelscan
export const ReCaptcha = recaptcha
export const SannySoft = sannysoft

export const tests = {
  recaptcha,
  sannysoft,
  pixelscan,
  fingerprintjs,
}

export default tests
