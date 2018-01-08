exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
	var user = message.mentions.members.first();
	var roleName = args.splice(2).join(' ');
	var role = message.guild.roles.find('name', roleName);


	switch (args[0]) {
		case 'add':
			if (!user) return message.reply('You need to mention a valid user of this server');
			if (!roleName) return message.reply('You can\'t give no roles...');
			//console.log(user);
			//console.log(roleName);
			if (!message.guild.roles.find('name', roleName)) return message.reply('No role with this name exists. _Roles names are case-sensitive_');
 			if (user.roles.exists('name', roleName)) return message.reply(':eyes: I see this role on that user already');


			user.addRole(role).then(() => message.reply('Role added')).catch((err) => message.reply('Unable to add role').then(() => console.log(err)));
			break;
		case 'remove':

			if (!user) return message.reply('You need to mention a valid user of this server');
			if (!roleName) return message.reply('You can\'t remove no roles...');
			//console.log(user);
			//console.log(roleName);
			if (!message.guild.roles.find('name', roleName)) return message.reply('No role with this name exists. _Roles names are case-sensitive_');

			if (!user.roles.find('name', roleName)) return message.reply('Does that user even have the role?');

			user.removeRole(role).then(() => message.reply('Role removed')).catch((err) => message.reply('Unable to remove role').then(() => console.log(err)));
			break;
		default:
			message.reply('Well, you can only add or remove roles...');
	}
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: 2
};

exports.help = {
	name: 'role',
	category: 'Moderation',
	description: 'Allows you to add or remove a single role from a user',
	usage: 'role [add/remove] [user mention] [role name]'
};
