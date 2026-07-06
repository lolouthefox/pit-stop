import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../admin/auth/$types';
import { getUserProfile } from '$lib/familyid';

export const load: PageServerLoad = async ({ cookies }) => {
	const token = cookies.get('access_token');
	if (!token) {
		redirect(307, '/onboarding');
	}

	const profile = await getUserProfile(token);

	return { profile };
};
