exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const scoreLevel = client.points.get(`${message.guild.id}-${message.author.id}`).level || 0;
  !scoreLevel ? message.channel.send('You have no levels yet.') : message.channel.send(`You are currently level ${scoreLevel}!`);
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: 0
};

exports.help = {
	name: 'level',
	category: 'Fun',
	description: 'Well, let\'s see how many levels you have!',
	usage: 'level'
};
