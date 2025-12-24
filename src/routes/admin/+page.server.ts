import { HARDCODED_PASSWORD } from '$lib/server/admin';
import { redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { menuItems } from '$lib/server/db/schema';

export async function load({ cookies }) {
    const passwordCookie = cookies.get('password');

    if (passwordCookie !== HARDCODED_PASSWORD) {
        cookies.delete('password', { path: '/' });
        throw redirect(307, '/admin/auth');
    }

    const items = await db.select().from(menuItems);
    return { items };
}