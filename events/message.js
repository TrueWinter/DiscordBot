// The MESSAGE event runs anytime a message is received
// Note that due to the binding of client to every event, every event
// goes `client, other, args` when this function is run.
const Discord = require('discord.js');
module.exports = (client, message) => { // eslint-disable-line complexity
	// It's good practice to ignore other bots. This also makes your bot ignore itself
	// and not get into a spam loop (we call that "botception").

	if (message.author.bot) {
		return;
	}
	/*if (message.channel.type === 'dm') {
		return;
	}*/

	if (message.channel.type === 'dm') {
		if (message.content.indexOf(client.config.defaultSettings.prefix) !== 0) {
			return;
		}
	}


	// Here we separate our "command" name, and our "arguments" for the command.
	// e.g. if we have the message "+say Is this the real life?" , we'll get the following:
	// command = say
	// args = ["Is", "this", "the", "real", "life?"]
	const args = message.content.split(/\s+/g);
	var command;
	if (message.channel.type !== 'dm') {
		const gS = client.settings.get(message.guild.id); // TODO: Allow for per guild command disables
		message.settings = gS;
		command = args.shift().slice(gS.prefix.length)
			.toLowerCase();
	} else {
		command = args.shift().slice(client.config.defaultSettings.prefix.length)
			.toLowerCase();
	}


	// Get the user or member's permission level from the elevation
	const level = client.permlevel(message);

	// Check whether the command, or alias, exist in the collections defined
	// in app.js.
	const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
	// using this const varName = thing OR otherthing; is a pretty efficient
	// and clean way to grab one of 2 values!

	if (message.channel.type === 'dm') {
		if (!cmd.conf.enabled) return;
		if (cmd.conf.guildOnly) return message.channel.send('This command is disabled in DMs');
	}

	if (message.channel.type !== 'dm') {	// Grab the settings for this server from the enmap
		const guildSettings = client.settings.get(message.guild.id); // TODO: Allow for per guild command disables

		if (guildSettings.inviteFilterEnabled === 'true' || guildSettings.inviteFilterEnabled) {
			if (message.content.match(/(discord\.(gg|me|io)|(discordapp\.com|discord\.com)\/invite).*/)) {

				var msgInv = message.content.match(/discord\.gg\/[0-9A-Za-z-]+/);
				//console.log(msgInv);
				var dggInvCode = msgInv[0].replace(/discord\.gg\//, '');
				//console.log(dggInvCode);

				var whitelist = guildSettings.inviteWhitelist;
				//console.log(whitelist.includes(dggInvCode));
				if (whitelist.includes(dggInvCode)) return;
				message.delete();
				message.reply('Invite links are not allowed');
				//}
				//}
			}
		}

		if (guildSettings.swearFilter === 'true' && guildSettings.swearWords.some(word => message.content.includes(word))) {
			message.delete();
			message.reply('Swear words are not allowed');
		}

		if (guildSettings.facepalms === 'true' && (message.content.toLowerCase()
			.indexOf('facepalm') !== -1 || message.content.indexOf('🤦') !== -1)) { // Because why not. TODO: Add cooldown
			message.channel.send(':face_palm:');
		}

		// Also good practice to ignore any message that does not start with our prefix,
		// which is set in the configuration file.
		if (message.content.indexOf(guildSettings.prefix) !== 0) {
			return;
		}


		if (guildSettings.logCommandUsage === 'true') {
			// If the command exists, **AND** the user has permission and it is not disabled, run it. Else, give error
			if (cmd) {
				if (level >= cmd.conf.permLevel) {
					if (cmd.conf.enabled === true) {
            var embed = client.createCommandEmbed('C', `${message.author.tag} (${message.author.id})`, `${message.content}`, `${message.channel.name} (${message.channel.id})`);
						/*const embed = new Discord.RichEmbed()
							.setColor('RED')
							.setTitle('Command Used')
							.addField(`User`, `${message.author.tag} (${message.author.id})`, true)
							.addField(`Command`, `${message.content}`, true)
							.addField(`Channel`, `${message.channel.name} (${message.channel.id})`, true);*/
						if (message.guild.channels.find('name', guildSettings.modLogChannel)) {
							message.guild.channels.find('name', guildSettings.modLogChannel).send({ embed })
								.catch((err) => {
									console.log(err);
								});
						} else {
							console.log(`Unable to send message to modLogChannel (${guildSettings.modLogChannel})`);
						}
						cmd.run(client, message, args, level);
						console.log('log', `${message.guild.name}/#${message.channel.name} (${message.channel.id}):${message.author.tag} (${message.author.id}) ran command ${message.content}`, 'CMD');
					} else {
						message.reply('This command is disabled');
            var embed = client.createCommandEmbed('D', `${message.author.tag} (${message.author.id})`, `${message.content}`, `${message.channel.name} (${message.channel.id})`);
						/*const embed = new Discord.RichEmbed()
							.setColor('RED')
							.setTitle('Disabled Command Usage')
							.addField(`User`, `${message.author.tag} (${message.author.id})`, true)
							.addField(`Command`, `${message.content}`, true)
							.addField(`Channel`, `${message.channel.name} (${message.channel.id})`, true);*/
						if (message.guild.channels.find('name', guildSettings.modLogChannel)) {
							message.guild.channels.find('name', guildSettings.modLogChannel).send({ embed })
								.catch((err) => {
									console.log(err);
								});
						} else {
							console.log(`Unable to send message to modLogChannel (${guildSettings.modLogChannel})`);
						}
						client.log('log', `${message.guild.name}/#${message.channel.name} (${message.channel.id}):${message.author.tag} (${message.author.id}) tried to run disabled command ${message.content}`, 'CMD');
					}
				} else {
          
          var embed = client.createCommandEmbed('P', `${message.author.tag} (${message.author.id})`, `${message.content}`, `${message.channel.name} (${message.channel.id})`);
					/*const embed = new Discord.RichEmbed()
						.setColor('RED')
						.setTitle('No Permissions')
						.addField(`User`, `${message.author.tag} (${message.author.id})`, true)
						.addField(`Command`, `${message.content}`, true)
						.addField(`Channel`, `${message.channel.name} (${message.channel.id})`, true);*/
					if (message.guild.channels.find('name', guildSettings.modLogChannel)) {
						message.guild.channels.find('name', guildSettings.modLogChannel).send({ embed })
							.catch((err) => {
								console.log(err);
							});
					} else {
						console.log(`Unable to send message to modLogChannel (${guildSettings.modLogChannel})`);
					}
					client.log('log', `${message.guild.name}/#${message.channel.name} (${message.channel.id}):${message.author.tag} (${message.author.id}) tried to run command ${message.content} without having the correct permission level`, 'CMD');
				}
			} else {
        var embed = client.createCommandEmbed('N', `${message.author.tag} (${message.author.id})`, `${message.content}`, `${message.channel.name} (${message.channel.id})`);
				/*const embed = new Discord.RichEmbed()
					.setColor('RED')
					.setTitle('Non-existant Command')
					.addField(`User`, `${message.author.tag} (${message.author.id})`, true)
					.addField(`Command`, `${message.content}`, true)
					.addField(`Channel`, `${message.channel.name} (${message.channel.id})`, true);*/
				if (message.guild.channels.find('name', guildSettings.modLogChannel)) {
					message.guild.channels.find('name', guildSettings.modLogChannel).send({ embed })
						.catch((err) => {
							console.log(err);
						});
				} else {
					console.log(`Unable to send message to modLogChannel (${guildSettings.modLogChannel})`);
				}
				client.log('log', `${message.guild.name}/#${message.channel.name} (${message.channel.id}):${message.author.tag} (${message.author.id}) tried to run non-existant command ${message.content}`, 'CMD');
			}
		} else {
			cmd.run(client, message, args, level);
		}
	} else if (cmd) {
		if (level >= cmd.conf.permLevel) {
			if (cmd.conf.enabled) {
				cmd.run(client, message, args, level);
				if (client.config.defaultSettings.logCommandUsage === 'true') {client.log('log', `DM: ${message.author.tag} (${message.author.id}) ran command ${message.content}`, 'CMD');}
			} else if (client.config.defaultSettings.logCommandUsage === 'true') {client.log('log', `DM: ${message.author.tag} (${message.author.id}) tried to run disabled command ${message.content}`, 'CMD');}
		} else if (client.config.defaultSettings.logCommandUsage === 'true') {client.log('log', `DM: ${message.author.tag} (${message.author.id}) tried to run command without permissions: ${message.content}`, 'CMD');}
	}


	// Best Practice: **do not** reply with a message if the command does
	// not exist, or permissions lack.
};
