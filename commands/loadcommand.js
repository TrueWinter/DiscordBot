const { promisify } = require('util');
const readdir = promisify(require('fs').readdir);
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  if (!args[0]) return message.reply('Command to reload not in args');
  console.log(args[0]);
  if (client.commands.get(args[0])) return message.reply('Command already loaded. Use `reload` command');
	const cmdFiles = await readdir(`${process.cwd()}/commands/`);
	client.commandsNumber = cmdFiles.length;
	//client.log('log', `Loading a total of ${client.commandsNumber} commands.`, 'LOAD');
  var load = args[0];
	//cmdFiles.forEach(f => {
		//try {
			const props = require(`${process.cwd()}/commands/${load}`);
			//if (f.split('.').slice(-1)[0] !== 'js') return;
			client.log('log', `Loading Command: ${props.help.name}.`, 'LOAD');
			client.commands.set(props.help.name, props);
			props.conf.aliases.forEach(alias => {
				client.aliases.set(alias, props.help.name);
			});
		//} catch (e) {
			//client.log('ERROR', `Unable to load command ${f}: ${e}`);
		//}
  //});
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 10
};

exports.help = {
	name: 'loadcommand',
	category: 'System',
	description: 'Loads a new command without having to restart the bot',
	usage: 'loadcommand [command name]'
};
