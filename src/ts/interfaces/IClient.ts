import { Client, Collection } from "discord.js";
import { ICommand } from "./ICommand";
import { IModalSubmit } from "./IModalSubmit";

export interface IClient extends Client{
    commands: Collection<string, ICommand>,
    modalSubmits: Collection<string, IModalSubmit>
}