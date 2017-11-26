exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars

	const gS = await client.settings.get(message.guild.id);

	var deleteCount = parseInt(args[0]);

	if (!deleteCount || deleteCount < 2 || deleteCount > 100) return message.reply('Please provide a number between 2 and 100 for the number of messages to delete');
	message.delete();
	//var fetched =	message.channel.fetchMessages({count: deleteCount});
	//message.channel.bulkDelete(deleteCount + 1)
	//	.catch(error => message.reply(`Couldn't delete messages because of: ${error}`));


	var fs = require('fs'); var Discord = require('discord.js');
	var msgs = '';
	await message.channel.fetchMessages({ limit: deleteCount })
		.then(messages => messages.forEach(g => msgs += client.config.purgeLogFormat.replace('{{mID}}', g.id).replace('{{mTS}}', g.createdTimestamp).replace('{{mC}}', g.content))) // client.config.purgeLogFormat.replace('{{mID}}', g.id).replace('{{mTS}}', g.createdTimestamp).replace('{{mC}}', g.content) |||| `\n Message ID: ${g.id}  |  Message Timestamp: ${g.createdTimestamp} | Content: ${g.content} \n`
		.catch(console.error);
	setTimeout(function() {
		if (gS.logPurge === 'true') {
			console.log(msgs);
			fs.writeFileSync('purge-log.txt', msgs);
			message.guild.channels.find('name', gS.modLogChannel).send('Messages purged', new Discord.Attachment('./purge-log.txt'))
				.then(() =>	fs.unlinkSync('purge-log.txt'));
		}
		message.channel.bulkDelete(deleteCount);
	}, 1000);

};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: 2
};

exports.help = {
	name: 'purge',
	category: 'Moderation',
	description: 'Allows you to purge between 2 and 100 messages',
	usage: 'purge [number of messages]'
};
