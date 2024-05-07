"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const guild_1 = require("../../models/guild");
const member_1 = require("../../models/member");
const guildInfo_1 = require("../../models/guildInfo");
const guildDelete = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('guild-delete')
        .setDescription('Deletes a guild')
        .addStringOption(option => option
        .setName('name')
        .setDescription('Name of the guild')
        .setDescriptionLocalizations({
        de: 'Name der Gilde'
    })
        .setRequired(true))
        .setDescriptionLocalizations({
        de: 'Löscht eine Gilde'
    })
        .setDefaultMemberPermissions(discord_js_1.PermissionFlagsBits.Administrator)
        .setDMPermission(false),
    async execute(interaction) {
        const name = interaction.options.getString('name');
        try {
            const where = { name: name, server_id: interaction.guildId };
            const id = (await (0, guild_1.Guild)()?.findOne({ where, attributes: ['id'] }))?.id;
            if (!id) {
                interaction.reply({
                    content: `No guild with name ${name} found`,
                    ephemeral: true
                });
                return;
            }
            // destroy guild
            await (0, guild_1.Guild)()?.destroy({ where });
            // remove guild references
            await (0, member_1.Member)()?.update({
                guild_id: null
            }, {
                where: {
                    guild_id: id
                }
            });
            // remove guild infos
            await (0, guildInfo_1.GuildInfo)()?.destroy({
                where: {
                    guild_id: id
                }
            });
            interaction.reply({
                content: `Successfully destroyed ${name}`,
                ephemeral: true
            });
        }
        catch (error) {
            console.error(error);
            interaction.reply({
                content: `Could not destroy ${name}`,
                ephemeral: true
            });
        }
    }
};
exports.default = guildDelete;
