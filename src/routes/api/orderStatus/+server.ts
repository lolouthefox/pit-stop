import type { RequestHandler } from '@sveltejs/kit';
import { getUserId } from '$lib/familyid';
import { orders as ordersTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';

export const GET: RequestHandler = async ({ cookies }) => {
	const token = cookies.get('access_token');
	if (!token) {
		return new Response(JSON.stringify({ error: 'Unauthorized' }), {
			status: 401,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	const id = await getUserId(token);
	const orders = await db.select().from(ordersTable).where(eq(ordersTable.userId, id));
	return Response.json(orders);
};
