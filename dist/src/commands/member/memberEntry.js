"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const member_1 = require("../../models/member");
const memberInfo_1 = require("../../models/memberInfo");
const powerConversions_1 = require("../../utils/powerConversions");
const memberEntry = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('member-entry')
        .setDescription('Adds a new member stats entry')
        .addStringOption(option => option
        .setName('name')
        .setDescription('Name of Player')
        .setDescriptionLocalizations({
        de: 'Name des Spieler'
    })
        .setRequired(true))
        .addStringOption(option => option
        .setName('power')
        .setDescription('Power in XXXXk format')
        .setDescriptionLocalizations({
        de: 'Power in XXXXk Format'
    })
        .setRequired(true))
        .setDefaultMemberPermissions(discord_js_1.PermissionFlagsBits.Administrator)
        .setDMPermission(false),
    async execute(interaction) {
        const name = interaction.options.getString('name');
        const power = interaction.options.getString('power') || '0';
        try {
            const memberId = (await (0, member_1.Member)()?.findOne({
                where: {
                    server_id: interaction.guildId,
                    name: name
                },
                attributes: ['id']
            }))?.id;
            if (!memberId) {
                interaction.reply({
                    content: 'Could not find member',
                    ephemeral: true
                });
                return;
            }
            await (0, memberInfo_1.MemberInfo)()?.create({
                member_id: memberId,
                power: (0, powerConversions_1.PowerToInt)(power)
            });
            interaction.reply({
                content: 'Successfully created entry',
                ephemeral: true
            });
        }
        catch (error) {
            console.error(error);
            interaction.reply({
                content: 'Internal server error',
                ephemeral: true
            });
        }
    }
};
exports.default = memberEntry;
