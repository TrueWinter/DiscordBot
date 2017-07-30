const exec = require('child_process');
exports.run = async (client, message, args, level) => {
  const code = args.join(" ");
  try {
    const evaled = exec(code);
    const clean = await client.clean(client, evaled);
    message.channel.send(`\`\`\`xl\n${clean}\n\`\`\``);
  } catch(err) {
    message.channel.send(`\`ERROR\` \`\`\`xl\n${await client.clean(client, err)}\n\`\`\``);
    console.log(err);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 10 // DO NOT LOWER THIS!!!!!!!!
};

exports.help = {
  name: "exec",
  category: "System",
  description: "Executes console commands",
  usage: "exec [code]"
};
