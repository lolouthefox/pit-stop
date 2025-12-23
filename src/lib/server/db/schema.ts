import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const orders = pgTable('orders', {
    id: text('id').primaryKey(),
    status: text('status').notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow()
});
