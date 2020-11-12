# 🧱 Foundation

## What it is

<img alt="Wot..." src="https://media1.tenor.com/images/f3707787e8d0475075e7349402e97e08/tenor.gif" height="250" /> <br /><br />

This is intended as an simple entrypoint for developers new to designing Puppeteer bots.

It does not wrap existing libraries and attempt to "add" much that doesn't already exist, but starting a new project can come with a lot of questions around project structure and tooling.

This attempts to solve these, but should be considered under heavy development and subject to any manner of changes - which means definitely clone the project rather than import it.

## Installation

### 🎬 Download and init

```shell script
$ git clone 
$ npm run update # Updates the package.json file dependencies to latest versions
$ npm install # Installs dependencies
$ npm run db:init # Initialises a sqlite database
```

### 👨‍🔧 Configure
Edit the `.env` to your liking and add any services like Google Cloud logging etc.

### ⛷ Build / Run
The project is TypeScript so there are a few commands provided for this.

```shell script
$ npm run build:clean # Builds the TypeScript files
# Or...
$ npm run bot # Builds the app and runs your entrypoint file
```

<img alt="Run it!" src="https://media1.tenor.com/images/73655431879923747888a61a8850547d/tenor.gif" height="250" />

## Structure

### 🛠 Config

The project uses a `.env` in the root to define most of the common environment variables, but you can call these from a database etc if you prefer. 

The main Puppeteer options are defined in the `config.ts` file.

### 🤖 Bot

Main self executing function entry-point.

### ⚙ Business Logic

Defined in scopes within the `modules` folder. It's best to keep things neat from the start, to avoid confusing single file issues as your bot grows.

It might seem like overkill to abstract logic out at the start - which may be true for very simple bots - but you'll notice very quickly how bloated a modestly complete bot can get.

<img alt="Bloat" src="https://media1.tenor.com/images/8fc2c423280a6ae57be8660bb8898689/tenor.gif" height="250" /> <br />

### 🧰 Utils

- **rand(min: number, max: number, precision?: number)** Returns a random number from a range.
- **delay(min: number, max: number)** Shortcuts the rand method to return a options-ready object.

### 🖥 Browsers

- **Chrome** Using executable path and Stealth plugin.
- **MultiLogin** http://docs.multilogin.com/l/en/article/tkhr0ky2s6-puppeteer-browser-automation
- **Incognition** https://incogniton.com/knowledge%20center/selenium-browser-automation


### 💾 Storage

Local storage folder for switching chrome profiles.

### 📦 Database

Uses the fantastic `Prisma` with a simple `sqlite` database, but this can easily be configured for any remote RDBS or keystore database.

https://www.prisma.io/

## 🤷‍♀️Work In Progress

Any contributions on this would be much appreciated!

<img alt="Halp" src="https://media1.tenor.com/images/7cd8ad78ff0ca1e486f081094b552e3c/tenor.gif" height="250" /> <br />

- [ ] Writing `Mocha` tests
- [ ] More demos
- [ ] `Google Cloud Logging` instructions
- [ ] Define other database systems eg `Firebase`
- [ ] Containerize with `Docker`
- [ ] Write mouse movement recorder and database storage driver
- [ ] Add `ghost-cursor` demo
