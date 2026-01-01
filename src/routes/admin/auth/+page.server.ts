import { ADMIN_PASSWORD } from '$env/static/private';
import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
    const password = cookies.get('password');
    if (password === ADMIN_PASSWORD) {
        redirect(308, '/admin');
    }
};

export const actions = {
    default: async ({ request, cookies }) => {
        const data = await request.formData();
        const password = data.get('password');

        if (password === ADMIN_PASSWORD) {
            console.log('Admin logged in successfully');
            cookies.set('password', password, { path: '/' });
            redirect(308, '/admin');
        } else {
            console.log('Admin failed to log in');
        }

        return fail(401, { error: 'Invalid password' });
    }
};
