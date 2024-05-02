import { ModalSubmitInteraction } from "discord.js";

export interface IModalSubmit {
    id: string,
    execute: (interaction: ModalSubmitInteraction) => Promise<void> | void
}