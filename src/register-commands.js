require("dotenv").config(); // give access to env var
const { REST, Routes, ApplicationCommandOptionType } = require("discord.js"); // import
const commands = [
  //define command
  {
    name: "add",
    description: "Adds two numbers.",
    options: [
      //option
      {
        name: "first-number",
        description: "The first number.",
        type: ApplicationCommandOptionType.Number, // must set type to number
        required: true,
      },
      {
        name: "second-number",
        description: "The second number.",
        type: ApplicationCommandOptionType.Number,
        required: true,
      },
    ],
  },
  {
    name: "embed",
    description: "Sends an embed!",
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
    console.log("Slash commands were registered successfully!");
  } catch (error) {
    console.log(`There was an error : ${error}`);
  }
})(); //register /[slash] command
