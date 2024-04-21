import path from "path";
import getAllFiles from "../utils/getAllFiles";
import ICommand from "../ts/interfaces/ICommand";
import IClient from "../ts/interfaces/IClient";

function commandsHandler(client: IClient, exceptions: string[] = []){
    try {
        client.commands = [];

        const commandCategories = getAllFiles(
            path.join(__dirname, '..', 'commands'),
            true
        );

        for (const commandCategory of commandCategories) {
            const commandFiles = getAllFiles(commandCategory);

            for (const commandFile of commandFiles) {
                const commandObject: ICommand = require(commandFile).default;
                
                if (exceptions.includes(commandObject.data.name)) continue;

                client.commands.push(commandObject);
            }
        }
    } catch (error) {
        console.log(error);
    }
    
}

export default commandsHandler;