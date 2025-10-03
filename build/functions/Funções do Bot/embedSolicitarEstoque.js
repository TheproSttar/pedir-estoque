import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";
export async function embedSolicitarEstoque(interaction) {
    const guildAvatar = interaction.guild?.iconURL() || interaction.user.displayAvatarURL();
    const embed = new EmbedBuilder()
        .setAuthor({ name: `Pedir Estoque ${interaction.guild?.name}`, iconURL: guildAvatar })
        .setTitle(`**<:estoquesim:1422670076238102689> | Solicitar Estoque para ${interaction.guild?.name}**`)
        .setDescription("*Solicite estoque para o dono reabastecer o estoque desejado*\n* Temos **termos** a serem aceitos para você pedir estoque.\n> Certifique-se de que o produto no qual você pedir existe no servidor, e o produto não pode ser coisas **+18**.\n\n__A qualidade que você precisa, está conosco!__")
        .setColor("Aqua")
        .setFields([
        { name: "Servidor", value: `\`${interaction.guild?.name}\``, inline: true },
        { name: "Versão", value: "\`1.0\`**Beta**", inline: true }
    ]);
    const row = new ActionRowBuilder().addComponents(new ButtonBuilder()
        .setCustomId("pedir-estoque")
        .setLabel("[Aperte aqui] Pedir Estoque")
        .setEmoji("1422742318288474253")
        .setStyle(ButtonStyle.Secondary));
    return {
        embeds: [embed],
        components: [row]
    };
}
