import { createResponder, ResponderType } from "#base";
import { embedConfigBot } from "#functions";
import { QuickDB } from "quick.db";

/* Banco de dados */
const db = new QuickDB();
const db_estoque = db.table("BotSolicitarEstoque")

/* Interação */
createResponder({
    customId: "selecionar-canal-logs",
    types: [ResponderType.ChannelSelect],

    async run(interaction) {
        // Pega o canal selecionado
        const canal = interaction.values[0];
        const guildId = interaction.guild?.id;

        // Gera o embed do botconfig
        const embedConfig = await embedConfigBot(interaction);

        // Atualiza a mensagem **mantendo o embed**
        await interaction.update({
            content: null,
            embeds: embedConfig.embeds,
            components: embedConfig.components
        });

        // Salva no banco
        db_estoque.set(`${guildId}_logsChannel`, canal)

        // Envia confirmação temporária para o usuário
        await interaction.followUp({
            content: `<:sucesso:1422700042636099696> | Canal <#${canal}> para logs selecionado com sucesso, e salvo`,
            ephemeral: true
        });
    }
});