const { exec } = require("child_process");

exports.run = async (client, message, args) => {
  message.reply(`Running command \`${args.join(' ').replace('`', '\`')}\`... Please wait.`);
  var execProcess = exec(`${args.join(' ')}`, (error, stdout) => {
      const response = (error || stdout);
       console.log(`${message.author.tag} (${message.author.id}) ran console command: \`${args.join(' ')}\``);
       if (response.length > 1800) {
         var chunks = [];
 
         for (var i = 0, charsLength = response.length; i < charsLength; i += 1800) {
             chunks.push("```" + response.replace('`', '\`').substring(i, i + 1800) + "```");
         }
 
         console.log(chunks); 
         var endOutput = "";
         message.channel.send(`\`OUTPUT\``);
         for (var c = 0; c < chunks.length; c++) {
           //endOutput += chunks[i];
           message.channel.send(`\`\`\`\n${chunks[c]}\`\`\``,).catch(console.error);
         }
         //message.channel.send(`\`OUTPUT\` \n\`\`\`\n${endOutput}\`\`\``,).catch(console.error);
       } else {
         message.channel.send(`\`OUTPUT\` \n\`\`\`\n${response}\`\`\``,).catch(console.error);
       }
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
