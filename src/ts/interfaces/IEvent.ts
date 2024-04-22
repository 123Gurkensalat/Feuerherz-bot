import { Events } from "discord.js";

export interface IEvent{
    name: Events,
    execute: (...args: any) => Promise<void> | void
    once?: boolean,
}