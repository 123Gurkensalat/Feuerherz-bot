"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const options_1 = require("../../models/options");
const selfRole_1 = require("../../models/selfRole");
const selfRoleRemove = {
    name: discord_js_1.Events.MessageReactionRemove,
    once: false,
    async execute(reaction, user) {
        // fetch data if partial
        if (reaction.partial) {
            try {
                await reaction.fetch();
            }
            catch (error) {
                console.error('Something went wrong when fetching the message:', error);
                return;
            }
        }
        // get guild and channel from cache
        const guildId = reaction.message.guildId || '';
        let channelId, enabled;
        // get channel from db
        try {
            const res = await (0, options_1.Option)()?.findOne({
                where: {
                    server_id: guildId
                }
            });
            channelId = res.self_role_channel;
            enabled = res.self_role_enabled;
        }
        catch (error) {
            console.error(error);
            return;
        }
        // only self_role_channel allowed
        if (reaction.message.channelId !== channelId || !enabled)
            return;
        // get emoji
        const emoji = reaction.emoji.toString();
        // get roleId
        try {
            const entries = await (0, selfRole_1.SelfRole)()?.findAll({
                where: {
                    server_id: guildId,
                    emoji: emoji
                }
            });
            if (!entries)
                return;
            for (const entry of entries) {
                await reaction.message.guild?.members.removeRole({
                    role: entry.role,
                    user: user.id
                });
            }
        }
        catch (error) {
            console.error(error);
        }
    }
};
exports.default = selfRoleRemove;
