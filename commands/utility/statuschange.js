const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('status')
    .setDescription('Changes my status')
    .addStringOption(option =>
      option.setName('change')
        .setDescription('Choose DND, Online, or Idle')
        .setRequired(true)),
  async execute(interaction) {

    if (!interaction.member.permissions.has('MANAGE_MESSAGES')) {
      return interaction.reply('No thanks');
    }

    const allowedStatuses = ['dnd', 'online', 'idle'];
    const selectedStatus = interaction.options.getString('change').toLowerCase();

    if (!allowedStatuses.includes(selectedStatus)) {
      return interaction.reply('Please choose dnd, online, or idle.');
    }

    try {
      if (selectedStatus === 'dnd') {
        await interaction.client.user.setPresence({ status: 'dnd' });
      } else if (selectedStatus === 'online') {
        await interaction.client.user.setPresence({ status: 'online' });
      } else if (selectedStatus === 'idle') {
        await interaction.client.user.setPresence({ status: 'idle' });
      }
      interaction.reply(`I am now ${selectedStatus}.`);
    } catch (error) {
      console.error('Something went wrong', error);
      interaction.reply('Something went wrong.');
    }
  }
};
