// This event executes when a new member joins a server. Let's welcome them!

module.exports = (client, member) => {
  // Load the guild's settings
  const settings = client.settings.get(member.guild.id);

  // If welcome is off, don't proceed (don't welcome the user)
  if(!settings.welcomeChannel) return console.log('Cannot send welcome message as there is nothing in the welcomeChannel setting');
  if(!settings.welcomeEnabled || settings.welcomeEnabled !== "true") return;

  // Replace the placeholders in the welcome message with actual data
  const welcomeMessage = settings.welcomeMessage.replace("{{user}}", member.user.tag);

  // Send the welcome message to the default server channel. Not ideal,
  // there's a place for more configs here.
  if(!member.guild.channels.find("name", settings.welcomeChannel)) return console.log(`Unable to send welcome message to guild: '${member.guild}' (${member.guild.id}) as the channel '${settings.welcomeChannel}' does not exist`);
  member.guild.channels.find("name", settings.welcomeChannel).send(welcomeMessage).catch(console.error);
};
