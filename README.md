# Discord Self Echo Bot
This is a discord self bot aimed at echoing important messages from one channel to another in which a account has access to. Allowing the user to only monitor a single channel for messages that they deem important.

## Disclaimer
Written in the Discord API Terms Of Service, self bot's are not allowed. If they are detected, you can get banned. 

*"[...] Automating normal user accounts (generally called "self-bots") outside of the OAuth2/bot API is 
forbidden, and can result in an account termination if found."* *- quote [Discord Bots TOS](https://discordapp.com/developers/docs/topics/oauth2#bot-vs-user-accounts)*

Use this selfbot on your or any Discord account(s) at your own risk. I held no liablity if your accounts get terminated.

# Installation

This bot requires nodejs to be installed.

## Setup Configuration File
In the root directory please complete the config.hjson file by providing the following parameters:

**token:**
- In browser whilst on [discord](https://discord.com/app) open developer tools (`ctl + shift + i`)
- Navigate to network tab
- Send a message in any channel
- New inputs on network tab should appear, select one
- Search and Copy the `authorization` value under header
- Paste the value in the config.json as the token

**sourceChannel:**
- In browser whilst on [discord](https://discord.com/app) select the channel you would like to read messages from
- Right click and copy the channel ID
- Paste this value in the config.json as the `sourceChannel`

**destinationChannel:**
- In browser whilst on [discord](https://discord.com/app) select the channel you would like messages to be sent to
- Right click and copy the channel ID
- Paste this value in the config.json as the `destinationChannel`

**delayInterval**
- The delay in seconds to wait before reading messages.

**readMessages**
- The number of message to read.

**messageMustInclude:**
This is an optional single value string. Messages from `sourceChannel` must include this values string inorder to be send to `destinationChannel`

**messageAnyIncludes:**
This is an optional array of strings. Messages from `sourceChannel` must include at least one of the string values within this array inorder to be send to `destinationChannel`

## Running the bot
From terminal within the discord-selfschobot directory run the following commands,
- npm install
- npm run start

# Developer notes:
npm init

npm install discord.js
npm i discord.js-selfbot-v11
npm i discord.js-selfbot

git init
git status
git add .
git commit -m "Initial commit"

git remote add origin https://github.com/drdre-08/discord-selfechobot.git
git remote -v
git push -u origin master

// to use an offical discord bot:
https://discord.com/developers/applications create you bot generate a invite link from OAuth2 browse to invite link and add to server

git update-index --assume-unchanged config.json
git update-index --no-assume-unchanged config.json

npm install nodemon

"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node ./index.js",
    "debug": "nodemon ./index.ts"
  }

