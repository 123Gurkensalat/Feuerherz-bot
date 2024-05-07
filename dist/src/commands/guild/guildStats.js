"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const extractName_1 = __importDefault(require("../../utils/extractName"));
const member_1 = require("../../models/member");
const guild_1 = require("../../models/guild");
const guildInfo_1 = require("../../models/guildInfo");
const powerConversions_1 = require("../../utils/powerConversions");
const guildStats = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('guild-stats')
        .setDescription('Shows guild stats')
        .addStringOption(option => option
        .setName('name')
        .setDescription('Guild name')
        .setDescriptionLocalizations({
        de: 'Gilden Name'
    }))
        .addNumberOption(option => option
        .setName('days')
        .setDescription('How far the prediction should go')
        .setDescriptionLocalizations({
        de: 'Wie weit die Vorhersage gehen soll'
    }))
        .setDescriptionLocalizations({
        de: 'Zeigt Gilden Werte'
    })
        .setDMPermission(false),
    async execute(interaction) {
        const name = interaction.options.getString('name');
        const days = interaction.options.getNumber('days');
        let guildId;
        try {
            if (!name) {
                const nickname = interaction.member.nickname;
                if (!nickname) {
                    interaction.reply({
                        content: 'could not extract nickname',
                        ephemeral: true
                    });
                    return;
                }
                const memberName = await (0, extractName_1.default)(nickname, interaction.guildId || '');
                if (!memberName) {
                    interaction.reply({
                        content: 'could not extract nickname',
                        ephemeral: true
                    });
                    return;
                }
                guildId = (await (0, member_1.Member)()?.findOne({
                    where: {
                        server_id: interaction.guildId,
                        name: memberName
                    },
                    attributes: ['guild_id']
                }))?.guild_id;
            }
            else {
                guildId = (await (0, guild_1.Guild)()?.findOne({
                    where: {
                        server_id: interaction.guildId,
                        name: name
                    },
                    attributes: ['id']
                }))?.id;
            }
            if (!guildId) {
                interaction.reply({
                    content: 'No guild found',
                    ephemeral: true
                });
                return;
            }
            const infos = await (0, guildInfo_1.GuildInfo)()?.findAll({
                where: {
                    guild_id: guildId
                },
                order: [
                    ['created_at', 'ASC']
                ]
            }) || [];
            if (!infos.length) {
                interaction.reply({
                    content: 'No stats found',
                    ephemeral: true
                });
                return;
            }
            const guildName = (await (0, guild_1.Guild)()?.findOne({
                where: {
                    id: guildId
                },
                attributes: ['name']
            }))?.name;
            let requestedValues = infos[0];
            if (days) {
                // predict
            }
            // reply
            // sometimes typescript is really ugly...
            let isAdmin = (interaction.member?.permissions).has(discord_js_1.PermissionsBitField.Flags.Administrator);
            interaction.reply({
                content: `
                ${guildName}:
                Total: ${(0, powerConversions_1.IntToPower)(requestedValues.total)}
                Durchsschnitt: ${(0, powerConversions_1.IntToPower)(requestedValues.mean)}
                ${isAdmin ? `Kick: <${(0, powerConversions_1.IntToPower)(requestedValues.kick)}` : ''}
                Bereinigtes Total: ${(0, powerConversions_1.IntToPower)(requestedValues.adjusted_total)}
                `,
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
exports.default = guildStats;
