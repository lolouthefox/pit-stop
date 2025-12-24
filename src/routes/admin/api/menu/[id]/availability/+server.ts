import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { HARDCODED_PASSWORD } from '$lib/server/admin';
import { db } from '$lib/server/db';
import { menuItems } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const POST: RequestHandler = async ({ cookies, params, request }) => {
    const passwordCookie = cookies.get('password');
    if (passwordCookie !== HARDCODED_PASSWORD) {
        cookies.delete('password', { path: '/' });
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    const id = params.id;
    if (!id) {
        return json({ error: 'Missing menu item id' }, { status: 400 });
    }

    const body = await request.json().catch(() => null);
    if (!body || typeof body.unavailable !== 'boolean') {
        return json({ error: 'Body must include { unavailable: boolean }' }, { status: 400 });
    }

    const updated = await db
        .update(menuItems)
        .set({ unavailable: body.unavailable })
        .where(eq(menuItems.id, id))
        .returning();

    if (updated.length === 0) {
        return json({ error: 'Menu item not found' }, { status: 404 });
    }

    return json({ item: updated[0] });
};
