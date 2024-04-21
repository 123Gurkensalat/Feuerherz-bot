import { ChatInputCommandInteraction, PermissionResolvable, SlashCommandBuilder } from "discord.js";

interface ICommand {
    data: SlashCommandBuilder,
    execute: (interaction: ChatInputCommandInteraction) => Promise<void>,
    testOnly?: boolean,
    devOnly?: boolean,
    permissionsRequired?: PermissionResolvable[],
    botPermissions?: PermissionResolvable[],
}

export default ICommand;