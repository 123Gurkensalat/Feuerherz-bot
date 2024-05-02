import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import { ICommand } from "../../ts/interfaces/ICommand";
import { Option } from "../../models/options";

const guildInit: ICommand = {
    data: new SlashCommandBuilder()
        .setName('init')
        .setDescription('Will create a new server instance. This will be called on server enter.')
        .setDescriptionLocalizations({
            de: 'Erstellt eine neue Server Instanz. Dies wird automatisch ausgeführt sobald der Bot hinzugefügt wird'})
        .setDefaultMemberPermissions(
            PermissionFlagsBits.Administrator)
        .setDMPermission(false)
    ,
    async execute(interaction){
        const guildId = interaction.guildId;

        try {
            await Option()?.create({
                server_id: guildId
            })

            interaction.reply({
                content: 'New server instance created',
                ephemeral: true
            })
        } catch (error) {
            console.error(error);

            interaction.reply({
                content: 'Internal Server Error',
                ephemeral: true
            })
        }
    }
}

export default guildInit;