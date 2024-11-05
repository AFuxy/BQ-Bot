client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    // console.log(message.content, message.guild.id, message.author.tag);
    //make sure it is the guild id in .env and then add a star reaction to the message if it doesn't already have one and catch any errors, excempt channels with id `1252991947946197054`, `1211416121748623451`, `1262185251761950820`
    if (message.guild.id === process.env.GUILD_ID && message.channel.id !== "1252991947946197054" && message.channel.id !== "1211416121748623451" && message.channel.id !== "1262185251761950820" && message.channel.id !== "1303119761776971806") {
        if (!message.reactions.cache.has('⭐')) {
            try {
                await message.react('⭐');
            } catch (error) {
                console.log(error);
            }
        }
    }
});