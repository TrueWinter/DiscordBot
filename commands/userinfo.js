const Discord = require('discord.js');
exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars
	var time = Date.now();
	let member = message.mentions.users.first();
	//if (!member) return message.reply('Please mention a valid member of this server');
	var user;
	if (!member && !args[0]) {
		user = message.author;
	} else if (args[0] && !member) {
		if (isNaN(args[0])) return message.reply('Not a user ID');
		user = client.users.get(args[0]);
		if (!user) return message.reply('User not found');
	} else {
		user = member;
	}

	console.log(user);

	// TODO: Allow you to check stats of other user
	var game;
	if (!user.presence.game) {
		game = 'No Game';
	} else {
		game = user.presence.game.name;
	}

	const embed = new Discord.RichEmbed()
		.setColor('RED')
		.setAuthor(user.tag, user.displayAvatarURL)
		.setTitle('User Info')
		.setThumbnail(user.displayAvatarURL)
		.addField(`User`, `${user.tag}`, true)
		.addField(`ID`, `${user.id}`, true)
		.addField(`Game`, `${game}`, true)
		.addField(`Created At`, `${user.createdAt.toDateString()}`, true)
		.setFooter(`Time taken: ${Date.now() - time}ms`);

	if (message.channel.type !== 'dm') {
		embed.addField(`Joined At`, `${message.guild.members.get(user.id).joinedAt.toDateString()}`, true)
			.addField(`Roles`, `${message.guild.members.get(user.id).roles.filter(r => r.position !== 0).map(R => R.name).join(', ') || 'No Roles'}`, true); // Filter is to filter out @everyone role
	}
	message.channel.send({ embed });
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['ui'],
	permLevel: 0
};

exports.help = {
	name: 'userinfo',
	category: 'Miscelaneous',
	description: 'Will give you stats about your (or another guild member\'s) Discord account',
	usage: 'userinfo\n userinfo [user mention]'
};
