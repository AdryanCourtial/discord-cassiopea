import { CreateClient } from "./config/client";
import { InstanceCommands } from "./config/commands-builder";
import { Commands, SubCommandsRank } from "./types/commands.type";
import { RolesDiscord } from "./roles/roles";
import { RankRoleConfig } from "./config/roles.config";
import nodeCron from "node-cron";
import { EnvoieSondageDispos } from "./func-utils/func-utils";
import lastUpdate from "./commands/lastUpdate";
import ping from "./commands/ping";
require('dotenv').config();

const client = CreateClient();

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

    if(interaction.commandName === Commands.UPDATE) {
        lastUpdate.execute(interaction)
    }

    if(interaction.commandName === Commands.PING) {
        ping.execute(interaction)
    }
});

// Tous les Vendredis à 18h
nodeCron.schedule('0 18 * * 5', async () => {
        const CHANNELS_IDS = [
            '1517166696656539698',
            '1503107030582562939'
        ];

        await Promise.allSettled(
            CHANNELS_IDS.map(channel_id =>
                EnvoieSondageDispos(channel_id, client)
            )
        );

    },
    {
    timezone: 'Europe/Paris'
});

client.login(process.env.TOKEN).catch(err => {
    console.error('Failed to login:', err);
    process.exit(1);
});