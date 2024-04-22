import { Events } from "discord.js";
import { IClient } from "../../ts/interfaces/IClient"
import { IEvent } from "../../ts/interfaces/IEvent";

const setActivity: IEvent = {
    name: Events.ClientReady,
    once: true,
    execute(client: IClient){
        client.user?.setActivity({
            name: 'AFK Journey'
        })
    }
}

export default setActivity;