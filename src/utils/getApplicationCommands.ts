import { Snowflake } from "discord.js";
import IClient from "../ts/interfaces/IClient";
import ICommand from "../ts/interfaces/ICommand";

async function getApplicationCommands(client: IClient, guildId: Snowflake): Promise<any>{
    if(!client.application) return;
    
    let applicationCommands;

    if (guildId) {
        const guild = await client.guilds.fetch(guildId);
        applicationCommands = guild.commands;
    } else {
        applicationCommands = client.application.commands;
    }
    
    return applicationCommands;
};

export default getApplicationCommands;