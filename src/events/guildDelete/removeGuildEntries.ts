import Dc, { Events } from "discord.js";
import { IEvent } from "../../ts/interfaces/IEvent";
import { Guild } from "../../models/guild";

const removeGuildEntries: IEvent = {
    name: Events.GuildDelete,
    execute(guild: Dc.Guild){
        if(!guild.available) return;

        Guild()?.destroy({
            where: {
                id: guild.id
            }
        }).catch(console.error);
    }
}

export default removeGuildEntries;