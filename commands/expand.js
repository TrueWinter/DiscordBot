const Bypasser = require('node-bypasser');
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
	if (!args[0]) return message.reply('Short URL to expand not given');
	var w = new Bypasser(args[0]);
	w.decrypt(function(err, result) {
		if (err) {
			console.log(err);
			message.channel.send('There was an error in expanding the URL');
			return;
		}

		message.channel.send(`Short URL \`${args[0]}\` goes to \`${result}\``);
	});
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 0
};

exports.help = {
	name: 'expand',
	category: 'Utilities',
	description: 'Get the long URL that a short URL redirects to',
	usage: 'expand [short URL]'
};
