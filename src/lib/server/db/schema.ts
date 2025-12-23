import { pgTable, text, timestamp, boolean, integer } from 'drizzle-orm/pg-core';

export const orders = pgTable('orders', {
    id: text('id').primaryKey(),
    status: text('status').notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow()
});

export const kitchenStatus = pgTable('kitchen_status', {
    id: integer('id').primaryKey().default(1),
    isOpen: boolean('is_open').notNull().default(false),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow()
});
