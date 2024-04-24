import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import { ICommand } from "../../ts/interfaces/ICommand";
import { SelfRole } from "../../models/selfRole";

const selfRoleDelete: ICommand = {
    data: new SlashCommandBuilder()
        .setName('self-role-delete')
        .setDescription('Delete a self-role interaction. If only an emoji is provided it will delete all instances of it')

        .addStringOption(option => option
            .setName('emoji')
            .setDescription('Emoji to delete')
            .setDescriptionLocalizations({
                de: 'Zu löschende Emoji'})
            .setRequired(true))

        .addRoleOption(option => option
            .setName('role')
            .setDescription('Role to delete')
            .setNameLocalizations({
                de: 'rolle'})
            .setDescriptionLocalizations({
                de: 'Zu löschende Rolle'}))

        .setDescriptionLocalizations({
            de: 'Lösche eine self-role Interaktion. Wenn nur Emoji angegeben wurd löscht es alle Einträge davon'})
        .setDefaultMemberPermissions(
            PermissionFlagsBits.ManageRoles)
        .setDMPermission(false)
    ,
    async execute(interaction){
        const guildId = interaction.guildId;
        const emoji = interaction.options.getString('emoji');
        const role = interaction.options.getRole('role');

        try {     
            const where: any = {
                guild: guildId,
                emoji: emoji,
            }

            if(role){
                where.role = role.id;
            }

            // destroy entries
            const count = await SelfRole()?.destroy({where});
            
            // deleted one instance
            if(role){
                interaction.reply({
                    content: `Successfully deleted: ${emoji} => ${role.name}).`,
                    ephemeral: true
                })
                return;
            }

            // deleted all instances
            if(count){
                interaction.reply({
                    content: `Successfully deleted all instances of ${emoji}.`,
                    ephemeral: true
                })
                return;                
            }

            // deleted no instances
            interaction.reply({
                content: `No instance of ${emoji} was found.`,
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

export default selfRoleDelete;