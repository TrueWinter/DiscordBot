const Discord = require('discord.js');
exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars
// TODO: Allow you to check stats of other user
	var game;
	if (!message.author.presence.game) {
		game = 'No Game';
	} else {
		game = message.author.presence.game.name;
	}

	const embed = new Discord.RichEmbed()
		.setColor('RED')
		.setAuthor(message.author.tag, message.author.displayAvatarURL)
		.setTitle('User Info')
		.setThumbnail(message.author.displayAvatarURL)
		.addField(`User`, `${message.author.tag}`, true)
		.addField(`ID`, `${message.author.id}`, true)
		.addField(`Game`, `${game}`, true)
		.addField(`Created At`, `${message.author.createdAt.toDateString()}`, true);

	if (message.channel.type !== 'dm') {
		embed.addField(`Joined At`, `${message.member.joinedAt.toDateString()}`, true)
			.addField(`Roles`, `${message.guild.members.get(message.author.id).roles.filter(r => r.position !== 0).map(R => R.name).join(', ') || 'No Roles'}`, true); // Filter is to filter out @everyone role
	}
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
