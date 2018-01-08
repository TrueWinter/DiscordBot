exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
	var time = args[0];
	var reminder = args.splice(1).join(' ');

	if (!time) return message.reply('Can\'t remind you if I don\'t know when to do so...');
	if (!reminder) return message.reply('You forgot the reminder');

	// This will not work if the bot is restarted or stopped

	time = await time.toString();

	if (time.indexOf('s') !== -1) { // Seconds
		var timesec = await time.replace(/s.*/, '');
		var timems = await timesec * 1000;
	} else if (time.indexOf('m') !== -1) { // Minutes
		var timemin = await time.replace(/m.*/, '');
		timems = await timemin * 60 * 1000;
	} else if (time.indexOf('h') !== -1) { // Hours
		var timehour = await time.replace(/h.*/, '');
		timems = await timehour * 60 * 60 * 1000;
	} else if (time.indexOf('d') !== -1) { // Days
		var timeday = await time.replace(/d.*/, '');
		timems = await timeday * 60 * 60 * 24 * 1000;
	}	else {
		return message.reply('The time must be in the format of <number>[s/m/h/d]');
	}

	message.reply(`I will remind you in \`${time}\` about \`${reminder}\``);

	setTimeout(function () {
		message.reply(`You asked me \`${time}\` ago to remind you about \`${reminder}\``);
	}, parseInt(timems));

};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['remind', 'reminder'],
	permLevel: 0
};

exports.help = {
	name: 'remindme',
	category: 'Utilities',
	description: 'For when you need to remember something',
	usage: 'remindme [s/m/h/d] [reminder]'
};
