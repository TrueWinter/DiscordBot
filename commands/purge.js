exports.run = async (client, message, args, level) => {

		var deleteCount = parseInt(args[0]);

		if(!deleteCount || deleteCount < 1 || deleteCount > 100)
			return message.reply("Please provide a number between 1 and 100 for the number of messages to delete");

		//var fetched =  message.channel.fetchMessages({count: deleteCount});
		message.channel.bulkDelete(deleteCount + 1)
		.catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: "purge",
  category: "Moderation",
  description: "Allows you to purge between 2 and 100 messages",
  usage: "purge [number of messages]"
};
