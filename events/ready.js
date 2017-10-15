/* global wait */
module.exports = async client => {
  // Why await here? Because the ready event isn't actually ready, sometimes
  // guild information will come in *after* ready. 1s is plenty, generally,
  // for lal of them to be loaded.
  await wait(1000);

  client.appInfo = await client.fetchApplication();
  setInterval( async () => {
    client.appInfo = await client.fetchApplication();
  }, 60000);

  require("../modules/dashboard")(client);
  
  // Both `wait` and `client.log` are in `./modules/functions`.
  client.log("log", `Ready to serve ${client.users.size} users in ${client.guilds.size} servers.`, "Ready!");

  // Ensure that any guild added while the bot was offline gets a default configuration.
  client.guilds.forEach(guild => client.settings.set(guild.id, client.config.defaultSettings));
  client.user.setGame(client.config.defaultSettings.prefix + "help");
  client.user.setPresence({ status: "dnd", game: { name: client.config.defaultSettings.prefix + 'help', type: 0 } });
  //client.user.setStatus("dnd");
};
