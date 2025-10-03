import { createResponder, ResponderType } from "#base";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelSelectMenuBuilder, EmbedBuilder, RoleSelectMenuBuilder } from "discord.js";
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
            const row = new ActionRowBuilder().addComponents(menu);
            await interaction.update({
                content: "Selecione o canal de solicitar estoque",
                embeds: [],
                components: [row],
            });
        }
        else if (customId === "canal-logs-estoque") {
            const menu = new ChannelSelectMenuBuilder()
                .setCustomId("selecionar-canal-logs")
                .setPlaceholder("Selecionar canal de logs")
                .setMinValues(1)
                .setMaxValues(1);
            const row = new ActionRowBuilder().addComponents(menu);
            await interaction.update({
                content: "Selecione o canal de logs para as Solicitações",
                embeds: [],
                components: [row],
            });
        }
        if (customId === "cargo-adm") {
            const selectmenu = new RoleSelectMenuBuilder()
                .setCustomId("selecionar-cargo")
                .setPlaceholder("Selecione o cargo de equipe")
                .setMinValues(1)
                .setMaxValues(1);
            const roleRow = new ActionRowBuilder().addComponents(selectmenu);
            await interaction.update({ content: "Selecione o cargo da equipe", components: [roleRow], embeds: [] });
        }
        if (customId === "alterar-bot") {
            const embed = new EmbedBuilder()
                .setTitle("**Configurar Bot**")
                .setDescription("** *Altere o nome do bot, ou a logo* **")
                .setColor("Aqua")
                .setFields([
                { name: "Ping", value: ` \`${interaction.client.ws.ping}\` `, inline: true },
                { name: "Versão", value: "\`1.0\`**Beta**", inline: true }
            ]);
            const row = new ActionRowBuilder().addComponents(new ButtonBuilder()
                .setLabel("Bot nome")
                .setCustomId("alterar-nome-bot")
                .setEmoji("1422673272390291556")
                .setStyle(ButtonStyle.Secondary), new ButtonBuilder()
                .setLabel("Bot Logo")
                .setCustomId("alterar-logo-bot")
                .setEmoji("1422673272390291556")
                .setStyle(ButtonStyle.Secondary), new ButtonBuilder()
                .setCustomId("voltar-início")
                .setEmoji("1423641406974722048")
                .setStyle(ButtonStyle.Secondary));
            await interaction.update({ embeds: [embed], components: [row] });
        }
    }
});
