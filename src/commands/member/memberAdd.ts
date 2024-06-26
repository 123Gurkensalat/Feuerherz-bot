import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { ICommand } from "../../ts/interfaces/ICommand";
import { Member } from "../../models/member";

const memberAdd: ICommand = {
    data: new SlashCommandBuilder()
        .setName('member-add')
        .setDescription('Creates a new db-entry')
        .addStringOption(option => option
            .setName('name')
            .setDescription('Name of the member')
            .setDescriptionLocalizations({
                de: 'Name des Spielers'})
            .setRequired(true))
        .setDescriptionLocalizations({
            de: 'Erstellt ein neuen Spieler eintrag'})
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false)
    ,

    async execute(interaction) {
        const name = interaction.options.getString('name');

        try {
            await Member()?.create({
                server_id: interaction.guildId,
                name: name
            });

            interaction.reply({
                content: `Successfully added ${name}`,
                ephemeral: true
            });
        } catch (error) {
            console.error(error);

            interaction.reply({
                content: 'Could not add a new member :(',
                ephemeral: true
            })
        }
    }
}

export default memberAdd;