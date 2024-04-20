import path = require("path");
import getAllFiles from "../utils/getAllFiles";
import { Client } from "discord.js";

function eventHandler(client: Client<boolean>){
    const eventFolders = getAllFiles(path.join(__dirname, '..', 'events'), true);

    for (const eventFolder of eventFolders) {
        const eventFiles = getAllFiles(eventFolder);

        // sort events by name ascending
        eventFiles.sort();
        
        // unify dir names
        const eventName = eventFolder.replace(/\\/g, '/').split('/').pop();

        if(!eventName) continue;

        client.on(eventName, async (arg) => {
            for (const eventFile of eventFiles) {
                // call Event function
                await require(eventFile)(client, arg);
            }
        });
    }
};

export default eventHandler;