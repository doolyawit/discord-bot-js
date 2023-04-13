require("dotenv").config(); // give access to env var
const { REST, Routes, ApplicationCommandOptionType } = require("discord.js"); // import
const commands = [
  //define command
  {
    name: "add",
    description: "Adds two numbers.",
    options: [
      {
        name: "first-number",
        description: "The first number.",
        type: ApplicationCommandOptionType.Number,
        choices: [
          {
            name: "1",
            value: 1,
          },
          {
            name: "2",
            value: 2,
          },
          {
            name: "3",
            value: 3,
          },
        ],
        required: true,
      },
      {
        name: "second-number",
        description: "The second number.",
        type: ApplicationCommandOptionType.Number,
        choices: [
          {
            name: "1",
            value: 1,
          },
          {
            name: "2",
            value: 2,
          },
          {
            name: "3",
            value: 3,
          },
        ],
        required: true,
      },
    ],
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
