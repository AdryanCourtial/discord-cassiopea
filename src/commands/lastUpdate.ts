
import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  EmbedBuilder,
} from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("lastupdate")
    .setDescription("Affiche la dernière mise à jour GitHub du bot"),

  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply();

    try {
      const response = await fetch(
        "https://api.github.com/repos/AdryanCourtial/discord-cassiopea/commits?per_page=1",
        {
          headers: {
            Accept: "application/vnd.github+json",
            "User-Agent": "discord-cassiopea",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Erreur GitHub : ${response.status}`);
      }

      const commits = (await response.json()) as any[];
      const commit = commits[0];

      if (!commit) {
        throw new Error("Aucun commit trouvé");
      }

      const date = new Date(commit.commit.committer.date);
      const timestamp = Math.floor(date.getTime() / 1000);

      const embed = new EmbedBuilder()
        .setColor("#5865F2")
        .setTitle("🚀 Dernière mise à jour de Cassiopea")
        .addFields(
          {
            name: "📅 Date",
            value: `<t:${timestamp}:F>`,
          },
          {
            name: "⏱️ Dernière modification",
            value: `<t:${timestamp}:R>`,
          },
          {
            name: "📝 Commit",
            value: commit.commit.message.slice(0, 1024),
          },
          {
            name: "🔗 Version",
            value: `[\`${commit.sha.slice(0, 7)}\`](${commit.html_url})`,
          }
        )
        .setFooter({ text: "Cassiopea • GitHub" })
        .setTimestamp();

      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.error("Erreur lastupdate :", error);

      await interaction.editReply({
        content: "❌ Impossible de récupérer la dernière mise à jour GitHub.",
      });
    }
  },
};
