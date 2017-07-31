exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const uses = args[0];
  message.guild.channel.createInvite({maxUses: uses});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: "createinvite",
  category: "Miscelaneous",
  description: "Creates an invite to the channel it is sent in",
  usage: "createinvite [uses]"
};
