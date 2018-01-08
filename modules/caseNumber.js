async function caseNumber(client, modlog) { // Code from: https://github.com/AnIdiotsGuide/Tutorial-Bot/blob/Episode-10-Part-1/util/caseNumber.js
	const messages = await modlog.fetchMessages({ limit: 50 });
	const log = messages.filter(m => m.author.id === client.user.id &&
		m.embeds[0] &&
		m.embeds[0].type === 'rich' &&
		m.embeds[0].footer &&
		m.embeds[0].footer.text.startsWith('Case')
	).first();
	if (!log) return 1;
	const thisCase = /Case\s(\d+)/.exec(log.embeds[0].footer.text);
	return thisCase ? parseInt(thisCase[1]) + 1 : 1;
}

module.exports = { caseNumber };
