import Dc, { Events } from "discord.js";
import { IEvent } from "../../ts/interfaces/IEvent";
import { Option } from "../../models/options";

const createGuildEntry: IEvent = {
    name: Events.GuildCreate,
    execute(guild: Dc.Guild){
        if(!guild.available) return;
        
        console.log('New Server joined');
        Option()?.create({
            server_id: guild.id
        }).catch(console.error);
    }
}

export default createGuildEntry;