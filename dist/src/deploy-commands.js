"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const discord_js_1 = require("discord.js");
const path_1 = __importDefault(require("path"));
const getAllFiles_1 = __importDefault(require("./utils/getAllFiles"));
dotenv_1.default.config();
const commands = [];
// Grab all the command folders from the commands directory you created earlier
const commandFolders = (0, getAllFiles_1.default)(path_1.default.join(__dirname, 'commands'), true);
(async () => {
    for (const folder of commandFolders) {
        // Grab all the command files from the commands directory you created earlier
        const commandFiles = (0, getAllFiles_1.default)(folder);
        // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
        for (const file of commandFiles) {
            const command = require(file).default;
            if ('data' in command && 'execute' in command) {
                commands.push(command.data.toJSON());
            }
            else {
                console.log(`[WARNING] The command at ${file} is missing a required "data" or "execute" property.`);
            }
        }
    }
})();
// Construct and prepare an instance of the REST module
const rest = new discord_js_1.REST().setToken(process.env.TOKEN);
// and deploy your commands!
(async () => {
    if (!commands.length)
        return;
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);
        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(discord_js_1.Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands });
        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    }
    catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
})();
