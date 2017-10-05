exports.run = async (client, message, args, level) => {
	configFile = require("./config");
	const Discord = require("discord.js");
		let member = args[0];
		if(isNaN(member))
			return message.reply("Please give a user ID to unban");

		let reason = args.slice(1).join(' ');
		if(!reason)
			return message.reply("Please indicate a reason for the unban!");

		message.guild.unban(member).then(() => {
      message.reply(`${member} has been unbanned by ${message.author.tag} because: ${reason}`);
      const embed = new Discord.RichEmbed()
      .setColor("RED")
      .setTitle("User unbanned")
      .addField(`User`, `${member}`, true)
      .addField(`Moderator`, `${message.author.tag} (${message.author.id})`, true)
      .addField(`Reason`, `${reason}`, true);
      message.guild.channels.find('name', configFile.defaultSettings.modLogChannel).send({embed})
      .then(() => {
        client.log("log", `${message.guild.name}/#${message.channel.name} (${message.channel.id}): ${member} was unbanned by ${message.author.tag} (${message.author.id})`, "CMD");
        })
        .catch((err) => {
          console.log(err);
        });
    })
		.catch(error => message.reply(`Sorry, I couldn't unban because of : ${error}`));

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
