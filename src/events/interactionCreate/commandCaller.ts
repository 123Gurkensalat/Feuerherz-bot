import { ChatInputCommandInteraction, PermissionsBitField } from 'discord.js';
import { devs, testServer } from '../../../config.json'
import IClient from '../../ts/interfaces/IClient';
import ICommand from '../../ts/interfaces/ICommand';

async function commandCaller(client: IClient, interaction: ChatInputCommandInteraction){
    if (!interaction.isChatInputCommand()) return;
    if (!interaction.member) return;
    if (!interaction.guild) return;

    try {
        const commandObject = client.commands.find(
            (cmd) => cmd.data.name === interaction.commandName
        );

        if (!commandObject) return;

        if (commandObject.devOnly && !devs.includes(interaction.member.user.id)) {
            interaction.reply({
                content: 'Only developers are allowed to run this command.',
                ephemeral: true,
            });
            return;
        }

        if (commandObject.testOnly && !(interaction.guild.id === testServer)) {
            interaction.reply({
                content: 'This command cannot be ran here.',
                ephemeral: true,
            });
            return;
        }

        if (commandObject.permissionsRequired?.length) {
            for (const permission of commandObject.permissionsRequired) {
                const memberPermissions = interaction.member.permissions as Readonly<PermissionsBitField> ;
                if (!memberPermissions.has(permission)) {
                    interaction.reply({
                        content: 'Not enough permissions.',
                        ephemeral: true,
                    });
                    return;
                }
            }
        }

        if (commandObject.botPermissions?.length) {
            for (const permission of commandObject.botPermissions) {
                const bot = interaction.guild.members.me;

                if (!bot?.permissions.has(permission)) {
                    interaction.reply({
                        content: "I don't have enough permissions.",
                        ephemeral: true,
                    });
                    return;
                }
            }
        }

        await commandObject.execute(interaction);
    } catch (error) {
        console.log(`There was an error running this command: ${error}`);
    }
};

export default commandCaller;