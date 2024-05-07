"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const rest = new discord_js_1.REST().setToken(process.env.TOKEN);
rest.delete(discord_js_1.Routes.applicationCommand(process.env.CLIENT_ID, '1231314371431497818'));
