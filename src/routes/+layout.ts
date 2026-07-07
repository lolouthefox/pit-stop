import posthog from 'posthog-js';
import { browser } from '$app/environment';

export const load = async () => {
	if (browser) {
		posthog.init('phc_oed2GS28c7B6dqjVubmMd4JLBnncT5kMtNfOuBSFTy1', {
			api_host: 'https://eu.i.posthog.com',
			defaults: '2026-05-30'
		});
	}

	return;
};
