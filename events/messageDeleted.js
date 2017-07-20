module.exports = (client, message) => {
let deleted = message.guild.channels.find('name', 'mod-log');
if(!deleted) return console.log("No mod log channel found, when someone deleted a message.");

const embed = new Discord.RichEmbed()
.setAuthor(`${message.author.tag}`, `${message.author.avatarURL}`)
.setColor(0x00AE86)
.setDescription(`${message.content}`)
.setTimestamp(message.createdAt);
deleted.send({embed});
};