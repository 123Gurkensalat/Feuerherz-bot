import { Client, ApplicationCommandManager, Snowflake } from "discord.js";

async function getApplicationCommands(client: Client<boolean>, guildId: Snowflake){
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