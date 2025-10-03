import { createResponder, ResponderType } from "#base";
import { EmbedBuilder, StringSelectMenuBuilder, ActionRowBuilder } from "discord.js";
import { QuickDB } from "quick.db";

const db = new QuickDB();
const db_estoque = await db.table("BotSolicitarEstoque");

createResponder({
    customId: "fila-opções",
    types: [ResponderType.StringSelect], cache: "cached",
    async run(interaction) {
        const customId = interaction.values[0];
        
        if (customId === "deletar-fila") {
            await db_estoque.delete(`${interaction.guild?.id}_filaNumber`)
            await db_estoque.delete(`${interaction.guild?.id}_filaUsers`)

const filaNúm = await db_estoque.get(`${interaction.guild?.id}_filaNumber`)
        const filaUsers = await db_estoque.get(`${interaction.guild?.id}_filaUsers`)

        const embed = new EmbedBuilder()
        .setTitle("**<:estoquenormal:1422742318288474253> | Lista da Fila**")
        .setDescription(`** *Fila Users:* ${filaUsers}\n *Fila Número:* ${filaNúm}**`)
        .setColor("Aqua")
        .addFields([
            { name: "Ping", value: `\`${interaction.client.ws.ping}MS\``, inline: true },
            { name: "Versão", value: `\`1.0\` **Beta**`, inline: true }
        ]);

        const menu = new StringSelectMenuBuilder()
        .setPlaceholder("Selecionar opção para fila")
        .setCustomId("fila-opções")
        .setMaxValues(1)
        .setMinValues(1)
        .setOptions([
            { label: "Deletar fila de espera", emoji: "1423053724963573840", value: "deletar-fila" }
        ]);

        const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(menu)

        await interaction.update({ embeds: [embed], components: [row] });            
        }

    }
})