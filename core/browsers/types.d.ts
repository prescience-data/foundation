import { Browser } from "puppeteer"

export type BrowserLauncher = (arg_0?: any, arg_1?: any) => Promise<Browser>

export interface Settings extends Record<string, any> {
  profileId: string
  port?: number
}

export interface ExecutablePaths extends Record<string, any> {
  windows: string | null
  mac: string | null
  linux: string | null
}

export type BrowserList =
  | "Chrome"
  | "Brave"
  | "Edge"
  | "Browserless"
  | "Incognition"
  | "MultiLogin"

export type OSList =
  | "Mac"
  | "OSX"
  | "Darwin"
  | "Windows"
  | "Windows_NT"
  | "Linux"
  | "Ubuntu"
  | "Alpine"
