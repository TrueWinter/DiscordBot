var gooGl = require("goo.gl")
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  if (!args[0]) return message.reply('URL to shorten not given');
  gooGl.setKey(client.config.googleAPIToken);
  gooGl.getKey();

  gooGl.shorten(args[0])
    .then((sU) => message.channel.send(`Shotened ${args[0]} to: ${sU}`))
    .catch((e) => {
      message.channel.send(`There was an error: ${e.code || 'No error code'}`);
      console.error(e);
    });
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 0
};

exports.help = {
	name: 'shorten',
	category: 'Utilities',
	description: 'Shortens a given URL using Goo.gl',
	usage: 'shorten [URL]'
};
