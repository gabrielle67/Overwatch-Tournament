//
// all functions that handle collecting reactions from a message
//

const handleReaction = (reaction, user, isCollection, data, roleOptions, emojis) => {
    console.log(`${isCollection ? 'Collected' : 'Collected unreaction'} reaction ${reaction.emoji.name} from user ${user.tag}`);

    const role = roleOptions[emojis.indexOf(reaction.emoji.name)];
    const userTag = `<@${user.id}>`;
    const existingPlayerIndex = data.findIndex(player => player.name === userTag);

    if (existingPlayerIndex !== -1) {
        if (isCollection && !data[existingPlayerIndex].preferences.includes(role)) {
            data[existingPlayerIndex].preferences.push(role);
        } else if (!isCollection) {
            const roleIndex = data[existingPlayerIndex].preferences.indexOf(role);
            if (roleIndex !== -1) {
                data[existingPlayerIndex].preferences.splice(roleIndex, 1);
                if (data[existingPlayerIndex].preferences.length === 0) {
                    data.splice(existingPlayerIndex, 1);
                }
            }
        }
    } else if (isCollection) {
        data.push({ name: userTag, preferences: [role] });
    }
};

exports.handleReaction = handleReaction;