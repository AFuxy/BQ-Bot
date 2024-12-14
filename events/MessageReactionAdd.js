require('dotenv').config();
const { EmbedBuilder } = require('discord.js');

client.on("messageReactionAdd", async (reaction, user) => {
    // calucalate how many stars a message has and if it passes the threshold, add it to the hall of fame channel
    if (reaction.emoji.name === "⭐") {
        const message = await reaction.message.fetch(reaction.message.id);
        const stars = message.reactions.cache.get('⭐').count - 1;
        if (stars >= process.env.STAR_THRESHOLD) {
            const embed = new EmbedBuilder()
                .setTitle("New Hall of Fame Entry")
                .setURL(message.url)
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
                .setTimestamp();
            if (message.attachments.size > 0) {
                embed.setImage(message.attachments.first().url);
            }
            if (message.content !== "") {
                embed.setDescription(message.content);
            }
            client.channels.cache.get(process.env.HALL_OF_FAME).send({ embeds: [embed] });

        }
    }
})