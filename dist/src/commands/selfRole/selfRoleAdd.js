"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const selfRole_1 = require("../../models/selfRole");
const selfRoleAdd = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('self-role-add')
        .setDescription('Add a new emoji to role interaction')
        .addStringOption(option => option
        .setName('emoji')
        .setDescription('Emoji used for self-role')
        .setDescriptionLocalizations({
        de: 'Emoji welches benutzt wird für self-role'
    })
        .setRequired(true))
        .addRoleOption(option => option
        .setName('role')
        .setDescription('Role to be asigned')
        .setNameLocalizations({
        de: 'rolle'
    })
        .setDescriptionLocalizations({
        de: 'Rolle die vergeben wird'
    })
        .setRequired(true))
        .setDescriptionLocalizations({
        de: 'Füge eine neue Emoji zu Rolle interaktion hinzu'
    })
        .setDefaultMemberPermissions(discord_js_1.PermissionFlagsBits.ManageRoles)
        .setDMPermission(false),
    async execute(interaction) {
        const guildId = interaction.guildId;
        const emoji = interaction.options.getString('emoji');
        const role = interaction.options.getRole('role');
        try {
            await (0, selfRole_1.SelfRole)()?.create({
                server_id: guildId,
                emoji: emoji,
                role: role?.id
            });
            interaction.reply({
                content: `Created new emoji to role interaction (${emoji} => ${role?.name})`,
                ephemeral: true
            });
        }
        catch (error) {
            console.error(error);
            interaction.reply({
                content: 'Internal Server error. Please contact developer.',
                ephemeral: true
            });
        }
    }
};
exports.default = selfRoleAdd;
