const { version } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
  message.channel.send({ embed: {
    title: "= STATISTICS =" fields [{ name: "• Mem Usage"   value: "${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB"}, +
    {name: "•   Uptime"    value: "${duration}"}, +
    {name: "• Users "     value: "${client.users.size.toLocaleString()}"}, +
    {name: "• Servers" value: "${client.guilds.size.toLocaleString()}"}, +
    {name: "• Channels" value: "${client.channels.size.toLocaleString()}"}, +
    {name: "• Discord.js" value: "v${version}"}, +
    {name: "• Node" value: "${process.version}"}, ] }});
  }
}
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
