import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { ICommand } from "../../ts/interfaces/ICommand";
import { Guild } from "../../models/guild";
import { Member } from "../../models/member";
import { GuildInfo } from "../../models/guildInfo";

const guildCreate: ICommand = {
    data: new SlashCommandBuilder()
        .setName('guild-delete')
        .setDescription('Deletes a guild')
        .addStringOption(option => option
            .setName('name')
            .setDescription('Name of the guild')
            .setDescriptionLocalizations({
                de: 'Name der Gilde'})
            .setRequired(true))
        .setDescriptionLocalizations({
            de: 'Löscht eine Gilde'})
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    ,

    async execute(interaction) {
        const name = interaction.options.getString('name');

        try {
            const where = { name: name, server_id: interaction.guildId }
            const id = (await Guild()?.findOne({ where }) as any)?.id;

            if(!id){
                interaction.reply({
                    content: `No guild with name ${name} found`,
                    ephemeral: true
                })
                return;
            }

            // destroy guild
            await Guild()?.destroy({ where })

            // remove guild references
            await Member()?.update({
                guild_id: null
            },{
                where: {
                    guild_id: id 
                }
            })

            // remove guild infos
            await GuildInfo()?.destroy({
                where: {
                    guild_id: id
                }
            })

            interaction.reply({
                content: `Successfully destroyed ${name}`,
                ephemeral: true
            })            
        } catch (error) {
            console.error(error);

            interaction.reply({
                content: `Could not destroy ${name}`,
                ephemeral: true
            })
        }
    }
}

export default guildCreate;