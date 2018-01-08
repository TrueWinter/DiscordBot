var fs = require('fs');
var Discord = require('discord.js');

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars

	const gS = await client.settings.get(message.guild.id);
  
  await message.delete();
  const user = message.mentions.users.first();
  const amount = !!parseInt(args[0]) ? parseInt(args[0]) : parseInt(args[1]);
  console.log(args);
  if (!amount) return message.reply('Must specify an amount to delete!');
  if (!amount && !user) return message.reply('Must specify a user and amount, or just an amount, of messages to purge!');
  message.channel.fetchMessages({
   limit: amount,
  }).then((messages) => {
   if (user) {
    const filterBy = user ? user.id : client.user.id;
    messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
   }
    
    if (gS.logPurge === 'true') {
      var msgs = '';
      messages.forEach(g => msgs += client.config.purgeLogFormat.replace('{{mID}}', g.id).replace('{{mA}}', `${g.author.tag} (${g.author.id})`).replace('{{mTS}}', g.createdTimestamp).replace('{{mC}}', `${g.content}`)) // client.config.purgeLogFormat.replace('{{mID}}', g.id).replace('{{mTS}}', g.createdTimestamp).replace('{{mC}}', g.content) |||| `\n Message ID: ${g.id}  |  Message Timestamp: ${g.createdTimestamp} | Content: ${g.content} \n`
			console.log(msgs);
			fs.writeFile('purge-log.txt', msgs, (err) => {
        if (err) {
          console.error(err);
          return message.reply('There was an error in saving the temporary log file.');
        }
        message.guild.channels.find('name', gS.modLogChannel).send('Messages purged', new Discord.Attachment('./purge-log.txt'))
				.then(() =>	fs.unlink('purge-log.txt', (err) => {
          if (err) {
            console.error(err);
            return message.reply('There was an error deleting the temporary log file');
          }
        }));
      });

		}
    
    message.channel.bulkDelete(messages).catch((error) => {
      console.log(error.stack);
      return message.reply('There was an error in deleting the messages');
    });
  });

};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: 2
};

exports.help = {
	name: 'purge',
	category: 'Moderation',
	description: 'Allows you to purge between 2 and 100 messages',
	usage: 'Purge all: purge [number of messages]\n Purge by user: purge [user mention] [number of messages]'
};
