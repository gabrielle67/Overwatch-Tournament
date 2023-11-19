//
// command that generates a random map based on game mode selection
//

const { createMapCommand } = require('../../components/slashCommandBuilder');
const { selectMap } = require('../../algorithm');

module.exports = {
    data: createMapCommand,

    async execute(interaction) {
        const gameMode = interaction.options.getString('mode');
        const map = selectMap(gameMode);
        interaction.reply(map);
    }
}