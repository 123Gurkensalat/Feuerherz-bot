import { ChatInputCommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { ICommand } from "../../ts/interfaces/ICommand";
import { Option } from "../../models/options";
import { SelfRole } from "../../models/selfRole";
import { Member } from "../../models/member";
import { Guild } from "../../models/guild";

const view: ICommand = {
    data: new SlashCommandBuilder()
        .setName('view')
        .setDescription('View datatables')
        .addStringOption(option => option
            .setName('table')
            .setDescription('Table to show')
            .addChoices(
                {name: 'options', value: 'options', name_localizations: {de: 'Einstellungen'}},
                {name: 'self-role', value: 'self_role'},
                {name: 'members', value: 'members'},
                {name: 'guilds', value: 'guilds'})
            .setRequired(true))
        .setDescriptionLocalizations({
            de: 'Zeigt Datentabelle an'})
        .setDefaultMemberPermissions(
            PermissionFlagsBits.Administrator)
        .setDMPermission(false)
    ,
    execute(interaction){
        const table = interaction.options.getString('table');

        switch (table) {
            case 'options':
                viewOptions(interaction);
                break;
            case 'self_role':
                viewSelfRole(interaction);
                break;
            case 'members':
                viewMembers(interaction);
                break;
            case 'guilds': 
                viewGuilds(interaction);
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

async function viewOptions(interaction: ChatInputCommandInteraction){
    try {
        const entry: any = await Option()?.findOne({
            where: {
                server_id: interaction.guildId
            }
        });
    
        const channel = await interaction.guild?.channels.fetch(entry.self_role_channel);
        if(!entry){
            interaction.reply({
                content: 'No entries found',
                ephemeral: true
            })

            return;
        }
        await interaction.reply({
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
        if(!content){
            interaction.reply({
                content: 'No entries found',
                ephemeral: true
            })

            return;
        }
        await interaction.reply({content, ephemeral: true});
    } catch (error) {
        console.log(error);

        interaction.reply({
            content: 'Internal server error',
            ephemeral: true
        });
    }
}

async function viewMembers(interaction: ChatInputCommandInteraction) {
    try {
        const fromServer = {where: {
            server_id: interaction.guildId
        }}
        const members = await Member()?.findAll(fromServer) as any[];

        const guilds = await Guild()?.findAll(fromServer) as any[];

        members.sort((a, b) => {
            if(a.name < b.name) return -1;
            if(a.name > b.name) return 1;
            return 0;
        });

        members.forEach((el: any) => {
            el.guild = guilds.find(guild => guild.id === el.guild_id)?.name;
        });
        if(!members?.length){
            interaction.reply({
                content: 'No entries found',
                ephemeral: true
            })

            return;
        }
        const text = members.map(el => `${el.name}: ${el.guild? el.guild: 'no guild'}`).join('\n');

        await interaction.reply({
            content: text,
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

async function viewGuilds(interaction: ChatInputCommandInteraction){
    try {
        const guilds = await Guild()?.findAll({
            where: {
                server_id: interaction.guildId
            }
        })
        if(!guilds?.length){
            interaction.reply({
                content: 'No entries found',
                ephemeral: true
            })

            return;
        }
        await interaction.reply({
            content: guilds?.map((el: any) => el.name).join(', '),
            ephemeral: true
        })
    } catch (error) {
        console.log(error);

        interaction.reply({
            content: 'Internal server error',
            ephemeral: true
        });
    }
}

export default view;

