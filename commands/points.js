const Discord = require('discord.js');
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    const scorePoints = client.points.get(`${message.guild.id}-${message.author.id}`).points || 0;
    let embed = new Discord.RichEmbed()
        .setColor('GREEN')
        .setAuthor('You currently have')
        .setDescription(scorePoints + ' points')
        .setFooter(client.user.username, client.user.avatarURL) 
	!scorePoints ? message.channel.send('You have no points yet.') : message.channel.send(embed);
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'points',
    category: 'Fun',
    description: 'Well, let\'s see how many points you have!',
    usage: 'points'
};
