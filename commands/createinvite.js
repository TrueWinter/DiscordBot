exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const uses = args[0];
  const age = args[1];

  if (!uses) {
    return message.reply("You forgot to say how many uses the invite has...");
  }
  if (!age) {
    message.reply("As you forgot to include the max age of the invite (in seconds) it will not expire");
    age = 0;
  }
  const invite = message.guild.channel.createInvite({maxUses: uses, maxAge: age});
  message.channel.send(`Your invite \`${invite}\` with settings \`maxUses: ${uses}, maxAge: ${age}\``)
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
