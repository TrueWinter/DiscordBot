exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
	const guildSettings = client.settings.get(message.guild.id);
	const Discord = require('discord.js');
	const { caseNumber } = require('../modules/caseNumber.js');
	let member = message.mentions.members.first();
	if (!member) return message.reply('Please mention a valid member of this server');
	if (!member.bannable) return message.reply('I cannot ban this user! Do they have a higher role? Do I have ban permissions?');

	const modlog = message.guild.channels.find('name', guildSettings.modLogChannel);
	const caseNum = await caseNumber(client, modlog);
	const reason = args.splice(1, args.length).join(' ') || `Awaiting moderator's input. Use ${guildSettings.prefix}reason ${caseNum} <reason>.`;

	message.guild.ban(member, `${message.author.username} banned this user with reason: ${reason}`).then(() => {
		message.reply(`${member.user.tag} (${member.user.id}) has been banned by ${message.author.tag} because: ${reason}`);
		if (!modlog) return console.log('modLogChannel does not exist on this server');
		const embed = new Discord.RichEmbed()
			.setColor('RED')
			.setTitle('User Banned')
			.addField(`User`, `${member.user.tag} (${member.user.id})`, true)
			.addField(`Moderator`, `${message.author.tag} (${message.author.id})`, true)
			.addField(`Reason`, `${reason}`, true)
			.setFooter(`Case ${caseNum}`);
		modlog.send({ embed })
			.then(() => {
				client.log('log', `${message.guild.name}/#${message.channel.name} (${message.channel.id}): ${member.user.tag} (${member.user.id}) was banned by ${message.author.tag} (${message.author.id})`, 'CMD');
			})
			.catch((err) => {
				console.log(err);
			});
	})
		.catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));

};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: 2
};

exports.help = {
	name: 'ban',
	category: 'Moderation',
	description: 'Ban hammer time',
	usage: 'ban [user mention] [reason]'
};
