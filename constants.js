// strings and lists

// Example player data
const exampleData = [
    { name: "Player 1", preferences: ["Tank", "DPS", "Support"] },
    { name: "Player 2", preferences: ["DPS", "Support"] },
    { name: "Player 3", preferences: ["Support"] },
    { name: "Player 4", preferences: ["Tank", "DPS"] },
    { name: "Player 5", preferences: ["DPS", "Support"] },
    { name: "Player 6", preferences: ["Tank", "Support"] },
    { name: "Player 7", preferences: ["Tank"] },
    { name: "Player 8", preferences: ["DPS", "Support"] },
    { name: "Player 9", preferences: ["Tank", "DPS", "Support"] },
    { name: "Player 10", preferences: ["DPS", "Support"] },
  ];

const roleOptions = [
  'Tank',
  'DPS',
  'Support'
]

const emojis = [
  '🛡️',
  '🔫',
  '💉'
]

const createTeamDescription = 'Takes role preferences of 10 players and creates 2 teams of 5 with 1 Tank, 2 DPS, and 2 Supports';
const createTeamMessage = 'React to this message to select your roles within the next 30 seconds.\n\n🛡️ Tank\n🔫 DPS\n💉 Support';

exports.exampleData = exampleData;
exports.roleOptions = roleOptions;
exports.emojis = emojis;

exports.createTeamMessage = createTeamMessage;
exports.createTeamDescription = createTeamDescription;