"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const options_1 = require("../../models/options");
const removeGuildEntries = {
    name: discord_js_1.Events.GuildDelete,
    execute(guild) {
        if (!guild.available)
            return;
        (0, options_1.Option)()?.destroy({
            where: {
                server_id: guild.id
            }
        }).catch(console.error);
    }
};
exports.default = removeGuildEntries;
