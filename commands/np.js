// Code from: https://github.com/iCrawl/Music-Bot
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  if (client.config.musicEnabled !== 'true') return message.channel.send('Music commands are disabled');
  const serverQueue = client.musicQueue.get(message.guild.id);
  
  	if (!serverQueue) return message.channel.send('There is nothing playing.');
		return message.channel.send(`🎶 Now playing: **${serverQueue.songs[0].title}**`);
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: 0
};

exports.help = {
	name: 'np',
	category: 'Music',
	description: 'Check what song is playing',
	usage: 'np'
};
