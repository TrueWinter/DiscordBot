const { exec } = require('child_process');
const Discord = require('discord.js');

exports.run = async (client, message, args) => {
	var time = Date.now();
	var code = args.join(' ');
	if (!code) {
		return message.reply('You need to give me some code...');
	}
	if (client.config.blockConfigEval === 'true') {
		//if (message.content.toLowerCase().indexOf('config.js') !== -1 || message.content.toLowerCase().indexOf('client.config') !== -1) {
		//	return message.reply('No, you cannot leak your config file...');
		//}
	}
	message.reply(`Running command \`${code.replace('`', '\`')}\`... Please wait. _(The exec command **will** terminate the exec process if it takes longer that 15 seconds)_`); // eslint-disable-line no-useless-escape
	exec(`${code}`, { timeout: 15000 }, (error, stdout) => {
		var response = (error || stdout); // eslint-disable-line no-extra-parens

		if (error) {
			if (error.message.length > 150) {
				message.channel.send(`${error.message}\n\n${Date.now() - time}ms`, { code: 'xl', split: true }).catch(console.error);
			} else {
				var evalEmbed = new Discord.RichEmbed()
					.setAuthor(client.user.username, client.user.avatarURL || client.user.defaultAvatarURL)
					.setTitle('Eval ERROR')
					.setColor('RED')
					.setDescription(`\`\`\`xl\n${error.message}\`\`\``)
					.setFooter(`Time taken: ${Date.now() - time}ms`);
				console.error(error);
				return message.channel.send({ embed: evalEmbed }).catch(console.error);
			}
		}
		//console.log(response.message);

		var clean = response // Had to add this here as the client.clean function stringified it resulting in something like this: https://ndt3.got-lost-in.space/f6b575.png
			.replace(/`/g, '`' + String.fromCharCode(8203)) // eslint-disable-line prefer-template
			.replace(/@/g, '@' + String.fromCharCode(8203)) // eslint-disable-line prefer-template
			.replace(/\n/g, '\n' + String.fromCharCode(8203)) // eslint-disable-line prefer-template
			.replace(client.config.token, 'mfa.VkO_2G4Qv3T-- NO TOKEN HERE... --')
			.replace(client.config.dashboard.oauthSecret, 'Nk-- NOPE --...')
			.replace(client.config.dashboard.sessionSecret, 'B8-- NOPE --...')
			.replace(client.config.cleverbotToken, 'CC-- NOPE --...')
			.replace(client.config.googleAPIToken, 'AI-- NOPE --...');

		/*if (response.length > 1800) { // Had to add this // Well, all of this can go now (I think)...
			var chunks = [];

			for (var i = 0, charsLength = response.length; i < charsLength; i += 1800) {
				chunks.push('```' + clean.substring(i, i + 1800) + '```'); // eslint-disable-line prefer-template, no-useless-escape, newline-per-chained-call
			}

			//console.log(chunks);
			message.channel.send(`\`OUTPUT\``);
			for (var c = 0; c < chunks.length; c++) {
				//endOutput += chunks[i];
				message.channel.send(`${chunks[c]}`).catch(console.error);
			}
			console.log(`${message.author.tag} (${message.author.id}) ran console command that was split into ${chunks.length} parts: \`${code}\``);
			//message.channel.send(`\`OUTPUT\` \n\`\`\`\n${endOutput}\`\`\``,).catch(console.error);
		} else {*/
		console.log(`${message.author.tag} (${message.author.id}) ran console command: \`${code}\``);

		if (clean.length > 1800) {
			message.channel.send(`${clean}\n\n${Date.now() - time}ms`, { code: 'xl', split: true }).catch(console.error);
		} else {
			evalEmbed = new Discord.RichEmbed()
				.setAuthor(client.user.username, client.user.avatarURL || client.user.defaultAvatarURL)
				.setTitle('Eval Output')
				.setColor('GREEN')
				.setDescription(`\`\`\`xl\n${clean}\`\`\``)
				.setFooter(`Time taken: ${Date.now() - time}ms`);
			message.channel.send({ embed: evalEmbed }).catch(console.error);
		}
	});
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 10
};

exports.help = {
	name: 'exec',
	category: 'System',
	description: 'Executes a console command.',
	usage: 'exec [command]'
};
