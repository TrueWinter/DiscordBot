exports.run = async (client, message, args, level) => {
	const Discord = require("discord.js");
	var configFile = require("./config");
		let member = message.mentions.members.first();
		if(!member)
			return message.reply("Please mention a valid member of this server");
		if(!member.kickable)
			return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");

		let reason = args.slice(1).join(' ');
		if(!reason)
			return message.reply("Please indicate a reason for the kick!");

			member.kick(message.author.username + " kicked this user with reason: " + reason).then(() => {
				message.reply(`${member.user.tag} (${member.user.id}) has been kicked by ${message.author.tag} (${message.author.id}) because: ${reason}`);
				const embed = new Discord.RichEmbed()
				.setColor("RED")
				.setTitle("User Kicked")
				.addField(`User`, `${member.user.tag} (${member.user.id})`, true)
				.addField(`Moderator`, `${message.author.tag} (${message.author.id})`, true)
				.addField(`Reason`, `${reason}`, true);
				message.guild.channels.find('name', configFile.defaultSettings.modLogChannel).send({embed})
				.then(() => {
					client.log("log", `${message.guild.name}/#${message.channel.name} (${message.channel.id}): ${member.user.tag} (${member.user.id}) was banned by ${message.author.tag} (${message.author.id})`, "CMD");
					})
					.catch((err) => {
						console.log(err);
					});
			})
			.catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
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
