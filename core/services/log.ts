import { LoggingWinston } from "@google-cloud/logging-winston"
import chalk from "chalk"
import winston, { Logger } from "winston"

import env from "./env"

/**
 * Define primary transports.
 * @type {(winston.ConsoleTransportInstance | winston.FileTransportInstance)[]}
 */
const transports: (
  | winston.transports.StreamTransportInstance
  | LoggingWinston
)[] = [
  new winston.transports.Console({
    level: "debug",
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
  }),
  new winston.transports.File({
    filename: "logs/error.log",
    level: "error",
  }),
]

/**
 * Define Google Cloud logging settings.
 */
if (env && env.GOOGLE_PROJECT_ID && env.GOOGLE_LOGGING_KEYFILE) {
  transports.push(
    new LoggingWinston({
      level: env.GOOGLE_LOGGING_LEVEL || "error",
      projectId: env.GOOGLE_PROJECT_ID,
      keyFilename: env.GOOGLE_LOGGING_KEYFILE,
    })
  )
}

/**
 * Define Winston configuration.
 * @type {{transports: (winston.transports.StreamTransportInstance | LoggingWinston)[], level: *, format: Format}}
 */
const options: winston.LoggerOptions = {
  level: env.LOG_LEVEL || "info",
  format: winston.format.json(),
  transports: transports,
}

/**
 * Create logger instance.
 * @type {winston.Logger}
 */
export const log: winston.Logger = winston.createLogger(options)

/**
 * Provide a banner for cli.
 * @type {string}
 */
export const banner = (): Logger =>
  log.debug(
    chalk.magentaBright(`

:--:::::::+://:::::::::::/:+::/s+/://so++ooooo+/::/:::/++/+++++o+++++osoo///////
:-::::::::o/:/::///:::////+//+oss://+o\`\`\`\`.\`\`\`.o/:+o::/++++/++++++++++oo+/-/////
:::::::::/+/+/////::/:o///oo++o:s+oo//\`\`\`\`\`\`\`\`.+/ooo//+ooo+/++++++++o++o++://///
:::::::::+/++/////::/+oo++oo//+-:/:+/.\`\`\`\`\`\`\`\`.+o+-::/++ss/+++///++/+oo++++o++//
:::::::::/oo/o+//o://ooo/o++//++:-\`\`.\`\`\`\`\`\`\`\`\`---\`:/+/-+/o++s+//++//+s++/++o+///
/::::::::/oo+++//+/://+:/-.--/yhhyo-\`\`\`\`\`\`\`\`\`\`\`.:osss/:/+///+//+o++++o+o++++o/::
/:::::::/+//++s+//++//+//-.-sm+.\`\`.s:\`\`\`\`\`\`\`\`\`-ys/-:+dh--:/+++++//+oo+/+o++++o:/
/:::::::+//++++yoo+/://..--yN/\`\`\`\`\`-h\`\`\`\`\`\`\`\`-d/\`\`\`\`\`:Ny-:ooo+++++soo+o+/+o+++/-
/:::::-///++//++++/..-/\`\`.:Nh\`\`\`\`\`\`\`h.\`\`\`\`\`\`\`s+\`\`\`\`\`\`\`md-..:--:o+++//o/+o++o++o/
/:-..-::+++/+++++/:-..::\`\`.o/\`\`\`\`\`\`\`-\`\`\`\`\`\`\`\`+\`\`\`\`\`\`\`\`hy.../.-\`+///::/+/+o++oo+o
..-:://++//+++/o///-/\`::\`\`\`...--\`\`\`\`\`\`\`\`.\`\`\`\`\`\`\`\`-...\`-.\`\`::-:\`+///.-:+://o+/+o+
:///+/////o+//o////:/-.::\`\`\`...\`.---..\`\`..\`\`\`..---....\`\`\`.-:.////::-.-/+::/o+/+o
:::+/::/++///+//::..-/:+/\`\`\`\`\`\`\`oyyo+++++++++++sys.\`\`\`\`\`\`/:://:::::::--/:::/o+/+
--+/:-/++///++:-...://///-\`\`\`\`\`.ysoooooooooooooosh.\`\`\`\`\`:+//::::::::::::+:::/o+/
/+/--:++///++-..-:////////-.\`\`\`\`+ooooooooooooooooo\`\`\`\`\`://///:::::::::::+/:::/o/
+:--://////+...:////////:...-.\`\`\`/oooooooooooooo/.\`\`.-//////..-.--:::::::+::::/o
:--:/:////+.\`-:////////-\`..-///:-..:/+ooooooo+:.\`.-:////////..::-----::::o:::::+
--//-:///+-\`-::::////:-..://///////.....--...-:://////:::::::-.-:::::--::+/:::::
-//--://+/-\`-:::---...-:///////////\`\`........\`/////::::::::::::-.--::-..:/+:::::
//---://+::------:::://///:/::////-\`\`\`\`\`\`\`\`\`\`\`:/::::::::::::::::::--.-:///o:::::                                                                                       



 .d888                                888          888    d8b                   
d88P"                                 888          888    Y8P                   
888                                   888          888                          
888888 .d88b.  888  888 88888b.   .d88888  8888b.  888888 888  .d88b.  88888b.  
888   d88""88b 888  888 888 "88b d88" 888     "88b 888    888 d88""88b 888 "88b 
888   888  888 888  888 888  888 888  888 .d888888 888    888 888  888 888  888 
888   Y88..88P Y88b 888 888  888 Y88b 888 888  888 Y88b.  888 Y88..88P 888  888 
888    "Y88P"   "Y88888 888  888  "Y88888 "Y888888  "Y888 888  "Y88P"  888  888 
                                                                                

`)
  )

/**
 * Export default module.
 */
export default log
