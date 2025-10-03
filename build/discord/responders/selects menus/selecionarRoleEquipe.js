import { createResponder, ResponderType } from "#base";
import { embedConfigBotRole } from "#functions";
import { QuickDB } from "quick.db";
/* Banco de dados */
const db = new QuickDB();
const db_estoque = db.table("BotSolicitarEstoque");
/* Interação */
createResponder({
    customId: "selecionar-cargo",
    types: [ResponderType.RoleSelect],
    async run(interaction) {
        // Pega o canal selecionado
        const canal = interaction.values[0];
        const guildId = interaction.guild?.id;
        // Gera o embed do botconfig
        const embedConfig = await embedConfigBotRole(interaction);
        // Atualiza a mensagem **mantendo o embed**
        await interaction.update({
            content: null,
            embeds: embedConfig.embeds,
            components: embedConfig.components
        });
        // Salva no banco
        db_estoque.set(`${guildId}_RoleEquipe`, canal);
        // Envia confirmação temporária para o usuário
        await interaction.followUp({
            content: `<:sucesso:1422700042636099696> | Cargo <#${canal}> de **equipe** ou **ADM** selecionado com sucesso, e salvo`,
            ephemeral: true
        });
    }
});
