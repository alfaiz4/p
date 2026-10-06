'use strict';

function filterConnectedPairs(sessions, getClient) {
    if (!Array.isArray(sessions) || typeof getClient !== 'function') return [];

    return sessions.filter(pair => (
        pair?.connected === true && !!getClient(pair.number)
    ));
}

module.exports = {
    filterConnectedPairs
};
