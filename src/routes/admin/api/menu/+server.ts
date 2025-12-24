import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { HARDCODED_PASSWORD } from '$lib/server/admin';
import { db } from '$lib/server/db';
import { menuItems } from '$lib/server/db/schema';

export const GET: RequestHandler = async ({ cookies }) => {
    const passwordCookie = cookies.get('password');
    if (passwordCookie !== HARDCODED_PASSWORD) {
        cookies.delete('password', { path: '/' });
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    const items = await db.select().from(menuItems);
    return json({ items });
};
