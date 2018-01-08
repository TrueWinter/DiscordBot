# NdT3 Discord Bot

This is my first Discord bot made using [Discord.js](https://github.com/hydrabolt/discord.js).

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/a53801bdb675456da9c9e0f5794d26f5?branch=dev-branch)](https://www.codacy.com/app/NdT3Development/DiscordBot?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=NdT3Development/DiscordBot&amp;utm_campaign=Badge_Grade)

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
  - Web Dashboard
  - Music Commands (Code from: https://github.com/iCrawl/Music-Bot)

## Upcoming Features

- Change of database

### Installation
First of all, clone this repository.

This bot requires [Node.js](https://nodejs.org/) v8+ (and npm) to run.

Also, please make a channel for mod logs in your Discord server.

Once you have that done, edit the `config.js.example` file and then rename the file to `config.js`. Make sure the callback URL specified is in the format of `{{http|https}}{{domain_name}}/callback` (Examples: `https://dashoard.bot-website.com/callback` OR `http://dashboard.bot-website.com/callback` OR `http://localhost:33445/callback`). This should be the public URL (proxied URL (by something like Nginx) is recommended).

![Bot Application](https://i.imgur.com/sechKvg.png)

### Example Configuration

#### config.js

```javascript
/* eslint-disable */
var config = { // NOTE: DO NOT LEAVE ANYTHING BLANK
	// ALL settings are strings. Do NOT just use true or false, use these in strings such as 'true' or 'false'. This is due to how some code works when changing the settings
	ownerID: '123456789012345678', // Your ID here
	token: 'Mxfxawx-token021kxxmkalpr-m', // Your bot token here
	status: 'dnd', // Bot status [online/idle/invisible/dnd]
	debug: 'false', // This is used to output some debug info if needed. The token will be in the console and other information could be in the console
	playingGame: '{{prefix}}help | {{guilds}} guilds | v{{version}}', // The game you want the bot to play. {{prefix}} is replaced with the default prefix below, {{guilds}} is replaced with the guild count and {{version}} is replaced with the bot version. Leave blank to disable
	purgeLogFormat: '\n Message ID: {{mID}} | Message Timestamp: {{mTS}} | Content: {{mC}} \n', // {{mID}}: Message ID; {{mTS}} Message Timestamp; {{mC}}: Message Content;
	eightBallResponses: ['Yes', 'No', 'Certainly', 'My sources say yes', 'Try again later', 'Without a doubt', 'Better not to tell you now'], // An array of responses for the 8ball command
	cleverbotToken: 'CC-3824abc', // API Token for CleverBot
  googleAPIToken: 'AI-241scsc', // Used for link shortener and music features. You need to have these APIs enabled.
  logTimeFormat: 'D MMM YYYY HH:mm:ss ZZ',
  musicEnabled: 'true',
	defaultSettings: {
		prefix: '!',
		modLogChannel: 'mod-log',
		modRole: 'Moderator',
		adminRole: 'Admin',
		welcomeChannel: 'general',
		welcomeMessage: 'Welcome {{user}}!',
		welcomeEnabled: 'false',
		inviteFilterEnabled: 'false',
		inviteWhitelist: ['discord-testers', 'discord-developers'], // This can be changed, these are just defaults as an example
		facepalms: 'false', // If enabled, the bot will reply with the facepalm emoji whenever a message contains 'facepalm'
		swearFilter: 'false',
		swearWords: ['damn'], // An array of swear words. These should be lowercase. (of course, I have not included much for certain reasons...)
		logDeletes: 'true',
		logNewMember: 'true',
		logMemberLeave: 'true',
		logCommandUsage: 'true',
		logPurge: 'true',
		sendHelp: 'channel' // Available options: channel, dm
	},
	dashboard: {
		enabled: 'true', // This setting controls whether the dashboard is enabled or not.
		oauthSecret: '0eFle4ArGsecret0sa', // The client secret from the Discord bot page
		secure: 'false', // HTTPS: 'true' for true, 'false' for false
		sessionSecret: '-crazyKeyboard-qwaszxerdfcvtyghbnuijkmopl', // Go crazy on the keyboard here, this is used as a session secret
		domain: 'dashboard.bot-website.com', // Domain name (with port if not running behind proxy running on port 80). Example: 'domain': 'dashboard.bot-website.com' OR 'domain': 'localhost:33445'
		port: '33445', // The port that it should run on
		invitePerm: '536079575',
		protectStats: 'false',
		borderedStats: 'false', // Controls whether stats in the dashboard should have a border or not
		legalTemplates: {
			contactEmail: 'support@dashboard.bot-website.com', // This email will be used in the legal page of the dashboard if someone needs to contact you for any reason regarding this page
			lastEdited: '18 November 2017' // Change this if you update the `TERMS.md` or `PRIVACY.md` files in `dashboard/public/`
		}
	}
};

module.exports = config;
```

In the config file above, the callbackURL would be set by the code to `https://dashboard.bot-website.com/callback`.

**It is recommended to run the dashboard with a proxy (like Nginx)**

#### Nginx Configuration

```
server {
    listen 80;

    server_name dashboard.bot-website.com;

    location / {
        proxy_pass http://127.0.0.1:33445;
    }
}
```

After that, you can install the dependencies and start the bot

**You can use the command line**
```sh
$ cd DiscordBot
$ npm install
$ npm start
```
**OR** start the bot using the `linux_run.sh` for Linux or `windows_run.bat` for Windows. _These files may be outdated._

**NOTE:** Running the bot with a process manager (like PM2) is recommended.

>This bot must be run on a Discord bot account. Do __NOT__ try to run this on a normal user account. This is against the Discord Terms of Service.

>Also, do __NOT__ play with the `eval` or `exex` command. You have been warned.

## Changes to the Code

You may change code if needed under the following conditions:

For the dashboard, you may change the theme, wording, design, links, etc. however I will not accept any bug reports coming from this. You will also agree to **not remove the copyright notice in the footer. You may add your name here, however, you must keep the original wording used**.

**ALL** copyright notices and credits **must** be kept as is, not edited in any way and not removed.

## Contributing

Want to contribute?

NdT3 Discord Bot is written in Discord.js. If you want to add a feature or work on the code, feel free make a pull request and your code might be accepted.

## Credits

- Bot based on AnIdiotsGuide's [example bot](https://github.com/An-Idiots-Guide/guidebot).
- Dashboard based on the one [here](https://idiots-dashboard.glitch.me/).
- Made using [Discord.js](https://github.com/hydrabolt/discord.js).
- The music part of the bot is based on [this bot](https://github.com/iCrawl/Music-Bot).

## Privacy:

Please read the `PRIVACY.md` file.

## License:

Please read the `LICENSE` file
