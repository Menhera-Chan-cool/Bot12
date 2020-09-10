const {
  token,
  default_prefix
} = require("./config.json");
const {
  config
} = require("dotenv");
const { Client, discord, Collection, MessageAttachment } = require("discord.js"); //Gonna use Discord.js Module xD
const client = new Client();
const db = require("quick.db"); //WE WILL BE USING QUICK.DB
const {
  addexp
} = require("./handlers/xp.js");
client.commands = new Collection();
client.aliases = new Collection();

const {
  CanvasSenpai
} = require("canvas-senpai")
const canva = new CanvasSenpai();


["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

client.on('ready', () => {

  console.log("I am Reday to Go");
});

//IS URL FUNCTION - START

function is_url(str) {
  let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  if (regexp.test(str)) {
    return true;
  } else {
    return false;
  }

}

//FINISH


//STOP
client.on("message", async message => {
  if (message.author.bot) return;
  //START




  //END
  let blacklist = await db.fetch(`blacklist_${message.author.id}`)

  if (!message.guild) return;
  let prefix = db.get(`prefix_${message.guild.id}`);
  if (prefix === null) prefix = default_prefix;

  if (blacklist === "Blacklisted") return message.reply("You are blacklisted from the bot!")

  if (!message.content.startsWith(prefix)) return;

  if (!message.member)
    message.member = await message.guild.fetchMember(message);

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let cmdx = db.get(`cmd_${message.guild.id}`)

  if (cmdx) {
    let cmdy = cmdx.find(x => x.name === cmd)
    if (cmdy) message.channel.send(cmdy.responce)
  }

  // Get the command
  let command = client.commands.get(cmd);
  // If none is found, try to find it by alias
  if (!command) command = client.commands.get(client.aliases.get(cmd));



  // If a command is finally found, run the command
  if (command) command.run(client, message, args);

  return addexp(message);
}); //All codes link in description

//GONNA USE EVENT HERE

client.snipes = new Map()
client.on('messageDelete', function(message, channel){
  
  client.snipes.set(message.channel.id, {
    content:message.content,
    author:message.author.tag,
    image:message.attachments.first() ? message.attachments.first().proxyURL : null
  })
  
})

client.on("guildMemberAdd", async member => {
  let chx = db.get(`welchannel_${member.guild.id}`);

  if (chx === null) {
    return;
  }


  let data = await canva.welcome(member, {
    link: "https://coverfiles.alphacoders.com/111/111206.png",
    blur: true
  })

  const attachment = new MessageAttachment(
    data,
    "welcome-image.png"
  );




  client.channels.cache.get(chx).send("Welcome to our Server " + member.user.username, attachment);

});


client.login(process.env.token);