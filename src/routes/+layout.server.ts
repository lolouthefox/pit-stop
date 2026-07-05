import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { flags as flagsTable } from '$lib/server/db/schema';

export const load: PageServerLoad = async () => {
	const flagsList = await db.select().from(flagsTable);
	const flags: Record<string, boolean> = {};
	flagsList.forEach((flag) => {
		flags[flag.id] = flag.enabled;
	});
	return { flags };
};
