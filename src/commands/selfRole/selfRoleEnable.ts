import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { ICommand } from "../../ts/interfaces/ICommand";
import { Guild } from "../../models/guild";

const selfRoleEnable: ICommand = {
    data: new SlashCommandBuilder()
        .setName('self-role-enable')
        .setDescription('enable or disenable self-role features')

        .addBooleanOption(option => option
            .setName('enable')
            .setDescription('.')
            .setRequired(true))
            
        .setDescriptionLocalizations({
            de: 'Aktiviere oder deaktiviere self-role'})
        .setDefaultMemberPermissions(
            PermissionFlagsBits.ManageRoles)
        .setDMPermission(false)
    ,
    async execute (interaction){
        const guildId = interaction.guildId;
        const enable = interaction.options.getBoolean('enable');

        try {
            const test = await Guild()?.update({
                self_role_enabled: enable
            },{
                where: {
                    id: guildId
                }
            })
            
            interaction.reply({
                content: `self-role is now ${enable? 'enabled' : 'disabled'}.`,
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

export default selfRoleEnable