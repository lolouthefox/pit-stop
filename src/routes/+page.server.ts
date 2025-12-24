import type { Actions } from './$types';
import { sendMessage } from '$lib/server/tg';
import { v4 as uuidv4 } from 'uuid';
import type { PageServerLoad } from './$types';
import { getKitchenStatus } from '$lib/server/kitchenStatus';
import { db } from '$lib/server/db';
import { menuItems } from '$lib/server/db/schema';

export interface OrderItem {
    itemId: string;
    amount: number;
}

export const load: PageServerLoad = async () => {
    const kitchenStatus = await getKitchenStatus();
    const items = await db.select().from(menuItems);

    const menu = items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        category: item.category,
        desc: item.description,
        image: item.imageUrl
    }));

    return { kitchenStatus, menu };
};

export const actions: Actions = {
    default: async ({ request }) => {
        const data = await request.formData();

        const username = String(data.get('username') ?? 'Unknown');
        const delivery = String(data.get('delivery') ?? 'Unknown');
        const orderRaw = String(data.get('order') ?? []);
        const order: OrderItem[] = JSON.parse(orderRaw);

        const time = `${new Date().getHours()}h${new Date().getMinutes()}`;

        let text = `<b>From:</b> ${escapeHtml(username)}\n`;
        text += `<b>Delivery:</b> ${escapeHtml(delivery)}\n`;
        text += `<b>Time:</b> ${escapeHtml(time)}\n\n`;
        text += `<b>Items:</b>\n`;

        for (let i = 0; i < order.length; i++) {
            const element = order[i];
            text += `${element.amount}x <i>${escapeHtml(element.itemId)}</i>\n`;
        }

        let orderId: string = uuidv4();
        const res = await sendMessage(text, orderId);

        if (!res || !res.success) {
            return { success: false, error: res?.error ?? 'failed' };
        }

        return { success: true, orderId };
    }
};

function escapeHtml(s: string) {
    return s
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;');
}
