const { exec } = require('child_process');

exports.run = async (client, message, args) => {
	var code = args.join(' ');
	if (!code) {
		return message.reply('You need to give me some code...');
	}
	if (client.config.blockConfigEval === 'true') {
		//if (message.content.toLowerCase().indexOf('config.js') !== -1 || message.content.toLowerCase().indexOf('client.config') !== -1) {
		//	return message.reply('No, you cannot leak your config file...');
		//}
	}
	message.reply(`Running command \`${code.replace('`', '\`')}\`... Please wait. _(The exec command **will** terminate the exec process if it takes longer that 10 seconds)_`); // eslint-disable-line no-useless-escape
	exec(`${code}`, { timeout: 10000 }, (error, stdout) => {
		const response = (error || stdout); // eslint-disable-line no-extra-parens
		const clean = client.clean(client, response);

		if (response.length > 1800) { // Had to add this
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
		} else {
			console.log(`${message.author.tag} (${message.author.id}) ran console command: \`${code}\``);
			message.channel.send(`\`OUTPUT\` \n\`\`\`\n${response}\`\`\``).catch(console.error);
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
