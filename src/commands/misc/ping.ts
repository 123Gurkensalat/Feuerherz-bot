import { SlashCommandBuilder } from "discord.js";
import { ICommand } from "../../ts/interfaces/ICommand";

const ping: ICommand = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('will answer pong (hopefully)')
    ,

    async execute(interaction) {
        const currentData = new Date();
    
        await interaction.reply({
            content: `Pong! ${currentData.getTime() - interaction.createdTimestamp}ms`,
            ephemeral: true
        });
    },
    testOnly: true,
    devOnly: true
}

export default ping;