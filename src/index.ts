import dotenv from "dotenv";
import { Client, Partials } from "discord.js";
import eventHandler from "./handlers/eventHandler";
import { IClient } from "./ts/interfaces/IClient";
import commandsHandler from "./handlers/commandsHandler";
import { Sequelize } from "sequelize";

dotenv.config();

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './src/data/database.sqlite',
    logging: false
});

// load neccessary tables
const Guild = require('./models/guild').default(sequelize);
const SelfRole = require('./models/selfRole').default(sequelize);

const client = new Client({
    intents: ['Guilds', 'GuildMembers', 'GuildMessages', 'MessageContent', 'GuildMessageReactions'],
    partials: [Partials.Message, Partials.Reaction]
}) as IClient;

// cache and subscribe
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to SQLite-Db has been established successfully...');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
    try {
        // set client.commands
        commandsHandler(client);
        console.log('Local commands cached successfully...')
    } catch (error) {
        console.error('Unable to load local commands:', error);
    }
    
    try {
        // subscribe to events
        eventHandler(client);
        console.log('Subscribed to events successfully...');
    } catch (error) {
        console.error('Unable to subscribe to events:', error);
    }    
})().then(() => {
    client.login(process.env.TOKEN);
})