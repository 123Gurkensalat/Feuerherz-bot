import { SlashCommandBuilder } from "discord.js";

interface ICommand {
    data: SlashCommandBuilder,
    execute: (interaction: any) => Promise<void>
}

export default ICommand;