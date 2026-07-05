export async function getUserId(access_token: string) {
	const response = await fetch('https://familyid.liam-cheneval.dev/api/openid', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `bearer ${access_token}`
		}
	});
	const data = await response.json();
	return data.userId;
}

export async function getUserProfile(access_token: string) {
	const response = await fetch('https://familyid.liam-cheneval.dev/api/profile', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `bearer ${access_token}`
		}
	});
	const data = await response.json();
	return data;
}
