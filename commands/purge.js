exports.run = async (client, message, args, level) => {
	if (message.channel.type === "dm") {
		message.channel.send("This is not a command that can be used in a direct message.");
	} else {
		if(!message.member.roles.some(r=>["Owner", "test"].includes(r.name)) )
			return message.reply("Sorry, you don't have permissions to use this!");
		
		var deleteCount = parseInt(args[0]);
    
		if(!deleteCount || deleteCount < 2 || deleteCount > 100)
			return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    
		//var fetched =  message.channel.fetchMessages({count: deleteCount});
		message.delete();
		message.channel.bulkDelete(deleteCount)
		.catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
	}
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
