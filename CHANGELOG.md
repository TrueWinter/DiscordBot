# Changelog
**Changelog for NdT3's Discord bot**

This changelog was introduced in bot version 5.0.0-alpha.

__Not all changes will be posted here.__

---

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
