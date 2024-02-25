const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('check')
		.setDescription('Checks to see if the bot is online by replying'),
	async execute(interaction) {
		await interaction.reply('Hello');
	},
};