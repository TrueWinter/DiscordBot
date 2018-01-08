const snekfetch = require('snekfetch');
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
	try {
		const _message = await message.channel.send('Please wait...');
		if (!args[0]) {
			_message.edit('No data given');
		} else {
			const cb = '```'; // lazy af yo
			snekfetch.get(`http://wttr.in/${args.join(' ').replace(' ', '%20')}?T0m`).then((data) => {
				_message.edit(`${cb}\n${data.text}\n${cb}`);
			}).catch(console.error);
		}

	} catch (error) {
		throw error;
	}
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 0
};

exports.help = {
	name: 'weather',
	category: 'Utilities',
	description: 'Get the weather for a location',
	usage: 'weather [location]'
};
