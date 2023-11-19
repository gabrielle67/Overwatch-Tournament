//
// all functions that create embeds
//

const { EmbedBuilder } = require('discord.js');

function createTeamEmbed(teamA, teamB) {
    const embedTeams = new EmbedBuilder()
            .setColor('Orange')
            .setTitle('Tournament Teams')
            .addFields(
                { name: 'Team Alpha: ', value: '\u200B'},
                { name: '🛡️ Tank', value: teamA[0].name, inline: false},
                { name: '🔫 DPS', value: `${teamA[1].name}, ${teamA[2].name}`, inline: false},
                { name: '💉 Support ', value: `${teamA[3].name}, ${teamA[4].name}`, inline: false},
                { name: '\u200B', value: '\u200B'},
                { name: 'Team Bravo: ', value: '\u200B'},
                { name: '🛡️ Tank', value: teamB[0].name, inline: false},
                { name: '🔫 DPS', value: `${teamB[1].name}, ${teamB[2].name}`, inline: false},
                { name: '💉 Support ', value: `${teamB[3].name}, ${teamB[4].name}`, inline: false},
                { name: '\u200B', value: '\u200B'}
            )
            .setFooter({text: 'stupid bot by Goob'})
    return embedTeams;
}

function roleCountEmbed(tankCount, dpsCount, supportCount) {
    const countEmbed = new EmbedBuilder()
                .setColor('Red')
                .setTitle('Role Count Warning')
                .setDescription('Not enough selections of one or more roles:')
                .addFields(
                    { name: 'Tank', value: `${tankCount}/2`, inline: true },
                    { name: 'DPS', value: `${dpsCount}/4`, inline: true },
                    { name: 'Support', value: `${supportCount}/4`, inline: true }
                )
    return countEmbed;
};

function soloCountEmbed(tankCount, dpsCount, supportCount) {
    const soloEmbed = new EmbedBuilder()
                .setColor('Red')
                .setTitle('Solo Count Warning')
                .setDescription('Too many players have role locked the same role:')
                .addFields(
                    { name: 'Locked Tanks:', value: `${tankCount}`, inline: true },
                    { name: 'Locked DPS:', value: `${dpsCount}`, inline: true },
                    { name: 'Locked Support:', value: `${supportCount}`, inline: true }
                )
    return soloEmbed;
};

function insufficientTeamEmbed() {
    const embedInsufficient = new EmbedBuilder()
                .setColor('Red')
                .setTitle('Insufficient Number of Players')
                .addFields({
                    name: '10 Players need to select a role for a team to be created', 
                    value: 'run /createTeams again', inline: false
                })
    return embedInsufficient;
}

function testEmbed(data) {
    const dataList = [];
    for (let i = 0; i < data.length; i++) {
        const vals = data[i].preferences.join(", ");
        dataList.push({ name: vals, value: data[i].name });
    }
    console.log(dataList);
    return {
        color: 0x0099ff,
        title: 'Test',
        fields: dataList
    }
}

exports.createTeamEmbed = createTeamEmbed;
exports.insufficientTeamEmbed = insufficientTeamEmbed;
exports.roleCountEmbed = roleCountEmbed;
exports.soloCountEmbed = soloCountEmbed;
exports.testEmbed = testEmbed;
