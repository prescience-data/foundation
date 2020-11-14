# 🧱 Foundation - Puppeteer Bot Starter Kit

## What it is?

<img alt="Wot..." src="https://media1.tenor.com/images/f3707787e8d0475075e7349402e97e08/tenor.gif" width="350" /> <br /> 

`Foundation` is intended as a simple entry-point / template for developers new to designing [Puppeteer](https://pptr.dev) bots.

It uses the (in)famous [Puppeteer-Extra](https://github.com/berstend/puppeteer-extra) package as the primary `Puppeteer` driver to enable its library of `Stealth` plugins and evasions.

> 👋 PS: If you're working on botting and looking for a great developer community, check out the `Puppeteer-Extra` Discord server: https://discord.gg/vz7PeKk 

`Foundation` tries to avoid wrapping existing libraries and does not "add" much that doesn't already exist, but starting a new project with an unfamiliar library can come with a lot of questions around project structure and tooling.

This attempts to solve these issues with a ready-to-go scaffolding, however it should be noted that the structure is _just, like, my opinion man..._ and considered under heavy flux.

However, breaking changes shouldn't matter, because its only intended as a starting point and you should take it in whatever direction makes sense.

#### _"Ok, but I've come from Selenium / Python?"_
If you're new to both modern JavaScript (`ES6` & `TypeScript`) _and_ `Puppeteer`, here's a quick rundown: 

📚 [Newbie Guide To Scraping With Puppeteer](https://github.com/berstend/puppeteer-extra/wiki/Newbie-Guide-To-Scraping-With-Puppeteer)

## Installation

> ⚠ Note for Windows users:
> This project does not include `cross-env`, so using [WSL](https://docs.microsoft.com/en-us/windows/wsl/install-win10) and [Terminal Preview](https://www.microsoft.com/en-au/p/windows-terminal-preview/9n8g5rfz9xk3?rtc=1) are essentially a requirement. 

### 🎬 Download and init

#### Automatic
```shell script
$ git clone https://github.com/prescience-data/foundation.git && cd ./foundation # Clone the project
$ npm run init
```
#### Manual
The automatic version essentially runs the following commands:
```shell script
$ git clone https://github.com/prescience-data/foundation.git && cd ./foundation # Clone the project
$ npm run update  # Updates the package.json file dependencies to latest versions
$ npm install --loglevel=error # Installs dependencies
$ npm run db:init # Initialises a sqlite database
$ npm run build:clean # Build the TypeScript code
```

### 👨‍🔧 Configure
Edit the `.env` to your liking and add any services like `Google Cloud Logging` etc.

> ⚠ Remember to .gitignore your .env file before committing to any public repositories.

### ⛷ Build / Run
The project is [TypeScript](https://www.typescriptlang.org) so there are a few commands provided for this.

```shell script
$ npm run build:clean # Just build the TypeScript files
# Or...
$ npm run bot # Builds the app and runs your entrypoint file
```

<img alt="Run it!" src="https://media1.tenor.com/images/73655431879923747888a61a8850547d/tenor.gif" width="350" />

## Project Structure

The project is split into two distinct parts, `core` and `app`.

This allows you to develop a quasi-framework that you can re-use between projects in the `Core` concern, while keeping all project-specific code within the `App` concern.

### 🛠 Config

> `core/config.ts`

> `.env`

The project uses a `.env` in the root to define most of the common environment variables, but you can call these from a database etc if you prefer. 

The main Puppeteer `LaunchOptions` are defined in the `config.ts` file.

### 🤖 Bot

> `app/bot.ts`

Main self-executing function entry-point. 

This is where you execute each part of your scoped logic from the `modules` section cleanly. 

Make some magic happen 🧙✨...

<img alt="Evil plan" src="https://media1.tenor.com/images/639cc3c3ea7d5e1b757683ef6d071b5e/tenor.gif" width="350" />


You call this module from the cli with:

```shell script
$ npm run bot
```

#### Cli Arguments
You may wish to add cli arguments to direct the code in specific directions:

```shell script
$ npm run bot -- --command=<CommandName>
```

Or if you prefer to shortcut your cli further you can add to your `package.json` scripts:

```json
{
  "scripts": {
    "bot:moon-prism-power": "npm run bot -- --command=moon-prism-power"
  }
}
```

```shell script
$ npm run bot:moon-prism-power ✨✨✨✨
```

### ⚙ Business Logic

> `app/modules/<name>.ts`

Your bot logic should be defined in clear logical scopes within the `src/modules` folder. It's best to keep things neat and abstracted from the start to avoid huge, confusing, single-file blobs as your bot grows.

It might seem like overkill to abstract logic out at the start _(which may be true for very simple bots)_, but you'll notice very quickly how bloated a modestly complete bot can get.

<img alt="Bloat" src="https://media1.tenor.com/images/8fc2c423280a6ae57be8660bb8898689/tenor.gif" width="350" /> <br />

### 👨‍🔬 Detection Tests

> `core/tests/<name>.ts`

A large part of building your bot is rapidly testing it against known detection code. 

Long-term, you'll want to develop your own internal tests by de-obfuscating the vendor code of your target, however for rapid early development, using hosted ones is fine.

You can use the existing detection tests provided, or build your own using the basic template provided.

#### Example
```typescript
export const PixelScan: PageLogic = async (page: Page): Promise<Record<string, any>> => {
  // Load the test page.  
  await page.goto("https://pixelscan.net", { waitUntil: "networkidle2" })
  await page.waitForTimeout(1500)
  // Extract the result element text.
  const element = await page.$("#consistency h1")
  if (!element) {
    throw new ElementNotFoundError(`Heading Tag`, element)
  }
  const result = (
    await page.evaluate((element) => element.textContent, element)
  ).replace(/\s/g, " ").trim()
  // Notify and return result.
  return { result: result }
}
```

> 🧠 If you add new tests remember to add them to the `index.ts` index to allow you to import all tests together if needed, and main `run.ts` file to allow cli access.

<img alt="Very sneaky, sir." src="https://media1.tenor.com/images/1a1848dfc49207af73a827a63d37d244/tenor.gif" width="350" />

#### Running Detection Tests
To run your tests, use the command:
```shell script
$ npm run tests -- --page=sannysoft
```

#### Available Tests

- [**DataDome**](https://datadome.co) `npm run tests -- --page=datadome`
- [**FingerprintJS Pro**](https://fingerprintjs.com/demo) `npm run tests -- --page=fingerprintjs`
- [**AreYouHeadless**](https://arh.antoinevastel.com/bots/areyouheadless) `npm run tests -- --page=headless`
- [**PixelScan**](https://pixelscan.net) `npm run tests -- --page=pixelscan`
- [**ReCAPTCHA**](https://antcpt.com/eng/information/demo-form/recaptcha-3-test-score.html) `npm run tests -- --page=recaptcha`
- [**SannySoft**](https://bot.sannysoft.com) `npm run tests -- --page=sannysoft`

### 🧰 Utils

> `core/utils.ts`

Aim to keep all your small, highly re-used utility functions in a single place.

- **rand(min: number, max: number, precision?: number)** Returns a random number from a range.
- **delay(min: number, max: number)** Shortcuts the rand method to return a options-ready object.
- **whitespace(value: string)** Strips all duplicate whitespace and trims the string.

### 🖥 Browsers

> `core/browsers/<browser>.ts`

#### Regular Browsers
All regular browsers are auto-loaded with the [Stealth](https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth) plugin.
- **Chrome** Using executable path. https://www.google.com/intl/en_au/chrome/
- **Brave** Using executable path. https://brave.com/
- **Edge** Using executable path. _(Not available on Linux hosts)_ https://www.microsoft.com/en-us/edge
#### Fancy Browsers
- **Browserless** https://docs.browserless.io/
- **MultiLogin** http://docs.multilogin.com/l/en/article/tkhr0ky2s6-puppeteer-browser-automation
- **Incognition** https://incogniton.com/knowledge%20center/selenium-browser-automation


<img alt="Surfin' the web" src="https://media.tenor.com/images/94a163a123b2c7e58ad94b331dadbaab/tenor.gif" width="350" />

#### Examples
##### Chrome
```typescript
  // Using Chrome via the executable.
  import Chrome from "./browsers" 
  const browser: Browser = await Chrome() 
  const page: Page = await browser.newPage()
```
##### MultiLogin
```typescript
  // Using MultiLogin with a profile id.
  import MultiLogin from "./browsers" 
  const browser: Browser = await MultiLogin({ profileId: "fa3347ae-da62-4013-bcca-ef30825c9311"}) 
  const page: Page = await browser.newPage()
```
##### Browserless
```typescript
  // Using Browserless with an api token.
  import Browserless from "./browsers" 
  const browser: Browser = await Browserless(env.BROWSERLESS_TOKEN) 
  const page: Page = await browser.newPage()
```

### 💾 Storage

> `storage/profiles/<uuid>`

Local storage folder for switching Chrome profiles.

### 📦 Database

> `core/services/db.ts`

> `prisma/schema.prisma`

Uses the fantastic [Prisma](https://www.prisma.io) database abstraction library with a simple `sqlite` database, but this can easily be configured for any local or remote RDBS or keystore database.

https://www.prisma.io

#### Commands
```shell script
$ npm run db:init # Wipes the database and regenerates types and migrations
$ npm run db:migrate # Creates migrations
$ npm run db:migrate:refresh # Long version of init
$ npm run db:generate # Generates fresh prisma files
```

#### Example
```typescript
import { db } from "../core/services"
;(async () => {

// Bot execution code...

// If a result was returned, store it in the database.
if (result) {
 db.scrape.create({
  data: {
    url: "https://www.startpage.com/en/privacy-policy/",
    html: result,
  },
 })
}

})()
```

Additionally, you can build out shortcut methods in the `database` folder to DRY out common database transactions.

```typescript
/**
 * Basic Prisma abstraction for a common task.
 *
 * @param {string} url
 * @param {string} data
 * @return {Promise<void>}
 */
export const storeScrape = async (
  url: string,
  data: string | Record<string, any>
): Promise<void> => {
  // Flatten any objects passed in.
  if (typeof data !== "string") {
    data = JSON.stringify(data)
  }
  // Store the data.
  db.scrape.create({
    data: {
      url: url,
      data: data,
    },
  })
}
```

### 📃 Logging

> `core/services/logger.ts`

Uses [Winston](https://github.com/winstonjs/winston) to handle logging and output. Can but configured to transport to console, file, or third-party transport like `Google Cloud Logging` (provided).

Check the docs here to extend or configure transports / switch out completely. 

- **Winston** https://github.com/winstonjs/winston
- **Google Cloud Logging** https://cloud.google.com/logging/docs
- **Bugsnag** https://docs.bugsnag.com/platforms/javascript/ 


## Tooling

The project comes preconfigured with the following tooling to keep your code neat and readable. Make sure to configure your IDE to pick up the configs.

- **Prettier** 
  - https://prettier.io
  - https://github.com/prettier/prettier
  - https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode

- **ESLint** 
  - https://eslint.org
  - https://github.com/eslint/eslint
  - https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
  - https://www.digitalocean.com/community/tutorials/linting-and-formatting-with-eslint-in-vs-code


## Work In Progress

🤷‍♀️Any contributions on this would be much appreciated!

<img alt="Halp!" src="https://media1.tenor.com/images/7cd8ad78ff0ca1e486f081094b552e3c/tenor.gif" width="350" /> <br />

- [ ] Writing `Mocha` tests
- [ ] More demos!
- [ ] `Google Cloud Logging` instructions
- [ ] Define other database systems eg `Firebase`
- [ ] Containerize with `Docker`
- [ ] Write mouse movement recorder and database storage driver
- [ ] Add `ghost-cursor` to demo
- [ ] Apply optional world isolation
- [ ] Add emojis to logger
