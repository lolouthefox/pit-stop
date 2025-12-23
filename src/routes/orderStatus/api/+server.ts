import type { RequestHandler } from '@sveltejs/kit';
import { getOrderStatus } from '$lib/server/orders';

export const GET: RequestHandler = async ({ url }) => {
    // Accept either repeated `?id=1&id=2` or comma-separated `?ids=1,2`
    const repeated = url.searchParams.getAll('id');
    const comma = url.searchParams.get('ids');
    let ids: string[] = [];

    if (repeated.length) ids = repeated;
    else if (comma) ids = comma.split(',').map((s) => s.trim()).filter(Boolean);

    if (!ids.length) {
        return new Response(JSON.stringify({ error: 'Provide ids via ?id=... or ?ids=...' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const payload = await Promise.all(
        ids.map(async (id) => {
            const orderData = await getOrderStatus(id);
            return {
                id,
                status: orderData?.status || 'pending',
                updatedAt: orderData?.updatedAt
            };
        })
    );

    return new Response(JSON.stringify(payload), { headers: { 'Content-Type': 'application/json' } });
};