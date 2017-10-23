exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars

	message.reply('Bot has been stopped (or restarted if you use a process manager)')
		.then(() => {
			console.log(`Bot stopped by ${message.author.tag} (${message.author.id})`);
			process.exit(0);
		});
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['restart'],
	permLevel: 10
};

exports.help = {
	name: 'stopbot',
	category: 'System',
	description: 'Stops the bot',
	usage: 'stopbot'
};
