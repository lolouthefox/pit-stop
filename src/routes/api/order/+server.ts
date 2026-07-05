import { sendMessage } from '$lib/server/tg';
import { v4 as uuidv4 } from 'uuid';
import { db } from '$lib/server/db';
import { menuItems } from '$lib/server/db/schema';

export interface OrderItem {
	itemId: string;
	amount: number;
}

export const POST = async ({ request }) => {
	const data = await request.json();

	const username = String(data.username ?? 'Unknown');
	const delivery = String(data.delivery ?? 'Unknown');
	const order: OrderItem[] = data.order ?? [];

	const time = new Date()
		.toLocaleString('fr-FR', {
			timeZone: 'Europe/Paris',
			hour: '2-digit',
			minute: '2-digit',
			hour12: false
		})
		.replace(':', 'h');

	let text = `<b>From:</b> ${escapeHtml(username)}\n`;
	text += `<b>Delivery:</b> ${escapeHtml(delivery)}\n`;
	text += `<b>Time:</b> ${escapeHtml(time)}\n\n`;
	text += `<b>Items:</b>\n`;

	const items = await db.select().from(menuItems);
	for (let i = 0; i < order.length; i++) {
		const itemName = items.find((item) => item.id === order[i].itemId)?.name ?? order[i].itemId;
		const element = order[i];
		text += `${element.amount}x <i>${escapeHtml(itemName)}</i>\n`;
	}

	const orderId: string = uuidv4();
	const res = await sendMessage(text, orderId);

	if (!res || !res.success) {
		return Response.json({ success: false, error: res?.error ?? 'failed' });
	}

	return Response.json({ success: true, orderId });
};

function escapeHtml(s: string) {
	return s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}
