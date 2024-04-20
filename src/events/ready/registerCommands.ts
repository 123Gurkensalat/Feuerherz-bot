// import { Client } from "discord.js";
// import { testServer } from "../../../config.json";
// import compareCommands from "../../utils/compareCommands";
// import getApplicationCommands from "../../utils/getApplicationCommands";
// import getLocalCommands from "../../utils/getLocalCommands";

// module.exports = async (client: Client<boolean>) => {
//   try {
//     const localCommands = getLocalCommands();
//     const applicationCommands = await getApplicationCommands(
//       client,
//       testServer
//     );

//     if(!applicationCommands){
//       console.log("applicationCommands null or undefined");
//       return;
//     }

//     for (const localCommand of localCommands) {
//       const { name, description, options } = localCommand;

//       const existingCommand = await applicationCommands.cache.find(
//         (cmd) => cmd.name === name
//       );

//       if (existingCommand) {
//         if (localCommand.deleted) {
//           await applicationCommands.delete(existingCommand.id);
//           console.log(`Deleted command "${name}".`);
//           continue;
//         }

//         if (compareCommands(existingCommand, localCommand)) {
//           await applicationCommands.edit(existingCommand.id, {
//             description,
//             options,
//           });

//           console.log(`Edited command "${name}".`);
//         }
//       } else {
//         if (localCommand.deleted) continue;

//         await applicationCommands.create({
//           name,
//           description,
//           options,
//         });

//         console.log(`Registered command "${name}."`);
//       }
//     }
//   } catch (error) {
//     console.log(`TThere was an error: ${error}`);
//   }
// };