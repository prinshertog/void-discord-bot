import data from './config.json' with { type: 'json' };
import { loadCommands } from './load_commands.js';
import { Client, Events, GatewayIntentBits } from 'discord.js';

const { TOKEN } = data;

loadCommands();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on(Events.ClientReady, readyClient => {
  console.log(`Logged in as ${readyClient.user.tag}!`);
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'standing') {
    await interaction.reply('The standing feature is in development by <@409724032892796939>!');
  }

  if (interaction.commandName === 'info') {
    await interaction.reply('This bot is being developed by <@409724032892796939>')
  }
});

client.login(TOKEN);