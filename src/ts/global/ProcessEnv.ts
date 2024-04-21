import { Snowflake } from "discord.js"

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            TOKEN: string
            GUILD_ID: Snowflake
            CLIENT_ID: Snowflake
        }
    }
}