"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const setActivity = {
    name: discord_js_1.Events.ClientReady,
    once: true,
    execute(client) {
        client.user?.setActivity({
            name: 'AFK Journey'
        });
    }
};
exports.default = setActivity;
