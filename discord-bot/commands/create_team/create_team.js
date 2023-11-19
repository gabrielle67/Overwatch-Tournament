//
// create team slash command and interaction on discord
//

const { createTeam } = require('../../algorithm');
const { handleReaction } = require('../../components/reactionCollector');
const { createTeamCommand } = require('../../components/slashCommandBuilder');
const { emojis, roleOptions, createTeamMessage } = require('../../constants');
const { createTeamEmbed, insufficientTeamEmbed, roleCountEmbed, 
    soloCountEmbed } = require('../../components/embed')

module.exports = {
    data: createTeamCommand,

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
        let data = [];

        collector.on('collect', (reaction, user) => {
            handleReaction(reaction, user, true, data, roleOptions, emojis);
        });

        collector.on('remove', (reaction, user) => {
            handleReaction(reaction, user, false, data, roleOptions, emojis);
        })

        collector.on('end', () => {
            console.log(data);
            // Count reactions for each role
            const tankCount = data.filter(player => player.preferences.includes('Tank')).length;
            const dpsCount = data.filter(player => player.preferences.includes('DPS')).length;
            const supportCount = data.filter(player => player.preferences.includes('Support')).length;

            const soloTanks = data.filter(player => player.preferences.includes('Tank') && player.preferences.length === 1).length;
            const soloDps = data.filter(player => player.preferences.includes('DPS') && player.preferences.length === 1).length;
            const soloSupport = data.filter(player => player.preferences.includes('Support') && player.preferences.length === 1).length;

            if (data.length < 10) {
                const insufficientTeam = insufficientTeamEmbed();
                interaction.followUp({ embeds: [insufficientTeam] });

            } else if (tankCount < 2 || dpsCount < 4 || supportCount < 4) {
                const countEmbed = roleCountEmbed(tankCount, dpsCount, supportCount);
                interaction.followUp({ embeds: [countEmbed] });

            } else if (soloTanks > 2 || soloDps > 4 || soloSupport > 4) {
                const soloEmbed = soloCountEmbed(soloTanks, soloDps, soloSupport);
                interaction.followUp({ embeds: [soloEmbed]});
              
            } else {
                const teams = createTeam(data);
                const embedTeams = createTeamEmbed(teams[0], teams[1]);
                interaction.followUp({ embeds: [embedTeams] });
            }
        })
    }
};