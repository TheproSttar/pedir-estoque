import { createResponder, ResponderType } from "#base";
import { ActionRowBuilder, ModalBuilder, TextInputBuilder } from "@discordjs/builders";
import { EmbedBuilder, StringSelectMenuBuilder, TextInputStyle } from "discord.js";
createResponder({
    customId: "alterar-nome-bot",
    types: [ResponderType.Button], cache: "cached",
    async run(interaction) {
        const modal = new ModalBuilder()
            .setTitle("Alterar nome do bot")
            .setCustomId("nome-modal");
        const input1 = new TextInputBuilder()
            .setCustomId("nome")
            .setLabel("Qual será o nome do Bot?")
            .setPlaceholder("Ex.: Solicitar estoque")
            .setStyle(TextInputStyle.Short);
        const row = new ActionRowBuilder().addComponents(input1);
        modal.addComponents(row);
        await interaction.showModal(modal);
    }
});
createResponder({
    customId: "alterar-logo-bot",
    types: [ResponderType.Button], cache: "cached",
    async run(interaction) {
        const modal = new ModalBuilder()
            .setTitle("Alterar logo do bot")
            .setCustomId("logo-modal");
        const input1 = new TextInputBuilder()
            .setCustomId("logo")
            .setLabel("Qual será a logo do Bot?")
            .setPlaceholder("(URL) Ex.: https://media.discordapp.net/attachments/...")
            .setStyle(TextInputStyle.Short);
        const row = new ActionRowBuilder().addComponents(input1);
        modal.addComponents(row);
        await interaction.showModal(modal);
    }
});
createResponder({
    customId: "nome-modal",
    types: [ResponderType.ModalComponent],
    cache: "cached",
    async run(interaction) {
        const value = interaction.fields.getTextInputValue("nome");
        try {
            await interaction.client.user?.setUsername(value);
            await interaction.reply({
                content: `✅ Nome do bot foi redefinido para **${value}**.\n⚠️ Se não aparecer, reinicie o bot ou o Discord.\nLembre-se: só pode mudar o nome **2 vezes por hora**.`,
                ephemeral: true
            });
        }
        catch (err) {
            console.error(err);
            await interaction.reply({
                content: "❌ Não consegui mudar o nome do bot. Pode ser por causa do limite do Discord (2x por hora).",
                ephemeral: true
            });
        }
    }
});
createResponder({
    customId: "logo-modal",
    types: [ResponderType.ModalComponent],
    cache: "cached",
    async run(interaction) {
        const value = interaction.fields.getTextInputValue("logo");
        try {
            await interaction.client.user?.setAvatar(value);
            await interaction.reply({
                content: `✅ Logo do bot foi redefinida.\n⚠️ Se não aparecer, reinicie o bot ou o Discord.\nLembre-se: não fique mudando a **logo** toda hora.`,
                ephemeral: true
            });
        }
        catch (err) {
            console.error(err);
            await interaction.reply({
                content: "❌ Não consegui mudar a logo do bot. Você deve ter colocado a **URL** errada.",
                ephemeral: true
            });
        }
    }
});
createResponder({
    customId: "voltar-início",
    types: [ResponderType.Button], cache: "cached",
    async run(interaction) {
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
            { label: "Cargo de Equipe [PRIVADO]", emoji: "1422673272390291556", value: "cargo-adm", description: "Selecionar o cargo de equipe, para ser chamado nas threads" },
            { label: "Configurar bot [ADMINISTRADOR]", emoji: "1422682201706860696", value: "alterar-bot", description: "Configure o nome e logo do bot" }
        ]);
        const rowMenu = new ActionRowBuilder().addComponents(menu);
        await interaction.update({ embeds: [embed], components: [rowMenu] });
    }
});
