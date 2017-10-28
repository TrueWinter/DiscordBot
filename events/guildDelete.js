// This event executes when a new guild (server) is left.

module.exports = (client, guild) => {
	// Well they're gone. Let's remove them from the settings!
	client.log('log', `Left guild ${guild.name} (${guild.id})`, 'GUILD');
	client.settings.delete(guild.id);

	var gCount = client.guilds.size;
	var game = client.config.playingGame.replace('{{prefix}}', client.config.defaultSettings.prefix).replace('{{guilds}}', gCount);
	client.user.setPresence({ status: client.config.status, game: { name: game, type: 0 } });
};
