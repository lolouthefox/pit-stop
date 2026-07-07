import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
	cookies.delete('access_token', { path: '/' });
	cookies.delete('refresh_token', { path: '/' });
	cookies.delete('expires_at', { path: '/' });
	redirect(307, '/onboarding');
}
