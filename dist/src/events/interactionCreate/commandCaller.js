"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const config_json_1 = require("../../../config.json");
const commandCaller = {
    name: discord_js_1.Events.InteractionCreate,
    once: false,
    async execute(interaction, client) {
        if (!interaction.isChatInputCommand())
            return;
        if (!interaction.member)
            return;
        if (!interaction.guild)
            return;
        try {
            const commandObject = client.commands.get(interaction.commandName);
            if (!commandObject)
                return;
            if (commandObject.devOnly && !config_json_1.devs.includes(interaction.member.user.id)) {
                interaction.reply({
                    content: 'Only developers are allowed to run this command.',
                    ephemeral: true,
                });
                return;
            }
            if (commandObject.testOnly && !(interaction.guild.id === config_json_1.testServer)) {
                interaction.reply({
                    content: 'This command cannot be ran here.',
                    ephemeral: true,
                });
                return;
            }
            await commandObject.execute(interaction);
        }
        catch (error) {
            console.log(`There was an error running this command: ${error}`);
        }
    }
};
exports.default = commandCaller;
