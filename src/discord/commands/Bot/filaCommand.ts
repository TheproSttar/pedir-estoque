import { createCommand } from "#base";
import { ActionRowBuilder, EmbedBuilder, StringSelectMenuBuilder } from "discord.js";
import { QuickDB } from "quick.db";

const db = new QuickDB();
const db_estoque = await db.table("BotSolicitarEstoque")

createCommand({
    name: "fila",
    description: "Veja a fila de Solicitar Estoque",
    defaultMemberPermissions: "Administrator",
    async run(interaction) {
        const filaNúm = await db_estoque.get(`${interaction.guild?.id}_filaNumber`)
        const filaUsers = await db_estoque.get(`${interaction.guild?.id}_filaUsers`)
        let truefalse: boolean;

if (!filaNúm || !filaUsers) {
    truefalse = false;
} else {
    truefalse = true
}
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
        .setDisabled(truefalse === false)
        .setMaxValues(1)
        .setMinValues(1)
        .setOptions([
            { label: "Deletar fila de espera", emoji: "1423053724963573840", value: "deletar-fila" }
        ]);

        const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(menu)

        await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
    }
});