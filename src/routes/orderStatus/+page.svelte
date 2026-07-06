<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';

	let status: string = $state('Chargement...');
	let orderStatuses: Array<{ id: string; status: string; updatedAt?: string }> = $state([]);

	async function fetchOrderStatuses() {
		try {
			const response = await fetch('/api/orderStatus');
			if (response.ok) {
				orderStatuses = await response.json();
				status = 'Chargé';
			} else {
				status = 'Erreur lors du chargement des statuts';
			}
		} catch (e) {
			console.error('unable to fetch order statuses', e);
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
				{:else if order.status == 'cancelled'}
					<div class="flex w-fit rounded-full bg-red-100 p-2 pr-4 pl-4 text-red-800">
						{traductions[order.status]}
					</div>
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
			goto(resolve('/'));
		}}
	>
		⬅️ Retour au menu
	</button>
{/snippet}
