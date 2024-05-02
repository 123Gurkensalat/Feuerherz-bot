import { ActionRowBuilder, ModalActionRowComponentBuilder, ModalBuilder, SlashCommandBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import { ICommand } from "../../ts/interfaces/ICommand";

const loreAdd: ICommand = {
    data: new SlashCommandBuilder()
        .setName('lore-add')
        .setDescription('Adds a new Lore entry. (Opens a modal)')
        .setDescriptionLocalizations({
            de: 'Fügt einen neuen Lore Eintrag hinzu. (Öffnet ein Pop-up)'})
		.setDMPermission(true)
    ,
	devOnly: true,
    async execute(interaction) {
        const modal = new ModalBuilder()
			.setCustomId('loreAdd')
			.setTitle('Add lore');

		// Add components to modal
		const titleInput = new TextInputBuilder()
			.setCustomId('title')
			.setLabel('Title/Chapter:')
			.setStyle(TextInputStyle.Short)
            .setRequired(true);

        const searchParamsInput = new TextInputBuilder()
            .setCustomId('searchParams')
            .setLabel('Search parameter:')
            .setStyle(TextInputStyle.Short)
            .setRequired(false);

		const textInput1 = new TextInputBuilder()
			.setCustomId('text1')
			.setLabel('Text:')
			.setStyle(TextInputStyle.Paragraph)
            .setRequired(true);

		const textInput2 = new TextInputBuilder()
			.setCustomId('text2')
			.setLabel('Text:')
			.setStyle(TextInputStyle.Paragraph)
            .setRequired(false);
		const textInput3 = new TextInputBuilder()
			.setCustomId('text3')
			.setLabel('Text:')
			.setStyle(TextInputStyle.Paragraph)
            .setRequired(false);

		// An action row only holds one text input,
		// so you need one action row per text input.
		const row1 = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(titleInput);
		const row2 = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(searchParamsInput);
		const row3 = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(textInput1);
		const row4 = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(textInput2);
		const row5 = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(textInput3);

		// Add inputs to the modal
		modal.addComponents(row1, row2, row3, row4, row5);

		// Show the modal to the user
		await interaction.showModal(modal);
    }
}

export default loreAdd;