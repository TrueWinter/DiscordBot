const { exec } = require("child_process");

exports.run = async (client, message, args) => {
  message.reply(`Running command \`${args.join(' ').replace('`', '\`')}\`... Please wait.`);
  var execProcess = exec(`${args.join(' ')}`, (error, stdout) => {
      const response = (error || stdout);
      console.log(`${message.author.tag} (${message.author.id}) is ran console command: \`${args.join(' ')\``);
      message.channel.send(`\`OUTPUT\` \n\`\`\`${response}\`\`\``, {split: true}).catch(console.error);
    });
    setTimeout(function() { 
      console.log(`The command (\`${args.join(' ')}\`) run by ${message.author.tag} (${message.author.id}) has exceeded the timeout of 10 seconds`);
      message.reply(`The command you used (\`${args.join(' ')}\`) has been running for over 10 seconds and therefore has been stopped`);
      execProcess.kill('SIGINT');
    }, 10000);
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
