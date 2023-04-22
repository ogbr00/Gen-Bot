const config = require('../../config.json')
const prefix = config.prefix
const Discord = require('discord.js')

module.exports = {
    name: "help",
    aliases: ["help", "help", "help"],
    category: "General",
    usage: "client",
  
    run: async (client, message, args) => {

        const embed = new Discord.MessageEmbed()
        .setTitle("Account generator")
        .setColor("BLACK")
        .setDescription('This is a list of all commands')
        .addFields(
            {
                name: 'Generate accounts',
                value: "Example: `" + prefix + "gen <Service name>`",
            },
            {
                name: 'Create a service',
                value: "Example: `" + prefix +"create <Service name>`",
            },
            {
                name: 'Notify account restocks',
                value: "Example: `" + prefix +"restock <Service name> <Service name>`",
            },
            {
                name: 'Add accounts',
                value: "Example: `" + prefix +"add <mail:pass> <Service name>`",
            },
            {
                name: 'View bot statistics',
                value: "Example: `" + prefix +"stats`",
            }
            )
            .setFooter('https://github.com/ogbr00')

        message.channel.send(embed);

    }
}