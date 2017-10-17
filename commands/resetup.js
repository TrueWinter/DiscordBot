exports.run = async (client, message, args, level) => {
  client.settings.delete(guild.id);
  setTimeout(function () {
    client.settings.set(guild.id, client.config.defaultSettings);
  }, 1000);
  message.reply('Done');
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
