import type { PageServerLoad } from './$types';
import { getKitchenStatus } from '$lib/server/kitchenStatus';
import { db } from '$lib/server/db';
import { menuItems } from '$lib/server/db/schema';
import { redirect } from '@sveltejs/kit';
import { getUserProfile } from '$lib/familyid';

export interface OrderItem {
	itemId: string;
	amount: number;
}

export const load: PageServerLoad = async ({ cookies }) => {
	const token = cookies.get('access_token');
	if (!token) {
		redirect(307, '/onboarding');
	}

	const profile = await getUserProfile(token);
	const kitchenStatus = await getKitchenStatus();
	const items = await db.select().from(menuItems);

	const menu = items.map((item) => ({
		id: item.id,
		name: item.name,
		price: item.price,
		category: item.category,
		desc: item.description,
		image: item.imageUrl,
		unavailable: item.unavailable
	}));

	console.log(profile);

	return { kitchenStatus, menu, profile };
};
