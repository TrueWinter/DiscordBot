// The EVAL command will execute **ANY** arbitrary javascript code given to it.
// THIS IS PERMISSION LEVEL 10 FOR A REASON! It's perm level 10 because eval
// can be used to do **anything** on your machine, from stealing information to
// purging the hard drive. DO NOT LET ANYONE ELSE USE THIS


// However it's, like, super ultra useful for troubleshooting and doing stuff
// you don't want to put in a command.
var Discord = require('discord.js');
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
	var time = Date.now();
	const code = args.join(' ');
	if (!code) {
		return message.reply('You need to give me some code...');
	}
	try {
		const evaled = eval(code);
		const clean = await client.clean(client, evaled);
		if (clean.length > 1800) {
			message.channel.send(`${clean}\n\nTime taken: ${Date.now() - time}ms`, { code: 'xl', split: true }).catch(console.error);
		} else {
			var evalEmbed = new Discord.RichEmbed()
				.setAuthor(client.user.username, client.user.avatarURL || client.user.defaultAvatarURL)
				.setTitle('Eval Output')
				.setColor('GREEN')
				.setDescription(`\`\`\`xl\n${clean}\`\`\``)
				.setFooter(`Time taken: ${Date.now() - time}ms`);
			message.channel.send({ embed: evalEmbed }).catch(console.error);
		}
	} catch (err) {
		if (err.message.length < 150) {
			var errorClean = await client.clean(client, err.message);
			var errorEmbed = new Discord.RichEmbed()
				.setTitle('ERROR (Check console for error stack)')
				.setColor('RED')
				.setAuthor(client.user.username, client.user.avatarURL || client.user.defaultAvatarURL)
				.setDescription(`\`\`\`xl\n${errorClean}\`\`\``)
				.setFooter(`Time taken: ${Date.now() - time}ms`);
			message.channel.send({ embed: errorEmbed }).catch(console.error);
		} else {
			message.channel.send(`\`ERROR (Check console for error stack)\` \`\`\`xl\n${await client.clean(client, err.message)}\n\nTime taken: ${Date.now() - time}ms\n\`\`\``, { split: true }).catch(console.error);
		}
		console.log(err);
	}
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 10 // DO NOT LOWER THIS!!!!!!!!
};

exports.help = {
	name: 'eval',
	category: 'System',
	description: 'Evaluates arbitrary javascript. With great power comes great responsibility',
	usage: 'eval [code]'
};
