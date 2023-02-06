import { CommandInteractionOptionResolver } from "discord.js";
import { client } from "..";
import { Event } from "../classes/Event";
import { ExtendedInteraction } from "../types/Command";

export default new Event("interactionCreate", async (interaction) => {
    // Chat Input Commands
    if (interaction.isChatInputCommand()) {
        await interaction.deferReply();
        const cmd = client.commands.get(interaction.commandName);
        if (!cmd) return interaction.followUp("[ ERROR ]");
        cmd.run({
            client,
            // make GuildMember accessible to interaction
            interaction: interaction as ExtendedInteraction,
            // default arg param to command interaction options
            args: interaction.options as CommandInteractionOptionResolver,
        });
    }
});