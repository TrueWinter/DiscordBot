// This event executes when a new member joins a server. Let's welcome them!

const Discord = require('discord.js');

module.exports = (client, member) => {
	// Load the guild's settings
	if (member.user.id === client.user.id) return;
	const guildSettings = client.settings.get(member.guild.id);

	// If welcome is off, don't proceed (don't welcome the user)
	//if (!guildSettings.welcomeChannel) return console.log('Cannot send welcome message as there is nothing in the welcomeChannel setting');
	//if (guildSettings.welcomeEnabled !== 'true')

	// Replace the placeholders in the welcome message with actual data
	const welcomeMessage = guildSettings.welcomeMessage.replace('{{user}}', member.user.tag);

	// Send the welcome message to the default server channel. Not ideal,
	// there's a place for more configs here.
	if (guildSettings.welcomeEnabled === 'true') {
		if (member.guild.channels.find('name', guildSettings.welcomeChannel)) {
			member.guild.channels.find('name', guildSettings.welcomeChannel).send(welcomeMessage).catch((e) => client.log('log', `Unable to send message to welcomeChannel (${guildSettings.welcomeChannel}) on ${member.guild.name} (${member.guild.id}): \n ${e}`, 'Error'));
		}
		//return console.log(`Unable to send welcome message to guild: '${member.guild}' (${member.guild.id}) as the channel '${guildSettings.welcomeChannel}' does not exist`);
	}


	const logWelcome = new Discord.RichEmbed()
		.setColor('GREEN')
		.setTitle('New Member')
		.addField('User tag', member.user.tag)
		.addField('User ID', member.user.id);

	if (guildSettings.logNewMember === 'true') {
		member.guild.channels.find('name', guildSettings.modLogChannel).send({ embed: logWelcome }).catch((e) => client.log('log', `Unable to send message to modLogChannel (${guildSettings.modLogChannel}) on ${member.guild.name} (${member.guild.id}): \n ${e}`, 'Error'));
	}
};
