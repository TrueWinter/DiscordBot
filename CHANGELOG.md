# Changelog
**Changelog for NdT3's Discord bot**

This changelog was introduced in bot version 5.0.0-alpha.

__Not all changes will be posted here.__

---

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
