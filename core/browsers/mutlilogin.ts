import * as http from "http"

import { Browser } from "puppeteer"
import puppeteer from "puppeteer-extra"
import stealth from "puppeteer-extra-plugin-stealth"

import { log } from "../services"
import { Settings } from "./types"

/**
 * Provides a MultiLogin browser instance.
 * Connects to a CDP socket, so browser must be running prior to bot.
 *
 * @see http://docs.multilogin.com/l/en/article/tkhr0ky2s6-puppeteer-browser-automation
 * @param {Settings} settings
 * @return {Promise<Browser>}
 */
export const MultiLoginBrowser = async (
  settings: Settings
): Promise<Browser> => {
  // Tip: You will need to heavily configure Stealth's settings to avoid override your MultiLogin settings.
  puppeteer.use(stealth())
  // Inform user of launch settings.
  log.info(`Connecting to Incognition on ${settings.port || 35000}`)
  // Connect to a running browser.
  return await puppeteer.connect({
    browserWSEndpoint: await getMultiLoginWebSocket(settings),
    defaultViewport: null,
  })
}

/**
 * Retrieves a CDP websocket from a running MultiLogin browser.
 * @param {Settings} settings
 * @return {Promise<string>}
 */
export const getMultiLoginWebSocket = (settings: Settings): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      if (settings.profileId) {
        const endpoint = `http://127.0.0.1:${
          settings.port || 35000
        }/api/v1/profile/start?automation=true&puppeteer=true&profileId=${
          settings.profileId
        }`
        http
          .get(endpoint, (response) => {
            let data = ""
            response.on("data", (chunk) => {
              data += chunk
            })
            response.on("end", () => {
              let ws
              try {
                ws = JSON.parse(data)
              } catch (err) {
                reject(err)
              }
              if (typeof ws === "object" && ws.hasOwnProperty("value")) {
                resolve(ws.value)
              }
            })
          })
          .on("error", (err) => {
            reject(err)
          })
      } else {
        reject(new Error("No MultiLogin profile provided"))
      }
    } catch (err) {
      reject(err)
    }
  })
}

export default MultiLoginBrowser
