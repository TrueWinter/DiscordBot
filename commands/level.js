const Discord = require('discord.js');
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
	const scoreLevel = client.points.get(`${message.guild.id}-${message.author.id}`).level || 0;
	let embed = new Discord.RichEmbed()
	.setColor('GREEN')
	.setAuthor('You are currently')
	.setDescription(scoreLevel)
	.setFooter(client.user.username, client.user.avatarURL)
    !scoreLevel ? message.channel.send('You have no levels yet.') : message.channel.send(embed);
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
