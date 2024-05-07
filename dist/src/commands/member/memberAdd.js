"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const member_1 = require("../../models/member");
const memberAdd = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('member-add')
        .setDescription('Creates a new db-entry')
        .addStringOption(option => option
        .setName('name')
        .setDescription('Name of the member')
        .setDescriptionLocalizations({
        de: 'Name des Spielers'
    })
        .setRequired(true))
        .setDescriptionLocalizations({
        de: 'Erstellt ein neuen Spieler eintrag'
    })
        .setDefaultMemberPermissions(discord_js_1.PermissionFlagsBits.Administrator)
        .setDMPermission(false),
    async execute(interaction) {
        const name = interaction.options.getString('name');
        try {
            await (0, member_1.Member)()?.create({
                server_id: interaction.guildId,
                name: name
            });
            interaction.reply({
                content: `Successfully added ${name}`,
                ephemeral: true
            });
        }
        catch (error) {
            console.error(error);
            interaction.reply({
                content: 'Could not add a new member :(',
                ephemeral: true
            });
        }
    }
};
exports.default = memberAdd;
