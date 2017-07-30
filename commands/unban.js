exports.run = async (client, message, args, level) => {
	configFile = require("../config.json");
	if (message.channel.type === "dm") {
		  message.channel.send("This is not a command that can be used in a direct message.");
	} else {

		let member = args[0];
		if(isNaN(member))
			return message.reply("Please give a user ID to unban");

		let reason = args.slice(1).join(' ');
		if(!reason)
			return message.reply("Please indicate a reason for the unban!");

		member.ban(message.author.username + " unbanned this user with reason: " + reason)
		.catch(error => message.reply(`Sorry, I couldn't unban because of : ${error}`));
		message.reply(`${member.user.id} has been unbanned by ${message.author.tag} because: ${reason}`);
		message.guild.channels.find('name', configFile.defaultSettings.modLogChannel).send(`${member.user.id} was unbanned by ${message.author.tag} (${message.author.id}) with reason: \`${reason}\``).catch((error) => { console.log(error) });
	}
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: "unban",
  category: "Moderation",
  description: "Unbans a user",
  usage: "unban [user ID] [reason]"
};
