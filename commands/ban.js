exports.run = async (client, message, args, level) => {
	configFile = require("../config.json");
	const Discord = require("discord.js");
		let member = message.mentions.members.first();
		if(!member)
			return message.reply("Please mention a valid member of this server");
		if(!member.bannable)
			return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

		let reason = args.slice(2).join(' ');
		if(!reason)
			return message.reply("Please indicate a reason for the ban!");

		message.guild.ban(member, message.author.username + " banned this user with reason: " + reason)
		.catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
		message.reply(`${member.user.tag} (${member.user.id}) has been banned by ${message.author.tag} because: ${reason}`);
		const embed = new Discord.RichEmbed()
    .setColor("RED")
    .setTitle("User Banned")
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
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: "ban",
  category: "Moderation",
  description: "Ban hammer time",
  usage: "ban [@\\user] [reason]"
};
