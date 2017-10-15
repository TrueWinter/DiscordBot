exports.run = async (client, message, args, level) => {

			message.channel.send(message.author + ", Bot has been stopped (or restarted if you use a process manager)")
			.then((err) => {
				console.log("Bot stopped by " + message.author.username + "#" + message.author.discriminator + " (" + message.author.id + ")");
				process.exit(0);
			});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["restart"],
  permLevel: 10
};

exports.help = {
  name: "stopbot",
  category: "System",
  description: "Stops the bot",
  usage: "stopbot"
};
