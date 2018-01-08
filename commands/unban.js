exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
	const guildSettings = client.settings.get(message.guild.id);
	const Discord = require('discord.js');
	const { caseNumber } = require('../modules/caseNumber.js');

	let member = args[0];
	if (isNaN(member)) return message.reply('Please give a user ID to unban');

	const modlog = message.guild.channels.find('name', guildSettings.modLogChannel);
	const caseNum = await caseNumber(client, modlog);
	const reason = args.splice(1, args.length).join(' ') || `Awaiting moderator's input. Use ${guildSettings.prefix}reason ${caseNum} <reason>.`;

	message.guild.unban(member).then(() => {
		message.reply(`${member} has been unbanned by ${message.author.tag} because: ${reason}`);
		if (!modlog) return console.log('modLogChannel does not exist on this server');
		const embed = new Discord.RichEmbed()
			.setColor('RED')
			.setTitle('User unbanned')
			.addField(`User`, `${member}`, true)
			.addField(`Moderator`, `${message.author.tag} (${message.author.id})`, true)
			.addField(`Reason`, `${reason}`, true)
			.setFooter(`Case ${caseNum}`);
		modlog.send({ embed })
			.then(() => {
				client.log('log', `${message.guild.name}/#${message.channel.name} (${message.channel.id}): ${member} was unbanned by ${message.author.tag} (${message.author.id})`, 'CMD');
			})
			.catch((err) => {
				console.log(err);
			});
	})
		.catch(error => message.reply(`Sorry, I couldn't unban because of : ${error}`));

};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: 2
};

exports.help = {
	name: 'unban',
	category: 'Moderation',
	description: 'Unbans a user',
	usage: 'unban [user ID] [reason]'
};
