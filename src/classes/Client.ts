import { Client, GatewayIntentBits, ApplicationCommandDataResolvable, Collection, ClientEvents, Routes, Partials } from 'discord.js';
import { CommandType } from '../types/command';
import { RegisterCommandsOptions } from '../types/client';

import { Event } from "./Event"

// glob files with promise function
import glob from 'glob';
import { promisify } from 'util';
const globPromise = promisify(glob)
//extend the existing client to abstract our client
export class ExtendedClient extends Client {
    commands: Collection<string, CommandType> = new Collection();
    constructor() {
        super({ 
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildPresences,
            ],
            Partials.Channel,
            Partials.Message
        })
    }

    start() {
        this.registerModules()
        this.login(process.env.botToken)   
    }
    async importFile(filePath:string) {
        return(await(import(filePath)))?.default
    }
    async registerCommands({ commands, guildId}: RegisterCommandsOptions) {
        // guild specific commands
        if (guildId) {
            this.guilds.cache.get(guildId)?.commands.set(commands);
        }
        // global commands
        else {
            this.application?.commands.set(commands)
        }
    }

    async registerModules(){
        const cmdArray: ApplicationCommandDataResolvable[] = []
        // glob all the cmd files with an extension ending in ts or js; 
        const cmdFiles = await globPromise(`${__dirname}/../commands/*/*{.ts,.js}`)
        console.log('[CMD FILES]', cmdFiles)
        cmdFiles.forEach(async(filePath: string) => {
            const cmd: CommandType = await this.importFile(filePath)
            if (!cmd.name) return;
            console.log(`SETTING COMMAND: ${cmd.name}`)
            this.commands.set(cmd.name, cmd)
            cmdArray.push(cmd)
        })
        this.on("ready", () => {
            this.registerCommands({
                commands: cmdArray,
                guildId: process.env.guildId
            })
        })
        // EVENTS 
        const eventFiles = await globPromise(`${__dirname}/../events/*{.ts,.js}`);
        console.log('[EVENT FILES]', eventFiles)
        eventFiles.forEach(async(filePath: string) => {
            const event: Event<keyof ClientEvents> = await this.importFile(filePath);
            this.on(event.event, event.run)
        })
    }
}
