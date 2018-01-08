exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
	message.reply(`Your permission level: ${level} (${client.permLevels[level]})`);
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 0
};

exports.help = {
	name: 'permlevel',
	category: 'Miscelaneous',
	description: 'Returns your permission level',
	usage: 'permlevel'
};
