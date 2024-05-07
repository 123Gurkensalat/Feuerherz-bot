"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const sequelize_1 = require("sequelize");
const lore_1 = require("../../models/lore");
const lore = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('lore')
        .setDescription('Random informations')
        .addStringOption(option => option
        .setName('search')
        .setDescription('Search for a specific title/chapter/content. Enumerate with ","')
        .setDescriptionLocalizations({
        de: 'Such nach einem bestimmten Titel/Kapitel/Thema. Aufzählungen mit ","'
    }))
        .setDescriptionLocalizations({
        de: 'Zufällige Geschichte'
    })
        .setDMPermission(true),
    async execute(interaction) {
        const search = interaction.options.getString('search')?.toLowerCase();
        const findOne = { order: sequelize_1.Sequelize.literal('random()') };
        if (search)
            findOne.where = {
                search_params: {
                    [sequelize_1.Op.in]: search.split(',')
                }
            };
        try {
            const res = await (0, lore_1.Lore)()?.findOne(findOne);
            if (!res) {
                interaction.reply({
                    content: 'No match',
                    ephemeral: true
                });
                return;
            }
            // start message chain
            const textArr = res.text.match(/[\s\S]{1,1900}/gm);
            await interaction.reply({
                content: `# ${res.title}\n## ${res.chapter}\n${textArr[0]}`,
                ephemeral: true
            });
            // bomb them, bomb them, keep bombing them, bomb them again and again 
            for (let i = 1; i < textArr.length; i++) {
                await interaction.followUp({
                    content: textArr[i],
                    ephemeral: true
                });
            }
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
exports.default = lore;
