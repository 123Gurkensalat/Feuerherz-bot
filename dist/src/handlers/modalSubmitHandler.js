"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const getAllFiles_1 = __importDefault(require("../utils/getAllFiles"));
const discord_js_1 = require("discord.js");
function modalSubmitHandler(client, exceptions = []) {
    try {
        client.modalSubmits = new discord_js_1.Collection();
        const dirname = __dirname.endsWith('\\dist') ? path_1.default.join(__dirname, '..', 'src', 'handlers') : __dirname;
        const modalCategories = (0, getAllFiles_1.default)(path_1.default.join(dirname, '..', 'modalSubmits'), true);
        // go through every file
        for (const modalCategory of modalCategories) {
            const modalFiles = (0, getAllFiles_1.default)(modalCategory);
            for (const modalFile of modalFiles) {
                const modalObject = require(modalFile).default;
                if (exceptions.includes(modalObject.id))
                    continue;
                client.modalSubmits.set(modalObject.id, modalObject);
            }
        }
    }
    catch (error) {
        console.log(error);
    }
}
exports.default = modalSubmitHandler;
