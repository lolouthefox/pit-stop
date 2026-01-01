import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { menuItems } from '$lib/server/db/schema';
import { ADMIN_PASSWORD } from "$env/static/private";

export const GET: RequestHandler = async ({ cookies }) => {
    const passwordCookie = cookies.get('password');
    if (passwordCookie !== ADMIN_PASSWORD) {
        cookies.delete('password', { path: '/' });
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    const items = await db.select().from(menuItems);
    return json({ items });
};
