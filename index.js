//Import discord
const Discord = require('discord.js');
const { EmbedBuilder, WebhookClient, ActionRowBuilder, ButtonBuilder, Events, Modal, TextInputBuilder, OAuth2Scopes, Partials, resolveColor, Client, Collection, GatewayIntentBits, SelectMenuBuilder, ActivityType, PermissionsBitField, AttachmentBuilder } = require('discord.js');
require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');

const client = global.client = new Client({
    fetchAllMembers: true,
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMembers, 
        GatewayIntentBits.GuildModeration, 
        GatewayIntentBits.GuildEmojisAndStickers, 
        GatewayIntentBits.GuildIntegrations, 
        GatewayIntentBits.GuildWebhooks, 
        GatewayIntentBits.GuildInvites, 
        GatewayIntentBits.GuildVoiceStates, 
        GatewayIntentBits.GuildPresences, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.GuildMessageReactions, 
        GatewayIntentBits.GuildMessageTyping, 
        GatewayIntentBits.MessageContent
    ],
    scopes: [
        OAuth2Scopes.Bot, 
        OAuth2Scopes.ApplicationsCommands
    ],
    partials: [
        Partials.Message, 
        Partials.Channel, 
        Partials.Reaction, 
        Partials.User, 
        Partials.GuildMember, 
        Partials.ThreadMember, 
        Partials.GuildScheduledEvent
    ],
    ws: { version: "10" }
});

client.commands = new Collection();

var pathEvents = require("path").join(__dirname, "events");
var foldersPath = require("path").join(__dirname, "commands");

require("fs").readdirSync(pathEvents).forEach(function(file) {
  require("./events/" + file);
  console.log("Events: " + file);
});

// require("fs").readdirSync(normalizedPathCommands).forEach(function(file) {
//   require("./commands/" + file);
//   console.log("Commands: " + file);
// });

const commandFolders = require("fs").readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = require("path").join(foldersPath, folder);
	const commandFiles = require("fs").readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = require("path").join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
      console.log("Commands: " + file);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

client.login(process.env.TOKEN);