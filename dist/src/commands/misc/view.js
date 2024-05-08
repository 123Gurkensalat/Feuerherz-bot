"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const options_1 = require("../../models/options");
const selfRole_1 = require("../../models/selfRole");
const member_1 = require("../../models/member");
const guild_1 = require("../../models/guild");
const view = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('view')
        .setDescription('View datatables')
        .addStringOption(option => option
        .setName('table')
        .setDescription('Table to show')
        .addChoices({ name: 'options', value: 'options', name_localizations: { de: 'Einstellungen' } }, { name: 'self-role', value: 'self_role' }, { name: 'members', value: 'members' }, { name: 'guilds', value: 'guilds' })
        .setRequired(true))
        .setDescriptionLocalizations({
        de: 'Zeigt Datentabelle an'
    })
        .setDefaultMemberPermissions(discord_js_1.PermissionFlagsBits.Administrator)
        .setDMPermission(false),
    execute(interaction) {
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
};
async function viewOptions(interaction) {
    try {
        const entry = await (0, options_1.Option)()?.findOne({
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
            content: `self-role is ${entry?.self_role_enabled ? 'activated' : 'deactivated'}\nself-role-channel: ${channel?.name}`,
            ephemeral: true
        });
    }
    catch (error) {
        console.log(error);
        interaction.reply({
            content: 'Internal server error',
            ephemeral: true
        });
    }
}
async function viewSelfRole(interaction) {
    try {
        const entries = await (0, selfRole_1.SelfRole)()?.findAll({
            where: {
                guild: interaction.guildId
            }
        });
        if (!entries?.length) {
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
        await interaction.reply({ content, ephemeral: true });
    }
    catch (error) {
        console.log(error);
        interaction.reply({
            content: 'Internal server error',
            ephemeral: true
        });
    }
}
async function viewMembers(interaction) {
    try {
        const fromServer = { where: {
                server_id: interaction.guildId
            } };
        const members = await (0, member_1.Member)()?.findAll(fromServer);
        const guilds = await (0, guild_1.Guild)()?.findAll(fromServer);
        members.sort((a, b) => {
            if (a.name < b.name)
                return -1;
            if (a.name > b.name)
                return 1;
            return 0;
        });
        members.forEach((el) => {
            el.guild = guilds.find(guild => guild.id === el.guild_id)?.name;
        });

        if(!members?.length){
            interaction.reply({
                content: 'No entries found',
                ephemeral: true
            })

            return;
        }

        const text = members.map(el => `${el.name}: ${el.guild ? el.guild : 'no guild'}`).join('\n');
        await interaction.reply({
            content: text,
            ephemeral: true
        });
    }
    catch (error) {
        console.log(error);
        interaction.reply({
            content: 'Internal server error',
            ephemeral: true
        });
    }
}
async function viewGuilds(interaction) {
    try {
        const guilds = await (0, guild_1.Guild)()?.findAll({
            where: {
                server_id: interaction.guildId
            }
        });
        if(!guilds?.length){
            interaction.reply({
                content: 'No entries found',
                ephemeral: true
            })

            return;
        }
        await interaction.reply({
            content: guilds?.map((el) => el.name).join(', '),
            ephemeral: true
        });
    }
    catch (error) {
        console.log(error);
        interaction.reply({
            content: 'Internal server error',
            ephemeral: true
        });
    }
}
exports.default = view;
