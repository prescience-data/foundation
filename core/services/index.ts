import Database from "./db"
import Environment from "./env"
import Log from "./log"

export const db = Database
export const env = Environment
export const log = Log

export default {
  db,
  env,
  log,
}
