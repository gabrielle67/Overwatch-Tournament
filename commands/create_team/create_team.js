//
// create team slash command on discord
//

const { SlashCommandBuilder } = require('discord.js');
const { createTeam } = require('../../algorithm');
const { createTeamEmbed, insufficientTeamEmbed, testEmbed } = require('../../components/embed')
const { emojis, roleOptions, createTeamMessage, createTeamDescription } = require('../../constants');

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
        // create list of all players to tag
        const players = [];
        let playerString = "";
        for (let i = 1; i <= 10; i++) {
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

        try {
			message.react(emojis[0]);
			message.react(emojis[1]);
			message.react(emojis[2]);
		} catch (error) {
			console.error('One of the emojis failed to react:', error);
		}

        // create reaction collector to view all reactions and 'unreactions' within 30 seconds of the message sent
        const filter = (reaction, user) => emojis.includes(reaction.emoji.name) && players.includes(user);
        const collector = message.createReactionCollector({ filter, time: 30000,  dispose: true});
        const data = [];

        collector.on('collect', (reaction, user) => {
            console.log(`Collected reaction ${reaction.emoji.name} from user ${user.tag}`);

            const role = roleOptions[emojis.indexOf(reaction.emoji.name)];
            const userTag = `<@${user.id}>`;
            const existingPlayerIndex = data.findIndex(player => player.name === userTag);

            if (existingPlayerIndex !== -1) {
                if (!data[existingPlayerIndex].preferences.includes(role)) {
                    data[existingPlayerIndex].preferences.push(role);
                }
            } else {
                data.push({ name: userTag, preferences: [role] });
            }
        });

        collector.on('remove', (reaction, user) => {
            console.log(`Collected unreaction ${reaction.emoji.name} from user ${user.tag}`);
            
            const role = roleOptions[emojis.indexOf(reaction.emoji.name)];
            const userTag = `<@${user.id}>`;
            const existingPlayerIndex = data.findIndex(player => player.name === userTag);

            if (existingPlayerIndex !== -1) {
                const roleIndex = data[existingPlayerIndex].preferences.indexOf(role);
                if (roleIndex !== -1) {
                    data[existingPlayerIndex].preferences.splice(roleIndex, 1);
                    if (data[existingPlayerIndex].preferences.length === 0) {
                        data.splice(existingPlayerIndex, 1);
                    }
                }
            }
        })

        collector.on('end', () => {
            console.log(data);

            if (data.length < 10) {
                const insufficientTeam = insufficientTeamEmbed();
                interaction.followUp({ embeds: [insufficientTeam] });
            } else {
                const teams = createTeam(data);
                const embedTeams = createTeamEmbed(teams[0], teams[1]);
                interaction.followUp({ embeds: [embedTeams] });
            }

            // TEST EMBEDS
            // const test = testEmbed(data);
            // interaction.followUp({ embeds: [test] });
        })
    }
};