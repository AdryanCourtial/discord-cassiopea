import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("cassio")
    .setDescription("Répond Pong !"),

  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.reply("Pong !");
  },
};