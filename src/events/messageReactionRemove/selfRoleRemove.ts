import { Events, MessageReaction, User } from "discord.js";
import { IEvent } from "../../ts/interfaces/IEvent";
import { Option } from "../../models/options";
import { SelfRole } from "../../models/selfRole";

const selfRoleRemove: IEvent = {
    name: Events.MessageReactionRemove,
    once: false,
    async execute(reaction: MessageReaction, user: User){
        // fetch data if partial
        if (reaction.partial) {
            try {
                await reaction.fetch();
            } catch (error) {
                console.error('Something went wrong when fetching the message:', error);
                return;
            }
        }

        // get guild and channel from cache
        const guildId = reaction.message.guildId || '';
        let channelId, enabled;

        // get channel from db
        try {
            const res: any = await Option()?.findOne({
                where: {
                    server_id: guildId
                }
            });
            channelId = res.self_role_channel;
            enabled = res.self_role_enabled;
        } catch (error) {
            console.error(error);
            return;
        }
        
        // only self_role_channel allowed
        if(reaction.message.channelId !== channelId || !enabled) return;

        // get emoji
        const emoji = reaction.emoji.toString();

        // get roleId
        try {
            const entries: any[] | undefined = await SelfRole()?.findAll({
                where: {
                    guild: guildId,
                    emoji: emoji
                }
            })

            if(!entries) return;

            for(const entry of entries){
                await reaction.message.guild?.members.removeRole({
                    role: entry.role,
                    user: user.id
                })
            }
        } catch (error) {
            console.error(error);
        }

    }
}

export default selfRoleRemove;