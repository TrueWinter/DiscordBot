// The MESSAGE event runs anytime a message is received
// Note that due to the binding of client to every event, every event
// goes `client, other, args` when this function is run.
const Discord = require("discord.js");
module.exports = (client, message) => {
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").

  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  var configFile = require('../config.json');

  if (configFile.inviteFilter.enabled === "true") {
    if (message.content.match(/(discord\.(gg|me|io)|(discordapp\.com|discord\.com)\/invite).*/)) {
      //if (message.content.match(/(discord\.(gg|me|io)|(discordapp\.com|discord\.com)\/invite)\/(discord-testers|discord-developers)/)) {
    //  } else {
    //  var invite = message.content.split('discord.gg/');
      //message.channel.send(invite[1]);
      //var invite = invite[1];
      //if (!(invite === 'discord-testers' || invite === 'discord-developers' || invite === 'discord-feedback' || invite === 'events' || invite === 'gamenight' || invite === 'discord-linux' || invite === 'discord-api')) { // Invite whitelist, by default includes some official and official/unoffical Discord servers
        message.delete();
        message.channel.send('<@' + message.author.id +'>, Invite links are not allowed');
      //}
      //}
    }
  }

  // Grab the settings for this server from the PersistentCollection
  const settings = client.settings.get(message.guild.id);

  // For ease of use in commands and functions, we'll attach the settings
  // to the message object, so `message.settings` is accessible.
  message.settings = settings;

  // Also good practice to ignore any message that does not start with our prefix,
  // which is set in the configuration file.
  if(message.content.indexOf(settings.prefix) !== 0) return;

  // Here we separate our "command" name, and our "arguments" for the command.
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.split(/\s+/g);
  const command = args.shift().slice(settings.prefix.length).toLowerCase();

  // Get the user or member's permission level from the elevation
  const level = client.permlevel(message);

  // Check whether the command, or alias, exist in the collections defined
  // in app.js.
  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
  // using this const varName = thing OR otherthign; is a pretty efficient
  // and clean way to grab one of 2 values!

  // If the command exists, **AND** the user has permission and it is not disabled, run it. Else, give error
  if(cmd) {
    if(level >= cmd.conf.permLevel) {
      if(cmd.conf.enabled === true) {
        const embed = new Discord.RichEmbed()
        .setColor("RED")
        .setTitle("Command Used")
        .addField(`User`, `${message.author.tag} (${message.author.id})`, true)
        .addField(`Command`, `${message.content}`, true)
        .addField(`Channel`, `${message.channel.name} (${message.channel.id})`, true)
        message.guild.channels.find('name', configFile.defaultSettings.modLogChannel).send({ embed }).then ((e) => {
          client.log("log", `${message.guild.name}/#${message.channel.name} (${message.channel.id}):${message.author.username} (${message.author.id}) ran command ${message.content}`, "CMD");
          }).catch((e) => {
            console.log(e);
          });
          cmd.run(client, message, args, level);
        } else {
          message.reply("This command is disabled");
          const embed = new Discord.RichEmbed()
          .setColor("RED")
          .setTitle("Disabled Command Usage")
          .addField(`User`, `${message.author.tag} (${message.author.id})`, true)
          .addField(`Command`, `${message.content}`, true)
          .addField(`Channel`, `${message.channel.name} (${message.channel.id})`, true)
          message.guild.channels.find('name', configFile.defaultSettings.modLogChannel).send({ embed }).catch ((e) => { console.log(e)});
          client.log("log", `${message.guild.name}/#${message.channel.name} (${message.channel.id}):${message.author.username} (${message.author.id}) tried to run disabled command ${message.content}`, "CMD");
        }
    } else {
    const embed = new Discord.RichEmbed()
    .setColor("RED")
    .setTitle("No Permissions")
    .addField(`User`, `${message.author.tag} (${message.author.id})`, true)
    .addField(`Command`, `${message.content}`, true)
    .addField(`Channel`, `${message.channel.name} (${message.channel.id})`, true)
    message.guild.channels.find('name', configFile.defaultSettings.modLogChannel).send({ embed }).catch ((e) => { console.log(e)});
    client.log("log", `${message.guild.name}/#${message.channel.name} (${message.channel.id}):${message.author.username} (${message.author.id}) tried to run command ${message.content} without having the correct permission level`, "CMD");
  }
} else {
  const embed = new Discord.RichEmbed()
  .setColor("RED")
  .setTitle("Non-existant Command")
  .addField(`User`, `${message.author.tag} (${message.author.id})`, true)
  .addField(`Command`, `${message.content}`, true)
  .addField(`Channel`, `${message.channel.name} (${message.channel.id})`, true)
message.guild.channels.find('name', configFile.defaultSettings.modLogChannel).send({ embed }).catch ((e) => { console.log(e)});
client.log("log", `${message.guild.name}/#${message.channel.name} (${message.channel.id}):${message.author.username} (${message.author.id}) tried to run non-existant command ${message.content}`, "CMD");
}


  // Best Practice: **do not** reply with a message if the command does
  // not exist, or permissions lack.
};
