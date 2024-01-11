import { Event } from "../classes/Event";
import { client } from ".."

export default new Event("ready", () => {
    console.log(`${client?.user.tag} is now online!`);
    client.user.setActivity()
    async function checkMissedMembers(id = process.env.joinId_1) {
        var guild = client.guilds.cache.get(id)
        if (!guild) return console.log(`Unable to find guild by id: ${id}`)
        let minimumRoles = ['872314071347773451', '863935649240842271', '863935648951304194']
        guild.members.cache.each(member => {
            if (member.user.bot === true || member.user.id === "<YourIdHere>") return;
            let userRoles = []
            member.roles.cache.each(role => userRoles.push(role.id))
            minimumRoles.forEach(async r => {
                if (userRoles.indexOf(r) === -1) return member.roles.add(r).catch((e: any) => console.log(e))
            })
        })
        console.log("[Role Manager] ><> All members have been updated! ><>")
    }
    checkMissedMembers()
});
