//
// all slash commands
//

const { SlashCommandBuilder } = require('discord.js');
const { createTeamDescription, createMapDescription } = require('../constants');

const createTeamCommand = new SlashCommandBuilder()
    .setName('createteam')
    .setDescription(createTeamDescription)
    .addUserOption(option => option
        .setName('player1')
        .setDescription('Player 1')
        .setRequired(true)
    )
    .addUserOption(option => option
        .setName('player2')
        .setDescription('Player 2')
        .setRequired(true)
    )
    .addUserOption(option => option
        .setName('player3')
        .setDescription('Player 3')
        .setRequired(true)
    )
    .addUserOption(option => option
        .setName('player4')
        .setDescription('Player 4')
        .setRequired(true)
    )
    .addUserOption(option => option
        .setName('player5')
        .setDescription('Player 5')
        .setRequired(true)
    )
    .addUserOption(option => option
        .setName('player6')
        .setDescription('Player 6')
        .setRequired(true)
    )
    .addUserOption(option => option
        .setName('player7')
        .setDescription('Player 7')
        .setRequired(true)
    )
    .addUserOption(option => option
        .setName('player8')
        .setDescription('Player 8')
        .setRequired(true)
    )
    .addUserOption(option => option
        .setName('player9')
        .setDescription('Player 9')
        .setRequired(true)
    )
    .addUserOption(option => option
        .setName('player10')
        .setDescription('Player 10')
        .setRequired(true)
    )

const createMapCommand = new SlashCommandBuilder()
    .setName('map')
    .setDescription(createMapDescription)
    .addStringOption(option =>
        option.setName('mode')
            .setDescription('Select Game Mode')
            .setRequired(true)
            .addChoices(
                { name: 'Control', value: 'control'},
                { name: 'Escort', value: 'escort'},
                { name: 'Flashpoint', value: 'flashpoint'},
                { name: 'Hybrid', value: 'hybrid'},
                { name: 'Push', value: 'push'}
            )
    )

exports.createTeamCommand = createTeamCommand;
exports.createMapCommand = createMapCommand;