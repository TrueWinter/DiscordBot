// This event executes when a new member joins a server. Let's welcome them!

module.exports = (client, member) => {
  // Load the guild's settings
  const settings = client.settings.get(member.guild.id);

  // If welcome is off, don't proceed (don't welcome the user)
  if(!settings.welcomeEnabled) return;

  // Replace the placeholders in the welcome message with actual data
  const welcomeMessage = settings.welcomeMessage.replace("{{user}}", member.user.tag);

  // Send the welcome message to the default server channel. Not ideal,
  // there's a place for more configs here.
  const guild = message.channel.guild;
  const defaultChannel = guild.channels.find(c=> c.permissionsFor(guild.me).has("SEND_MESSAGES"));
  defaultChannel.send(welcomeMessage).catch(console.error);
};
