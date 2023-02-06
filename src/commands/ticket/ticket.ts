import { ChannelType, PermissionFlagsBits, TextChannel } from "discord.js";
import { Command } from "../../classes/Command";

export default new Command({
    name: "ticket",
    description: "Open a support ticket",
    options: [
        {
            type: 1,
            name: "open",
            description: "OPEN a ticket if you don't have one open already",
        },
        {
            type: 1,
            name: "close",
            description: "CLOSE a ticket if you have one open",
        }
    ],

    run: async({ interaction }) => {
        const userId = interaction.user.id
        const ticketChannel = interaction.guild.channels.cache.find((ch) => ch.name === userId)
        const option = interaction.options.data[0].name
        // TICKET CREATE
        if (option === "open") {
            if (ticketChannel) return interaction.reply('You already have a ticket open !').catch(e => console.log(e));
            await interaction.guild.channels.create({
                name: userId,
                type: ChannelType.GuildText,
                parent: process.env.parentId,
                permissionOverwrites: [    
                    {
                        id: process.env.blockId,// everyone
                        deny: [PermissionFlagsBits.ViewChannel]
                    },
                    {
                        id: userId, // interaction user
                        allow: [
                            PermissionFlagsBits.ViewChannel, 
                            PermissionFlagsBits.SendMessages,
                            PermissionFlagsBits.AddReactions,
                            PermissionFlagsBits.AttachFiles 
                        ]   
                    }
                ]
            })
            .then(async channel => {
                interaction.user.send(`**Bleep boop, click --> <#${channel.id}> to view your ticket**`).catch(e => console.log(e))
                channel.send(`Beep boop ! ${userId}, welcome to your ticket\n\n**ALL TICKET STATUS, RESULTS, AND INFORMATION SHOULD BE KEPT WITHIN THE TICKET CHANNEL AND NOT CIRCULATED THROUGH THE REST OF THE DISCORD**:spy:\n\nOnce open, a staff member will respond to you as soon as they are **available** - refrain from interrupting and or pestering admins in game/calls/etc for ticket status/resolution/questions unless **absolutely necessary** \n\n*(some examples include having a critical issue causing you to not be able to play the game etc)*\n\n**close your ticket at any time using the command --> \n!ticket close***\n\n${new Date()}`)
            })
            .catch(ticketError => console.log(ticketError))
        }
        else {
            // TICKET DELETE
            if (!ticketChannel) return interaction.reply('You do not have a ticket opened . . .');
            (ticketChannel as TextChannel).send(`${interaction.user}  Your ticket will be deleted . . .`)
            setTimeout(() => {
                ticketChannel.delete()
            }, 20000)
        }
        
    }
})