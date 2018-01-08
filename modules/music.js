// Code from: https://github.com/iCrawl/Music-Bot

const { Util } = require('discord.js');
const ytdl = require('ytdl-core');
module.exports = (client) => {

	client.handleVideo = async function handleVideo(video, msg, voiceChannel, playlist = false) {
		const serverQueue = client.musicQueue.get(msg.guild.id);
		console.log(video.title);
		const song = {
			id: video.id,
			title: Util.escapeMarkdown(video.title),
			url: `https://www.youtube.com/watch?v=${video.id}`
		};
		if (!serverQueue) {
			const queueConstruct = {
				textChannel: msg.channel,
				voiceChannel: voiceChannel,
				connection: null,
				songs: [],
				volume: 5,
				playing: true
			};
			client.musicQueue.set(msg.guild.id, queueConstruct);

			queueConstruct.songs.push(song);

			try {
				var connection = await voiceChannel.join();
				queueConstruct.connection = connection;
				play(msg.guild, queueConstruct.songs[0]);
			} catch (error) {
				console.error(`I could not join the voice channel: ${error}`);
				client.musicQueue.delete(msg.guild.id);
				return msg.channel.send(`I could not join the voice channel: ${error}`);
			}
		} else {
			serverQueue.songs.push(song);
			console.log(serverQueue.songs);
			if (playlist) return undefined;
			else return msg.channel.send(`✅ **${song.title}** has been added to the queue!`);
		}
		return undefined;
	};

	function play(guild, song) {
		const serverQueue = client.musicQueue.get(guild.id);

		if (!song) {
			serverQueue.voiceChannel.leave();
			client.musicQueue.delete(guild.id);
			return;
		}
		console.log(serverQueue.songs);

		const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
			.on('end', reason => {
				setTimeout(() => {
					if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
					else console.log(reason);
					serverQueue.songs.shift();
					play(guild, serverQueue.songs[0]);
				}, 100);
			})
			.on('error', error => console.error(error));
		dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

		serverQueue.textChannel.send(`🎶 Start playing: **${song.title}**`);
	}
};
