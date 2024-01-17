import { Event } from "../classes/Event";
import { client } from "..";
import { TextChannel } from "discord.js";
export default new Event("messageCreate", async msg => {
    if (msg.guild) return; 
    const summary = `**[Event: DM]**�\n*author:* ${msg.author.username} : ${msg.author.id}\n> ${msg.content}`;
    const cache = client.guilds.cache.get(process.env.guildId); 
    const mods = cache?.channels.cache.find((ch) => ch.id === process.env.modChannelId); 
    await (mods as TextChannel)?.send(`${summary}`).catch((err: Error) => console.error.bind(err));
    console.log(`${summary}`)
})
