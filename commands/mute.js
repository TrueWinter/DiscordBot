const Discord = require('discord.js');
exports.run = async (client, message, args) => {
  var guildSettings = client.settings.get(message.guild.id);
  const {caseNumber} = require('../modules/caseNumber.js');

  const user = message.mentions.users.first();
  const modlog = message.guild.channels.find('name', guildSettings.modLogChannel);
  if (!modlog) return message.reply('Could not find mod log channel');
  const caseNum = await caseNumber(client, modlog);
  const reason = args.splice(1, args.length).join(' ') || `Awaiting moderator's input. Use ${guildSettings.prefix}reason ${caseNum} <reason>.`;

  var muteRole = client.guilds.get(message.guild.id).roles.find('name', 'Muted');
  if (!modlog) return message.reply('I cannot find a mod log channel');
  if (!muteRole) {
    message.guild.createRole({name: 'Muted', color: 'DARKER_GREY', permissions: 36766720}).then(() => message.reply('As there was no `Muted` role, one was created')).catch(()=> {return message.reply('Unable to create `Muted` role that was not already present')});
    muteRole = client.guilds.get(message.guild.id).roles.find('name', 'Muted');
  }
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to mute them.');
  const embed = new Discord.RichEmbed()
			.setColor('RED')
			.addField(`User`, `${user.tag} (${user.id})`, true)
			.addField(`Moderator`, `${message.author.tag} (${message.author.id})`, true)
			.addField(`Reason`, `${reason}`, true)
      .setFooter(`Case ${caseNum}`);

  if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('I do not have the correct permissions.').catch(console.error);

  if (message.guild.member(user).roles.has(muteRole.id)) {
    message.guild.member(user).removeRole(muteRole).then(() => {
      message.channel.send(`User unmuted by ${message.author.tag} (${message.author.id}) with reason \`${reason}\``);
      var unmuteEmbed = embed.setTitle('User Unmuted');
      modlog.send({embed: unmuteEmbed}).catch(console.error);
    });
  } else {
    message.guild.member(user).addRole(muteRole).then(() => {
      message.channel.send(`User muted by ${message.author.tag} (${message.author.id}) with reason \`${reason}\``);
      var muteEmbed = embed.setTitle('User Muted');
      modlog.send({embed: muteEmbed}).catch(console.error);
    });
  }

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['unmute'],
  permLevel: 2
};

exports.help = {
  name: 'mute',
  category: 'Moderation',
  description: 'Mutes or unmutes a mentioned user',
  usage: 'Mute: mute [user mention] [reason]\nUnmute: unmute [user mention] [reason]'
};