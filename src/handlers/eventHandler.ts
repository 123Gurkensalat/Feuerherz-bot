import path from "path";
import getAllFiles from "../utils/getAllFiles";
import IClient from "../ts/interfaces/IClient";

function eventHandler(client: IClient){
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
                try{
                    // call Event function
                    require(eventFile).default(client, arg);
                }catch(e){
                    console.log(`Error occured are file ${eventFile}: \n${e}`)
                }
            }
        });
    }
}; 

export default eventHandler;