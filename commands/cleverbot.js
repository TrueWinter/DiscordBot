const Cleverbot = require('cleverbot-node');
const clbot = new Cleverbot;

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
	if (!client.config.cleverbotToken) return message.reply('CleverBot API token not added to config');
	clbot.configure({ botapi: client.config.cleverbotToken });
	if (!args[0]) return message.reply('You can\'t say nothing...');
	clbot.write(args.join(' '), (response) => {
		message.channel.startTyping();
		setTimeout(() => {
			message.channel.send(`Cleverbot: ${response.output}`).catch((err) => {
				message.reply('There was an error');
				console.error(err);
			});
			message.channel.stopTyping();
		}, Math.random() * (1 - 3) + 1 * 1000); // eslint-disable-line no-mixed-operators
	});
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 0
};

exports.help = {
	name: 'cleverbot',
	category: 'Fun',
	description: 'Talk to the bot!',
	usage: 'cleverbot [message]'
};
