require("dotenv").config(); // give access to env var
const { Client, IntentsBitField } = require("discord.js"); //Client ==> bot , Intent ==> what our bot can do

const client = new Client({
  // set action
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
}); //Guild = server

client.on("ready", (c) => {
  console.log(`${c.user.tag} is online 🤩`);
}); //listner when bot is ready and log out

client.on("messageCreate", (message) => {
  // event when type message
  if (message.author.bot) {
    //prevent bot not reply yourself
    return;
  }
  if (message.content === "hello" || "hi") {
    // reply message
    message.reply("Hey! 🤓");
  }
});

client.on("interactionCreate", (interaction) => {
  // event when hit /
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "add") {
    // add command --> find sum
    const num1 = interaction.options.get("first-number")?.value; // get value from option
    const num2 = interaction.options.get("second-number")?.value;
    interaction.reply(`The sum is ${num1 + num2}`);
  }
});

client.login(process.env.TOKEN); // login bot into server [online bot]
