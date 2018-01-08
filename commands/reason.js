exports.run = async (client, message, args) => {
  const settings = client.settings.get(message.guild.id);
  const modlog = client.channels.find('name', settings.modLogChannel);
  const caseNumber = args.shift();
  const newReason = args.join(' ');
  
  async function embedSan(embed) {
    embed.message ? delete embed.message : null;
    embed.footer ? delete embed.footer.embed : null;
    embed.provider ? delete embed.provider.embed : null;
    embed.thumbnail ? delete embed.thumbnail.embed : null;
    embed.image ? delete embed.image.embed : null;
    embed.author ? delete embed.author.embed : null;
    embed.fields ? embed.fields.forEach(f => {delete f.embed;}) : null;
    return embed;
  }

  await modlog.fetchMessages({limit:100}).then((messages) => {
    const caseLog = messages.filter(m => m.author.id === client.user.id &&
      m.embeds[0] &&
      m.embeds[0].type === 'rich' &&
      m.embeds[0].footer &&
      m.embeds[0].footer.text.startsWith('Case') &&
      m.embeds[0].footer.text === `Case ${caseNumber}`
    ).first();
    if (!caseLog) return message.reply('Unable to find that case number');
    if (!newReason) return message.reply('You need to give a reason');
    //if (!newReason) return 
    modlog.fetchMessage(caseLog.id).then(logMsg => {
      const embed = logMsg.embeds[0];
      embedSan(embed);
      var reasonObj = embed.fields.filter((mEmbed) => mEmbed.name === 'Reason')[0];
      //console.log(reasonObj);
      reasonObj.value = newReason;
      logMsg.edit({embed}).then(() => message.reply('Case updated')).catch((err) => {
        message.reply('Failed to update case');
        return console.error(err);
      });
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
	name: 'reason',
	category: 'Moderation',
	description: 'Updates the reason for a specific case',
	usage: 'reason [case number] [reason]'
};