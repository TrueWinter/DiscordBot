exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
	const Discord = require('discord.js');
	const guildSettings = client.settings.get(message.guild.id);

	let member = message.mentions.members.first();
	if (!member) return message.reply('Please mention a valid member of this server');

	let reason = args.slice(1).join(' ');
	if (!reason) return message.reply('Please indicate a reason for the warning!');

	// TODO: Save warnings in a collection or similar

	//const userWarnings = client.warnings.get(`${message.guild.id}-${member.user.id}`);

	message.reply(`${member.user.tag} (${member.user.id}) has been warned by ${message.author.tag} (${message.author.id}) because: ${reason}`);
	if (!message.guild.channels.find('name', guildSettings.modLogChannel)) {
		console.log(`Cannot find modLogChannel (${guildSettings.modLogChannel}) on server (or I do not have the permissions): ${message.guild.name} (${message.guild.id})`);
		message.reply(`Cannot find modLogChannel (${guildSettings.modLogChannel}) on server (or I do not have the permissions)`);
		return;
	}

	const embed = new Discord.RichEmbed()
		.setColor('RED')
		.setTitle('User Warned')
		.addField(`User`, `${member.user.tag} (${member.user.id})`, true)
		.addField(`Moderator`, `${message.author.tag} (${message.author.id})`, true)
		.addField(`Reason`, `${reason}`, true);
	message.guild.channels.find('name', guildSettings.modLogChannel).send({ embed })
		.then(() => {
			client.log('log', `${message.guild.name}/#${message.channel.name} (${message.channel.id}): ${member.user.tag} (${member.user.id}) was warned by ${message.author.tag} (${message.author.id})`, 'CMD');
		})
		.catch((err) => {
			console.log(err);
		});

	const warnDM = new Discord.RichEmbed()
		.setColor('RED')
		.setTitle('Warned')
		.addField('Guild', `${message.guild.name} (${message.guild.id})`, true)
		.addField('Reason', reason, true)
		.addField('Moderator', `${message.author.tag} (${message.author.id})`, true);
	member.send({ embed: warnDM }).catch((e) => {
		console.log(`Unable to DM user \`${member.user.tag} (${member.user.id})\` for warning \`${reason}\` by moderator \`${message.author.tag} (${message.author.id}) \n Error: \n ${e}`);
	});
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: 2
};

exports.help = {
	name: 'warn',
	category: 'Moderation',
	description: 'Warns a user, sends them a message, saves the warning to a mod log channel',
	usage: 'warn [@\\user] [reason]'
};
