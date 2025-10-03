import { createResponder, ResponderType } from "#base";
import { embedConfigBot, embedSolicitarEstoque } from "#functions";
import { ChannelType } from "discord.js";
createResponder({
    customId: "selecionar-canal",
    types: [ResponderType.ChannelSelect],
    async run(interaction) {
        // ID do canal selecionado
        const canalId = interaction.values[0];
        // Busca o canal
        const canal = interaction.guild?.channels.cache.get(canalId);
        if (!canal) {
            await interaction.reply({
                content: "❌ | Não consegui encontrar o canal selecionado.",
                ephemeral: true
            });
        }
        if (!canal || canal.type !== ChannelType.GuildText) {
            await interaction.reply({
                content: "❌ | O canal selecionado não é um canal de texto válido.",
                ephemeral: true
            });
        }
        // Gera o embed do botconfig
        const embedConfig = await embedConfigBot(interaction);
        // Atualiza a mensagem mantendo o embed
        await interaction.update({
            content: null,
            embeds: embedConfig.embeds,
            components: embedConfig.components
        });
        // Confirma pro usuário
        await interaction.followUp({
            content: `<:sucesso:1422700042636099696> | Canal ${canal} selecionado com sucesso, e mensagem enviada.`,
            ephemeral: true
        });
        const textchannel = canal;
        const estoqueMsg = await embedSolicitarEstoque(interaction);
        await textchannel.send(estoqueMsg);
        return;
    }
});
