const Discord = require('discord.js');

module.exports = (client, message) => {
	const guildSettings = client.settings.get(message.guild.id);
	if (guildSettings.logDeletes === 'true') {
		if (message.channel.type !== 'dm') {
			var content = '';
			if (message.content) {
				content = message.content;
			} else {
				content = '<<NO CONTENT>>';
			}

			const embed = new Discord.RichEmbed()
				.setColor('RED')
				.setTitle('Message Deleted')
				.addField(`User`, `${message.author.tag} (${message.author.id})`, true)
				.addField(`Content`, `${content}`, true)
				.addField(`Channel`, `${message.channel.name} (${message.channel.id})`, true);
			if (message.guild.channels.find('name', guildSettings.modLogChannel)) {
				message.guild.channels.find('name', guildSettings.modLogChannel).send({ embed })
					.catch((err) => {
						console.log(err);
					});
			} else {
				console.log(`Unable to send message to modLogChannel (${guildSettings.modLogChannel})`);
			}
			client.log('log', ` Message sent by ${message.author.tag} (${message.author.id}) sent in ${message.guild.name} (${message.guild.id})/#${message.channel.name} (${message.channel.id}) that had the content of \`${message.content || '<<NO CONTENT>>'}\` was deleted`, 'Message Deleted');
		} else {
			client.log('log', ` Message sent by ${message.author.tag} (${message.author.id}) sent in DM that had the content of \`${message.content}\` was deleted`, 'Message Deleted');
		}
	}
};
