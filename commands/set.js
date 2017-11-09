const { inspect } = require('util');

exports.run = async (client, message, [action, key, ...value]) => {
	const settings = client.settings.get(message.guild.id);

	if (action === 'edit') {
		if (!key) return message.reply('Please specify a key to edit');
		if (!settings[key]) return message.reply('This key does not exist in the settings');
		if (!value) return message.reply('Please specify a new value');

		settings[key] = await value.join(' ');
<<<<<<< HEAD
		client.settings.set(message.guild.id, settings);
=======
		await client.settings.set(message.guild.id, settings);
>>>>>>> d85b943838bb366cd7629067c31beacdd486857d
		message.reply(`${key} successfully edited to ${value}`);
	} else
	if (action === 'get') {
		if (!key) return message.reply('Please specify a key to view');
		if (!settings[key]) return message.reply('This key does not exist in the settings');
		message.reply(`The value of ${key} is currently ${settings[key]}`);
	} else
	if (action === 'reset') {
<<<<<<< HEAD
		client.settings.set(message.guild.id, client.config.defaultSettings);
=======
		await client.settings.set(message.guild.id, client.config.defaultSettings);
>>>>>>> d85b943838bb366cd7629067c31beacdd486857d
		message.reply('Done');
	} else
	if (action === 'view') {
		message.channel.send(inspect(settings), { code: 'json' });
	} else {
		message.reply('Action must be one of view/get/edit/reset');
	}
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['setting', 'settings', 'conf'],
	permLevel: 3
};

exports.help = {
	name: 'set',
	category: 'System',
	description: 'View or change settings for your server.',
	usage: 'set [view/get/edit/reset] [key] [value]'
};
