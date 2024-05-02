import { Lore } from "../../models/lore";
import { IModalSubmit } from "../../ts/interfaces/IModalSubmit";

const loreAdd: IModalSubmit = {
    id: 'loreAdd',
    async execute(interaction){
        let titleInput = interaction.fields.getTextInputValue('title');
        let searchParams = interaction.fields.getTextInputValue('searchParams');

        const text1 = interaction.fields.getTextInputValue('text1');
        const text2 = interaction.fields.getTextInputValue('text2');
        const text3 = interaction.fields.getTextInputValue('text3');

        const chapter = titleInput.split('/')[1];
        const title = titleInput.split('/')[0];

        // join texts
        const text = text1 + text2 + text3;

        // update search
        searchParams += (searchParams.length? ',' : '') + title;
        searchParams += chapter? ',' + chapter : '';

        const lore: any = {title, text, search_params: searchParams.toLowerCase()}

        if(chapter) lore.chapter = chapter;

        try {
            await Lore()?.create(lore)
            
            interaction.reply({
                content: 'Lore added',
                ephemeral: true
            })
        } catch (error) {
            console.log(error)
            interaction.reply({
                content: 'Internal server error',
                ephemeral: true
            })
        }
    }
}

export default loreAdd;