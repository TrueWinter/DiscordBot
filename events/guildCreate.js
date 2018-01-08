// This event executes when a new guild (server) is joined.

module.exports = (client, guild) => {
	// We need to add this guild to our settings!
	wait(1000); // eslint-disable-line no-undef
	client.log('log', `Joined guild ${guild.name} (${guild.id})`, 'GUILD');
	client.settings.set(guild.id, client.config.defaultSettings);

	var gCount = client.guilds.size;
	var game = client.config.playingGame.replace('{{prefix}}', client.config.defaultSettings.prefix).replace('{{guilds}}', gCount);
	client.user.setPresence({ status: client.config.status, game: { name: game, type: 0 } });
};
