import { ChatInputCommandInteraction, PermissionResolvable, SlashCommandBuilder } from "discord.js";

export interface ICommand {
    data: SlashCommandBuilder,
    execute: (interaction: ChatInputCommandInteraction) => Promise<void> | void,
    testOnly?: boolean,
    devOnly?: boolean
}