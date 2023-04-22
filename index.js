const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./config.json");
const prefix = config.prefix;
const botname = "FortBin Gen";
const prefix1 = "*";
var fs = require("fs");
var lineReader = require("line-reader");
var async = require("async");
const firstline = require("firstline");
const generated = new Set();
var os = require("os");
var express = require('express');
var app = express();
const chalk = require('chalk');


  bot.on('ready', msg => {
  console.log("");                                  

  console.log(`Global statistics : \n\nThe bot has a total of ${bot.guilds.cache.size} servers. \nFor a total of ${bot.users.cache.size} members.`)
  console.log("Logged in as " + bot.user.id + " | Prefix : " + prefix1 + " | Number of Servers "+ bot.guilds.cache.size +" | Number of lounges "+ bot.channels.cache.size +" | User totals "+ bot.users.cache.size +" | Number of total emojis "+ bot.emojis.cache.size +'');
  bot.user.setActivity("*help - Coded by Bro#0002");
});

bot.on("message", message => {
    if (message.channel.id === config.botChannel) { 
        if (message.author.bot) return;
        var command = message.content
            .toLowerCase()
            .slice(prefix.length)
            .split(" ")[0];

        if (command === "gen") {
            if (generated.has(message.author.id)) {
                message.channel.send(
                    "You have a 15 minute recovery time! - " +
                    message.author.tag
                );
            } else {
                let messageArray = message.content.split(" ");
                let args = messageArray.slice(1);
                if (!args[0])
                    return message.reply("Please provide a service!");
                var fs = require("fs");
                const filePath = __dirname + "/comptes/" + args[0] + ".txt";

                const embed = {
                    title: "Out of stock!",
                    description: "The service you requested is currently out of stock!",
                    color: 0x000000,
                    timestamp: new Date(),
                    footer: {
                        icon_url:
                            "",
                        text: "Coded by Bro#0002"
                    },
                    image: {url:""},
                    author: {
                        name: botname + " - account generator",
                        url: "https://discord.gg/zakzpG2EgJ",
                        icon_url: bot.displayAvatarURL
                    },
                    fields: []
                };

                fs.readFile(filePath, function (err, data) {
                    if (!err) {
                        data = data.toString();
                        var position = data.toString().indexOf("\n");
                        var firstLine = data.split("\n")[0];
                        if(position == -1)
                        return message.channel.send({ embed });
                        message.author.send(firstLine);
                        if (position != -1) {
                            data = data.substr(position + 1);
                            fs.writeFile(filePath, data, function (err) {
                                const embed = {
                                    title: "Account " + args[0] + " generated!",
                                    description: "The account for your requested service has been sent as DM!",
                                    color: 0x000000,
                                    timestamp: new Date(),
                                    footer: {
                                        icon_url: "",
                                        text: "Coded by Bro#0002"
                                    },
                                    image: {
                                        url:
                                            ""
                                    },
                                    author: {
                                        name: botname + " - account generator",
                                        url: "https://discord.gg/zakzpG2EgJ",
                                        icon_url: bot.displayAvatarURL
                                    },
                                    fields: []
                                };
                                message.channel.send({ embed });
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
                        const embed = {
                            title: "Service not found!",
                            description: "The requested service cannot be found!",
                            color: 0x000000,
                            timestamp: new Date(),
                            footer: {
                                icon_url:
                                    "",
                                text: "Coded by Bro#0002"
                            },
                            image: {url:""},
                            author: {
                                     name: botname + " - account generator",
                                     url: "https://discord.gg/zakzpG2EgJ",
                                icon_url: bot.displayAvatarURL
                            },
                            fields: []
                        };
                        message.channel.send({ embed });
                        return;
                    }
                });
            }
        }
        else
            if (command === "stats") {
                const embed = {
                    title: "Stats de " + botname,
                    description: "Total number of users: `" + bot.users.cache.size + " members`\nTotal number of rooms: `" + bot.channels.cache.size+ " lounges`\nTotal number of emoji: `" + bot.emojis.cache.size+ " emojis`\nTotal number of servers: `" + bot.guilds.cache.size+ " server(s)`",
                    color: 0x000000,
                    timestamp: new Date(),
                    footer: {
                        icon_url:
                            "",
                        text: "Coded by Bro#0002"
                    },
                    image: {url:""},
                    author: {
                         name: botname + " - account generator",
                         url: "https://discord.gg/zakzpG2EgJ",
                        icon_url: bot.displayAvatarURL
                    },
                    fields: []
                };
                message.channel.send({ embed });
            }
        
            if (command === "help") {

                const embed = {
                    color: 0x000000,
                    title: botname + ' - account generator',
                    url: 'https://discord.gg/zakzpG2EgJ',
                    author: {
                        name: 'List of commands',
                        url: 'https://discord.gg/zakzpG2EgJ',
                    },
                    image: {url:""},

                    description: '!!This is a list of all commands!!',
                    fields: [
                        {
                            name: 'Generate accounts',
                            value: "Example: `" + prefix1 +"gen <Service name>`",
                        },
                        {
                            name: 'Create a service',
                            value: "Example: `" + prefix1 +"create <Service name>`",
                        },
                        {
                            name: 'Notify account restocks',
                            value: "Example: `" + prefix1 +"restock <Service name> <Service name>`",
                        },
                        {
                            name: 'Add accounts',
                            value: "Example: `" + prefix1 +"add <mail:pass> <Service name>`",
                        },
                        {
                            name: 'View bot statistics' + botname,
                            value: "Example: `" + prefix1 +"stats`",
                        },
                    ],
                    timestamp: new Date(),
                    footer: {
                        text: 'Coded by Bro#0002',
                        icon_url: '',
                    },
                };
                message.channel.send({ embed });
            }

        if (command === "add") {
            if (!message.member.hasPermission("ADMINISTRATOR"))
                return message.reply("You don't have the permissions to do this!");
            var fs = require("fs");
            let messageArray = message.content.split(" ");
            let args = messageArray.slice(1);
            var account = args[0]
            var service = args[1]
            if(!account) return message.reply("Provide a formatted account string first!")
            if(!service) return message.reply("Provide service first!")
            const filePath = __dirname + "/comptes/" + args[1] + ".txt";
            fs.appendFile(filePath, os.EOL + args[0], function (err) {
                if (err) return console.log(err);
                const embed = {
                    title: "Account added!",
                    description: "Account successfully added to`" + service + "`!",
                    color: 0x000000,
                    timestamp: new Date(),
                    footer: {
                        icon_url:
                            "",
                        text: "Coded by Bro#0002"
                    },
                    image: {url:""},
                    author: {
                        name: botname + " - account generator",
                        url: "https://discord.gg/zakzpG2EgJ",
                        icon_url: bot.displayAvatarURL
                    },
                    fields: []
                };
                message.channel.send({ embed });
            });


        }
        if (command === "create") {
            if (!message.member.hasPermission("ADMINISTRATOR"))
                return message.reply("You don't have the permissions to do this!");
            var fs = require("fs");
            let messageArray = message.content.split(" ");
            let args = messageArray.slice(1);
            const filePath = __dirname + "/comptes/" + args[0] + ".txt";
            fs.writeFile(filePath, 'GalackQSM:GalackQSM', function (err) {
                if (err) throw err;
                const embed = {
                    title: "Service created!",
                    description: "Service created successfully `" + args[0] + "`!",
                    color: 0x000000,
                    timestamp: new Date(),
                    footer: {
                        icon_url:
                            "",
                        text: "Coded by Bro#0002"
                    },
                    image: {url:""},
                    author: {
                        name: botname + " - account generator",
                        url: "https://discord.gg/zakzpG2EgJ",
                        icon_url: bot.displayAvatarURL
                    },
                    fields: []
                };
                message.channel.send({ embed });
            });
        }

        if (command === "restock") {
            const embed = {
                title: "Please put a service!",
                description: "Please provide the name of the replenished service!",
                color: 0x000000,
                timestamp: new Date(),
                footer: {
                    icon_url:
                        "",
                    text: "Coded by Bro#0002"
                },
                 image: {url:""},
                author: {
                    name: botname + " - account generator ",
                    url: "",
                    icon_url: bot.displayAvatarURL
                },
                fields: []
            };
            let messageArray = message.content.split(" ");
            let args = messageArray.slice(1);
            if (!message.member.hasPermission("ADMINISTRATOR"))
                return message.reply("You do not have the permissions to do this!");
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
});

bot.login(config.token);
