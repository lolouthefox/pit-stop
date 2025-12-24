import { HARDCODED_PASSWORD } from '$lib/server/admin';
import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
    const passwordCookie = cookies.get('password');

    if (passwordCookie !== HARDCODED_PASSWORD) {
        // Delete the invalid cookie
        cookies.delete('password', { path: '/' });
        // Redirect to /admin/auth
        redirect(302, '/admin/auth');
    }

    // Continue with the load function if the password is valid
    return {};
}