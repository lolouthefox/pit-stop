import { HARDCODED_PASSWORD } from '$lib/server/admin';
import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
    const password = cookies.get('password');
    if (password === HARDCODED_PASSWORD) {
        redirect(307, '/admin');
    }
};

export const actions = {
    default: async ({ request, cookies }) => {
        const data = await request.formData();
        const password = data.get('password');

        if (password === HARDCODED_PASSWORD) {
            console.log('Admin logged in successfully');
            cookies.set('password', password, { path: '/' });
            redirect(307, '/admin');
        } else {
            console.log('Admin failed to log in');
        }

        return fail(401, { error: 'Invalid password' });
    }
};
