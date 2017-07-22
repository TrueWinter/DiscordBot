module.exports = (client, message) => {
  configFile = require('../config.json');
  client.log("log", `${message.author.tag} (${message.author.id}) deleted their message in ${message.guild.name} (${message.guild.id})/#${message.channel.name} (${message.channel.id}) that had the content of \`${message.content}\``, "Message Deleted");
  message.guild.channels.find('name', configFile.defaultSettings.modLogChannel).send(`${message.author.tag} (${message.author.id}) deleted their message in ${message.channel.name} (${message.channel.id}) that had the content of \`${message.content}\``)
};
