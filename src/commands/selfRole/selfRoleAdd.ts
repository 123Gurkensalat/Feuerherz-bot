import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import { ICommand } from "../../ts/interfaces/ICommand";
import { SelfRole } from "../../models/selfRole";

const selfRoleAdd: ICommand = {
    data: new SlashCommandBuilder()
        .setName('self-role-add')
        .setDescription('Add a new emoji to role interaction')

        .addStringOption(option => option
            .setName('emoji')
            .setDescription('Emoji used for self-role')
            .setDescriptionLocalizations({
                de: 'Emoji welches benutzt wird für self-role'})
            .setRequired(true))

        .addRoleOption(option => option
            .setName('role')
            .setDescription('Role to be asigned')
            .setNameLocalizations({
                de: 'rolle'})
            .setDescriptionLocalizations({
                de: 'Rolle die vergeben wird'})
            .setRequired(true))

        .setDescriptionLocalizations({
            de: 'Füge eine neue Emoji zu Rolle interaktion hinzu'})
        .setDefaultMemberPermissions(
            PermissionFlagsBits.ManageRoles)
        .setDMPermission(false)
    ,
    async execute(interaction){
        const guildId = interaction.guildId;
        const emoji = interaction.options.getString('emoji');
        const role = interaction.options.getRole('role');

        try {
            await SelfRole()?.create({
                server_id: guildId,
                emoji: emoji,
                role: role?.id
            })
            
            interaction.reply({
                content: `Created new emoji to role interaction (${emoji} => ${role?.name})`,
                ephemeral: true
            })
        } catch (error) {
            console.error(error);

            interaction.reply({
                content: 'Internal Server error. Please contact developer.',
                ephemeral: true
            })
        }
    }
}

export default selfRoleAdd;