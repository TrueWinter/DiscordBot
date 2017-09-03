exports.run = async (client, message, args, level) => {
	configFile = require("../config.json");
	const Discord = require("discord.js");
		let member = args[0];
		if(isNaN(member))
			return message.reply("Please give a user ID to ban");

		let reason = args.slice(1).join(' ');
		if(!reason)
			return message.reply("Please indicate a reason for the ban!");

		message.guild.ban(member)
		.catch(error => message.reply(`Sorry, I couldn't ban because of : ${error}`));
		message.reply(`${member} has been banned by ${message.author.tag} because: ${reason}`);
		const embed = new Discord.RichEmbed()
    .setColor("RED")
    .setTitle("User force banned")
    .addField(`User`, `${member}`, true)
    .addField(`Moderator`, `${message.author.tag} (${message.author.id})`, true)
    .addField(`Reason`, `${reason}`, true);
    message.guild.channels.find('name', configFile.defaultSettings.modLogChannel).send({embed})
    .then(() => {
      client.log("log", `${message.guild.name}/#${message.channel.name} (${message.channel.id}): ${member} was force banned by ${message.author.tag} (${message.author.id})`, "CMD");
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
  name: "forceban",
  category: "Moderation",
  description: "Bans a user by user ID",
  usage: "forceban [user ID] [reason]"
};
