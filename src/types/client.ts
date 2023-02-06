import { ApplicationCommandDataResolvable } from "discord.js";

// this interface will define type for register command function in extended client
export interface RegisterCommandsOptions {
    // adding this optional parameter gives the option to add guild specific commands
    guildId?: string;
    // resolvable cmd data
    commands: ApplicationCommandDataResolvable[];
}