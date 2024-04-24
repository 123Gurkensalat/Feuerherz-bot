import Dc, { Events } from "discord.js";
import { IEvent } from "../../ts/interfaces/IEvent";
import { Guild } from "../../models/guild";

const createGuildEntry: IEvent = {
    name: Events.GuildCreate,
    execute(guild: Dc.Guild){
        if(!guild.available) return;
        
        console.log('New Server joined');
        Guild()?.create({
            id: guild.id
        }).catch(console.error);
    }
}

export default createGuildEntry;