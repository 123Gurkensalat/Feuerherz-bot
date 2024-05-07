"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const member_1 = require("../../models/member");
const memberInfo_1 = require("../../models/memberInfo");
const guild_1 = require("../../models/guild");
const extractName_1 = __importDefault(require("../../utils/extractName"));
const powerConversions_1 = require("../../utils/powerConversions");
const memberStats = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('member-stats')
        .setDescription('Shows the stats of the user. When no name is given it will use your nickname.')
        .addStringOption(option => option
        .setName('name')
        .setDescription('Explicit name')
        .setDescriptionLocalizations({
        de: 'Expliziter name'
    }))
        .addNumberOption(option => option
        .setName('days')
        .setDescription('How far the prediction should go')
        .setDescriptionLocalizations({
        de: 'Wie weit die Vorhersage gehen soll'
    }))
        .setDescriptionLocalizations({
        de: 'Zeigt die Infos eines Spielers. Wenn kein Name angegeben ist, wird der dc-Nickname benutzt.'
    })
        .setDMPermission(false),
    async execute(interaction) {
        let name = interaction.options.getString('name');
        const days = interaction.options.getNumber('days');
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
                name = await (0, extractName_1.default)(nickname, interaction.guildId || '');
                if (!name) {
                    interaction.reply({
                        content: 'could not extract nickname',
                        ephemeral: true
                    });
                    return;
                }
            }
            // get member
            const member = await (0, member_1.Member)()?.findOne({
                where: {
                    server_id: interaction.guildId,
                    name: name
                },
                attributes: ['id', 'guild_id']
            });
            if (!member) {
                interaction.reply({
                    content: 'No member found',
                    ephemeral: true
                });
                return;
            }
            const guildName = (await (0, guild_1.Guild)()?.findOne({
                where: {
                    id: member.guild_id
                },
                attributes: ['name']
            }))?.name;
            // get all entries with name
            const infos = await (0, memberInfo_1.MemberInfo)()?.findAll({
                where: {
                    member_id: member.id
                },
                order: [
                    ['created_at', 'ASC']
                ]
            });
            if (!infos?.length) {
                interaction.reply({
                    content: 'No stats found',
                    ephemeral: true
                });
                return;
            }
            let requestedPower = (0, powerConversions_1.IntToPower)(infos[0].power);
            if (days) {
                // predict
            }
            // responde
            interaction.reply({
                content: `${name} ${guildName ? `in der Gilde ${guildName}` : ''}: ${days ? `\nWird in ${days} Tagen ${requestedPower} haben` : requestedPower}`,
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
exports.default = memberStats;
