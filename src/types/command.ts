import {
    CommandInteraction, 
    CommandInteractionOptionResolver, 
    PermissionResolvable, 
    ChatInputApplicationCommandData, 
    GuildMember, 
    GuildMemberResolvable, 
} from 'discord.js';
import { ExtendedClient } from "../classes/Client";


// this interface allows us to access GuildMember inside of command interactions
export interface ExtendedInteraction extends CommandInteraction {
    member: GuildMember
}

interface RunOptions {
    client: ExtendedClient;
    interaction: ExtendedInteraction;
    args: CommandInteractionOptionResolver;
}

type RunFunction = (options: RunOptions) => any; 

export type CommandType = {
    // specify if a discord related permission is needed
    userPermissions?: PermissionResolvable[];
    // specify a required role
    userRoles?: GuildMemberResolvable[];
    run: RunFunction;
}
// create union w/ expected command data
& ChatInputApplicationCommandData