import type { RequestHandler } from '@sveltejs/kit';
import { getKitchenStatus, openKitchen, closeKitchen } from '$lib/server/kitchenStatus';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
    const status = await getKitchenStatus();
    return json({ status });
};

export const POST: RequestHandler = async ({ request }) => {
    const { action } = await request.json();

    if (action === 'open') {
        await openKitchen();
        return json({ status: 'open' });
    } else if (action === 'close') {
        await closeKitchen();
        return json({ status: 'closed' });
    }

    return json({ error: 'Invalid action. Use "open" or "close".' }, { status: 400 });
};
