import dotenv from "dotenv";
import { Client } from "discord.js";
import eventHandler from "./handlers/eventHandler";
import getApplicationCommands from "./utils/getApplicationCommands";
import { Console } from "console";

dotenv.config();

const client = new Client({
    intents: ['Guilds', 'GuildMembers', 'GuildMessages', 'MessageContent']
});

eventHandler(client);

client.login(process.env.TOKEN);  