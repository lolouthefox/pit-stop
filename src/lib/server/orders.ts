// Order status management functions using Drizzle
import { db } from '$lib/server/db';
import { orders } from '$lib/server/db/schema';
import { eq, inArray, lt, and } from 'drizzle-orm';

const FINISHED_STATUSES = ['completed', 'cancelled'];
const TEN_MINUTES_MS = 10 * 60 * 1000;

async function cleanupFinishedOrders() {
    const cutoff = new Date(Date.now() - TEN_MINUTES_MS);
    await db.delete(orders).where(
        and(inArray(orders.status, FINISHED_STATUSES), lt(orders.updatedAt, cutoff))
    );
}

export async function updateOrderStatus(orderId: string, status: string) {
    await db
        .insert(orders)
        .values({ id: orderId, status, updatedAt: new Date() })
        .onConflictDoUpdate({ target: orders.id, set: { status, updatedAt: new Date() } });

    await cleanupFinishedOrders();

    return { id: orderId, status };
}

export async function getOrderStatus(orderId: string) {
    const result = await db.select().from(orders).where(eq(orders.id, orderId)).limit(1);

    await cleanupFinishedOrders();

    return result[0] ?? null;
}
