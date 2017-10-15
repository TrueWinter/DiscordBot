exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  var sayMessage = args.join(" ");
    message.delete().catch(O_o=>{});
    message.channel.send(sayMessage);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: "say",
  category: "Miscelaneous",
  description: "It says what you say",
  usage: "say [something]"
};
