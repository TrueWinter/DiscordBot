exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
	const guildSettings = client.settings.get(message.guild.id);
	const Discord = require('discord.js');
	let member = message.mentions.members.first();
	if (!member) return message.reply('Please mention a valid member of this server');
	if (!member.bannable) return message.reply('I cannot softban this user! Do they have a higher role? Do I have ban permissions?');

	let reason = args.slice(1).join(' ');
	if (!reason) return message.reply('Please indicate a reason for the softban!');

	await member.ban({ days: 2, reason: `${message.author.username} softbanned this user with reason: ${reason}` }).then(() => {
		message.guild.unban(member);
		message.reply(`${member.user.tag} (${member.user.id}) has been softbanned by ${message.author.tag} because: ${reason}`);
		if (!message.guild.channels.find('name', guildSettings.modLogChannel)) return console.log('modLogChannel does not exist on this server');
		const embed = new Discord.RichEmbed()
			.setColor('RED')
			.setTitle('User Softbanned')
			.addField(`User`, `${member.user.tag} (${member.user.id})`, true)
			.addField(`Moderator`, `${message.author.tag} (${message.author.id})`, true)
			.addField(`Reason`, `${reason}`, true);
		message.guild.channels.find('name', guildSettings.modLogChannel).send({ embed })
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
	guildOnly: false,
	aliases: [],
	permLevel: 2
};

exports.help = {
	name: 'softban',
	category: 'Moderation',
	description: 'Bans the mentioned user, clears their messages from the past two days, then unbans them',
	usage: 'softban [@\\user] [reason]'
};
