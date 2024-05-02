import dotenv from "dotenv";
import { Client, Partials } from "discord.js";
import eventHandler from "./handlers/eventHandler";
import { IClient } from "./ts/interfaces/IClient";
import commandsHandler from "./handlers/commandsHandler";
import { Model, ModelCtor, Sequelize } from "sequelize";
import modalSubmitHandler from "./handlers/modalSubmitHandler";

dotenv.config();

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './src/data/database.sqlite',
    logging: false
});

// load neccessary tables
const Guild = require('./models/guild').default(sequelize) as ModelCtor<Model<any, any>>;
const GuildInfo = require('./models/guildInfo').default(sequelize) as ModelCtor<Model<any, any>>;
const Lore = require('./models/lore').default(sequelize) as ModelCtor<Model<any, any>>;
const Member = require('./models/member').default(sequelize) as ModelCtor<Model<any, any>>;
const MemberInfo = require('./models/memberInfo').default(sequelize) as ModelCtor<Model<any, any>>;
const Options = require('./models/options').default(sequelize) as ModelCtor<Model<any, any>>;
const SelfRole = require('./models/selfRole').default(sequelize) as ModelCtor<Model<any, any>>;

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
        modalSubmitHandler(client);
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