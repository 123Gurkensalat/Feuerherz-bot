"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const discord_js_1 = require("discord.js");
const eventHandler_1 = __importDefault(require("./handlers/eventHandler"));
const commandsHandler_1 = __importDefault(require("./handlers/commandsHandler"));
const sequelize_1 = require("sequelize");
const modalSubmitHandler_1 = __importDefault(require("./handlers/modalSubmitHandler"));
dotenv_1.default.config();
const sequelize = new sequelize_1.Sequelize({
    dialect: 'sqlite',
    storage: './src/data/database.sqlite',
    logging: false
});
// load neccessary tables
const Guild = require('./models/guild').default(sequelize);
const GuildInfo = require('./models/guildInfo').default(sequelize);
const Lore = require('./models/lore').default(sequelize);
const Member = require('./models/member').default(sequelize);
const MemberInfo = require('./models/memberInfo').default(sequelize);
const Options = require('./models/options').default(sequelize);
const SelfRole = require('./models/selfRole').default(sequelize);
const client = new discord_js_1.Client({
    intents: ['Guilds', 'GuildMembers', 'GuildMessages', 'MessageContent', 'GuildMessageReactions'],
    partials: [discord_js_1.Partials.Message, discord_js_1.Partials.Reaction]
});
// cache and subscribe
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to SQLite-Db has been established successfully...');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
    try {
        // set client.commands
        (0, commandsHandler_1.default)(client);
        (0, modalSubmitHandler_1.default)(client);
        console.log('Local commands cached successfully...');
    }
    catch (error) {
        console.error('Unable to load local commands:', error);
    }
    try {
        // subscribe to events
        (0, eventHandler_1.default)(client);
        console.log('Subscribed to events successfully...');
    }
    catch (error) {
        console.error('Unable to subscribe to events:', error);
    }
})().then(() => {
    client.login(process.env.TOKEN);
});
