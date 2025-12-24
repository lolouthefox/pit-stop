import { sendMessage } from "$lib/server/tg";
import { db } from "$lib/server/db";
import { kitchenStatus } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";


export async function openKitchen() {
    await db.insert(kitchenStatus)
        .values({ id: 1, isOpen: true, updatedAt: new Date() })
        .onConflictDoUpdate({
            target: kitchenStatus.id,
            set: { isOpen: true, updatedAt: new Date() }
        });
}

export async function closeKitchen() {
    await db.insert(kitchenStatus)
        .values({ id: 1, isOpen: false, updatedAt: new Date() })
        .onConflictDoUpdate({
            target: kitchenStatus.id,
            set: { isOpen: false, updatedAt: new Date() }
        });
}

export async function getKitchenStatus() {
    const result = await db.select()
        .from(kitchenStatus)
        .where(eq(kitchenStatus.id, 1))
        .limit(1);

    if (result.length === 0) {
        // Initialize with closed status if no record exists
        await db.insert(kitchenStatus)
            .values({ id: 1, isOpen: false, updatedAt: new Date() });
        return 'closed';
    }

    return result[0].isOpen ? 'open' : 'closed';
}

export async function sendStatusMessage() {
    await sendMessage("Server Démarré. N'oubliez pas d'ouvrir la cuisine!");
}

