import { TextChannel } from 'discord.js'
import { Event } from "../classes/Event";

export default new Event("guildMemberAdd", member => {
    const guild = member.guild.id
    const cache = member.guild.channels.cache;
    switch(guild) {
        case process.env.joinId_1:
            const welcome = cache.find((ch:any) => ch.id === process.env.welcomeId_1);    
            const rules = cache.find((ch:any)=> ch.id === process.env.rulesId_1);
            const ticket = cache.find((ch:any) => ch.id === process.env.ticketId_1);
            (welcome as TextChannel).send(`👑${member} has joined **${member.guild.toString()}**! 🐟\n\n🐟❗ Please be sure to read through our ${rules} \n\n🐟❓ Please leave any questions for admin in the support channel or ${ticket}\n\n🐟❤️ We'd like to thank you for your interest; and welcome you to ${guild} !!`)
            .then(sent => {
                sent.react(`👑`);
                sent.react(`❤`);
                sent.react(`🐟`);
            })
            .catch((joinError: any) => console.log(`[ MemberAdd Error ] ${joinError}`))
            member.roles.add('872314071347773451').catch((e: any) => console.log(e)); // member
            member.roles.add('863935649240842271').catch((e: any) => console.log(e)); // packages
            member.roles.add('863935648951304194').catch((e: any) => console.log(e)); // ranks
        break;
        
        
    }
})