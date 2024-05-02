import { SlashCommandBuilder } from "discord.js";
import { ICommand } from "../../ts/interfaces/ICommand";
import { Lore } from "../../models/lore";

const loreDelete: ICommand = {
    data: new SlashCommandBuilder()
        .setName('lore-delete')
        .setDescription('Deletes a lore entry')
        .addStringOption(option => option
            .setName('title')
            .setDescription('Title of lore')
            .setDescriptionLocalizations({
                de: 'Titel der Geschichte'})
            .setRequired(true))
        .addStringOption(option => option
            .setName('chapter')
            .setDescription('The chapter to delete. If empty it will delete all instances of title')
            .setDescriptionLocalizations({
                de: 'Das zu löschende Kapitel. Wenn leer, dann werden alle Eintrage vom Titel gelöscht'}))
        .setDescriptionLocalizations({
            de: 'Löscht einen Geschichts Eintrag'})
        .setDMPermission(true)
    ,
    devOnly: true,
    async execute(interaction) {
        const title = interaction.options.getString('title');
        const chapter = interaction.options.getString('chapter');

        const where: any = {title};
        
        if(chapter) where.chapter = chapter;
        try {
            await Lore()?.destroy({where})

            interaction.reply({
                content: 'Deletion successful',
                ephemeral: true
            })
        } catch (error) {
            console.error(error);
            interaction.reply({
                content: 'Internal server error',
                ephemeral: true
            })
        }
    }
}

export default loreDelete;