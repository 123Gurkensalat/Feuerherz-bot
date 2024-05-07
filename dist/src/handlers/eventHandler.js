"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const getAllFiles_1 = __importDefault(require("../utils/getAllFiles"));
function eventHandler(client) {
    const dirname = __dirname.endsWith('\\dist') ? path_1.default.join(__dirname, '..', 'src', 'handlers') : __dirname;
    const eventFolders = (0, getAllFiles_1.default)(path_1.default.join(dirname, '..', 'events'), true);
    for (const eventFolder of eventFolders) {
        const eventFiles = (0, getAllFiles_1.default)(eventFolder);
        // sort events by name ascending
        eventFiles.sort();
        for (const eventFile of eventFiles) {
            try {
                // get event object
                const event = require(eventFile).default;
                // subscribe listener to event
                if (event.once) {
                    client.once(event.name, (...args) => event.execute(...args, client));
                }
                else {
                    client.on(event.name, (...args) => event.execute(...args, client));
                }
            }
            catch (error) {
                console.log(`Error occured at file ${eventFile}: \n${error}`);
            }
        }
    }
}
;
exports.default = eventHandler;
