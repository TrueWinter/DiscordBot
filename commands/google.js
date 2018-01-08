const cheerio = require('cheerio');
const	snekfetch = require('snekfetch');
const	Discord = require('discord.js');

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
	var time = Date.now();
	var search = args.join(' ');
	if (!search) return message.reply('Can\'t search for nothing...');
	let searchMessage = await message.reply('Searching... Please wait.');
	let searchUrl = `https://www.google.com/search?safe=high&q=${encodeURIComponent(search)}`;

	return snekfetch.get(searchUrl).then((result) => {

		let $ = cheerio.load(result.text);

		let googleData = $('.r a');
		if (!googleData.attr('href')) return searchMessage.edit('No results found');
		var linksArray = [];
		var titleArray = [];

		googleData.each(function (i, link) {
			if (i >= 4) return; // Maximum of 4 links
			// get the href attribute of each link

			var url = $(link).attr('href');
			var title = $(link).text() || 'No title';
			//console.log(title)
			titleArray.push(title);

			// strip out unnecessary junk
			url = url.replace('/url?q=', '').split('&')[0];
			linksArray.push(url);

			if (url.charAt(0) === '/') {
				return; // eslint-disable-line no-useless-return
			}
		});

		var embed = new Discord.RichEmbed();

		embed.setTitle('Results found!\n');
		var a = linksArray.length;
		for (var i = 0; i < a; i++)	{
			if (i === 1) {
				embed.addField(`**More results**`, '\u200B');
				embed.addField(`${titleArray[i]}`, `<${linksArray[i]}>\n`); // Second link. This has 'More results' before it
			} else {
				embed.addField(`${titleArray[i]}`, `<${linksArray[i]}>\n`); // Other links
			}
		}

		embed.setFooter(`Time taken: ${Date.now() - time} ms`);
		searchMessage.edit({ embed });

	}).catch((err) => {
		searchMessage.edit('Error while searching');
		console.log(err);
	});
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['g'],
	permLevel: 0
};

exports.help = {
	name: 'google',
	category: 'Utilities',
	description: 'Too lazy to leave Discord to Google something?',
	usage: 'google [search]'
};
