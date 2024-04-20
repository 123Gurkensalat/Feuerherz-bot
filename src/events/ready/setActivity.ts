import { Client } from "discord.js"

module.exports = (client: Client<boolean>) => {
    client.user?.setActivity({
        name: 'AFK Journey'
    })
}