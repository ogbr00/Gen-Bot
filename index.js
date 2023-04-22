// --------------------------------------------------
const Discord = require('discord.js');
const { Client, MessageEmbed } = require('discord.js')
const config = require('./config.json');
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Nhub Bot it s running'));

app.listen(port, () =>
	console.log(`Your app is listening to port ${port}`)
);
// --------------------------------------------------

// ------------------------------ HANDERLS ------------------------------------
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBER", "MESSAGE", "CHANNEL", "REACTION", "USER", "GUILD_MESSAGE_REACTIONS" ] })
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.config = config;

["commands"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});
client.on('ready', () => {
    require('./events/client/ready')(client)
})
client.on('message', async message => {
    require('./events/guild/message.js')(client, message)
})
client.on('messageDelete', async message => {
  require('./events/guild/messageDelete.js')(client, message)
})
client.on('messageReactionAdd', async (client, user, reaction, message) => {
  require('./events/guild/messageReactionAdd.js')(client, user, reaction, message)
})
// ------------------------------------------------------------------------

client.login(config.token);

module.exports = {client}