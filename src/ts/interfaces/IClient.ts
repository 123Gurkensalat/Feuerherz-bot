import { ApplicationCommand, Client, Collection } from "discord.js";
import ICommand from "./ICommand";

interface IClient extends Client{
    commands: ICommand[]
}

export default IClient;