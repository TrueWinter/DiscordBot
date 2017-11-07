exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
	message.channel.send('Testing, testing, 1 2 3');
};

exports.conf = {
	enabled: false,
	guildOnly: false,
	aliases: [],
	permLevel: 0
};

exports.help = {
	name: 'test',
	category: 'Miscelaneous',
	description: 'Testing, testing',
	usage: 'test'
};
