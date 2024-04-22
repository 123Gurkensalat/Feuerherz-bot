import dotenv from "dotenv";
import { Client } from "discord.js";
import eventHandler from "./handlers/eventHandler";
import { IClient } from "./ts/interfaces/IClient";
import commandsHandler from "./handlers/commandsHandler";

dotenv.config();

const client = new Client({
    intents: ['Guilds', 'GuildMembers', 'GuildMessages', 'MessageContent']
}) as IClient;

// set client.commands
commandsHandler(client);

// subscribe to events
eventHandler(client);

client.login(process.env.TOKEN);  