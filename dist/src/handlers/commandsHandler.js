"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const getAllFiles_1 = __importDefault(require("../utils/getAllFiles"));
const discord_js_1 = require("discord.js");
function commandsHandler(client, exceptions = []) {
    try {
        client.commands = new discord_js_1.Collection();
        const commandCategories = (0, getAllFiles_1.default)(path_1.default.join(__dirname, '..', 'commands'), true);
        // go through every file
        for (const commandCategory of commandCategories) {
            const commandFiles = (0, getAllFiles_1.default)(commandCategory);
            for (const commandFile of commandFiles) {
                const commandObject = require(commandFile).default;
                if (exceptions.includes(commandObject.data.name))
                    continue;
                client.commands.set(commandObject.data.name, commandObject);
            }
        }
    }
    catch (error) {
        console.log(error);
    }
}
exports.default = commandsHandler;
