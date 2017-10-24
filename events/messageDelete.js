module.exports = (client, message) => {
	const guildSettings = client.settings.get(message.guild.id);
	client.log('log', ` Message sent by ${message.author.tag} (${message.author.id}) sent in ${message.guild.name} (${message.guild.id})/#${message.channel.name} (${message.channel.id}) that had the content of \`${message.content}\` was deleted`, 'Message Deleted');
	message.guild.channels.find('name', guildSettings.modLogChannel).send(`Message sent by ${message.author.tag} (${message.author.id}) in ${message.channel.name} (${message.channel.id}) that had the content of \`${message.content}\` was deleted`).catch((err) => console.log(`Failed to send message to mod log channel (${guildSettings.modLogChannel}) on guild ${message.guild.id}\nError:\n${err}`));
};
