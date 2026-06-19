import { Collection, Role } from "discord.js";
import { CreateClient } from "./config/client";
import ping from "./commands/ping";
import { InstanceCommands } from "./config/commands-builder";
import { Commands, SubCommandsRank } from "./types/commands.type";
import { RolesDiscord } from "./roles/roles";
import { RankRoleConfig } from "./config/roles.config";

require('dotenv').config();

const client = CreateClient();

const formattedRank = (name: string, icon: string, type: string) => `${name} ${type} ${icon}`

client.on('clientReady', () => {
    if (!client.user) {
        throw new Error('Client user is not defined.');
    }

    InstanceCommands().then((data) => {
        console.log("Commands registered successfully:", data);
    })

    console.log(`Logged in as ${client.user.tag}!`);

});

client.on("interactionCreate", async (interaction) => {

    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === Commands.RANK) {
      const subcommand = interaction.options.getSubcommand();
      
      const rank = interaction.options.getString(
          "rank",
          true
      );

      if (subcommand === SubCommandsRank.FLEX) {
          const roles = RolesDiscord.getRolesUser(interaction);

          console.log("Roles in guild:", roles);
          console.log("Roles in guild:", roles.length);
          
          const earlierRole = roles.find(role => role.name.includes("Flex"));

          const roleName = `${RankRoleConfig[rank].name} Flex ${RankRoleConfig[rank].icon}`;

          if (earlierRole) {
              await RolesDiscord.desatribuateRoles(interaction, earlierRole.id);
          }

          await RolesDiscord.attribuateOrCreateRoles(interaction, roleName, {
            ...RankRoleConfig[rank],
            name: roleName
          });

          await interaction.reply(`Félicitations ! Votre rang en 5v5 flexible a été défini sur ${rank}.`);
      }

      if (subcommand === SubCommandsRank.SOLO_DUO) {

          const roles = RolesDiscord.getRolesUser(interaction);

          console.log("Roles in guild:", roles);
          console.log("Roles in guild:", roles.length);

          const earlierRole = roles.find(role => role.name.includes("Solo/Duo"));

          if (earlierRole) {
              await RolesDiscord.desatribuateRoles(interaction, earlierRole.id);
          }

          const roleName = `${RankRoleConfig[rank].name} Solo/Duo ${RankRoleConfig[rank].icon}`;

          await RolesDiscord.attribuateOrCreateRoles(interaction, roleName, {
            ...RankRoleConfig[rank],
            name: roleName
          });

          await interaction.reply(`Félicitations ! Votre rang en solo/duo a été défini sur ${rank}.`);
      }

      return

    }
});

client.login(process.env.TOKEN).catch(err => {
    console.error('Failed to login:', err);
    process.exit(1);
});