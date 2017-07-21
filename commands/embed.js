exports.run = async (client, message, args, level) => {
  const embed = new Discord.RichEmbed()
      .setDescription(args.join(" "))
      .setColor([114, 137, 218]);
    msg.channel.send({embed});
  };
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "embed",
  category: "Miscelaneous",
  description: "Embeds something",
  usage: "embed [description]"
};
