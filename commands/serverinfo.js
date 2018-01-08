const Discord = require('discord.js');
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  
  var time = Date.now();
	if (!message.guild.available) return;
	const embed = new Discord.RichEmbed()
		.setColor('RED')
		.setTitle('Server Info')
		.setThumbnail(message.guild.iconURL)
		.addField(`Server Name`, `${message.guild.name}`, true)
		.addField(`Server ID`, `${message.guild.id}`, true)
		.addField(`Owner`, `${message.guild.owner.user.tag}`, true)
		.addField(`Owner ID`, `${message.guild.owner.user.id}`)
		.addField(`Server Region`, `${message.guild.region}`, true)
		.addField(`Members`, `${message.guild.members.size} (${message.guild.presences.filter(p => p.status === 'online').size} online, ${message.guild.presences.filter(p => p.status === 'idle').size} idle, ${message.guild.presences.filter(p => p.status === 'dnd').size} dnd, ${message.guild.presences.filter(p => p.status === 'dnd').size} invisible/offline)`, true)
		.addField(`Created At`, `${message.guild.createdAt.toDateString()}`, true)
		.addField(`Features`, `${message.guild.features.join(', ') || 'None'}`, true)
		.addField(`Channels`, `${message.guild.channels.size} (${message.guild.channels.filter(c => c.type === 'voice').size} voice)`, true)
		.addField(`Roles`, `${message.guild.roles.filter(r => r.position !== 0).map(R => R.name).join(', ')}`, true) // Filter is to filter out @everyone role
    .setFooter(`Time taken: ${Date.now() - time}ms`);
	message.channel.send({ embed });
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: 0
};

exports.help = {
	name: 'serverinfo',
	category: 'Miscelaneous',
	description: 'Will give you info about this server',
	usage: 'serverinfo'
};
