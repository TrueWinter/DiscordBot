if (process.version.slice(1).split('.')[0] < 8) throw new Error('Node 8.0.0 or higher is required.');

const Discord = require('discord.js');
const { promisify } = require('util');
const readdir = promisify(require('fs').readdir);
const Enmap = require('enmap');
const EnmapLevel = require('enmap-level');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
//const pg = require('pg'); // Coming soon!

const client = new Discord.Client();

try {
	client.config = require('./config.js');
} catch (err) {
	console.error('Unable to load config.js \n', err);
	process.exit(1);
}

if (client.config.debug === 'true') {
	console.warn('RUNNING IN DEBUG MODE. SOME PRIVATE INFORMATION (SUCH AS THE TOKEN) MAY BE LOGGED TO CONSOLE');
	client.on('error', (e) => console.log(e));
	client.on('warn', (e) => console.log(e));
	client.on('debug', (e) => console.log(e));
}


var allowedStatuses = ['online', 'idle', 'invisible', 'dnd'];

if (!allowedStatuses.includes(client.config.status)) {
	console.error('Bot status must be one of online/idle/invisible/dnd');
	process.exit(1);
}

require('./modules/functions.js')(client);
require('./modules/music.js')(client);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.settings = new Enmap({ provider: new EnmapLevel({ name: 'settings' }) });
client.tags = new Enmap({ provider: new EnmapLevel({ name: 'tags' }) });
client.points = new Enmap({ provider: new EnmapLevel({ name: 'points' }) });
//client.warnings = new Enmap({ provider: new EnmapLevel({ name: 'warnings' }) }); // Coming soon (format: `${guild.id}-${user.id}`)

client.talkedRecently = new Set();

if (client.config.musicEnabled === 'true') {
	client.musicQueue = new Map();

	client.YouTube = new YouTube(client.config.googleAPIToken);
	client.ytdl = ytdl;
}

const init = async () => {

	const cmdFiles = await readdir('./commands/');
	client.commandsNumber = cmdFiles.length;
	client.log('log', `Loading a total of ${client.commandsNumber} commands.`, 'LOAD');
	cmdFiles.forEach(f => {
		try {
			const props = require(`./commands/${f}`);
			if (f.split('.').slice(-1)[0] !== 'js') return;
			client.log('log', `Loading Command: ${props.help.name}.`, 'LOAD');
			client.commands.set(props.help.name, props);
			props.conf.aliases.forEach(alias => {
				client.aliases.set(alias, props.help.name);
			});
		} catch (e) {
			client.log('ERROR', `Unable to load command ${f}: ${e}`);
		}
	});

	const evtFiles = await readdir('./events/');
	client.log('log', `Loading a total of ${evtFiles.length} events.`, 'LOAD');
	evtFiles.forEach(file => {
		const eventName = file.split('.')[0];
		client.log('log', `Loading Event: ${eventName}.`, 'LOAD');
		const event = require(`./events/${file}`);
		client.on(eventName, event.bind(null, client));
		delete require.cache[require.resolve(`./events/${file}`)];
	});

	var token = client.config.token;

	process.on('unhandledRejection', err => {
		if (err.code === 'ENOTFOUND' || err.code === 'ECONNRESET' || err.code === 'ETIMEDOUT') {
			client.log('ERROR', `Bot connection error: ${err.code}`);
		} else {
			client.log('ERROR', `Uncaught Promise Error: \n${err.stack}`);
		}
	});

	client.login(token);


};

init();
