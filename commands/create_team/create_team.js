const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { createTeam } = require('../../logic');
const { exampleData } = require('../../common');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('createteam')
        .setDescription("Takes role preferences of 10 players and creates 2 teams of 5 with 1 Tank, 2 DPS, and 2 Supports")
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
        ),

    async execute(interaction) {
        const players = [
            interaction.options.getUser('player1'),
            interaction.options.getUser('player2'),
            interaction.options.getUser('player3'),
            interaction.options.getUser('player4'),
            interaction.options.getUser('player5'),
            interaction.options.getUser('player6'),
            interaction.options.getUser('player7'),
            interaction.options.getUser('player8'),
            interaction.options.getUser('player9'),
            interaction.options.getUser('player10')
        ];

        const roleOptions = [
            'Tank',
            'DPS',
            'Support',
        ];

        const emojis = [
            '🛡️',
            '🔫',
            '💉'
        ];

        const message = await interaction.reply({
            content: "React to this message to select your roles within the next 30 seconds.\n\n🛡️ Tank\n🔫 DPS\n💉 Support",
            fetchReply: true
        })

        message.react(emojis[0]);
        message.react(emojis[1]);
        message.react(emojis[2]);

        const filter = (reaction, user) => emojis.includes(reaction.emoji.name) && players.includes(user);
        const collector = message.createReactionCollector({ filter, time: 10000 });

        const data = [];

        console.log('starting collection');

        collector.on('collect', (reaction, user) => {
            console.log(`Collected reaction ${reaction.emoji.name} from user ${user.tag}`);

            const role = roleOptions[emojis.indexOf(reaction.emoji.name)];
            const userTag = `${user.tag}`;

            const existingPlayerIndex = data.findIndex(player => player.name === userTag);

            if (reaction.users.cache.get(user.id)) {
                // User reacted - add or update preferences
                if (existingPlayerIndex !== -1) {
                    // If the user exists, add the role to their preferences
                    if (!data[existingPlayerIndex].preferences.includes(role)) {
                        data[existingPlayerIndex].preferences.push(role);
                    }
                } else {
                    data.push({ name: userTag, preferences: [role] });
                }
            } else {
                // User deselected - remove role from preferences
                if (existingPlayerIndex !== -1) {
                    const roleIndex = data[existingPlayerIndex].preferences.indexOf(role);
                    if (roleIndex !== -1) {
                        data[existingPlayerIndex].preferences.splice(roleIndex, 1);
                        // Remove the user from the array if they have no preferences left
                        if (data[existingPlayerIndex].preferences.length === 0) {
                            data.splice(existingPlayerIndex, 1);
                        }
                    }
                }
            }
        });

        collector.on('end', () => {
            // Process collected reactions and selected roles
            console.log(data);

            const teams = createTeam(exampleData);

            console.log(teams);

            const teamA = teams[0];
            const teamB = teams[1];

            const embedTeams = new EmbedBuilder()
                .setColor('Orange')
                .setTitle('Tournament Teams')
                .addFields(
                    { name: 'Team A', value: '\u200B'},
                    { name: '🛡️ Tank', value: teamA[0].name, inline: false},
                    { name: '🔫 DPS', value: `${teamA[1].name}, ${teamA[2].name}`, inline: false},
                    { name: '💉 Support ', value: `${teamA[3].name}, ${teamA[4].name}`, inline: false},
                    { name: '\u200B', value: '\u200B'},
                    { name: 'Team B', value: '\u200B'},
                    { name: '🛡️ Tank', value: teamB[0].name, inline: false},
                    { name: '🔫 DPS', value: `${teamB[1].name}, ${teamB[2].name}`, inline: false},
                    { name: '💉 Support ', value: `${teamB[3].name}, ${teamB[4].name}`, inline: false},
                )
                .setFooter({text: 'stupid bot by Goob'})

            // Further processing based on selected roles
            interaction.followUp('Role selection completed!');
            interaction.followUp({ embeds: [embedTeams]});
        })
    }};