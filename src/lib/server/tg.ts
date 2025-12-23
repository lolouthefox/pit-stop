// src/lib/server/telegram.ts
import { TELEGRAM_BOT_TOKEN, MY_CHAT_ID } from '$env/static/private';

/**
 * Sends a message to your private Telegram chat.
 * @param text - The message content (supports HTML)
 */
export async function sendMessage(text: string, orderId: string | null = null) {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    await setWebhook('https://pit-stop.liam-cheneval.dev');

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: MY_CHAT_ID,
                text: text,
                parse_mode: 'HTML',
                reply_markup: !orderId ? {
                    inline_keyboard:
                        [[
                            { text: '❌ Fermer', callback_data: `close_kitchen` },
                            { text: '🟢 Ouvrir', callback_data: `open_kitchen` }
                        ]]
                } : {
                    inline_keyboard: [
                        [
                            { text: '👨‍🍳 En préparation', callback_data: `status_${orderId}_preparing` },
                            { text: '🚚 En livraison', callback_data: `status_${orderId}_delivering` }
                        ],
                        [
                            { text: '✅ Livré', callback_data: `status_${orderId}_done` }
                        ]
                    ]
                }
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Telegram API Error:', errorData);
            return { success: false, error: errorData.description };
        }

        return { success: true };
    } catch (err) {
        console.error('Fetch Error:', err);
        return { success: false, error: 'Network failure' };
    }
}

export async function setWebhook(domain: string): Promise<{ success: boolean; error?: string; result?: any }> {
    const cleaned = domain.replace(/\/+$/, '');
    const webhookUrl = `${cleaned}/webhook/`;
    console.log('Setting webhook to:', webhookUrl);
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/setWebhook`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: webhookUrl })
        });

        const data = await response.json();

        if (!response.ok || !data.ok) {
            console.error('Telegram setWebhook Error:', data);
            return { success: false, error: data.description ?? 'Failed to set webhook' };
        }

        return { success: true, result: data.result };
    } catch (err) {
        console.error('Fetch Error:', err);
        return { success: false, error: 'Network failure' };
    }
}
