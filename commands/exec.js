const { exec } = require("child_process");

exports.run = async (client, message, args) => {
  message.reply(`Running command \`${args.join(' ').replace('`', '\`')}\`... Please wait.`);
  exec(`${args.join(' ')}`, (error, stdout) => {
      const response = (error || stdout);
      message.channel.send(`\`OUTPUT\` \n\`\`\`${response.replace('`', '\`')}\`\`\``, {split: true}).catch(console.error);
    });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 10
};

exports.help = {
  name: 'exec',
  category: 'System',
  description: 'Executes a console command.',
  usage: 'exec [command]'
};
