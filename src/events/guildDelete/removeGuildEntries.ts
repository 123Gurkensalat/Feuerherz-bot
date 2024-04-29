import Dc, { Events } from "discord.js";
import { IEvent } from "../../ts/interfaces/IEvent";
import { Option } from "../../models/options";

const removeGuildEntries: IEvent = {
    name: Events.GuildDelete,
    execute(guild: Dc.Guild){
        if(!guild.available) return;

        Option()?.destroy({
            where: {
                server_id: guild.id
            }
        }).catch(console.error);
    }
}

export default removeGuildEntries;