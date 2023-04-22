const Discord = require('discord.js')

module.exports = {
    name: "stats",
    aliases: ["stats", "stats", "stats"],
    category: "General",
    usage: "gen commands",
  
    run: async (client, message, args) => {

        const embed = new Discord.MessageEmbed()
        .setTitle("Bot stats")
        .setDescription("Total number of users: `" + client.users.cache.size + " members`\nTotal number of rooms: `" + client.channels.cache.size+ " lounges`\nTotal number of emoji: `" + client.emojis.cache.size+ " emojis`\nTotal number of servers: `" + client.guilds.cache.size+ " server(s)`")
        .setFooter('https://github.com/ogbr00')
        .setColor("BLACK")

        message.channel.send(embed);

    }
}