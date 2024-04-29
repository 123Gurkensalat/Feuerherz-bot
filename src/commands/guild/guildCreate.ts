import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { ICommand } from "../../ts/interfaces/ICommand";
import { Guild } from "../../models/guild";

const guildCreate: ICommand = {
    data: new SlashCommandBuilder()
        .setName('guild-create')
        .setDescription('Creates a new db-entry')
        .addStringOption(option => option
            .setName('name')
            .setDescription('Name of the new guild')
            .setDescriptionLocalizations({
                de: 'Name der neuen Gilde'})
            .setRequired(true))
        .setDescriptionLocalizations({
            de: 'Erstellt ein neuen Gilden eintrag'})
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false)
    ,

    async execute(interaction) {
        const name = interaction.options.getString('name');

        try {
            await Guild()?.create({
                name,
                server_id: interaction.guildId
            });

            interaction.reply({
                content: `Successfully created ${name}`,
                ephemeral: true
            });
        } catch (error) {
            console.error(error);

            interaction.reply({
                content: 'Could not create a new guild : (',
                ephemeral: true
            })
        }
    }
}

export default guildCreate;