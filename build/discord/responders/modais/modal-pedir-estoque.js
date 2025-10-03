import { createResponder, ResponderType } from "#base";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, EmbedBuilder, StringSelectMenuBuilder, time } from "discord.js";
import { QuickDB } from "quick.db";
const db = new QuickDB();
const db_estoque = db.table("BotSolicitarEstoque");
createResponder({
    customId: "modal-pedirestoque",
    types: [ResponderType.ModalComponent], cache: "cached",
    async run(interaction) {
        const guildId = interaction.guild?.id;
        const inputValue = interaction.fields.getTextInputValue("input1");
        const canalLogs = await db_estoque.get(`${guildId}_logsChannel`);
        const canalLogsChannel = await interaction.guild?.channels.fetch(canalLogs);
        const iconuser = interaction.user.displayAvatarURL();
        const date = new Date();
        /* Se o canal de logs existir, manda a embed */
        if (canalLogsChannel && canalLogsChannel.isTextBased()) {
            const embed = new EmbedBuilder()
                .setAuthor({ name: `Pedido de Reestock ou Estoque de **${interaction.user.username}**`, iconURL: iconuser })
                .setTitle("**<:adicionarestoque:1422755194277466243> | Adicione o Pedido**")
                .setDescription(`*Este foi um pedido de Reestock de um produto, ou para um novo produto*\n\n` +
                `➜ **Informações do usuário:**\n` +
                `Usuário: **${interaction.user.username}**\n` +
                `Menção: <@${interaction.user.id}>\n` +
                `ID: **${interaction.user.id}**\n\n` +
                `➜ **Informações do pedido:**\n` +
                `Data do pedido: ${time(date, "f")}\n` +
                `Pedido: **${inputValue}**`)
                .setColor("Aqua");
            await canalLogsChannel.send({ embeds: [embed] });
        }
        /* Criar canal de fila */
        const channel = interaction.channel;
        const thread = await channel.threads.create({
            name: `➜ ${interaction.user.id}`,
            type: ChannelType.PrivateThread
        });
        /* Adicionar o membro na thread de espera */
        await thread.members.add(interaction.user.id).catch(() => null);
        /* Banco de dados */
        await db_estoque.add(`${interaction.guild.id}_filaNumber`, 1);
        await db_estoque.push(`${interaction.guild.id}_filaUsers`, `${interaction.user.username}`);
        await db_estoque.get(`${interaction.guild.id}_filaNumber`);
        const filaNúm = await db_estoque.get(`${interaction.guild.id}_filaNumber`);
        /* Select Menu */
        const selectmenu = new StringSelectMenuBuilder()
            .setCustomId("selectmenu-thread-functions")
            .setPlaceholder("Selecionar função da Thread")
            .setMinValues(1)
            .setMaxValues(1)
            .addOptions([
            { label: "Sair da Thread", emoji: "1423053092404072488", value: "sair-da-thread", description: "[EVERYONE] Saia da thread do pedido de estoque" },
            { label: "Chamar Equipe", emoji: "1423050047385501706", value: "chamar-equipe", description: "[EVERYONE] Chame a equipe de  administradores cadastrada" },
            { label: "Aprovar Pedido", emoji: "1423050857452408882", value: "aprovar-pedido", description: "[EQUIPE] Aprove o pedido de estoque do usuário" },
            { label: "Recusar Pedido", emoji: "1423051526728843334", value: "recusar-pedido", description: "[EQUIPE] Recuse o pedido de estoque do usuário" },
        ]);
        /* ActionRowBuilder do Select menu */
        const rowSelectMenu = new ActionRowBuilder().addComponents(selectmenu);
        /* Embed da thread */
        const embedThread = new EmbedBuilder()
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL() })
            .setTitle("**<:estoquesim:1422670076238102689> | Pedido de Estoque**")
            .setDescription(`*Este foi um pedido de Reestock de um produto, ou para um novo produto*\n* ➜ Informaçõoes do usuário:\n**Usuário: ${interaction.user.username}**\n**Menção: <@${interaction.user.id}>**\n**ID: ${interaction.user.id}**\n\n* ➜ Informações do pedido:\n**Data do pedido: ${time(date, "f")}**\n**Pedido: ${inputValue}**\n**Número da Fila: \`${filaNúm}\`**\n\n> Aguarde pacientemente o dono aceitar seu pedido de estoque`)
            .setColor("Aqua");
        /* Botão para redirecionar-se para a thread */
        const row = new ActionRowBuilder().addComponents(new ButtonBuilder()
            .setLabel("Redirecionar-se")
            .setStyle(ButtonStyle.Link)
            .setURL(`https://discord.com/channels/${interaction.guildId}/${thread.id}`));
        /* Enviar embed para a thread */
        await thread.send({ embeds: [embedThread], components: [rowSelectMenu] });
        /* Avisar pro user que deu tudo certo */
        await interaction.reply({ content: "**<:estoquesim:1422670076238102689> | Redirecione-se abaixo para a fila**", components: [row], ephemeral: true });
    }
});
