const Discord = require('discord.js');

exports.run = (client, message, args, level) => {

	if (!args[0]) {
		const myCommands = client.commands.filter(c => c.conf.permLevel <= level);
		const commandNames = myCommands.keyArray();
		const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
		let currentCategory = '';
		let output = `= Command List =\n\n[Use [prefix]help <commandname> for details]\n`;
		if (message.channel.type === 'dm') {
			output += `Some other commands are disabled in DMs\n`;
		}
		const sorted = myCommands.sort((p, c) => p.help.category > c.help.category ? 1 : -1);
		sorted.forEach(c => {
			const cat = c.help.category.toProperCase();
			if (currentCategory !== cat) {
				//if (message.channel.type !== 'dm' || cat !== 'Moderation') {
				output += `\n== ${cat} ==\n`;
				//}
				//output += `\n== ${cat} ==\n`;
				currentCategory = cat;
			}
			//if (cat === 'Moderation' && message.channel.type === 'dm') {
			//output += '';
			//} else {
			output += `${c.help.name}${' '.repeat(longest - c.help.name.length)} :: ${c.help.description}\n`;
			//}

		});

		var helpEmbed = new Discord.RichEmbed()
			.setTitle('Commands')
			.setDescription(`\`\`\`asciidoc\n${output}\`\`\``);
		if (message.channel.type === 'dm' || client.settings.get(message.guild.id).sendHelp === 'channel') {
			message.channel.send({ embed: helpEmbed });
		} else {
			message.author.send({ embed: helpEmbed });
			message.react('👍');
		}
	} else {
		let command = args[0];
		if (client.commands.has(command) || client.aliases.has(command)) {
			command = client.commands.get(command) || client.commands.get(client.aliases.get(command));
			//message.channel.send(`= ${command.help.name} = \n${command.help.description}\nusage::${command.help.usage}`, { code: 'asciidoc' });
			var aliases;
			if (command.conf.aliases.length === 0) {
				aliases = 'NONE';
			} else {
				aliases = command.conf.aliases;
			}

			//console.log(aliases);
			var hEmbed = new Discord.RichEmbed()
				.setTitle(`Command Help: ${command.help.name}`)
				.addField('Description', command.help.description)
				.addField('Category', command.help.category)
				.addField('Usage', command.help.usage)
				.addField('Enabled', command.conf.enabled)
				.addField('Disabled in DMs', command.conf.guildOnly)
				.addField('Aliases', aliases)
				.addField('Permission Level', command.conf.permLevel);

			if (message.channel.type === 'dm' || client.settings.get(message.guild.id).sendHelp === 'channel') {
				message.channel.send({ embed: hEmbed });
			} else {
				message.author.send({ embed: hEmbed });
			}
		} else {
			return message.reply('Command not found');
		}
	}
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['h', 'halp'],
	permLevel: 0
};

exports.help = {
	name: 'help',
	category: 'System',
	description: 'Displays all the available commands for your permission level.',
	usage: 'help [command]'
};
