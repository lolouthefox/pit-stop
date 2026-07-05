import { FAMILYID_CLIENT_ID, FAMILYID_CLIENT_SECRET } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

export const load = async ({ url, cookies }) => {
	if (!url.searchParams.get('code')) {
		throw new Error('No code provided');
	}
	const code = url.searchParams.get('code');
	const response = await fetch('https://familyid.liam-cheneval.dev/api/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Basic ${btoa(FAMILYID_CLIENT_ID + ':' + FAMILYID_CLIENT_SECRET)}`
		},
		body: JSON.stringify({
			code: code,
			redirect_uri: 'https://pit-stop.liam-cheneval.dev/callback/',
			grant_type: 'authorization_code'
		})
	});
	const data = await response.json();
	cookies.set('access_token', data.access_token, { path: '/' });
	cookies.set('refresh_token', data.refresh_token, { path: '/' });
	cookies.set('expires_at', (Date.now() + data.expires_in * 1000).toString(), { path: '/' });
	redirect(307, '/');
};
