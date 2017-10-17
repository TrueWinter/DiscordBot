# NdT3 Discord Bot

This is my first Discord bot made using [Discord.js](https://github.com/hydrabolt/discord.js).

## It currently has these features:
  - Kicking users
  - Banning users
  - Ping command
  - Eval command
  - Purge
  - Say command (says what you tell it to say)
  - Stats
  - Stopping the bot using a command
  - Testing command (Testing, testing, 1 2 3)
  - Change settings command
  - Embed command (basic, using RichEmbed)
  - Deleted message logs
  - Invite link filter
  - Web Dashboard (IT'S FINALLY HERE, in the dev version)

## Planned features!

  - ~~Music commands~~ I have decided to completely remove the `play` command and remove all future plans for music features (Found issue in [#1](https://github.com/NdT3Development/DiscordBot/issues/1) and given reasons for this decision [here](https://github.com/NdT3Development/DiscordBot/projects/1#card-4201008))

### Installation
First of all, clone this repository.

This bot requires [Node.js](https://nodejs.org/) v8+ (and npm) to run.

Also, please make a channel for mod logs in your Discord server.

Once you have that done, edit the `config.js.example` file and then rename the file to `config.js`.
### Example Configuration
#### config.js

```javascript
var config = {
  "ownerID": "123456789012345678", // Your ID here (or use `process.env.OWNERID`)
  "token": "Mxfxawx-token021kxxmkalpr-m", // Your bot token here (or use `process.env.TOKEN`)
  "defaultSettings" : {
    "prefix": "!",
    "modLogChannel": "mod-log",
    "modRole": "Moderator",
    "adminRole": "Admin",
    "welcomeChannel": "general",
    "welcomeMessage": "Welcome {{user}}!",
    "welcomeEnabled": "true",
    "inviteFilterEnabled": "true",
    "inviteWhitelist": ["discord-testers", "discord-developers"] // This can be changed, these are just defaults as an example
  },
    "dashboard" : {
    "oauthSecret": "0eFle4ArGsecret0sa", // The client secret from the Discord bot page, (you can also store this in an environmental variable)
    "callbackURL": `https://dashboard.bot-website.com/callback`, // IMPORTANT: Replace {{DOMAIN_NAME}} with the domain name of the server the bot is hosted on
    "sessionSecret": "-crazyKeyboard-qwaszxerdfcvtyghbnuijkmopl", // Go crazy on the keyboard here, this is used as a session secret, (you can also store this in an environmental variable)
    "domain": `dashboard.bot-website.com`, // Similar to the callbackURL above but this is without the protocol
    "port": "33445", // The port that it should run on, (you can also store this in an environmental variable)
  }
};

module.exports = config;
```

**It is recommended to run the dashboard with a proxy (like Nginx)**
After that, you can install the dependencies and start the bot

**You can use the command line**
```sh
$ cd DiscordBot
$ npm install
$ npm start
```
**OR** start the bot using the `linux_run.sh` for Linux or `windows_run.bat` for Windows.

>This bot must be run on a Discord bot account. Do __NOT__ try to run this on a normal user account. This is against the Discord Terms of Service.

>Also, do __NOT__ play with the `eval` or `exex` command. You have been warned.

## Contributing

Want to contribute?

NdT3 Discord Bot is written in Discord.js. If you want to add a feature or work on the code, make a pull request and if your code is good enough, I will merge the changes.

## Credits

This bot based on AnIdiotsGuide's [example bot](https://github.com/An-Idiots-Guide/guidebot) with the dashboard being based on the one [here](https://idiots-dashboard.glitch.me/) and made using [Discord.js](https://github.com/hydrabolt/discord.js)
