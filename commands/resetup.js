const { inspect } = require("util");

exports.run = async (client, message, args, level) => {
  //if (args === "viewAll") {
    message.channel.send(inspect(client.settings), {code: "json"});
  //}
  //const guild = client.guilds.get(message.guild.id);
  //client.settings.set(guild.id, client.config.defaultSettings);
  //message.reply('Done');
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 10
};

exports.help = {
  name: "resetup",
  category: "System",
  description: "This is a command only to be used by the bot owner. It will delete the current settings for a guild and give it the default settings",
  usage: "resetup"
};
