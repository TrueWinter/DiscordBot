exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
	const guildSettings = client.settings.get(message.guild.id);
	const Discord = require('discord.js');
	const { caseNumber } = require('../modules/caseNumber.js');

	let member = message.mentions.members.first();
	if (!member) return message.reply('Please mention a valid member of this server');
	if (!member.bannable) return message.reply('I cannot softban this user! Do they have a higher role? Do I have ban permissions?');

	const modlog = message.guild.channels.find('name', guildSettings.modLogChannel);
	const caseNum = await caseNumber(client, modlog);
	const reason = args.splice(1, args.length).join(' ') || `Awaiting moderator's input. Use ${guildSettings.prefix}reason ${caseNum} <reason>.`;

	await member.ban({ days: 2, reason: `${message.author.username} softbanned this user with reason: ${reason}` }).then(() => {
		message.guild.unban(member);
		message.reply(`${member.user.tag} (${member.user.id}) has been softbanned by ${message.author.tag} because: ${reason}`);
		if (!modlog) return console.log('modLogChannel does not exist on this server');
		const embed = new Discord.RichEmbed()
			.setColor('RED')
			.setTitle('User Softbanned')
			.addField(`User`, `${member.user.tag} (${member.user.id})`, true)
			.addField(`Moderator`, `${message.author.tag} (${message.author.id})`, true)
			.addField(`Reason`, `${reason}`, true)
			.setFooter(`Case ${caseNum}`);
		modlog.send({ embed })
			.then(() => {
				client.log('log', `${message.guild.name}/#${message.channel.name} (${message.channel.id}): ${member.user.tag} (${member.user.id}) was softbanned by ${message.author.tag} (${message.author.id})`, 'CMD');
			})
			.catch((err) => {
				console.log(err);
			});
	})
		.catch(error => message.reply(`Sorry ${message.author} I couldn't softban because of : ${error}`));

};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: 2
};

exports.help = {
	name: 'softban',
	category: 'Moderation',
	description: 'Bans the mentioned user, clears their messages from the past two days, then unbans them',
	usage: 'softban [@\\user] [reason]'
};
