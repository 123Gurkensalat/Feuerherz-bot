import { ChatInputCommandInteraction, Client, SlashCommandBuilder } from "discord.js";
import ICommand from "../../ts/interfaces/ICommand";

const ping: ICommand = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('will answer pong (hopefully)'),

    async execute(interaction){
        await interaction.reply('Pong!')
    }

}
export default ping;