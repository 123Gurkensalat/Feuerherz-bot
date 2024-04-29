import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { ICommand } from "../../ts/interfaces/ICommand";
import { Option } from "../../models/options";

const selfRoleChannel: ICommand = {
    data: new SlashCommandBuilder()
        .setName('self-role-channel')
        .setDescription('sets the self-role channel. There can only be one')

        .addChannelOption(option => option
            .setName('channel')
            .setDescription('Channel for self-role')
            .setNameLocalizations({
                de: 'kanal'})
            .setDescriptionLocalizations({
                de: 'Kanal für self-role'})
            .setRequired(true))
            
        .setDescriptionLocalizations({
            de: 'Legt den Kanal für self-role fest. Nur einer kann existieren'})
        .setDefaultMemberPermissions(
            PermissionFlagsBits.ManageChannels |
            PermissionFlagsBits.ManageRoles)
        .setDMPermission(false)
    ,
    async execute (interaction){
        const channel = interaction.options.getChannel('channel');
        const guildId = interaction.guildId;

        try {
            await Option()?.update({
                self_role_channel: channel?.id
            },{
                where: {
                    server_id: guildId
                }
            })

            interaction.reply({
                content: `self-role-channel changed to ${channel?.name} successfully :sunglasses:`,
                ephemeral: true
            })
        } catch (error) {
            console.error(error);

            interaction.reply({
                content: 'Internal Server Error. If this problem remains please contact a developer.',
                ephemeral: true
            })
        }
    }
}

export default selfRoleChannel;