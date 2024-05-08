import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { ICommand } from "../../ts/interfaces/ICommand";
import { Member } from "../../models/member";
import { MemberInfo } from "../../models/memberInfo";

const memberDelete: ICommand = {
    data: new SlashCommandBuilder()
        .setName('member-delete')
        .setDescription('Deletes member')
        .addStringOption(option => option
            .setName('name')
            .setDescription('Name of the member')
            .setDescriptionLocalizations({
                de: 'Name des Spielers'})
            .setRequired(true))
        .setDescriptionLocalizations({
            de: 'Löscht den Spieler'})
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false)
    ,

    async execute(interaction) {
        const name = interaction.options.getString('name');

        try {
            const id = (await Member()?.findOne({
                where: {
                    name: name,
                    server_id: interaction.guildId
                },
                attributes: ['id']
            }) as any)?.id

            if(!id){
                interaction.reply({
                    content: 'No such member',
                    ephemeral: true
                })
                return;
            }
        
            await Member()?.destroy({
                where: {
                    id: id
                }
            });

            await MemberInfo()?.destroy({
                where: {
                    member_id: id
                }
            })

            interaction.reply({
                content: `Successfully deleted ${name}`,
                ephemeral: true
            });
        } catch (error) {
            console.error(error);

            interaction.reply({
                content: 'Could not delete member :(',
                ephemeral: true
            })
        }
    }
}

export default memberDelete;