exports.run = async (client, message, args, level) => {
	if (message.channel.type === "dm") {
		message.channel.send("This is not a command that can be used in a direct message.");
	} else {

    //var user = message.mentions.members.first();
		//var deleteCount = parseInt(args[1]);

		//if(!deleteCount || deleteCount < 1 || deleteCount > 100)
		//	return message.reply("Please provide a number between 1 and 100 for the number of messages to delete");

		  message.channel.send(message.channel.fetchMessages);

      }
    });
		//message.channel.bulkDelete(deleteCount + 1)
		//.catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
	}
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: "purgeuser",
  category: "Moderation",
  description: "Allows you to purge between 2 and 100 messages",
  usage: "purgeuser"
};
