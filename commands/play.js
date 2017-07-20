exports.run = async (client, message, args, level) => {
	const yt = require('ytdl-core');
	const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel){
      return message.channel.sendMessage(":x: You are not in a voice channel!!");
    }
	message.channel.sendMessage(":white_check_mark: **Connected!**");
    voiceChannel.join()
    .then(connection => {
      let stream = yt(args.join(" "), {audioonly: true});
      yt.getInfo(args.join(" "), function(err, info) {
      const title = info.title
	  message.channel.sendMessage(`Now playing \`${title}\``)
      })
      const dispatcher = connection.playStream(stream);
      dispatcher.on('end', () => {
         voiceChannel.leave();
       }).catch(e =>{
         console.error(e);
       });
    })
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "play",
  category: "Music",
  description: "Plays a song from YouTube",
  usage: "play [song name]"
};
