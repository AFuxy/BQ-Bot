const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('update')
        .setDescription('Tries to update '),
    async execute(interaction) {
        await interaction.reply({ content: 'attempting to update...', ephemeral: true });
        //attemp to go through all messages in a channel and add a star reaction to each if they don't already have one, catch any errors
        const messages = await interaction.channel.messages.fetch();
        let left = messages.size + 1;
        await interaction.editReply({ content: 'processing message...', ephemeral: true });
        messages.forEach(async message => {
            // add a progress message
            if (!message.reactions.cache.has('⭐')) {
                try {
                    // edit reply to show how many messages are being processed
                    await interaction.editReply({ content: `processing message... ${left - 1} messages left`, ephemeral: true });
                    await message.react('⭐');
                } catch (error) {
                    console.log(error);
                }
            }
        });
        await interaction.editReply({ content: 'done!', ephemeral: true });
    },
};