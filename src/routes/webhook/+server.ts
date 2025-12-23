// src/routes/api/telegram-webhook/+server.ts
export const trailingSlash = 'always';

import { json } from '@sveltejs/kit';
import { updateOrderStatus } from '$lib/server/orders';
import { closeKitchen, openKitchen } from '$lib/server/kitchenStatus.js';

export function GET() {
    console.log("Received Telegram webhook :O?!");
    return new Response('hello world', {
        headers: { 'content-type': 'text/plain; charset=utf-8' }
    });
}

export async function POST({ request }) {
    console.log("Received Telegram webhook");
    const update = await request.json();

    // Check if this is a button click (callback_query)
    if (update.callback_query) {
        const data = update.callback_query.data; // e.g., "status_123_preparing"
        if (data.split('_')[0] == 'status') {
            const [_, orderId, newStatus] = data.split('_');

            // 1. Update your Database
            await updateOrderStatus(orderId, newStatus);
            console.log(`Order status updated to ${newStatus}`);

            // 2. Acknowledge the click to Telegram (stops the loading spinner on the button)
            return json({
                method: 'answerCallbackQuery',
                callback_query_id: update.callback_query.id,
                text: `Order status updated to ${newStatus}!`
            });
        }
        if (data === 'close_kitchen' || data === 'open_kitchen') {
            // Handle kitchen open/close logic here
            console.log(`Kitchen status changed: ${data}`);

            if (data === 'close_kitchen') {
                // Logic to close the kitchen
                closeKitchen();
            } else {
                // Logic to open the kitchen
                openKitchen();
            }

            return json({
                method: 'answerCallbackQuery',
                callback_query_id: update.callback_query.id,
                text: `Kitchen status changed: ${data.replace('_', ' ')}!`
            });
        }
    }

    return json({ status: 'ok' });
}