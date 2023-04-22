var os = require("os");
const Discord = require('discord.js')

module.exports = {
    name: "create",
    aliases: ["create", "create", "create"],
    category: "General",
    usage: "gen commands",
  
    run: async (client, message, args) => {

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("You don't have the permissions to do this!");

    var fs = require("fs");
    
    const filePath = __dirname + "/accounts/" + args[0] + ".txt";
    fs.writeFile(filePath, 'Bro#0002:Bro#0002', function (err) {

        if (err) throw err;

        const embed = new Discord.MessageEmbed()
        .setTitle("Service created!")
        .setDescription(`Service created successfully ${args[0]} !`)
        .setFooter('https://github.com/ogbr00')
        .setColor("BLACK")

        message.channel.send(embed);
    });

    }
}