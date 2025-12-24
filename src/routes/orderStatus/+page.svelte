<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let status: string = $state('Chargement...');
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
					status = 'Chargé';
				} else {
					status = 'Erreur lors du chargement des statuts';
				}
			} else {
				status = 'Aucune commande trouvée';
			}
		} catch (e) {
			console.error('unable to read localStorage orderIds', e);
			status = 'Erreur lors de la lecture des commandes';
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

	function removeOrderId(orderId: string) {
		const key = 'orderIds';
		try {
			const raw = localStorage.getItem(key);
			let ids = raw ? JSON.parse(raw) : [];

			// Remove the specified orderId
			ids = ids.filter((id: string) => id !== orderId);

			// Update localStorage
			localStorage.setItem(key, JSON.stringify(ids));
			orderIds = ids; // Update the orderIds state

			location.reload();
		} catch (e) {
			console.error('unable to remove orderId from localStorage', e);
		}
	}
</script>

{#if orderStatuses.length > 0}
	<div class="m-4 flex flex-col gap-4">
		<div class="flex w-full justify-center">
			{@render goBackButton()}
		</div>
		{#each orderStatuses as order, i (order.id)}
			<div class="flex flex-col gap-2 rounded-2xl border border-black/25 p-4 shadow-md">
				<div><strong>Livraison {i + 1}</strong></div>
				{#if order.status == 'done'}
					<div class="flex w-fit rounded-full bg-green-100 p-2 pr-4 pl-4 text-green-800">
						{traductions[order.status]}
					</div>
					<button
						class="rounded-full bg-red-800 p-2 text-red-200"
						onclick={() => removeOrderId(order.id)}>Supprimer</button
					>
				{:else if order.status == 'cancelled'}
					<div class="flex w-fit rounded-full bg-red-100 p-2 pr-4 pl-4 text-red-800">
						{traductions[order.status]}
					</div>
					<button
						class="rounded-full bg-red-800 p-2 text-red-200"
						onclick={() => removeOrderId(order.id)}>Supprimer</button
					>
				{:else}
					<div class="flex w-fit rounded-full bg-amber-100 p-2 pr-4 pl-4 text-amber-800">
						{traductions[order.status]}
					</div>
				{/if}
			</div>
		{/each}
	</div>
{:else}
	<div class="flex h-screen flex-col items-center justify-center gap-4 p-4 text-center">
		<span class="text-5xl">🍳</span>
		<span>{status}</span>
		{@render goBackButton()}
	</div>
{/if}

{#snippet goBackButton()}
	<button
		class="rounded-full bg-red-800 px-4 py-2 font-semibold text-white disabled:opacity-50 disabled:grayscale-100"
		onclick={() => {
			goto('/');
		}}
	>
		⬅️ Retour au menu
	</button>
{/snippet}
