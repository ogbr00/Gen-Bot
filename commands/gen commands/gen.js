const Discord = require('discord.js')
const generated = new Set();

module.exports = {
    name: "gen",
    aliases: ["gen", "gen", "gen"],
    category: "General",
    usage: "moderation",
  
    run: async (client, message, args) => {

        if (generated.has(message.author.id)) { message.channel.send( "You have a 15 minute recovery time! - " + message.author.tag );
        // check if message author had cooldown
        } else {

        if (!args[0]) return message.reply("Please provide a service!");

        var fs = require("fs");
        const filePath = __dirname + "/accounts/" + args[0] + ".txt";

            const outstock = new Discord.MessageEmbed()
            .setTitle("Out of stock!")
            .setDescription("The service you requested is currently out of stock!")
            .setFooter('https://github.com/ogbr00')
            .setColor("BLACK")

            fs.readFile(filePath, function (err, data) {
                if (!err) {

                    data = data.toString();
                    var position = data.toString().indexOf("\n");
                    var firstLine = data.split("\n")[0];
                    if(position == -1)

                    return message.channel.send(outstock);

                    message.author.send(firstLine);

                    if (position != -1) {
                        data = data.substr(position + 1);
                        fs.writeFile(filePath, data, function (err) {

                        const accgenerated = new Discord.MessageEmbed()
                        .setTitle(`Account ${args[0]} generated`)
                        .setDescription("The account for your requested service has been sent as DM!")
                        .setFooter('https://github.com/ogbr00')
                        .setColor("BLACK")

                        message.channel.send(accgenerated);

                        generated.add(message.author.id);
                        setTimeout(() => {
                            generated.delete(message.author.id);
                        }, 150000); // 86400000 = 24 H , 150000 = 15 Min
                        if (err) {
                            console.log(err);
                        }
                        });

                    } else {
                        message.channel.send("Out of stock!");
                    }
                } else {
                    const notfound = new Discord.MessageEmbed()
                    .setTitle("Service not found!")
                    .setDescription("The requested service cannot be found!")
                    .setFooter('https://github.com/ogbr00')
                    .setColor("BLACK")
                    message.channel.send(notfound);
                    return;
                }
            });
        }

    }
}