const { SlashCommandBuilder } = require('discord.js');
const PlayFab = require('playfab-sdk/Scripts/PlayFab/PlayFab');
const PlayFabServer = require('playfab-sdk/Scripts/PlayFab/PlayFabServer');

PlayFab.settings.titleId = ''; // Replace with your PlayFab Title ID
PlayFab.settings.developerSecretKey = ''; // Replace with your PlayFab Secret Key

module.exports = {
  data: new SlashCommandBuilder()
    .setName('givecosmetic')
    .setDescription('Gives a Cosmetic to someone using the cosmetic code')
    .addStringOption(option =>
      option.setName('playerid')
        .setDescription('The playerID to give the cosmetic to')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('cosmeticcode')
        .setDescription('The Cosmetic to give')
        .setRequired(true)),
  async execute(interaction) {

    if (!interaction.member.permissions.has('MANAGE_MESSAGES')) {
      return interaction.reply('No thanks');
    }

    const playerId = interaction.options.getString('playerid');
    const cosmeticCode = interaction.options.getString('cosmeticcode');

    try {

      const response = await PlayFabServer.GrantItemsToUser({
        PlayFabId: playerId,
        ItemIds: [cosmeticCode],
        CatalogVersion: 'legacy', // use legacy if the cosmetics are for a gtag copy or you didnt put a credit card for v2 shit
      });

      console.log('PlayFab API Response:', response);


      if (response && response.code !== 200) {
        console.error('PlayFab API Error:', response);
        return interaction.reply(`Error giving cosmetic: ${response.status}`);
      }


      await interaction.reply(`Cosmetic successfully given to player ${playerId}. Result: ${JSON.stringify(response)}`);
    } catch (error) {
      console.error('Error giving cosmetic:', error);
      await interaction.reply(`Uh oh, an error occurred: ${error.message}`);
    }
  },
};
