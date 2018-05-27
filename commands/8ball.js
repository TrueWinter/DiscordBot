const Discord = require('discord.js');

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
	var question = args.join(' ');
	var answers = await client.config.eightBallResponses;

	if (!question.endsWith('?')) return message.reply('That doesn\'t look like a question. (Remember: Questions end in question marks)');
	var a = Math.floor(Math.random() * answers.length);

	let ballembed = new Discord.RichEmbed()
	.setAuthor(client.user.username, client.user.displayAvatarURL)
	.setColor("#7289DA")
	.addField("Question", question)
	.addField("Answer", answers[a])
	.setFooter(message.author.tag);
  
	message.channel.send(ballembed);

};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 0
};

exports.help = {
	name: '8ball',
	category: 'Fun',
	description: 'Ask a yes/no question, get an answer',
	usage: '8ball [question]'
};
