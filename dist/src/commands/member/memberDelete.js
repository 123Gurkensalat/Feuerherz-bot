"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const member_1 = require("../../models/member");
const memberInfo_1 = require("../../models/memberInfo");
const memberDelete = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('member-delete')
        .setDescription('Deletes member')
        .addStringOption(option => option
        .setName('name')
        .setDescription('Name of the member')
        .setDescriptionLocalizations({
        de: 'Name des Spielers'
    })
        .setRequired(true))
        .setDescriptionLocalizations({
        de: 'Löscht den Spieler'
    })
        .setDefaultMemberPermissions(discord_js_1.PermissionFlagsBits.Administrator)
        .setDMPermission(false),
    async execute(interaction) {
        const name = interaction.options.getString('name');
        try {
            const id = (await (0, member_1.Member)()?.findOne({
                where: {
                    name: name,
                    server_id: interaction.guildId
                },
                attributes: ['id']
            }))?.id;
            if (!id) {
                interaction.reply({
                    content: 'No such member',
                    ephemeral: true
                });
                return;
            }
            await (0, member_1.Member)()?.destroy({
                where: {
                    id: id
                }
            });
            await (0, memberInfo_1.MemberInfo)()?.destroy({
                where: {
                    member_id: id
                }
            });
            interaction.reply({
                content: `Successfully added ${name}`,
                ephemeral: true
            });
        }
        catch (error) {
            console.error(error);
            interaction.reply({
                content: 'Could not delete member :(',
                ephemeral: true
            });
        }
    }
};
exports.default = memberDelete;
