const Discord = require('discord.js')
const currentDate = new Date();
const logs = require("../../utils/logsid.json");
const config = require("../../config.json");

module.exports = async (client, message) => {

    if ( message.author.bot || (message.mentions.users.size === 0 && message.mentions.roles.size ===0 && !message.content.includes("@everyone") && !message.content.includes("@here") && message.mentions.everyone == false)) {
        return;
      }
                const ghostping = new Discord.MessageEmbed()
                .setTitle("Ghostping Detected")
                .addFields
                (
                    {
                        name: 'Message Author:',
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
                .setThumbnail(message.author.displayAvatarURL())
                .setColor(config.embedColor)
                client.channels.cache.get(logs.ghostping).send(ghostping);

};