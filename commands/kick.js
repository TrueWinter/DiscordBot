exports.run = async (client, message, args, level) => {

		let member = message.mentions.members.first();
		if(!member)
			return message.reply("Please mention a valid member of this server");
		if(!member.kickable)
			return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");

		let reason = args.slice(1).join(' ');
		if(!reason)
			return message.reply("Please indicate a reason for the kick!");

			member.kick(message.author.username + " kicked this user with reason: " + reason)
			.catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
			message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: "kick",
  category: "Moderation",
  description: "Kicks a user",
  usage: "kick [@\\user] [reason]"
};
