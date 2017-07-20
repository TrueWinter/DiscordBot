exports.run = async (client, message, args, level) => {
	if (message.channel.type === "dm") {
		 message.channel.send("This is not a command that can be used in a direct message.");
	} else {
			message.channel.send(message.author + ", Bot has been stopped")
			.then((err) => {
				console.log("Bot stopped by " + message.author.username + "#" + message.author.discriminator + " (" + message.author.id + ")");
				process.exit(1);
			});
		}
	}
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 10
};

exports.help = {
  name: "stopbot",
  category: "System",
  description: "Stops the bot",
  usage: "stopbot"
};
