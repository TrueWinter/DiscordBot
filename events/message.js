// The MESSAGE event runs anytime a message is received
// Note that due to the binding of client to every event, every event
// goes `client, other, args` when this function is run.

module.exports = (client, message) => {
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;

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

  // If the command exists, **AND** the user has permission, run it.
  if(cmd && level >= cmd.conf.permLevel) {
    if(cmd.conf.enabled === true) {
      message.guild.channels.find('name', 'mod-log').send(message.author.tag + " (" + message.author.id + ") ran command: `" + message.content + "` in " + message.channel.name + " (" + message.channel.id + ")").then ((e) => {
        client.log("log", `${message.guild.name}/#${message.channel.name}:${message.author.username} (${message.author.id}) ran command ${message.content}`, "CMD");
      }).catch((e) => {
        console.log(e);
      });
      cmd.run(client, message, args, level);
    } else {
        message.reply("This command is disabled");
        message.guild.channels.find('name', 'mod-log').send(message.author.tag + " (" + message.author.id + ") tried to run disabled command: `" + message.content + "` in " + message.channel.name + " (" + message.channel.id + ")").catch ((e) => { console.log(e)});
        client.log("log", `${message.guild.name}/#${message.channel.name}:${message.author.username} (${message.author.id}) tried to run disabled command ${message.content}`, "CMD");
    }
  } else {
    message.guild.channels.find('name', 'mod-log').send(message.author.tag + " (" + message.author.id + ") tried to run command: `" + message.content + "` in " + message.channel.name + " (" + message.channel.id + ") without having correct permission level").catch ((e) => { console.log(e)});
    client.log("log", `${message.guild.name}/#${message.channel.name}:${message.author.username} (${message.author.id}) tried to run command ${message.content} without having the correct permission level`, "CMD");
  }


  // Best Practice: **do not** reply with a message if the command does
  // not exist, or permissions lack.
};
