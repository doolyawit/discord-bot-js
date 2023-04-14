require("dotenv").config(); // give access to env var
const {
  Client,
  IntentsBitField,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js"); //Client ==> bot , Intent ==> what our bot can do

const client = new Client({
  // set action
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
}); //Guild = server

const roles = [
  //define roles
  {
    id: "1096342024149540874",
    label: "Fairy",
  },
  {
    id: "1096342320091238410",
    label: "Human",
  },
];

client.on("ready", async (c) => {
  try {
    const channel = await client.channels.cache.get("1096122368583270483");
    if (!channel) return; // check chanel exist or not

    const row = new ActionRowBuilder(); //row of button
    roles.forEach((role) => {
      //loop throught each role add to the row
      row.components.push(
        new ButtonBuilder()
          .setCustomId(role.id)
          .setLabel(role.label)
          .setStyle(ButtonStyle.Primary)
      );
    });

    await channel.send({
      content: "Claim or remove a role below.",
      components: [row],
    });
    process.exit();
  } catch (error) {
    console.log(error);
  }
}); //listner when bot is ready

client.on("messageCreate", (message) => {
  // event when type message
  if (message.author.bot) {
    //prevent bot not reply yourself
    return;
  }
  if (message.content === "hello") {
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
    interaction.reply(`The sum is ${num1 + num2}`); //send value to output
  }
  if (interaction.commandName === "embed") {
    // embed command
    const embed = new EmbedBuilder() //create embed
      .setTitle("Hey This is DIWX's bot 🐧👋")
      .setDescription("Penguin!!")
      .setColor(0xffd966)
      .addFields(
        {
          name: "Field title",
          value: "Some random value",
          inline: true,
        },
        {
          name: "2nd Field title",
          value: "Some random value",
          inline: true,
        }
      )
      .setImage("https://media.giphy.com/media/Cmr1OMJ2FN0B2/giphy.gif")
      .setThumbnail(
        "https://images.unsplash.com/photo-1560425396-332040b8fee1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=712&q=80"
      )
      .setURL("https://www.penguin.com/");

    interaction.reply({ embeds: [embed] });
  }
});
client.on("messageCreate", (message) => {
  if (message.content === "embed") {
    const embed = new EmbedBuilder()
      .setTitle("Hey This is DIWX's bot 🐧👋")
      .setDescription("Penguin!!")
      .setColor(0xffd966)
      .addFields(
        {
          name: "Field title",
          value: "Some random value",
          inline: true,
        },
        {
          name: "2nd Field title",
          value: "Some random value",
          inline: true,
        }
      )
      .setImage("https://media.giphy.com/media/Cmr1OMJ2FN0B2/giphy.gif")
      .setThumbnail(
        "https://images.unsplash.com/photo-1560425396-332040b8fee1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=712&q=80"
      )
      .setURL("https://www.worldwildlife.org/species/penguin");

    message.channel.send({ embeds: [embed] });
  }
});

client.login(process.env.TOKEN); // login bot into server [online bot]
