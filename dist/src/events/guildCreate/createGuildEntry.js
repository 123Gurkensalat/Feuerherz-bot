"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const options_1 = require("../../models/options");
const createGuildEntry = {
    name: discord_js_1.Events.GuildCreate,
    execute(guild) {
        if (!guild.available)
            return;
        console.log('New Server joined');
        (0, options_1.Option)()?.create({
            server_id: guild.id
        }).catch(console.error);
    }
};
exports.default = createGuildEntry;
