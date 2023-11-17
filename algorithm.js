// 
// takes a list of ten maps with user preferences and divides them into 2 equal teams
//

const { exampleData3 } = require('./constants');

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createTeam(players) {
    const tanks = [];
    const dps = [];
    const support = [];

    const teamA = [];
    const teamB = [];

    shuffleArray(players);

    for (const player of players) {
        if (player.preferences.length == 1) {
            const role = player.preferences[0];
            if (role === "Tank" && tanks.length < 2) {
                tanks.push(player);
                player.role = "Tank";
            } else if (role === "DPS" && dps.length < 4) {
                dps.push(player);
                player.role = "DPS";
            } else if (role === "Support" && support.length < 4) {
                support.push(player);
                player.role = "Support";
            }
        } else if (player.preferences.length > 1) {
            if (player.preferences.includes("Tank") && tanks.length < 2) {
                tanks.push(player);
                player.role = "Tank";
            } else if (player.preferences.includes("DPS") && dps.length < 4) {
                dps.push(player);
                player.role = "DPS";
            } else if (player.preferences.includes("Support") && support.length < 4) {
                support.push(player);
                player.role = "Support";
            }
        }
    }

    // Assign roles
    if (tanks.length === 2 && dps.length === 4 && support.length === 4 ) {
        teamA.push(tanks.pop(), dps.pop(), dps.pop(), support.pop(), support.pop());
        teamB.push(tanks.pop(), dps.pop(), dps.pop(), support.pop(), support.pop());
        return ([teamA, teamB]);
    } else {
        console.log("Not enough players in a role... shuffling again");
        return createTeam(players);
    }
}

exports.createTeam = createTeam;

// const test = createTeam(exampleData3);

// console.log(test);