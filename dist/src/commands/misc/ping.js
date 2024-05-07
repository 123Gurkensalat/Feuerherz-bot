"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const ping = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('ping')
        .setDescription('will answer pong (hopefully)'),
    async execute(interaction) {
        const currentData = new Date();
        await interaction.reply({
            content: `Pong! ${currentData.getTime() - interaction.createdTimestamp}ms`,
            ephemeral: true
        });
    }
};
exports.default = ping;
