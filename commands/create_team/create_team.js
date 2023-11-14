const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { createTeam } = require('../../logic');
const { createTeamEmbed, insufficientTeamEmbed } = require('../../components/embed')
const { exampleData, emojis, roleOptions, createTeamMessage, createTeamDescription } = require('../../constants');

module.exports = {
    data: new SlashCommandBuilder()
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
        ),

    async execute(interaction) {

        // Retrieve players from command
        const players = [];
        let playerString = "";
        for (let i = 1; i <= 10; i++){
            const player = interaction.options.getUser(`player${i}`);
            if (player) {
                players.push(player);
                playerString += `<@${player.id}> `;
            }
        }

        const message = await interaction.reply({
            content: `${playerString}\n\n ${createTeamMessage}`,
            fetchReply: true
        })

        message.react(emojis[0]);
        message.react(emojis[1]);
        message.react(emojis[2]);

        const filter = (reaction, user) => emojis.includes(reaction.emoji.name) && players.includes(user);
        const collector = message.createReactionCollector({ filter, time: 30000 });

        const data = [];

        collector.on('collect', (reaction, user) => {
            console.log(`Collected reaction ${reaction.emoji.name} from user ${user.tag}`);

            const role = roleOptions[emojis.indexOf(reaction.emoji.name)];
            const userTag = `<@${user.id}>`;

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

            interaction.followUp('Role selection time is up!');

            if (data.length < 10) {
                const insufficientTeam = insufficientTeamEmbed()
                interaction.followUp({ embeds: [insufficientTeam] })
            } else {
                const teams = createTeam(data);
                const embedTeams = createTeamEmbed(teams[0], teams[1]);
                interaction.followUp({ embeds: [embedTeams] })
            }
        })
    }
};