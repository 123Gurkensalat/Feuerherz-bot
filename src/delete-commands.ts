import { REST, Routes } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

const rest = new REST().setToken(process.env.TOKEN);

rest.delete(Routes.applicationCommand(process.env.CLIENT_ID, '1231314371431497818'));