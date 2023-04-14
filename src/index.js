require("dotenv").config(); // give access to env var
const {
  Client,
  IntentsBitField,
  EmbedBuilder,
  ActivityType,
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

let status = [
  //set status
  {
    name: "Under Ctrl",
    type: ActivityType.Streaming,
    url: "https://www.youtube.com/watch?v=OqxHy8sCtvA&list=PLpmb-7WxPhe0ZVpH9pxT5MtC4heqej8Es&index=6",
  },
  {
    name: "Under Ctrl",
    type: ActivityType.Watching,
  },
  {
    name: "Under Ctrl",
    type: ActivityType.Competing,
  },
];

client.on("ready", (c) => {
  console.log(`${c.user.tag} is online 🤩`);
  setInterval(() => {
    let random = Math.floor(Math.random() * status.length);
    client.user.setActivity(status[random]);
  }, 10000);
}); //listner when bot is ready lou out and set status

//-- Click Role--
client.on("interactionCreate", async (interaction) => {
  try {
    if (!interaction.isButton()) return;
    await interaction.deferReply({ ephemeral: true });
    const role = interaction.guild.roles.cache.get(interaction.customId);
    if (!role) {
      interaction.editReply({
        content: "I couldn't find that role",
      });
      return;
    }
    const hasRole = interaction.member.roles.cache.has(role.id);
    if (hasRole) {
      await interaction.member.roles.remove(role);
      await interaction.editReply(`The role ${role} has been remove`);
      return;
    }

    await interaction.member.roles.add(role);
    await interaction.editReply(`The role ${role} has been added`);
  } catch (error) {
    console.log(error);
  }
});
//--TYPE MESSAGE--
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

//--Hit / --
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

client.login(process.env.TOKEN); // login bot into server [online bot]
