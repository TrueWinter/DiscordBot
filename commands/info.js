const Discord = require('discord.js');

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
	const embed = new Discord.RichEmbed()
		.setColor('GREEN')
		.setTitle('Bot Info')
		.addField('Bot Author', '[NdT3Development](https://github.com/NdT3Development) (NdT3#0717)', true)
		.addField(`Github Repository`, `https://github.com/NdT3Development/DiscordBot`, true)
		.addField(`Discord.js Version`, `v${Discord.version}`, true)
		.addField(`Node Version`, `${process.version}`, true)
		.addField(`Bot Version`, `${client.version}`)
		.setDescription(`This is an open source bot created by [NdT3Development](https://github.com/NdT3Development) made to custom fit his needs in a bot.\n Run the [prefix]help command for commands`);

	message.channel.send({ embed });
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 0
};

exports.help = {
	name: 'info',
	category: 'Miscelaneous',
	description: 'Provides some bot info',
	usage: 'info'
};
