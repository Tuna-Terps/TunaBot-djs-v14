import { TextChannel } from 'discord.js'
import { Event } from "../classes/Event";

export default new Event("guildMemberRemove", member => {
    const guild = member.guild.id
    const cache = member.guild.channels.cache;
    let minimumRoles = ['', '', '']
    member.roles.cache.each(role => minimumRoles.indexOf(role.id) === -1  ? userRoles.push(role.id+" : "+role.name) : null)
    let summary = `USER: **${member.user.username}** \nROLES:\n${userRoles.join("\n")} \nJOINED: *${member.joinedAt}* `
    switch(guild) {
        case process.env.joinId_1:
            const mods = cache.find((ch:any) => ch.id === process.env.modChannelId);    
            if (!mods) return;
            (mods as TextChannel).send(`**[Event: memberLeave]**\n${summary}`)
            .catch((leaveError: any) => console.log(`[ MemberLeave Error ] ${leaveError}`));
        break;
    }
})
