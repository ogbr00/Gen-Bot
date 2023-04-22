
const Discord = require('discord.js')

module.exports = {
    name: "restock",
    aliases: ["restock", "restock", "restock"],
    category: "General",
    usage: "gen commands",
  
    run: async (client, message, args) => {

        const embed = new Discord.MessageEmbed()
        .setTitle("Please put a service!")
        .setDescription("Please provide the name of the replenished service!")
        .setFooter('https://github.com/ogbr00')
        .setColor("BLACK")

        if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("You do not have the permissions to do this!");
        if (!args[0])
        {
            return message.channel.send({ embed });
        }
        if (!args[1])
        {
            return message.channel.send({ embed });
        }
        else {
        message.channel.send("@everyone\n● Account restock: **" + args[0] + "**\n● Number of restock accounts: **" + args[1] + " compte(s)**\n● Restock by: " + "<@" + message.author.id +">");
        }

    }
}