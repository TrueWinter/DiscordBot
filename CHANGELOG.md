# Changelog
**Changelog for NdT3's Discord bot**

This changelog was introduced in bot version 5.0.0-alpha.

__Not all changes will be posted here.__

---

## Version 8.3.0:

**New Commands!**

- Cleverbot
- Expand (expands short URLs)
- Level (Checks your level (works with point))
- Loadcommand (This allows you to load a new command without having to restart the bot)
- Lockdown (Locks a channel)
- Mute (Mutes a user (prevents them from talking))
- Permlevel (Check what permission level you have)
- Points (Check how many points you have)
- Reason (Allows a moderator to update a reason for a case)
- Remindme (Set reminders. Note: these will be reset when the bot restarts or the command is reloaded)
- Role (Allows moderators or above to give roles to members)
- Shorten (Allows you to shorten a long URL)
- Tags (Allows a moderator to store responses and a user to access these using `[prefix]tag tagname`)
- Weather (Now you can check the weather from Discord)

**New Music Commands!**

Music commands were added into the bot in this update:
- Np (Allows you to check what's playing)
- Pause (Pause the current song)
- Play (Plays a song)
- Queue (Check what's coming up)
- Resume (Continue a paused song)
- Skip (Allows you to skip a song)
- Stop (Stops the music, clears the queue, and leaves the channel)

*Please note that the music features are basic. I still need to add in a check for if there is no members in a voice channel that the music bot leaves that voice channel to save memory.*

**New Features!**

- Music Commands!
- Basic level system (You get points by sending messages)
- Case numbers

**Removed Feature**

- Removed the `blockConfigEval` option from the configuration file and removed this feature.

## Version 8.2.0-dev:

Big update, changelog coming later...

## Version 7.4.3:

- Removed some code that was not removed from a change in version 7.4.0
- Fixed up the `pin` command a bit
- Some CSS changes

## Version 7.4.2:

Fixed bad code in `purge` command

## Version 7.4.1:

Fixed the dashboard expand menu button being in the wrong position

## Version 7.4.0:

- Removed `dashboard.theme` configuration option
- Added a `Change Theme` button on the dashboard
- Added Cookie Consent as the above change uses cookies

## Version 7.3.1:

Bug fix

## Version 7.3.0:

New commands!
- `8ball`: Ask a yes/no question and the 8ball will give you an answer
- `pin`: Pins a message to the channel

New configuration options
- `eightBallResponses`: You can change the 8ball responses
- `dashboard.theme`: Choose between dark or light theme dashboard

- Included light theme CSS with the code under `dashboard/public` and renamed the dark theme CSS file

## Version 7.2.0:

- Added guild ID and guild owner ID to the `serverinfo` command
- Made a small change to the `dashboard.js` file which will now give the error code if there is an error starting the dashboard
- Included the CSS for the theme used in the dashboard (`https://bootswatch.com/darkly/`) as the Bootswatch hosted version of the CSS has URL changes which break the dashboard
- Minor bug fixes

## Version 7.1.0:

- Some changes to the dashboard to fix CSS issues
- A new configuration option: `dashboard.enabled`. This allows you to disable the dashboard
- Added some code to ensure that the bot code can only be used on a bot account
- Slight update to the PRIVACY.md file

## Version 7.0.0:

"A major update? Doesn't seem so major..." This is considered a major update due to it requiring you to reset the per guild settings before being able to use a new feature. Failure to do so will result in the feature not working or the bot even crashing. You can reset the per guild settings by running the bot command `[prefix]set reset` in a guild, or if that doesn't work, stopping the bot, then deleting the entire `data` directory, then starting the bot again.

Now enough of that, let's get into this short changelog update.

- Improved `userinfo` command. You can now check the info of another user!
- New feature in the `purge` command. LOGS! That's right, you can now have a log of the messages deleted by a purge. The log is in the form of a file attached to a message in the mod-log channel and also in the console. The purge command also brought the need for a new configuration option...
- New configuration option for per guild settings: `logPurge`. This option will allow you to set whether purges should have their messages logged.  _(As always, per guild configuration changes require a per guild setting reset. I will be working on a way to automatically add new settings with an `update` command)_
- New general configuration option: `purgeLogFormat`. This allows you to control the format of purge logs.

## Version 6.4.2:

Dashboard bug fixes

## Version 6.4.1:

Fixed a bug where commands may not run if logging is disabled

## Version 6.4.0:

Some dashboard changes and new dashboard config option

## Version 6.3.0:

Guild image in front of guild name in manage settings

## Version 6.2.0:

Added guild owner on dashboard

## Version 6.1.10:

Dashboard bug fix

## Version 6.1.9:

- Added a new commands field to `stats` embed.
- Fixed a problem in the dashboard

## Version 6.1.8:

Permissions bug fix

## Version 6.1.7:

Small change

## Version 6.1.6:

 Added more logging for DMs

## Version 6.1.4:

Should probably do local tests before pushing

## Version 6.1.3:

:eyes: No one saw that

## Version 6.1.3:

Fixed a bug where DM commands are not logged to console

## Version 6.1.2:

Fixed a `userinfo` bug

## Version 6.1.1:

`say` command disabled in DMs

## Version 6.1.0:

Getting a lot of work done on this bot.

- You can now DM the bot with certain commands! _(That was harder to implement than I thought it would be)_
- Moved the `createinvite` command to the moderation category
- The `exec` and `eval` commands will now require code to run. (They will reply with a message saying that you need to give some code to run)
- `exec` command now uses the client.clean function
- Some changes in the commands to allow for them to be used in DMs
- `playingGame` configuration option now has a `{{version}}` "template string". This will be replaced with the bot version.
- A lot of changes in the `message` event... _(That was hard the hard part)_
- `client.clean` is no longer async
- Embed colour for `guildMemberRemove` event is now orange
- New commands!
	- `info`: Gives some basic bot info such as bot creator _(that's me!)_ and version numbers
	- `urban`: You don't need to leave Discord to get a definition from UrbanDictionary!
- Some new icons in the dashboard

## Version 6.0.2:

Small fix for the previous fix

## Version 6.0.1:

Small fix for something that broke the bot completely

## Version 6.0.0:

Things are going by so fast, already at bot version 6.0.0!

- Bug fixes
- `warn` command now DMs the member warned.
- Some small changes in preparation for the next version of the `warn` command
- Some more protection against leaking your token or other details
- New configuration options:
	- `playingGame`: Now you can set the game that the bot plays!
	- `blockConfigEval`: This option will try to stop you from intentionally trying to leak your configuration file when using the `eval` or `exec` commands
	- PER GUILD SETTINGS:
		- `logDeletes`: You can now control whether message deletions are logged
		- `logNewMember`: You can now control whether member joins are logged
		- `logMemberLeave`: You can now control whether members leaving are logged
	- DASHBOARD SETTINGS:
		- `protectStats`: This controls if you need to be logged in to view the bot stats
- Cleaned up the configuration file a bit
- Some changes to allow for a custom bot playing game including automatically updating when the bot leaves or joins a guild and "templates strings" for the configuration of this
- Can now log deletes to the modLogChannel depending on the setting in the configuration file
- Some changes to how the dashboard callback URL is set. Now, it is done in the code depending on the values of configuration settings
- New event added: `guildMemberRemove`: This logs when a user leaves a guild

## Version 5.1.0:

- Bug fixes
- New configuration option: `logDeletes`. This can be set to `"false"` (with the double quotes) if you do not want to log deleted messages. **You will need to run the `[prefix]set reset` command in every guild that the bot is in. This will add the new setting but will unfortunately also reset the settings for that guild**
- New commands!
	- `remindme`: Can be used to remind you of something later. NOTE: This should not be used for important reminders. A bot restart or similar will cause current reminders to be removed.
	- `serverinfo`: Gives you information about the current server.
	- `warn`: Running this command will add a warning to the mod log channel
- New events:
	- `disconnect`
	- `reconnecting`

## Version 5.0.9:

Added softban command

## Version 5.0.8:

Added privacy policy

## Version 5.0.7:

Minor bug fix

## Version 5.0.6:

Time to push the dev version to the master branch

## Version 5.0.5-alpha:

Small change in the package.json file

## Version 5.0.4-alpha:

- Some small changes to make the linter stop giving errors
- Hopefully fixed the bug where per guild settings change the settings for all guilds
- Added two new configuration options
	- `status`: You can now change the bot status to be online/idle/invisible/dnd
	- `debug`: If you have run into some issues, you can change this setting to `"true"` (yes, with the double quotes) and some debug information will be logged to console

## Version 5.0.3-alpha:

Changed the order of the CHANGELOG.md

## Version 5.0.2-alpha:

Used Eslint to fix up the code style a bit

## Version 5.0.1-alpha:

Small change involving a bot invite link on the dashboard

## Version 5.0.0-alpha:

- The system used for per guild settings was changed from `djs-collection-persistent` to `enmap` and `enmap-level`
- Some changes were done to ensure that per guild settings are used in the code where required.
- `resetup` command removed as it is not needed. The `set` has the feature that it was created for
- And `CHANGELOG.md` was created
