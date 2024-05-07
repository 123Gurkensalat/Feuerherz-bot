"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const selfRole_1 = require("../../models/selfRole");
const selfRoleDelete = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('self-role-delete')
        .setDescription('Delete a self-role interaction. If only an emoji is provided it will delete all instances of it')
        .addStringOption(option => option
        .setName('emoji')
        .setDescription('Emoji to delete')
        .setDescriptionLocalizations({
        de: 'Zu löschende Emoji'
    })
        .setRequired(true))
        .addRoleOption(option => option
        .setName('role')
        .setDescription('Role to delete')
        .setNameLocalizations({
        de: 'rolle'
    })
        .setDescriptionLocalizations({
        de: 'Zu löschende Rolle'
    }))
        .setDescriptionLocalizations({
        de: 'Lösche eine self-role Interaktion. Wenn nur Emoji angegeben wurd löscht es alle Einträge davon'
    })
        .setDefaultMemberPermissions(discord_js_1.PermissionFlagsBits.ManageRoles)
        .setDMPermission(false),
    async execute(interaction) {
        const guildId = interaction.guildId;
        const emoji = interaction.options.getString('emoji');
        const role = interaction.options.getRole('role');
        try {
            const where = {
                guild: guildId,
                emoji: emoji,
            };
            if (role) {
                where.role = role.id;
            }
            // destroy entries
            const count = await (0, selfRole_1.SelfRole)()?.destroy({ where });
            // deleted one instance
            if (role) {
                interaction.reply({
                    content: `Successfully deleted: ${emoji} => ${role.name}).`,
                    ephemeral: true
                });
                return;
            }
            // deleted all instances
            if (count) {
                interaction.reply({
                    content: `Successfully deleted all instances of ${emoji}.`,
                    ephemeral: true
                });
                return;
            }
            // deleted no instances
            interaction.reply({
                content: `No instance of ${emoji} was found.`,
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
exports.default = selfRoleDelete;
