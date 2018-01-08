exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
	const Discord = require('discord.js');
	const guildSettings = client.settings.get(message.guild.id);
	const { caseNumber } = require('../modules/caseNumber.js');

	let member = message.mentions.members.first();
	if (!member) return message.reply('Please mention a valid member of this server');

	const modlog = message.guild.channels.find('name', guildSettings.modLogChannel);
	const caseNum = await caseNumber(client, modlog);
	const reason = args.splice(1, args.length).join(' ') || `Awaiting moderator's input. Use ${guildSettings.prefix}reason ${caseNum} <reason>.`;

	// TODO: Save warnings in a collection or similar

	//const userWarnings = client.warnings.get(`${message.guild.id}-${member.user.id}`);

	message.reply(`${member.user.tag} (${member.user.id}) has been warned by ${message.author.tag} (${message.author.id}) because: ${reason}`);
	if (!modlog) {
		console.log(`Cannot find modLogChannel (${guildSettings.modLogChannel}) on server (or I do not have the permissions): ${message.guild.name} (${message.guild.id})`);
		message.reply(`Cannot find modLogChannel (${guildSettings.modLogChannel}) on server (or I do not have the permissions)`);
		return;
	}

	const embed = new Discord.RichEmbed()
		.setColor('RED')
		.setTitle('User Warned')
		.addField(`User`, `${member.user.tag} (${member.user.id})`, true)
		.addField(`Moderator`, `${message.author.tag} (${message.author.id})`, true)
		.addField(`Reason`, `${reason}`, true)
		.setFooter(`Case ${caseNum}`);
	modlog.send({ embed })
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
	usage: 'warn [user mention] [reason]'
};
