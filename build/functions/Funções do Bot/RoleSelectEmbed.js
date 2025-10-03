import { EmbedBuilder, StringSelectMenuBuilder, ActionRowBuilder } from "discord.js";
export async function embedConfigBotRole(interaction) {
    const usericon = interaction.user.displayAvatarURL();
    const embed = new EmbedBuilder()
        .setAuthor({ name: "Dev Poor **panel**", iconURL: usericon })
        .setTitle("<:estoquesim:1422670076238102689> | **Bot** de solicitar estoque")
        .setDescription("* Este sistema foi desenvolvido pelo **Youtuber Dev Poor**")
        .addFields([
        { name: "Ping do Bot", value: `\`${interaction.client.ws.ping}MS\``, inline: true },
        { name: "Versão", value: "\`1.0\` **Beta**", inline: true }
    ])
        .setColor("Aqua");
    const menu = new StringSelectMenuBuilder()
        .setCustomId("solicitar-estoque-botconfig")
        .setPlaceholder("Selecionar opção para configurar")
        .setMinValues(1)
        .setMaxValues(1)
        .setOptions([
        { label: "Canal solicitar estoque [PÚBLICO]", emoji: "1422673272390291556", value: "canal-solicitar-estoque", description: "Selecionar o canal onde mandará a mensagem de solicitar estoque" },
        { label: "Canal logs estoque [PRIVADO]", emoji: "1422673272390291556", value: "canal-logs-estoque", description: "Selecionar o canal que será mandado os pedidos de estoques" },
        { label: "Cargo da Equipe [PRIVADO]", emoji: "1422673272390291556", value: "cargo-adm", description: "Selecionar o cargo da equipe, para ser chamado nas threads" },
        { label: "Configurar bot [ADMINISTRADOR]", emoji: "1422682201706860696", value: "alterar-bot", description: "Configure o nome e logo do bot" }
    ]);
    const rowMenu = new ActionRowBuilder().addComponents(menu);
    return {
        content: [],
        embeds: [embed],
        components: [rowMenu]
    };
}
