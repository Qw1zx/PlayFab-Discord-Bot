const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('userinfo')
		.setDescription('I know everything about you.'),
	async execute(interaction) {
		await interaction.reply(`ok ${interaction.user.username}, You joined on ${interaction.member.joinedAt}.`);
	},
};