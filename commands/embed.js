const Discord = require('discord.js');
exports.run = (client, message, args) => {
	var m = args.join(' ');
	if (!m) return message.reply('Need content for the embed...');
	const embed = new Discord.RichEmbed()
		.setDescription(m)
		.setColor([114, 137, 218]);
	message.channel.send({ embed });
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 2
};

exports.help = {
	name: 'embed',
	category: 'Miscelaneous',
	description: 'Embeds something',
	usage: 'embed [description]'
};
