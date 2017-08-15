const Discord = require("discord.js");
exports.run = async (client, message, args, level) => {
  var game;
  if (!message.author.presence.game) {
    game = 'No Game';
  } else {
    game = message.author.presence.game;
  }
  const embed = new Discord.RichEmbed()
  .setColor("RED")
  .setAuthor(message.author.tag, message.author.displayAvatarURL)
  .setTitle("User Info")
  .setThumbnail(message.author.displayAvatarURL)
  .addField(`User`, `${message.author.tag}`, true)
  .addField(`ID`, `${message.author.id}`, true)
  .addField(`Game`, `${game}`, true)
  .addField(`Created At`, `${message.author.createdAt.toDateString()}`, true)
  .addField(`Joined At`, `${message.member.joinedAt.toDateString()}`, true)
  message.channel.send({ embed });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "userinfo",
  category: "Miscelaneous",
  description: "Will give you stats about your Discord account",
  usage: "userinfo"
};
