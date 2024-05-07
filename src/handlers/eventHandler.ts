import path from "path";
import getAllFiles from "../utils/getAllFiles";
import { IClient } from "../ts/interfaces/IClient";
import { IEvent } from "../ts/interfaces/IEvent";

function eventHandler(client: IClient){    
    const dirname = __dirname.endsWith('\\dist')? path.join(__dirname, '..', 'src', 'handlers'): __dirname; 

    const eventFolders = getAllFiles(path.join(dirname, '..', 'events'), true);

    for (const eventFolder of eventFolders) {
        const eventFiles = getAllFiles(eventFolder);

        // sort events by name ascending
        eventFiles.sort();
        
        for (const eventFile of eventFiles){
            try {
                // get event object
                const event: IEvent = require(eventFile).default;
                // subscribe listener to event
                if(event.once){
                    client.once(event.name as string, (...args) => event.execute(...args, client));
                }else{
                    client.on(event.name as string, (...args) => event.execute(...args, client));
                }
            } catch (error) {
                console.log(`Error occured at file ${eventFile}: \n${error}`)
            }
        }
    }
}; 

export default eventHandler;