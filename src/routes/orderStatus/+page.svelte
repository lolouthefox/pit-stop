<script lang="ts">
	import { onMount } from 'svelte';

	let status: string = $state('Loading...');
	let orderIds: string[] = $state([]);
	let orderStatuses: Array<{ id: string; status: string; updatedAt?: string }> = $state([]);

	async function fetchOrderStatuses() {
		// Get order IDs from localStorage
		const key = 'orderIds';
		try {
			const raw = localStorage.getItem(key);
			orderIds = raw ? JSON.parse(raw) : [];

			// Fetch status for each order
			if (orderIds.length > 0) {
				const idsParam = orderIds.map((id) => `id=${id}`).join('&');
				const response = await fetch(`/orderStatus/api?${idsParam}`);
				if (response.ok) {
					orderStatuses = await response.json();
					status = 'Loaded';
				} else {
					status = 'Error loading statuses';
				}
			} else {
				status = 'No orders found';
			}
		} catch (e) {
			console.error('unable to read localStorage orderIds', e);
			status = 'Error';
		}
	}

	let traductions: Record<string, string> = {
		pending: 'En attente',
		preparing: 'Préparation en cours',
		delivering: 'Livraison en cours',
		done: 'Livré',
		cancelled: 'Annulé'
	};

	onMount(() => {
		// Fetch immediately
		fetchOrderStatuses();

		// Set up interval to fetch every second
		const interval = setInterval(fetchOrderStatuses, 1000);

		// Cleanup function
		return () => {
			clearInterval(interval);
		};
	});
</script>

{#if orderStatuses.length > 0}
	<ul>
		{#each orderStatuses as order, i (order.id)}
			<li class="p-4">
				<div><strong>Livraison {i + 1}</strong></div>
				{#if order.status == 'done'}
					<div class="flex w-fit rounded-full bg-green-100 p-2 pr-4 pl-4 text-green-800">
						{traductions[order.status]}
					</div>
				{:else if order.status == 'cancelled'}
					<div class="flex w-fit rounded-full bg-red-100 p-2 pr-4 pl-4 text-red-800">
						{traductions[order.status]}
					</div>
				{:else}
					<div class="flex w-fit rounded-full bg-amber-100 p-2 pr-4 pl-4 text-amber-800">
						{traductions[order.status]}
					</div>
				{/if}
				{#if order.updatedAt}
					<span class="text-sm opacity-50" style="font-size:0.9em;color:#666">
						Mis à jour: {new Date(order.updatedAt).toLocaleString()}
					</span>
				{/if}
			</li>
		{/each}
	</ul>
{:else}
	<p>{status}</p>
{/if}
