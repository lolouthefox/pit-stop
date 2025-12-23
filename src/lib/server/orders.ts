// Order status management functions
import { promises as fs } from 'fs';

export async function updateOrderStatus(orderId: string, status: string) {
    // Simple JSON file "database" update
    const dir = `${process.cwd()}/src/data`;
    const dbPath = `${dir}/orders.json`;

    try {
        await fs.mkdir(dir, { recursive: true });

        let db: Record<string, any> = {};
        try {
            const raw = await fs.readFile(dbPath, 'utf8');
            db = raw ? JSON.parse(raw) : {};
        } catch (err: any) {
            if (err.code !== 'ENOENT') throw err; // ignore missing file
        }

        db[orderId] = {
            status,
            updatedAt: new Date().toISOString()
        };

        await fs.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf8');
        console.log(`Updated order ${orderId} to status ${status} in ${dbPath}`);
        return db[orderId];
    } catch (err) {
        console.error('Failed to update order status:', err);
        throw err;
    }
}

export async function getOrderStatus(orderId: string) {
    const dir = `${process.cwd()}/src/data`;
    const dbPath = `${dir}/orders.json`;

    try {
        const raw = await fs.readFile(dbPath, 'utf8');
        const db = raw ? JSON.parse(raw) : {};
        return db[orderId] || null;
    } catch (err: any) {
        if (err.code === 'ENOENT') {
            return null; // file doesn't exist yet
        }
        console.error('Failed to get order status:', err);
        throw err;
    }
}
