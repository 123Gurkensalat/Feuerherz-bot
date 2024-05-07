import path from "path";
import getAllFiles from "../utils/getAllFiles";
import { IClient } from "../ts/interfaces/IClient";
import { Collection } from "discord.js";
import { IModalSubmit } from "../ts/interfaces/IModalSubmit";

function modalSubmitHandler(client: IClient, exceptions: string[] = []){
    try {
        client.modalSubmits = new Collection();
        
        const dirname = __dirname.endsWith('\\dist')? path.join(__dirname, '..', 'src', 'handlers'): __dirname; 

        const modalCategories = getAllFiles(path.join(dirname, '..', 'modalSubmits'), true);

        // go through every file
        for (const modalCategory of modalCategories) {
            const modalFiles = getAllFiles(modalCategory);

            for (const modalFile of modalFiles) {
                const modalObject: IModalSubmit = require(modalFile).default;
                
                if (exceptions.includes(modalObject.id)) continue;
                
                client.modalSubmits.set(modalObject.id, modalObject);
            }
        }
    } catch (error) {
        console.log(error);
    }
    
}

export default modalSubmitHandler;