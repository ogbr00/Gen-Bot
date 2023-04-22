const { MessageReaction, User, MessageEmbed, MessageAttachment } = require("discord.js");
const {client} = require("../../index");
const discord = require("discord.js");
const moment = require('moment')
const mainconfig = require('../../config.json')
const config = require('../../utils/ticket.json')
const models = require('../../models/ticketlogs');
const perms = require("../../utils/permsid.json");
const { fetchTranscript } = require('discord-ghost-transcript')


/**
 *
 * @param {MessageReaction} reaction
 * @param {User} user
 */

module.exports = async (reaction, user) => {

  if(user.bot) return;

    const {message,emoji} = reaction

    let chann = `ticket-${user.username}`;
    
    
    if(emoji.toString() === config.emoji){
    
        let role;
        if(config.support_role_id){
            role =  message.guild.roles.cache.get(config.support_role_id);
        } else role = message.guild.roles.cache.find(r => r.name === "Ticket Support");
    
        if(!role) {
            return await message.guild.roles.create({data:{name: "Ticket Support", permissions: 0}, reason: 'Ticket Support Role'});
          };

        let category;
        if(config.category_id){
            category = message.guild.channels.cache.get(config.category_id)
        } else category = message.guild.channels.cache.find(c => c.name == "tickets" && c.type == "category");
        
        if(!category) {
                return await message.guild.channels.create("tickets", {type: "category", position: 1});
        };
    
        let limit = config.ticket_limit;
    
        if(limit && Number(limit)){
        limit = Number(limit)
        } else limit = 1
    
        let array = []
      
        // check for ticket limit
        message.guild.channels.cache.forEach(channel => {
        if(channel.name == chann) array.push(channel.id)
        });
    
    
        if(array.length >= limit){
            return message.channel.send(`Ticket Limit Reached. Limit: ${limit}`).then((s)=>[
                s.delete({timeout: 5000}).catch(()=>{})
            ])
        };
    
          message.reactions.cache.find(r => r.emoji.name == emoji.name).users.remove(user.id).catch(()=>{})
          message.guild.channels.create(chann, { permissionOverwrites:[
              {
                deny: 'VIEW_CHANNEL',
                id: message.guild.id
              },
              {
                allow:  ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS'],
                id: user.id
              },
              {
                allow:  ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS'],
                id: role.id
              },
              {
                allow:  ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS', 'MANAGE_CHANNELS'],
                id: message.guild.me
              },
            ],
            parent: category.id,
            reason: `Ticket Module`,
            topic: `${user.id}`
          }).then(async(channel)=>{
            
    
    
            const openEmbed = new discord.MessageEmbed()
            .setColor(mainconfig.embedColor)
            .setDescription(`Welcome to your ticket ${user}!\n\nPlease Explain Below your problem.`)
    
            const closeEmbed = new discord.MessageEmbed()
            .setColor(mainconfig.embedColor)
            .setDescription(`React with 🗑️ to close the ticket.`)
    
    
            channel.send(openEmbed);
            channel.send(closeEmbed).then((pog)=>{
                pog.react('🗑️')
          })
    
            const embedLog = new discord.MessageEmbed()
            .setColor("GREEN")
            .setTitle("Ticket Created")
            .setTimestamp()
            .addField("Information" , `**User:** ${user}\n**Ticket Channel: **${channel.name}\n**Date:** ${moment(new Date()).format("dddd, MMMM Do YYYY")} `)

            const data = await models.findOne({ guild: message.guild.id });


            const logChannel = await message.guild.channels.cache.get(data.channel);
    
                if(logChannel){
                    logChannel.send(embedLog)
                }

          })
    
          
    
       
    
    
    
    } else if(emoji.toString() === "🗑️"){

      if (message.member.roles.cache.has(perms.roleid)) {
        
      const closedCat = message.guild.channels.cache.find(c => c.name == "closed" && c.type == "category");

              message.channel.edit({
              name: `closed-${user.username}`,
            })
            message.channel.setParent(closedCat.id)    

        const deleteEmbed = new discord.MessageEmbed()
        .setColor(mainconfig.embedColor)
        .setDescription(`React with ✔️ to delete the ticket.`)

        message.channel.send(deleteEmbed).then((pog)=>{
          pog.react('✔️')
    })
      }

      else {
          message.channel.send("Disabled :eyes:");
        }



    
    } else if(emoji.toString() === "✔️"){

      const ticketClose = new discord.MessageEmbed()
      .setColor("RED")
      .setTitle("Ticket Closed")
      .setTimestamp()
      .addField("Information" , `**User:** ${user}\n**Ticket Channel: **${message.channel.name}\n**Date:** ${moment(new Date()).format("dddd, MMMM Do YYYY")} `)

      const data = await models.findOne({ guild: message.guild.id });

      const logChannel = await message.guild.channels.cache.get(data.channel);
  
          if(logChannel){
              logChannel.send(ticketClose)
          }

        const canal = message.channel;
       fetchTranscript(canal, message, 50).then((data) => {
       const file = new MessageAttachment(data, `${chann}.html`)

       if(logChannel){
        logChannel.send(file)
    }
     })

     message.channel.delete()
    }

};