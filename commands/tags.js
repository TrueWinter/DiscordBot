exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars, complexity
	function list () {
		//if (client.tags.size === 0) return message.channel.send('This server has no tags');
		var tags = client.tags;

		var outList = 'Tags for this Server:\n';
		tags.forEach((t) => {
			var currentTag = t;
			if (typeof currentTag !== 'object') {
				currentTag = JSON.parse(currentTag);
			}
			//console.log(currentTag);
			var c = (currentTag.tagID.split('-')[0] === message.guild.id); // eslint-disable-line no-extra-parens
			if (!c) return;
			outList += `**${currentTag.tagID.split('-')[1]}**: \`${currentTag.content}\`\n`;
		});
		message.channel.send(outList);
	}

	var tagName = args[1];
	var content = args.splice(2).join(' ');

	switch (args[0]) {
		case 'add':
			if (level < 2) {
				return message.reply('Only moderators and above can add tags');
			}
			//var tagName = args[1];
			if (!tagName) return message.reply('Tag name is required');
			//var content = args.splice(2).join(' ');
			if (!content) return message.reply('You need to give me the tag content...');
			//console.log(`${message.guild.id}-${tagName}`);
			if (client.tags.has(`${message.guild.id}-${tagName}`)) return message.reply('This tag already exists');
			client.tags.set(`${message.guild.id}-${tagName}`, `{'tagID': '${message.guild.id}-${tagName}', 'content': '${content}', 'addedBy': '${message.author.tag + ' (' + message.author.id + ')'}', 'addedAt': '${new Date()}', 'lastModified': '${new Date()}'}`); // eslint-disable-line prefer-template
			message.reply('Tag added');
			break;
		case 'edit':
			if (level < 2) {
				return message.reply('Only moderators and above can edit tags');
			}
			//var tagName = args[1];
			if (!tagName) return message.reply('Tag name is required');
			//var content = args.splice(2).join(' ');
			if (!content) return message.reply('You need to give me the tag content...');
			//console.log(`${message.guild.id}-${tagName}`);
			if (!client.tags.has(`${message.guild.id}-${tagName}`)) return message.reply('This tag does not exist');
			var currentData = client.tags.get(`${message.guild.id}-${tagName}`);
			if (typeof currentData !== 'object') {
				currentData = JSON.parse(currentData);
			}
			//console.log(currentData);
			currentData.content = content;
			currentData.lastModified = new Date().toString();
			//console.log(currentData);
			client.tags.set(`${message.guild.id}-${tagName}`, currentData);
			message.reply('Tag edited');
			break;
		case 'delete': //eslint-disable-line no-case-declarations
			if (level < 2) {
				return message.reply('Only moderators and above can delete tags');
			}
			//var tagName = args[1];
			if (!tagName) return message.reply('Tag name is required');
			if (!client.tags.has(`${message.guild.id}-${tagName}`)) return message.reply('Tag does not exist');
			const response = await client.awaitReply(message, `Are you sure you want to permanently delete ${tagName}? This **CANNOT** be undone.`);

			// If they respond with y or yes, continue.
			if (['y', 'yes'].includes(response)) {

				// We delete the `key` here.
				client.tags.delete(`${message.guild.id}-${tagName}`);
				//client.settings.set(message.guild.id, settings);
				message.reply(`${tagName} was successfully deleted.`);
			} else
			// If they respond with n or no, we inform them that the action has been cancelled.
			if (['n', 'no', 'cancel'].includes(response)) {
				message.reply('Action cancelled.');
			} else {
				message.reply('Action cancelled as response was not in the expected format (y/yes/n/no/cancel)');
			}
			break;
		case 'info':
			//var tagName = args[1];
			if (!tagName) return message.reply('Tag name is required');
			if (!client.tags.has(`${message.guild.id}-${tagName}`)) return message.reply('Tag does not exist');
			var tagDetails = client.tags.get(`${message.guild.id}-${tagName}`);
			if (typeof tagDetails !== 'object') {
				tagDetails = JSON.parse(tagDetails);
			}
			var output = `**Info for tag ${tagName}**\nTag Content: \`${tagDetails.content}\`\nAdded By: \`${tagDetails.addedBy}\`\nAdded At: \`${tagDetails.addedAt}\`\nLast Modified: \`${tagDetails.lastModified}\``;
			message.channel.send(output);
			break;
		case 'list':
			list();
			break;
		default:
			if (!args[0]) return list();
			if (client.tags.has(`${message.guild.id}-${args[0]}`)) {
				var tagContent = client.tags.get(`${message.guild.id}-${args[0]}`);

				if (typeof tagContent !== 'object') {
					tagContent = JSON.parse(tagContent);
				}
				//console.log(tagContent);
				//console.log(typeof tagContent);
				message.channel.send(tagContent.content);
			} else {
				message.reply('This tag does not exist');
			}
	}
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['tag'],
	permLevel: 0
};

exports.help = {
	name: 'tags',
	category: 'Miscelaneous',
	description: 'Allows you to add tags (only single-word tags allowed), then run [prefix]tags [tag name] to display the tag, delete the tags if needed, and display more info on the tags',
	usage: 'Display a tag: tags [tag name]\nAdd a tag: tags add [tag name (single-word only)] [tag text]\nDelete a tag: tags delete [tag name]\nList tags: tags OR tags list\nGet tag info: tags info [tag name]'
};
