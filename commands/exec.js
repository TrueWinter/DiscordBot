const { exec } = require('child_process');
exports.run = async (client, message, args, level) => {
  try {
    const code = args.join(" ");
    const execCommand = exec(code, (error, stdout, stderr) => {
      const clean = await client.clean(client, execCommand);
      message.channel.send(`\`\`\`xl\n${clean}\n\`\`\``);
      if (error) {
        message.channel.send(`\`ERROR\` \`\`\`xl\n${await client.clean(client, error)}\n\`\`\``);
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    });
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
