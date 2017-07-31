const { version } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const Discord = require("discord.js");

exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
  const embed = new Discord.RichEmbed()
  .setTitle("BOT STATS")
  .addField(`• Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`)
  .addField(`• Uptime     :: ${duration}`)
  .addField(`• Users      :: ${client.users.size.toLocaleString()}`)
  .addField(`• Servers    :: ${client.guilds.size.toLocaleString()}`)
  .addField(`• Channels   :: ${client.channels.size.toLocaleString()}`)
  .addField(`• Discord.js :: v${version}`)
  .addField(`• Node       :: ${process.version}`)
  message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "stats",
  category: "Miscelaneous",
  description: "Gives some useful bot statistics",
  usage: "stats"
};
