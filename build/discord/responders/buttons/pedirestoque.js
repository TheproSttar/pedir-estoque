import { createResponder, ResponderType } from "#base";
import { TextInputBuilder } from "@discordjs/builders";
import { ActionRowBuilder, ModalBuilder, TextInputStyle } from "discord.js";
createResponder({
    customId: "pedir-estoque",
    types: [ResponderType.Button], cache: "cached",
    async run(interaction) {
        const modal = new ModalBuilder()
            .setCustomId("modal-pedirestoque")
            .setTitle("Pedir Estoque");
        const input1 = new TextInputBuilder()
            .setCustomId("input1")
            .setLabel("Qual produto você quer pedir para reestock?")
            .setStyle(TextInputStyle.Short)
            .setMinLength(2)
            .setMaxLength(50)
            .setPlaceholder("Ex.: Contas de Roblox, Nitro, ...");
        const row1 = new ActionRowBuilder().addComponents(input1);
        modal.addComponents(row1);
        await interaction.showModal(modal);
    }
});
