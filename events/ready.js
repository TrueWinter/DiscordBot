/* global wait */
module.exports = async client => {
	// Why await here? Because the ready event isn't actually ready, sometimes
	// guild information will come in *after* ready. 1s is plenty, generally,
	// for all of them to be loaded.
	await wait(1000);

	client.appInfo = await client.fetchApplication();
	setInterval(async () => {
		client.appInfo = await client.fetchApplication();
	}, 60000);

	require('../modules/dashboard')(client);


	var cMembers = client.users.filter(u => u.id !== '1').size; // Get's number of members cached. (Filters out Clyde)
	var gCount = client.guilds.size;
	// Both `wait` and `client.log` are in `./modules/functions`.
	client.log('log', `Logged into '${client.user.tag}' (${client.user.id}). Ready to serve ${cMembers} users in ${gCount} guilds.`, 'Ready!');

	// Ensure that any guild added while the bot was offline gets a default configuration.
	//client.guilds.forEach(guild => client.settings.set(guild.id, client.config.defaultSettings));
	var game = client.config.playingGame.replace('{{prefix}}', client.config.defaultSettings.prefix).replace('{{guilds}}', gCount);
	client.user.setPresence({ status: client.config.status, game: { name: game, type: 0 } });
};
