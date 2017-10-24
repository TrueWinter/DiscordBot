// This event executes when a new member joins a server. Let's welcome them!

module.exports = (client, member) => {
	// Load the guild's settings
	const guildSettings = client.settings.get(member.guild.id);

	// If welcome is off, don't proceed (don't welcome the user)
	if (!guildSettings.welcomeChannel) return console.log('Cannot send welcome message as there is nothing in the welcomeChannel setting');
	if (!guildSettings.welcomeEnabled || guildSettings.welcomeEnabled !== 'true') return;

	// Replace the placeholders in the welcome message with actual data
	const welcomeMessage = guildSettings.welcomeMessage.replace('{{user}}', member.user.tag);

	// Send the welcome message to the default server channel. Not ideal,
	// there's a place for more configs here.
	if (!member.guild.channels.find('name', guildSettings.welcomeChannel)) return console.log(`Unable to send welcome message to guild: '${member.guild}' (${member.guild.id}) as the channel '${guildSettings.welcomeChannel}' does not exist`);
	member.guild.channels.find('name', guildSettings.welcomeChannel).send(welcomeMessage).catch(console.error);
};
