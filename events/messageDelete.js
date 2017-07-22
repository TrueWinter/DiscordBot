module.exports = (client, message) => {
  configFile = require('../config.json');
  client.log("log", ` Message sent by ${message.author.tag} (${message.author.id}) sent in ${message.guild.name} (${message.guild.id})/#${message.channel.name} (${message.channel.id}) that had the content of \`${message.content}\` was deleted`, "Message Deleted");
  message.guild.channels.find('name', configFile.defaultSettings.modLogChannel).send(`Message sent by ${message.author.tag} (${message.author.id}) in ${message.channel.name} (${message.channel.id}) that had the content of \`${message.content}\` was deleted`)
};
