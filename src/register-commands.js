require("dotenv").config(); // give access to env var
const { REST, Routes } = require("discord.js"); // import
const commands = [
  //define command
  {
    name: "hey",
    description: "Replies with hey!",
  },
  {
    name: "ping",
    description: "Pong!",
  },
];
const rest = new REST({ version: "10" }).setToken(process.env.TOKEN); //REST API

(async () => {
  try {
    console.log("Registering slash commands...");
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );
    console.log("Slash commands weew registered successfully!");
  } catch (error) {
    console.log(`There was an error : ${error}`);
  }
})(); //register /[slash] command
