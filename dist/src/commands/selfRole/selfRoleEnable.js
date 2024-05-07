"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const options_1 = require("../../models/options");
const selfRoleEnable = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('self-role-enable')
        .setDescription('enable or disenable self-role features')
        .addBooleanOption(option => option
        .setName('enable')
        .setDescription('.')
        .setRequired(true))
        .setDescriptionLocalizations({
        de: 'Aktiviere oder deaktiviere self-role'
    })
        .setDefaultMemberPermissions(discord_js_1.PermissionFlagsBits.ManageRoles)
        .setDMPermission(false),
    async execute(interaction) {
        const guildId = interaction.guildId;
        const enable = interaction.options.getBoolean('enable');
        try {
            const test = await (0, options_1.Option)()?.update({
                self_role_enabled: enable
            }, {
                where: {
                    server_id: guildId
                }
            });
            interaction.reply({
                content: `self-role is now ${enable ? 'enabled' : 'disabled'}.`,
                ephemeral: true
            });
        }
        catch (error) {
            console.error(error);
            interaction.reply({
                content: 'Internal Server Error. If this problem remains please contact a developer.',
                ephemeral: true
            });
        }
    }
};
exports.default = selfRoleEnable;
