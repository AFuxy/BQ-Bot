const { ActivityType } = require('discord.js');

client.on("ready", async () => {
    console.log(`Bot online as ${client.user.tag}!`);
    client.user.setPresence({ activities: [{ name: "Give everyone a Star.", type: ActivityType.Custom }], status: "online" })
});