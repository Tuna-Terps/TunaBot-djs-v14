import { ClientEvents, GuildMember } from "discord.js";

export class Event<Key extends keyof ClientEvents> {
    //guildMember?: GuildMember
    constructor(
        public event: Key,
        public run: (...args: ClientEvents[Key]) => any
    ) {}
}