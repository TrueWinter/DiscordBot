exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
	var google = require('google');

	let searchMessage = await message.reply('Searching...');
	//let searchUrl = `https://www.google.com/search?q=${encodeURIComponent(message.content)}`;


	google.resultsPerPage = 1;

	google(message.content, function (err, res) {
		if (err) console.error(err);
		var link = res.links[0];
		if (!link) {
			return message.channel.send('No results found!');
		}
		searchMessage.edit(`Result found!\n${link.href}`);
	});


};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 0
};

exports.help = {
	name: 'google',
	category: 'Miscelaneous',
	description: 'Too lazy to leave Discord to Google something?',
	usage: 'google [search]'
};
