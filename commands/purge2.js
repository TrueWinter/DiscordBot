  exports.run = async (client, message, args, level) => {
    if (message.channel.type === "dm") {
  		message.channel.send("This is not a command that can be used in a direct message.");
  	} else {
      if(!deleteCount || deleteCount < 2 || deleteCount > 100)
  			return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
      let messagecount = parseInt(numberofmessages);
      message.channel.fetchMessages({limit: messagecount + 1}).then(messages => message.channel.bulkDelete(messages)).catch((e) => { console.log(e) });
    }
  };

  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };

  exports.help = {
    name: "test",
    category: "Miscelaneous",
    description: "Testing, testing",
    usage: "test"
  };
