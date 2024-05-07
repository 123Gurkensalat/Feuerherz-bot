"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const commandCaller = {
    name: discord_js_1.Events.InteractionCreate,
    once: false,
    async execute(interaction, client) {
        if (!interaction.isModalSubmit())
            return;
        try {
            const modalObject = client.modalSubmits.get(interaction.customId);
            if (!modalObject)
                return;
            await modalObject.execute(interaction);
        }
        catch (error) {
            console.log(`There was an error running this command: ${error}`);
        }
    }
};
exports.default = commandCaller;
