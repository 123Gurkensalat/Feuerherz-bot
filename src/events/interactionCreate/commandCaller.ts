import { ChatInputCommandInteraction, Events } from 'discord.js';
import { devs, testServer } from '../../../config.json'
import { IClient } from '../../ts/interfaces/IClient';
import { IEvent } from '../../ts/interfaces/IEvent';

const commandCaller: IEvent = {
    name: Events.InteractionCreate,
    once: false,
    async execute(interaction: ChatInputCommandInteraction, client: IClient){
        if (!interaction.isChatInputCommand()) return;
        if (!interaction.member) return;
        if (!interaction.guild) return;
    
        try {
            const commandObject = client.commands.get(interaction.commandName);
    
            if (!commandObject) return;
    
            if (commandObject.devOnly && !devs.includes(interaction.member.user.id)) {
                interaction.reply({
                    content: 'Only developers are allowed to run this command.',
                    ephemeral: true,
                });
                return;
            }
    
            if (commandObject.testOnly && !(interaction.guild.id === testServer)) {
                interaction.reply({
                    content: 'This command cannot be ran here.',
                    ephemeral: true,
                });
                return;
            }
    
            await commandObject.execute(interaction);
        } catch (error) {
            console.log(`There was an error running this command: ${error}`);
        }
    }
}

export default commandCaller;