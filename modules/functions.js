var moment = require('moment');

module.exports = (client) => {

	/*
	PERMISSION LEVEL FUNCTION

	This is a very basic permission system for commands which uses "levels"
	"spaces" are intentionally left black so you can add them if you want.
	NEVER GIVE ANYONE BUT OWNER THE LEVEL 10! By default this can run any
	command including the VERY DANGEROUS `eval` and `exec` commands!

	*/
	client.permlevel = message => {
		let permlvl = 0;

		// If bot owner, return max perm level
		var ownerID = client.config.ownerID;

		if (message.author.id === ownerID) return 10;

		// If DMs or webhook, return 0 perm level.
		if (message.channel.type === 'dm' || !message.member) return 0;

		// The rest of the perms rely on roles. If those roles are not found
		// in the settings, or the user does not have it, their level will be 0
		try {
			const modRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.modRole.toLowerCase());
			if (modRole && message.member.roles.has(modRole.id)) permlvl = 2;
		} catch (e) {
			console.warn('modRole not present in guild settings. Skipping Moderator (level 2) check');
		}
		try {
			const adminRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.adminRole.toLowerCase());
			if (adminRole && message.member.roles.has(adminRole.id)) permlvl = 3;
		} catch (e) {
			console.warn('adminRole not present in guild settings. Skipping Administrator (level 3) check');
		}

		// Guild Owner gets an extra level, wooh!
		if (message.author.id === message.guild.owner.id) permlvl = 4;

		return permlvl;
	};

	client.permLevels = {
		0: 'User',
		2: 'Guild Moderator',
		3: 'Guild Administrator',
		4: 'Guild Owner',
		10: 'Bot Owner'
	};

	client.pointsMonitor = (client, message) => {
		if (message.channel.type !== 'text') return;
		const settings = client.settings.get(message.guild.id);
		if (message.content.startsWith(settings.prefix)) return;
		const score = client.points.get(`${message.guild.id}-${message.author.id}`) || { points: 0, level: 0 };
		score.points++;
		const curLevel = Math.floor(0.1 * Math.sqrt(score.points));
		if (score.level < curLevel) {
			message.reply(`You've leveled up to level **${curLevel}**!`);
			score.level = curLevel;
		}
		client.points.set(`${message.guild.id}-${message.author.id}`, score);
	};

	/*
	LOGGING FUNCTION

	Logs to console. Future patches may include time+colors
	*/
	client.log = (type, msg, title) => {
		var time = moment().format(client.config.logTimeFormat);
		if (!title) title = 'Log';
		console.log(`${time}: [${type}] [${title}] ${msg}`);
	};


	/*
	SINGLE-LINE AWAITMESSAGE

	A simple way to grab a single reply, from the user that initiated
	the command. Useful to get "precisions" on certain things...

	USAGE

	const response = await client.awaitReply(msg, "Favourite Color?");
	msg.reply(`Oh, I really love ${response} too!`);

	*/
	client.awaitReply = async (msg, question, limit = 60000) => {
		const filter = m => m.author.id = msg.author.id;
		await msg.channel.send(question);
		try {
			const collected = await msg.channel.awaitMessages(filter, { max: 1, time: limit, errors: ['time'] });
			return collected.first().content;
		} catch (e) {
			return false;
		}
	};


	/*
	MESSAGE CLEAN FUNCTION

	"Clean" removes @everyone pings, as well as tokens, and makes code blocks
	escaped so they're shown more easily. As a bonus it resolves promises
	and stringifies objects!
	This is mostly only used by the Eval and Exec commands.
	*/
	client.clean = (client, text) => {
		//if (text && text.constructor.name === 'Promise') text = await text;
		if (typeof evaled !== 'string') text = require('util').inspect(text, { depth: 0 });
		//console.log(`T (${typeof text}): ${text}`);

		var t = text
			.replace(/`/g, '`' + String.fromCharCode(8203)) // eslint-disable-line prefer-template
			.replace(/@/g, '@' + String.fromCharCode(8203)) // eslint-disable-line prefer-template
			.replace(/\n/g, '\n' + String.fromCharCode(8203)) // eslint-disable-line prefer-template
			.replace(client.config.token, 'mfa.VkO_2G4Qv3T-- NO TOKEN HERE --')
			.replace(client.config.dashboard.oauthSecret, 'Nk-- NOPE --')
			.replace(client.config.dashboard.sessionSecret, 'B8-- NOPE --')
			.replace(client.config.cleverbotToken, 'CC-- NOPE --')
			.replace(client.config.googleAPIToken, 'AI-- NOPE --...');

		//console.log(`T2 (${typeof t}): ${t}`);

		return t;
	};


	/* MISCELANEOUS NON-CRITICAL FUNCTIONS */

	String.prototype.toProperCase = function() {
		return this.replace(/([^\W_]+[^\s-]*) */g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	};

	// `await wait(1000);` to "pause" for 1 second.
	global.wait = require('util').promisify(setTimeout);


	// Another semi-useful utility command, which creates a "range" of numbers
	// in an array. `range(10).forEach()` loops 10 times for instance. Why?
	// Because honestly for...i loops are ugly.
	global.range = (count, start = 0) => {
		const myArr = [];
		for (var i = 0; i < count; i++) {
			myArr[i] = i + start;
		}
		return myArr;
	};

	client.version = require('../package.json').version;

	// These 2 simply handle unhandled things. Like Magic. /shrug
	process.on('uncaughtException', (err) => {
		const errorMsg = err.stack.replace(new RegExp(`${__dirname}\/`, 'g'), './'); // eslint-disable-line no-useless-escape
		console.error('Uncaught Exception: ', errorMsg);
	});

	process.on('unhandledRejection', err => {
		console.error('Uncaught Promise Error: ', err);
	});
};
