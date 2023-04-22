var os = require("os");
const Discord = require('discord.js')

module.exports = {
    name: "add",
    aliases: ["add", "add", "add"],
    category: "General",
    usage: "gen commands",
  
    run: async (client, message, args) => {

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("You don't have the permissions to do this!");

    var fs = require("fs");
    var account = args[0]
    var service = args[1]

    if(!account) return message.reply("Provide a formatted account string first!")
    if(!service) return message.reply("Provide service first!")

    const filePath = __dirname + "/accounts/" + args[1] + ".txt";

    fs.appendFile(filePath, os.EOL + args[0], function (err) {
        if (err) return console.log(err);

        const embed = new Discord.MessageEmbed()
        .setTitle("Account added!")
        .setDescription(`Account successfully added to ${service} !`)
        .setFooter('https://github.com/ogbr00')
        .setColor("BLACK")

        message.channel.send(embed);
    });

    }
}