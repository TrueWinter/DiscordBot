const { version } = require('discord.js');
const moment = require('moment');
require('moment-duration-format');
const Discord = require('discord.js');

exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars
	var time = Date.now();
	const duration = moment.duration(client.uptime).format(' D [days], H [hrs], m [mins], s [secs]');
	const embed = new Discord.RichEmbed()
		.setColor('RED')
		.setAuthor(client.user.username, client.user.displayAvatarURL)
		.setTitle('BOT STATS')
		.addField(`Memory Usage`, `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
		.addField(`Uptime`, `${duration}`, true)
		.addField(`Commands`, `${client.commandsNumber}`, true)
		.addField(`Users`, `${client.users.filter(u => u.id !== '1').size.toLocaleString()}`, true)
		.addField(`Servers`, `${client.guilds.size.toLocaleString()}`, true)
		.addField(`Channels`, `${client.channels.size.toLocaleString()}`, true)
		.addField(`Discord.js`, `v${version}`, true)
		.addField(`Node`, `${process.version}`, true)
		.addField(`Bot Version`, `${client.version}`, true)
		.setFooter(`Time taken: ${Date.now() - time}ms`);
	message.channel.send({ embed });
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 0
};

exports.help = {
	name: 'stats',
	category: 'Miscelaneous',
	description: 'Gives some useful bot statistics',
	usage: 'stats'
};
