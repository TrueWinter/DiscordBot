exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
	const Discord = require('discord.js');
	const guildSettings = client.settings.get(message.guild.id);
	const { caseNumber } = require('../modules/caseNumber.js');

	let member = message.mentions.members.first();
	if (!member) return message.reply('Please mention a valid member of this server');
	if (!member.kickable)	return message.reply('I cannot kick this user! Do they have a higher role? Do I have kick permissions?');

	const modlog = message.guild.channels.find('name', guildSettings.modLogChannel);
	const caseNum = await caseNumber(client, modlog);
	const reason = args.splice(1, args.length).join(' ') || `Awaiting moderator's input. Use ${guildSettings.prefix}reason ${caseNum} <reason>.`;

	member.kick(`${message.author.username} kicked this user with reason: ${reason}`).then(() => {
		message.reply(`${member.user.tag} (${member.user.id}) has been kicked by ${message.author.tag} (${message.author.id}) because: ${reason}`);
		if (!modlog) return console.log('modLogChannel does not exist on this server');
		const embed = new Discord.RichEmbed()
			.setColor('RED')
			.setTitle('User Kicked')
			.addField(`User`, `${member.user.tag} (${member.user.id})`, true)
			.addField(`Moderator`, `${message.author.tag} (${message.author.id})`, true)
			.addField(`Reason`, `${reason}`, true)
			.setFooter(`Case ${caseNum}`);
		modlog.send({ embed })
			.then(() => {
				client.log('log', `${message.guild.name}/#${message.channel.name} (${message.channel.id}): ${member.user.tag} (${member.user.id}) was kicked by ${message.author.tag} (${message.author.id})`, 'CMD');
			})
			.catch((err) => {
				console.log(err);
			});
	})
		.catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: 2
};

exports.help = {
	name: 'kick',
	category: 'Moderation',
	description: 'Kicks a user',
	usage: 'kick [user mention] [reason]'
};
