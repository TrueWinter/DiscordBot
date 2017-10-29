// The EVAL command will execute **ANY** arbitrary javascript code given to it.
// THIS IS PERMISSION LEVEL 10 FOR A REASON! It's perm level 10 because eval
// can be used to do **anything** on your machine, from stealing information to
// purging the hard drive. DO NOT LET ANYONE ELSE USE THIS


// However it's, like, super ultra useful for troubleshooting and doing stuff
// you don't want to put in a command.
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
	const code = args.join(' ');
	if (!code) {
		return message.reply('You need to give me some code...');
	}
	if (client.config.blockConfigEval === 'true') {
		if (message.content.match(/((client\.config)|(config\.js))/g)) {
			return message.reply('No, you cannot leak your config file...');
		}
	}
	try {
		const evaled = eval(code);
		const clean = await client.clean(client, evaled);
		message.channel.send(`\`\`\`xl\n${clean}\n\`\`\``);
	} catch (err) {
		message.channel.send(`\`ERROR\` \`\`\`xl\n${await client.clean(client, err)}\n\`\`\``);
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
