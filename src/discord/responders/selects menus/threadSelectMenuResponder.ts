import { createResponder, ResponderType } from "#base";
import { EmbedBuilder } from "discord.js";
import { QuickDB } from "quick.db";

const cooldowns = new Map<string, number>(); // guarda userId -> timestamp
const db = new QuickDB();
const db_estoque = db.table("BotSolicitarEstoque")

createResponder({
    customId: "selectmenu-thread-functions",
    types: [ResponderType.StringSelect], cache: "cached",
    async run(interaction) {
        const customId = interaction.values[0];

        if (customId === "sair-da-thread") {
            const msgtchau = [
                "Bye bye",
                "Poxa, foi bom te ver",
                "Tchau amiguinho",
                "Gostei tanto de você",
                "Não gostou do atendimento?",
                "Todoas gostam daqui. Por que você não gostou?"
            ]
           // Sorteia uma mensagem
            const randomTchau = msgtchau[Math.floor(Math.random() * msgtchau.length)];            const thread = interaction.channel;

            if (!thread?.isThread()) {
      await interaction.reply({ content: "❌ Este comando só pode ser usado em uma thread.", ephemeral: true });
      return;
            }

            const embed = new EmbedBuilder()
            .setDescription(`**<:sair:1423053092404072488> | O <@${interaction.user.id}> saiu da thread, por conta própria. *${randomTchau}***\n> O usuário saiu da thread, não posso saber qual o motivo, mas você pode conversar com ele, e perguntar o motivo.`)
            .setColor("Greyple")
            .setThumbnail(interaction.user.displayAvatarURL())

            await interaction.reply({ embeds: [embed] });
            await thread.members.remove(interaction.user.id)

        }

        if (customId === "chamar-equipe") {
    const equipe = await db_estoque.get(`${interaction.guild.id}_RoleEquipe`);

    const userId = interaction.user.id;
    const cooldownTime = 10 * 60 * 1000; // 10 minutos em ms
    const lastUsed = cooldowns.get(userId);
    const now = Date.now();

    if (lastUsed && now - lastUsed < cooldownTime) {
        const remaining = Math.ceil((cooldownTime - (now - lastUsed)) / 1000);

        // formatar direto aqui
        const minutes = Math.floor(remaining / 60);
        const seconds = remaining % 60;

        let niceTime = "";
        if (minutes > 0) niceTime += `${minutes} minuto${minutes > 1 ? "s" : ""}`;
        if (minutes > 0 && seconds > 0) niceTime += " e ";
        if (seconds > 0) niceTime += `${seconds} segundo${seconds > 1 ? "s" : ""}`;

        await interaction.reply({
            content: `Calma aí! Use esse comando de novo em **${niceTime}**.`,
            ephemeral: true
        });
        return;
    }

    // atualiza cooldown
    cooldowns.set(userId, now);

    if (!equipe) {
        await interaction.reply({ content: "A equipe não configurou o cargo.", ephemeral: true });
        return;
    }

    await interaction.reply({ content: `Eae <@&${equipe}>, o <@${interaction.user.id}> está chamando vocês.` });
    return;
        }

        if (customId === "aprovar-pedido") {
    const thread = interaction.channel;

    if (!thread?.isThread()) {
        await interaction.reply({ content: "Este comando só pode ser usado em uma thread.", ephemeral: true });
        return;
    }

    // Pega o ID do user no nome da thread
    const nomeThread = thread.name; // ➜ 1308217410742124564
    const userId = nomeThread.replace("➜ ", "");
    const user = await interaction.client.users.fetch(userId).catch(() => null);

    // --- Remover da fila no banco ---
    await db_estoque.sub(`${interaction.guild.id}_filaNumber`, 1);

    const filaUsers: string[] = await db_estoque.get(`${interaction.guild.id}_filaUsers`) || [];
    // aqui eu removo o user pelo id (se você salvou só username, troca pra username)
    const novaFila = filaUsers.filter(u => u !== userId && u !== `<@${userId}>`);
    await db_estoque.set(`${interaction.guild.id}_filaUsers`, novaFila);

    // --- Embed de aprovação ---
    const embed = new EmbedBuilder()
        .setAuthor({ name: `Pedido de Solicitação de Estoque aceito`, iconURL: interaction.user.displayAvatarURL() })
        .setTitle("**<:estoquesim:1422670076238102689> | Pedido aprovado**")
        .setDescription(`**➜ <@${userId}> Seu pedido de Estoque foi aceito, muito obrigado por pedir em nosso servidor.**\n\n> A thread do pedido de estoque foi excluída`)
        .setColor("Green");

    // Manda DM se possível
    if (user) await user.send({ embeds: [embed] }).catch(() => null);    await interaction.reply({ embeds: [embed] });

    // --- Apagar a thread depois de 5 segundos ---
    setTimeout(() => {
        thread.delete().catch(() => null);
    }, 5000);
}

if (customId === "recusar-pedido") {
    const thread = interaction.channel;

    if (!thread?.isThread()) {
        await interaction.reply({ content: "Este comando só pode ser usado em uma thread.", ephemeral: true });
        return;
    }

    // Pega o ID do user no nome da thread
    const nomeThread = thread.name; // ➜ 1308217410742124564
    const userId = nomeThread.replace("➜ ", "");
    const user = await interaction.client.users.fetch(userId).catch(() => null);

    // --- Remover da fila no banco ---
    await db_estoque.sub(`${interaction.guild.id}_filaNumber`, 1);

    const filaUsers: string[] = await db_estoque.get(`${interaction.guild.id}_filaUsers`) || [];
    // aqui eu removo o user pelo id (se você salvou só username, troca pra username)
    const novaFila = filaUsers.filter(u => u !== userId && u !== `<@${userId}>`);
    await db_estoque.set(`${interaction.guild.id}_filaUsers`, novaFila);

    // --- Embed de aprovação ---
    const embed = new EmbedBuilder()
        .setAuthor({ name: `Pedido de Solicitação de Estoque recusado`, iconURL: interaction.user.displayAvatarURL() })
        .setTitle("**<:estoqueerrorbonito:1423436628126601266> | Pedido recusado**")
        .setDescription(`**➜ <@${userId}> Seu pedido de Estoque foi recusado, muito obrigado por pedir em nosso servidor.**\n\n> A thread do pedido de estoque foi excluída`)
        .setColor("Green");

    // Manda DM se possível
    if (user) await user.send({ embeds: [embed] }).catch(() => null);    await interaction.reply({ embeds: [embed] });

    // --- Apagar a thread depois de 5 segundos ---
    setTimeout(() => {
        thread.delete().catch(() => null);
    }, 5000);
}

    }
});