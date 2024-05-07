"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const options_1 = require("../../models/options");
const guildInit = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('init')
        .setDescription('Will create a new server instance. This will be called on server enter.')
        .setDescriptionLocalizations({
        de: 'Erstellt eine neue Server Instanz. Dies wird automatisch ausgeführt sobald der Bot hinzugefügt wird'
    })
        .setDefaultMemberPermissions(discord_js_1.PermissionFlagsBits.Administrator)
        .setDMPermission(false),
    async execute(interaction) {
        const guildId = interaction.guildId;
        try {
            await (0, options_1.Option)()?.create({
                server_id: guildId
            });
            interaction.reply({
                content: 'New server instance created',
                ephemeral: true
            });
        }
        catch (error) {
            console.error(error);
            interaction.reply({
                content: 'Internal Server Error',
                ephemeral: true
            });
        }
    }
};
exports.default = guildInit;
