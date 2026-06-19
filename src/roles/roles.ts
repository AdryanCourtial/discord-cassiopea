import { GuildMember, Interaction, Role, RoleCreateOptions } from "discord.js";

export class RolesDiscord {

    private constructor() {

    }

    public static getRoles(interaction: Interaction): Role[] {
        if (!interaction.isChatInputCommand()) {
            throw new Error("Interaction is not a chat input command.");
        }

        const roles = interaction.guild?.roles.cache.map(role => role) || [];
        return roles;
    }

    public static async desatribuateRoles(interaction: Interaction, name: string): Promise<void> {

        const member = interaction.member;

        if (!(member instanceof GuildMember)) {
            throw new Error("Member is not a GuildMember.");
        }

        await member.roles.remove(name);

    }

    public static async createRoles(interaction: Interaction, options: RoleCreateOptions): Promise<Role> {

        if (!interaction.isChatInputCommand()) {
            throw new Error("Interaction is not a chat input command.");
        }
        try {

            const role = await interaction.guild?.roles.create(options);


            if (!role) {
                throw new Error("Failed to create role.");
            }

            return role;

        } catch (error) {
            console.error("Error creating role:", error);
            throw new Error("Failed to create role.");
        }

    }

    public static getRolesUser(interaction: Interaction): Role[] {
        const member = interaction.member;

        if (!(member instanceof GuildMember)) {
            throw new Error("Member is not a GuildMember.");
        }

        const roles = member.roles.cache.map(role => role);
        return roles;
    }

    public static async attribuateOrCreateRoles(interaction: Interaction, id: string, options?: RoleCreateOptions): Promise<void> {

        if (!interaction.isChatInputCommand()) {
            throw new Error("Interaction is not a chat input command.");
        }

        if (!interaction.guild) {
            throw new Error("Guild is not defined.");
        }

        const member = interaction.member;

        if (!(member instanceof GuildMember)) {
            throw new Error("Member is not a GuildMember.");
        }

        console.log("Member roles:", id);

        // Chercher le rôle par son nom au lieu de chercher par ID
        let role = interaction.guild.roles.cache.find(r => r.name === id);

        console.log("Role found:", role);

        if (!role) {

            console.log("Role not found, creating new role:", options?.name);

            if (!options) {
                throw new Error("Role options are required to create a new role.");
            }

            role = await this.createRoles(interaction, {
                ...options,
                icon: undefined,
            });
        }

        await member.roles.add(role);
    }
}