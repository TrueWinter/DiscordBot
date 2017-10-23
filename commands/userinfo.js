const Discord = require('discord.js');
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars

	const embed = new Discord.RichEmbed()
		.setColor('RED')
		.setAuthor(message.author.tag, message.author.displayAvatarURL)
		.setTitle('User Info')
		.setThumbnail(message.author.displayAvatarURL)
		.addField(`User`, `${message.author.tag}`, true)
		.addField(`ID`, `${message.author.id}`, true)
		.addField(`Game`, `${message.author.presence.game || 'No Game'}`, true)
		.addField(`Created At`, `${message.author.createdAt.toDateString()}`, true)
		.addField(`Joined At`, `${message.member.joinedAt.toDateString()}`, true);
	message.channel.send({ embed });
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 0
};

exports.help = {
	name: 'userinfo',
	category: 'Miscelaneous',
	description: 'Will give you stats about your Discord account',
	usage: 'userinfo'
};
