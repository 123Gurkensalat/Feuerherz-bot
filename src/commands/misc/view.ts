import { ChatInputCommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { ICommand } from "../../ts/interfaces/ICommand";
import { Guild } from "../../models/guild";
import { SelfRole } from "../../models/selfRole";

const view: ICommand = {
    data: new SlashCommandBuilder()
        .setName('view')
        .setDescription('View datatables')
        .addStringOption(option => option
            .setName('table')
            .setDescription('Table to show')
            .addChoices(
                {name: 'options', value: 'guild', name_localizations: {de: 'Einstellungen'}},
                {name: 'self-role', value: 'self_role'})
            .setRequired(true))
        .setDescriptionLocalizations({
            de: 'Zeigt Datentabelle an'})
        .setDefaultMemberPermissions(
            PermissionFlagsBits.Administrator)
        .setDMPermission(false)
    ,
    execute(interaction){
        const guildId = interaction.guildId;
        const table = interaction.options.getString('table');

        switch (table) {
            case 'guild':
                viewGuild(interaction);
                break;
            case 'self_role':
                viewSelfRole(interaction);
                break;
            default:
                interaction.reply({
                    content: 'No such table found',
                    ephemeral: true
                });
                break;
        }
    }
}

async function viewGuild(interaction: ChatInputCommandInteraction){
    try {
        const entry: any = await Guild()?.findOne({
            where: {
                id: interaction.guildId
            }
        });
    
        const channel = await interaction.guild?.channels.fetch(entry.self_role_channel);

        interaction.reply({
            content: `self-role is ${entry?.self_role_enabled? 'activated': 'deactivated'}\nself-role-channel: ${channel?.name}`
            ,
            ephemeral: true
        });
    } catch (error) {
        console.log(error);

        interaction.reply({
            content: 'Internal server error',
            ephemeral: true
        });
    }
}

async function viewSelfRole(interaction: ChatInputCommandInteraction) {
    try {
        const entries: any[] | undefined = await SelfRole()?.findAll({
            where: {
                guild: interaction.guildId
            }
        });

        if(!entries?.length){
            interaction.reply({
                content: 'No self-roles set. Please use /self-role-add first',
                ephemeral: true
            });

            return;
        }

        const roles = await interaction.guild?.roles.fetch();
    
        const content = entries?.map(entry => `${entry.emoji} => ${roles?.get(entry.role)?.name}`).join('\n');
        
        interaction.reply({content, ephemeral: true});
    } catch (error) {
        console.log(error);

        interaction.reply({
            content: 'Internal server error',
            ephemeral: true
        });
    }
}

export default view;

