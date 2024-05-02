import dotenv from "dotenv";
import { REST, Routes, SlashCommandBuilder } from "discord.js";
import path from "path";
import getAllFiles from "./utils/getAllFiles";
import { ICommand } from "./ts/interfaces/ICommand";

dotenv.config();

const commands: object[] = [];
// Grab all the command folders from the commands directory you created earlier
const commandFolders = getAllFiles(path.join(__dirname, 'commands'), true);

(async() => {
    for (const folder of commandFolders) {
        // Grab all the command files from the commands directory you created earlier
        const commandFiles = getAllFiles(folder);

        // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
        for (const file of commandFiles) {
            const command: ICommand = require(file).default;
            if ('data' in command && 'execute' in command) {
                commands.push(command.data.toJSON());
            } else {
                console.log(`[WARNING] The command at ${file} is missing a required "data" or "execute" property.`);
            }
        }
    }
})()

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(process.env.TOKEN);

// and deploy your commands!
(async () => {
    if(!commands.length) return;
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);
        
		// The put method is used to fully refresh all commands in the guild with the current set
		const data: any = await rest.put(
			Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();