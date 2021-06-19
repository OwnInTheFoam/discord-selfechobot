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

// to use a discord self bot
ctl + shift + i in browser on discord
navigate to network tab
send a message in a channel
on the new inputs on network tab, copy authorization value under header

git update-index --assume-unchanged config.json
git update-index --no-assume-unchanged config.json

npm install nodemon

"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node ./index.js",
    "debug": "nodemon ./index.ts"
  }

