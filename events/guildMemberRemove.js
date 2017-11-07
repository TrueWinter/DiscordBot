// This event executes when a new member joins a server. Let's welcome them!

const Discord = require('discord.js');

module.exports = (client, member) => {
	// Load the guild's settings
	if (member.user.id === client.user.id) return;
	const guildSettings = client.settings.get(member.guild.id);

	const logLeave = new Discord.RichEmbed()
		.setColor('ORANGE')
		.setTitle('User Left')
		.addField('User tag', member.user.tag)
		.addField('User ID', member.user.id);

	if (guildSettings.logMemberLeave === 'true') {
		member.guild.channels.find('name', guildSettings.modLogChannel).send({ embed: logLeave }).catch((e) => client.log('log', `Unable to send message to modLogChannel (${guildSettings.modLogChannel}) on ${member.guild.name} (${member.guild.id}): \n ${e}`, 'Error'));
	}
};
