import { createResponder, ResponderType } from "#base";
import { ActionRowBuilder, ChannelSelectMenuBuilder } from "discord.js";

createResponder({
    customId: "solicitar-estoque-botconfig",
    types: [ResponderType.StringSelect],
    async run(interaction) {
        const customId = interaction.values[0];

        if (customId === "canal-solicitar-estoque") {
            const menu = new ChannelSelectMenuBuilder()
                .setCustomId("selecionar-canal")
                .setPlaceholder("Selecionar canal de solicitar estoque")
                .setMinValues(1)
                .setMaxValues(1);

            const row = new ActionRowBuilder<ChannelSelectMenuBuilder>().addComponents(menu);

            await interaction.update({
                content: "Selecione o canal de solicitar estoque",
                embeds: [],
                components: [row],
            });
        } else if (customId === "canal-logs-estoque") {
            const menu = new ChannelSelectMenuBuilder()
                .setCustomId("selecionar-canal-logs")
                .setPlaceholder("Selecionar canal de logs")
                .setMinValues(1)
                .setMaxValues(1);

            const row = new ActionRowBuilder<ChannelSelectMenuBuilder>().addComponents(menu);

            await interaction.update({
                content: "Selecione o canal de logs para as Solicitações",
                embeds: [],
                components: [row],
            });
        }
    }
});
