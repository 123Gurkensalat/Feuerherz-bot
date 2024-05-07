"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const guild_1 = require("../../models/guild");
const guildCreate = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('guild-create')
        .setDescription('Creates a new db-entry')
        .addStringOption(option => option
        .setName('name')
        .setDescription('Name of the new guild')
        .setDescriptionLocalizations({
        de: 'Name der neuen Gilde'
    })
        .setRequired(true))
        .setDescriptionLocalizations({
        de: 'Erstellt ein neuen Gilden eintrag'
    })
        .setDefaultMemberPermissions(discord_js_1.PermissionFlagsBits.Administrator)
        .setDMPermission(false),
    async execute(interaction) {
        const name = interaction.options.getString('name');
        try {
            await (0, guild_1.Guild)()?.create({
                name,
                server_id: interaction.guildId
            });
            interaction.reply({
                content: `Successfully created ${name}`,
                ephemeral: true
            });
        }
        catch (error) {
            console.error(error);
            interaction.reply({
                content: 'Could not create a new guild : (',
                ephemeral: true
            });
        }
    }
};
exports.default = guildCreate;
