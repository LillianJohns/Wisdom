// Load configuration.
var config = require('./config.json');

// Load libraries.
var Bot = require('./wisdom/bot.js');
var Discord = require('discord.js');

// Initialize Discord Bot
console.log('Initializing...');
var client = new Discord.Client();
var bot = new Bot(client, config);

// Report errors, if/when they occur.
client.on('error', error => {
    console.error(error);
});

// Reporting we have connected.
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    bot.init();
});

// Handle a message.
client.on('message', msg => {
    bot.handleMessage(msg);
});

if (config.welcome_joiners) {
    client.on('guildMemberAdd', user => {
        bot.handleJoin(user);
    });
}

// Do actual login.
client.login(config.token);
