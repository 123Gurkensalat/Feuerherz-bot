"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const loreAdd = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('lore-add')
        .setDescription('Adds a new Lore entry. (Opens a modal)')
        .setDescriptionLocalizations({
        de: 'Fügt einen neuen Lore Eintrag hinzu. (Öffnet ein Pop-up)'
    })
        .setDMPermission(true),
    devOnly: true,
    async execute(interaction) {
        const modal = new discord_js_1.ModalBuilder()
            .setCustomId('loreAdd')
            .setTitle('Add lore');
        // Add components to modal
        const titleInput = new discord_js_1.TextInputBuilder()
            .setCustomId('title')
            .setLabel('Title/Chapter:')
            .setStyle(discord_js_1.TextInputStyle.Short)
            .setRequired(true);
        const searchParamsInput = new discord_js_1.TextInputBuilder()
            .setCustomId('searchParams')
            .setLabel('Search parameter:')
            .setStyle(discord_js_1.TextInputStyle.Short)
            .setRequired(false);
        const textInput1 = new discord_js_1.TextInputBuilder()
            .setCustomId('text1')
            .setLabel('Text:')
            .setStyle(discord_js_1.TextInputStyle.Paragraph)
            .setRequired(true);
        const textInput2 = new discord_js_1.TextInputBuilder()
            .setCustomId('text2')
            .setLabel('Text:')
            .setStyle(discord_js_1.TextInputStyle.Paragraph)
            .setRequired(false);
        const textInput3 = new discord_js_1.TextInputBuilder()
            .setCustomId('text3')
            .setLabel('Text:')
            .setStyle(discord_js_1.TextInputStyle.Paragraph)
            .setRequired(false);
        // An action row only holds one text input,
        // so you need one action row per text input.
        const row1 = new discord_js_1.ActionRowBuilder().addComponents(titleInput);
        const row2 = new discord_js_1.ActionRowBuilder().addComponents(searchParamsInput);
        const row3 = new discord_js_1.ActionRowBuilder().addComponents(textInput1);
        const row4 = new discord_js_1.ActionRowBuilder().addComponents(textInput2);
        const row5 = new discord_js_1.ActionRowBuilder().addComponents(textInput3);
        // Add inputs to the modal
        modal.addComponents(row1, row2, row3, row4, row5);
        // Show the modal to the user
        await interaction.showModal(modal);
    }
};
exports.default = loreAdd;
