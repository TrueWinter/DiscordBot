exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
	var uses = args[0];
	var age = args[1];

	if (!uses) {
		return message.reply('You forgot to say how many uses the invite has...');
	}
	if (!age) {
		message.reply('As you forgot to include the max age of the invite it will not expire');
		age = await 0;
	}

	uses = await uses.toString(); // Have to convert to string for indexOf(...) below

	if (uses.indexOf('.') !== -1) {
		return message.reply('How can you invite only a part of a person? :confused:'); // There will always be those people
	}

	age = await age.toString();

	if (age.indexOf('s') !== -1) { // Seconds
		age = await age.replace(/s.*/, '');
	} else if (age.indexOf('m') !== -1) { // Minutes
		var agemin = await age.replace(/m.*/, '');
		age = await agemin * 60;
	} else if (age.indexOf('h') !== -1) { // Hours
		var agehour = await age.replace(/h.*/, '');
		age = await agehour * 60 * 60;
	} else if (age.indexOf('d') !== -1) { // Days
		var ageday = await age.replace(/d.*/, '');
		age = await ageday * 60 * 60 * 24;
	} else {
		if (age.indexOf('.') !== -1) {
			return message.reply('Nope, seconds must be whole numbers.'); // For people who want to do this
		}
		age = await age; // No value letter can be found. This is seconds
	}

	message.channel.createInvite({ maxUses: uses, maxAge: age }).then((invite) => {
		//console.log(invite);
		message.channel.send(`Your invite \`${invite}\` with settings \`maxUses: ${uses}, maxAge: ${age}\``);
	});
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: 2
};

exports.help = {
	name: 'createinvite',
	category: 'Moderation',
	description: 'Creates an invite to the channel it is sent in. Example usage: `createinvite 1 5m` will create a single use invite valid for 5 mintues',
	usage: 'createinvite [uses]\ncreateinvite [uses] [time (s/m/h/d)]'
};
