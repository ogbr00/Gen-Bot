const Discord = require("discord.js");
const ms = require("ms");
const config = require("../../config.json");
const perms = require("../../utils/permsid.json");
const logs = require("../../utils/logsid.json");
const currentDate = new Date();
const prefix = config.prefix;
const Timeout = new Map();

module.exports = async (client, message) => {

  const bannedWords = [`discord.gg`, `.gg/`, `.gg /`, `. gg /`, `. gg/`, `discord .gg /`, `discord.gg /`, `discord .gg/`, `discord .gg`, `discord . gg`, `discord. gg`, `discord gg`, `discordgg`, `discord gg /`]
  try {
   if (bannedWords.some(word => message.content.toLowerCase().includes(word))) {
  
  if (message.author.id != perms.ownerID ){
  message.delete();
  message.channel.send(`Disabled 👀`);
  
  const antilink = new Discord.MessageEmbed()
  .addFields
  (
    {   name: 'Message Author:',
      value: `${message.author} aka ${message.author.tag}`,
    },
    {
      name: 'Message:',
      value: `${message.content}`,
    },
    {
     name: 'Channel:',
      value: `${message.channel}`,
    },
    {
      name: 'Date and time:',
      value: `${currentDate.toLocaleString()}`,
    }
  )
  .setColor(config.embedColor)
  .setThumbnail(message.author.displayAvatarURL())
  client.channels.cache.get(logs.antilink).send(antilink);
  
  }
  }
  } catch (e) {
      console.log(e);
  }

 try {
  if (message.author.bot) return;

  if (!message.guild) {
   try {
    return message.author.send("Disabled :eyes:");
   } catch (err) {
    return;image.png
   }
  }

  if (message.content === `<@${client.user.id}>` || message.content === `<@!${client.user.id}>`) {
   return message.author.send("Coded by Bro#0002");
  }
  try {
  } catch (err) {
  }

  if (!message.content.startsWith(prefix)) return;
  if (!message.member) message.member = await message.guild.fetchMember(message);
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (cmd.length === 0) return;
  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));
  if (!command) {
   return message.channel.send({
    embed: {
     color: config.embedColor,
     description: "That command does not exist :eyes:",
    },
   });
  }
  if (command) {
   const timeout = command.timeout || 5000;
   const key = message.author.id + command.name;
   const found = Timeout.get(key);
   if (found) {
    const timePassed = Date.now() - found;
    const timeLeft = timeout - timePassed;
    return message.channel.send({
     embed: {
      color: config.embedColor,
      description: ` ${message.author} slow down! \`${ms(timeLeft)}\` :eyes:`,
     },
    });
   } else {
    command.run(client, message, args);
    Timeout.set(key, Date.now());
    setTimeout(() => {
     Timeout.delete(key);
    }, timeout);
   }
  }
 } catch (err) {
  console.log(err);
  message.channel.send({
   embed: {
    color: config.embedColor,
    description: "Something went wrong while running this command :eyes:",
   },
  });
 }
};