const createProgressBar = (percentage) => {
    const total = 10;
    const filled = Math.round((percentage / 100) * total);
    return '▰'.repeat(filled) + '▱'.repeat(total - filled);
};

function createProgressText(platform, title, percentage, status, footer) {
    const bar = createProgressBar(percentage);
    const levelText = percentage === 100 ? '✅ Selesai' : `⚙️ ${status}`;
    const openCode = platform === 'Telegram' ? '```css' : '```';

    return [
        openCode,
        title,
        ` ${levelText} (${percentage}%)`,
        ` ${bar}`,
        '```',
        footer
    ].join('\n');
}

async function editProgressMessage(client, chatId, platform, message, text) {
    if (!message) return null;

    if (platform === 'Telegram' && typeof client.editMessage === 'function') {
        return client.editMessage(chatId, message, text, { parse_mode: 'Markdown' });
    }

    if (message.key && typeof client.sendMessage === 'function') {
        return client.sendMessage(chatId, {
            text,
            edit: message.key
        });
    }

    return null;
}

async function updateProgress(client, chatId, platform, message, percentage, status, options = {}) {
    const title = options.title || 'Hexone ☠️';
    const footer = options.footer || 'proses hexone by lynz x arga';
    const text = createProgressText(platform, title, percentage, status, footer);

    try {
        await editProgressMessage(client, chatId, platform, message, text);
        await new Promise(r => setTimeout(r, Math.min(800, percentage * 8)));
    } catch {}

    return text;
}

module.exports = {
    createProgressBar,
    createProgressText,
    editProgressMessage,
    updateProgress
};
