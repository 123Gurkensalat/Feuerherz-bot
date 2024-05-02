import { Events, ModalSubmitInteraction } from "discord.js";
import { IEvent } from "../../ts/interfaces/IEvent";
import { IClient } from "../../ts/interfaces/IClient";

const commandCaller: IEvent = {
    name: Events.InteractionCreate,
    once: false,
    async execute(interaction: ModalSubmitInteraction, client: IClient){
        if (!interaction.isModalSubmit()) return;
    
        try {
            const modalObject = client.modalSubmits.get(interaction.customId);
            
            if (!modalObject) return;
    
            await modalObject.execute(interaction);
        } catch (error) {
            console.log(`There was an error running this command: ${error}`);
        }
    }
}

export default commandCaller;