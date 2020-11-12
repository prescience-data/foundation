# 🧱 Foundation - Puppeteer Bot Starter Kit

## What it is?

<img alt="Wot..." src="https://media1.tenor.com/images/f3707787e8d0475075e7349402e97e08/tenor.gif" height="250" /> <br /> 

`Foundation` is intended as a simple entry-point / template for developers new to designing [Puppeteer](https://pptr.dev) bots.

It uses the (in)famous [Puppeteer-Extra](https://github.com/berstend/puppeteer-extra) package as the primary Puppeteer driver to enable its library of `Stealth` plugins and evasions.

> ✊ PS: If you're working on botting and looking for a great developer community, check out the Puppeteer-Extra discord server: https://discord.gg/vz7PeKk 

It does not wrap existing libraries or attempt to "add" much that doesn't already exist, but starting a new project with an unfamiliar library can come with a lot of questions around project structure and tooling.

This attempts to solve these issues with a ready-to-go scaffolding, however it should be noted that the structure is _just, like, my opinion man..._, considered under heavy flux - this shouldn't matter though, because it's just a starting point and you should take it in whatever direction makes sense.


## Installation

### 🎬 Download and init

```bash
$ git clone https://github.com/prescience-data/foundation.git && cd ./foundation # Clone the project
$ npm install -g typescript sqlite3 npx # Optional, install these if you need them
$ npm run update # Updates the package.json file dependencies to latest versions
$ npm install # Installs dependencies
$ npm run db:init # Initialises a sqlite database
```

### 👨‍🔧 Configure
Edit the `.env` to your liking and add any services like `Google Cloud Logging` etc.

### ⛷ Build / Run
The project is TypeScript so there are a few commands provided for this.

```bash
$ npm run build:clean # Just build the TypeScript files
# Or...
$ npm run bot # Builds the app and runs your entrypoint file
```

<img alt="Run it!" src="https://media1.tenor.com/images/73655431879923747888a61a8850547d/tenor.gif" height="250" />

## Project Structure

### 🛠 Config

> src/config.ts
> .env

The project uses a `.env` in the root to define most of the common environment variables, but you can call these from a database etc if you prefer. 

The main Puppeteer `LaunchOptions` are defined in the `config.ts` file.

### 🤖 Bot

> src/bot.ts

Main self executing function entry-point. 

This is where you execute each part of your scoped logic from the `modules` section cleanly.

### ⚙ Business Logic

> src/modules/<name>.ts 

Your bot logic should be defined in clear logical scopes within the `src/modules` folder. It's best to keep things neat and abstracted from the start, to avoid huge, confusing single files as your bot grows.

It might seem like overkill to abstract logic out at the start _(which may be true for very simple bots)_ but you'll notice very quickly how bloated a modestly complete bot can get.

<img alt="Bloat" src="https://media1.tenor.com/images/8fc2c423280a6ae57be8660bb8898689/tenor.gif" height="250" /> <br />

### 🧰 Utils

> src/utils.ts

- **rand(min: number, max: number, precision?: number)** Returns a random number from a range.
- **delay(min: number, max: number)** Shortcuts the rand method to return a options-ready object.

### 🖥 Browsers

> src/browsers/<browser>.ts

- **Chrome** Using executable path and [Stealth](https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth) plugin.
- **MultiLogin** http://docs.multilogin.com/l/en/article/tkhr0ky2s6-puppeteer-browser-automation
- **Incognition** https://incogniton.com/knowledge%20center/selenium-browser-automation


### 💾 Storage

> storage/profiles/<uuid>

Local storage folder for switching Chrome profiles.

### 📦 Database

> src/services/db.ts
> prisma/schema.prisma

Uses the fantastic [Prisma](https://www.prisma.io) database abstraction library with a simple `sqlite` database, but this can easily be configured for any local or remote RDBS or keystore database.

https://www.prisma.io/

##### Commands
```shell script
$ npm run db:init # Wipes the database and regenerates types and migrations
$ npm run db:migrate # Creates migrations
$ npm run db:migrate:refresh # Long version of init
$ npm run db:generate # Generates fresh prisma files
```

##### Example
```ts
import DB from "./services/db"
;(async () => {

// Bot execution code...

// If a result was returned, store it in the database.
if (result) {
 DB.scrape.create({
  data: {
    url: "https://www.startpage.com/en/privacy-policy/",
    html: result,
  },
 })
}

})()
```

### Logging

> src/services/logger.ts

Uses [Winston](https://github.com/winstonjs/winston) to handle logging and output. Can but configured to transport to console, file, or third-party transport like `Google Cloud Logging` (provided).

Check the docs here to extend or configure transports / switch out completely. 

- **Winston** https://github.com/winstonjs/winston
- **Google Cloud Logging** https://cloud.google.com/logging/docs
- **Bugsnag** https://docs.bugsnag.com/platforms/javascript/ 

## 🤷‍♀️Work In Progress

Any contributions on this would be much appreciated!

<img alt="Halp!" src="https://media1.tenor.com/images/7cd8ad78ff0ca1e486f081094b552e3c/tenor.gif" height="250" /> <br />

- [ ] Writing `Mocha` tests
- [ ] More demos!
- [ ] `Google Cloud Logging` instructions
- [ ] Define other database systems eg `Firebase`
- [ ] Containerize with `Docker`
- [ ] Write mouse movement recorder and database storage driver
- [ ] Add `ghost-cursor` to demo
- [ ] Apply optional world isolation
