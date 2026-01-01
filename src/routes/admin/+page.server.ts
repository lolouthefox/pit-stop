import { redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { menuItems } from '$lib/server/db/schema';
import { ADMIN_PASSWORD } from '$env/static/private';

export async function load({ cookies }) {
    const passwordCookie = cookies.get('password');

    if (passwordCookie !== ADMIN_PASSWORD) {
        cookies.delete('password', { path: '/' });
        throw redirect(308, '/admin/auth');
    }

    const items = await db.select().from(menuItems);
    return { items };
}