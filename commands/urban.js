//var request = require('request');
var snekfetch = require('snekfetch');
const Discord = require('discord.js');

exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars
	var term = args.join(' ');

	if (!term) return message.reply('Need a term to search for...');

	//request(`https://api.urbandictionary.com/v0/define?term=${encodeURIComponent(term)}`, function (error, response, body) {
	snekfetch.get(`https://api.urbandictionary.com/v0/define?term=${encodeURIComponent(term)}`).then((data) => {

		//if (error) return message.reply('Unable to get definition at this time');

		if (!JSON.parse(data.text).list[0]) return message.reply('No definition found for that term');

		var definition = JSON.parse(data.text).list[0].definition;
		var example = JSON.parse(data.text).list[0].example || 'NO EXAMPLE GIVEN';
		var more = `http://${term.replace(' ', '-')}.urbanup.com`;

		var defEmbed = new Discord.RichEmbed()
			.setTitle(`UrbanDictionary Definition`)
			.addField(`Term`, term)
			.addField(`Definition`, definition)
			.addField(`Example`, example)
			.addField(`More definitions for this term`, more);

		message.channel.send({ embed: defEmbed }).catch((e) => { console.error(e); });
		//console.log(body);

	}).catch((err) => console.error(err));

};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['ud'],
	permLevel: 0
};

exports.help = {
	name: 'urban',
	category: 'Utilities',
	description: 'Gets a definition from UrbanDictionary',
	usage: 'urban [term]'
};
