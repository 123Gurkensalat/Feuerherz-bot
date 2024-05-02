import { SlashCommandBuilder } from "discord.js";
import { ICommand } from "../../ts/interfaces/ICommand";
import { Op, Sequelize } from "sequelize";
import { Lore } from "../../models/lore";

const lore: ICommand = {
    data: new SlashCommandBuilder()
        .setName('lore')
        .setDescription('Random informations')
        .addStringOption(option => option
            .setName('search')
            .setDescription('Search for a specific title/chapter/content. Enumerate with ","')
            .setDescriptionLocalizations({
                de: 'Such nach einem bestimmten Titel/Kapitel/Thema. Aufzählungen mit ","'}))
        .setDescriptionLocalizations({
            de: 'Zufällige Geschichte'})
        .setDMPermission(true)
    ,

    async execute(interaction) {
        const search = interaction.options.getString('search')?.toLowerCase();

        const findOne: any = {order: Sequelize.literal('random()')}

        if(search) findOne.where = {
            search_params: {
                [Op.in]: search.split(',')
            }
        }

        try {
            const res: any = await Lore()?.findOne(findOne);
            
            if(!res){
                interaction.reply({
                    content: 'No match',
                    ephemeral: true
                })
                return;
            }

            // start message chain
            const textArr = res.text.match(/[\s\S]{1,1900}/gm);
            
            await interaction.reply({
                content: `# ${res.title}\n## ${res.chapter}\n${textArr[0]}`,
                ephemeral: true
            })

            // bomb them, bomb them, keep bombing them, bomb them again and again 
            for(let i = 1; i < textArr.length; i++){
                await interaction.followUp({
                    content: textArr[i],
                    ephemeral: true
                })
            }
        } catch (error) {
            console.error(error);
            interaction.reply({
                content: 'Internal server error',
                ephemeral: true
            })
        }
    }
}

export default lore;