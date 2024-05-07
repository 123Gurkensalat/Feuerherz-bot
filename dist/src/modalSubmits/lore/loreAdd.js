"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lore_1 = require("../../models/lore");
const loreAdd = {
    id: 'loreAdd',
    async execute(interaction) {
        let titleInput = interaction.fields.getTextInputValue('title');
        let searchParams = interaction.fields.getTextInputValue('searchParams');
        const text1 = interaction.fields.getTextInputValue('text1');
        const text2 = interaction.fields.getTextInputValue('text2');
        const text3 = interaction.fields.getTextInputValue('text3');
        const chapter = titleInput.split('/')[1];
        const title = titleInput.split('/')[0];
        // join texts
        const text = text1 + text2 + text3;
        // update search
        searchParams += (searchParams.length ? ',' : '') + title;
        searchParams += chapter ? ',' + chapter : '';
        const lore = { title, text, search_params: searchParams.toLowerCase() };
        if (chapter)
            lore.chapter = chapter;
        try {
            await (0, lore_1.Lore)()?.create(lore);
            interaction.reply({
                content: 'Lore added',
                ephemeral: true
            });
        }
        catch (error) {
            console.log(error);
            interaction.reply({
                content: 'Internal server error',
                ephemeral: true
            });
        }
    }
};
exports.default = loreAdd;
