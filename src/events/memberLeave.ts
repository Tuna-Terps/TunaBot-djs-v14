import { TextChannel } from 'discord.js'
import { Event } from "../classes/Event";

export default new Event("guildMemberRemove", member => {
    const guild = member.guild.id
    const cache = member.guild.channels.cache;
    switch(guild) {
        case process.env.joinId_1:
            const mods = cache.find((ch:any) => ch.id === process.env.modChannelId);    
            if (!mods) return;
            (mods as TextChannel).send(`${member}:${member.id} has left the server . . .`)
            .catch((leaveError: any) => console.log(`[ MemberLeave Error ] ${leaveError}`));
        break;
    }
})
