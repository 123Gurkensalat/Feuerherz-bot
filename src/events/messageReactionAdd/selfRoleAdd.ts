import { DiscordAPIError, Events, MessageReaction, User } from "discord.js";
import { IEvent } from "../../ts/interfaces/IEvent";
import { Guild } from "../../models/guild";
import { SelfRole } from "../../models/selfRole";

let GuildSelfRoleChannel: any = {};

const selfRoleAdd: IEvent = {
    name: Events.MessageReactionAdd,
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
        let channelId = GuildSelfRoleChannel[guildId];

        // get channel from db
        if(!channelId){
            try {
                const res: any = await Guild()?.findOne({
                    where: {
                        id: guildId
                    },
                    attributes: ['self_role_channel']
                });
                channelId = res.self_role_channel;
                GuildSelfRoleChannel[guildId] = channelId;
            } catch (error) {
                console.error(error);
                return;
            }
        }

        // only self_role_channel allowed
        if(reaction.message.channelId !== channelId) return;

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
                await reaction.message.guild?.members.addRole({
                    role: entry.role,
                    user: user.id
                })
            }
        } catch (error) {
            // handle DiscordApiError: not enough permissions
            if((error as DiscordAPIError).code === 50013){
                reaction.message.reply({
                    content: 'Bot permissions are insufficient'
                })
                return;
            }
            console.error(error);
        }

    }
}

export default selfRoleAdd;