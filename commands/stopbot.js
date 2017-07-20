exports.run = async (client, message, args, level) => {
	if (message.channel.type === "dm") {
		 message.channel.send("This is not a command that can be used in a direct message.");
	} else {
		if(!message.member.roles.some(r=>["Owner", "test"].includes(r.name)) ) {
			return message.reply("Sorry, you don't have permissions to use this!");
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
