exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
	var sayMessage = args.join(' ');
	message.delete().catch(O_o=>{}); // eslint-disable-line
	message.channel.send(sayMessage);
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: 2
};

exports.help = {
	name: 'say',
	category: 'Miscelaneous',
	description: 'It says what you say',
	usage: 'say [something]'
};
