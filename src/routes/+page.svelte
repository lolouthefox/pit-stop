<script lang="ts">
	import rooms, { getImageFromValue } from '$lib/deliveryAddresses';
	import CategoryTabs from '$lib/comps/CategoryTabs.svelte';
	import { type MenuItem } from '$lib/menu';
	import { onMount } from 'svelte';
	import { type OrderItem } from './+page.server';
	import Header from '$lib/comps/Header.svelte';
	import Featurette from '$lib/comps/Featurette.svelte';
	import HorizontalItem from '$lib/comps/HorizontalItem.svelte';
	import GridItem from '$lib/comps/GridItem.svelte';
	import posthog from 'posthog-js';
	import { browser } from '$app/environment';
	import { statusTraductions } from '$lib/deliveryStatus.js';

	let delivery: string = $state('');
	let cooking = $state(false);
	let cartStep: 'review' | 'delivery' | 'complete' = $state('review');
	let { data } = $props();

	// Feature flags
	let showFeaturette: boolean | undefined = $state(false);

	let order: OrderItem[] = $state([]);
	let menu: MenuItem[] = $derived(data.menu ?? []);
	const categoryTabs = $derived(Array.from(new Set(menu.map((item) => item.category))));
	let selectedCategory: string = $state('ALL');
	const filteredMenu = $derived(
		selectedCategory === 'ALL' ? menu : menu.filter((item) => item.category === selectedCategory)
	);
	let showCart = $state(false);

	async function sendCart() {
		cooking = true;
		try {
			const response = await fetch('/api/order', {
				method: 'POST',
				body: JSON.stringify({
					order,
					delivery,
					username: data.profile.username,
					userId: data.profile.id
				})
			});
			if (!response.ok) {
				alert("Impossible d'envoyer le panier.");
			}
			showCart = false;
			order = [];
			alert('Commande passé avec succès!');
		} catch (e) {
			alert("Impossible d'envoyer le panier:\n" + e);
		} finally {
			cooking = false;
		}
	}

	/** Add an item to cart. */
	function addToCart(item: MenuItem) {
		// Add one to item
		for (let i = 0; i < order.length; i++) {
			const element = order[i];
			if (element.itemId == item.id) {
				element.amount += 1;
				return;
			}
		}

		// Otherwise push a new one
		order.push({
			itemId: item.id,
			amount: 1
		});
	}

	/** Remove an item from cart. */
	function removeFromCart(item: MenuItem) {
		// Remove one to item
		for (let i = 0; i < order.length; i++) {
			const element = order[i];
			if (element.itemId == item.id) {
				element.amount -= 1;
			}
			if (element.amount <= 0) {
				order.splice(i, 1);
				order = [...order];
			}
		}
	}

	/** Get cart item or false. */
	function isInCart(item: MenuItem): false | OrderItem {
		for (let i = 0; i < order.length; i++) {
			const element = order[i];
			if (element.itemId == item.id) {
				return element;
			}
		}
		return false;
	}

	let kitchenOpen: boolean = $derived(data.kitchenStatus === 'open' ? true : false);
	let featuredItem: MenuItem | null = $state(null);
	onMount(async () => {
		// Load feature flags
		if (browser) {
			showFeaturette = posthog.isFeatureEnabled('featurette');
			console.log('Show the featurette: ' + showFeaturette);
		}

		// Pick a random menu item on the client.
		if (menu.length > 0) {
			const idx = Math.floor(Math.random() * menu.length);
			featuredItem = menu[idx];
		}
	});

	// Delivery Status
	let orderStatusesLoading: string = $state('Chargement...');
	let orderStatuses: Array<{ id: string; status: string; updatedAt?: string }> = $state([]);
	let currentOrderStatus: { id: string; status: string; updatedAt?: string } | undefined =
		$state(undefined);
	async function fetchOrderStatuses() {
		try {
			const response = await fetch('/api/orderStatus');
			if (response.ok) {
				orderStatuses = await response.json();
				orderStatusesLoading = 'Aucune commande.';
				currentOrderStatus = orderStatuses.filter(
					(order) => order.status != 'completed' && order.status != 'cancelled'
				)[0];
			} else {
				orderStatusesLoading = 'Erreur lors du chargement des statuts';
			}
		} catch (e) {
			console.error('unable to fetch order statuses', e);
			orderStatusesLoading = 'Erreur lors de la lecture des commandes';
		}
	}

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

<svelte:head>
	<title>Menu - Pit Stop</title>
</svelte:head>

<div class="{showCart ? 'pointer-events-none' : ''} fixed inset-0 overflow-y-scroll">
	{#if kitchenOpen === false}
		<div class="z-50 flex h-screen flex-col items-center justify-center gap-4 p-4 text-center">
			<span class="text-5xl">🍳</span>
			<span>La cuisine est fermée !</span>
		</div>
	{:else}
		<Header profile={data.profile} {orderStatusesLoading} {orderStatuses} />

		{#if currentOrderStatus}
			<div class="w-full bg-red-900 p-8 text-white">
				<h1 class="text-2xl font-bold">Commande en cours</h1>
				<span>{statusTraductions[currentOrderStatus.status]}</span>
			</div>
		{/if}

		{#if showFeaturette}
			<Featurette {featuredItem} {isInCart} {removeFromCart} {addToCart} />
		{/if}

		<CategoryTabs
			categories={categoryTabs}
			selected={selectedCategory}
			onSelect={(value) => {
				selectedCategory = value;
			}}
			allLabel="Tout"
			allValue="ALL"
		/>
		<div class="mb-32 grid grid-cols-2">
			{#each filteredMenu as item (item.id)}
				<GridItem {item} {isInCart} {removeFromCart} {addToCart} />
			{/each}
			{#if order.length >= 1}
				<button
					class="fixed right-4 bottom-4 left-4 rounded-2xl bg-red-800 p-4 text-white"
					onclick={() => {
						cartStep = 'review';
						showCart = true;
					}}
				>
					Voir le panier • {order
						.map((i) => i.amount)
						.reduce((accumulator, currentValue) => accumulator + currentValue, 0)}
				</button>
			{/if}
		</div>
	{/if}
</div>

{#if showCart}
	<div class="fixed inset-0 z-50 flex flex-col gap-4 bg-white">
		<div class="flex w-full p-4">
			<button
				class="rounded-full bg-red-100 px-4 py-2 font-semibold text-red-900 disabled:opacity-50 disabled:grayscale-100"
				onclick={() => {
					showCart = false;
				}}
			>
				Fermer
			</button>
		</div>
		{#if cartStep === 'review'}
			<div class="flex-1 overflow-y-scroll">
				<div class="flex flex-col gap-4">
					{#each order as item, i (i)}
						{#each menu.filter((menuItem) => menuItem.id === item.itemId) as menuItem (menuItem.id)}
							<HorizontalItem item={menuItem} {isInCart} {removeFromCart} {addToCart} />
						{/each}
					{/each}
				</div>
			</div>
			<button
				class="mx-4 mb-4 rounded-2xl bg-red-800 p-4 text-white"
				onclick={() => {
					cartStep = 'delivery';
				}}
			>
				Suivant
			</button>
		{:else if cartStep === 'delivery'}
			<div class="flex flex-1 flex-col gap-2 p-4">
				<select
					name="delivery"
					class="rounded-2xl p-4"
					placeholder="Livraison..."
					bind:value={delivery}
				>
					<option disabled={true}>Livraison...</option>
					{#each rooms as category, i (i)}
						<optgroup label={category.name}>
							{#each category.addresses as addresse, j (j)}
								<option value={addresse.value}>{addresse.name}</option>
							{/each}
						</optgroup>
					{/each}
				</select>
				<img src={getImageFromValue(delivery)} class="w-full" alt="" />
			</div>
			<button
				class="mx-4 mb-4 rounded-2xl bg-red-800 p-4 text-white disabled:opacity-50"
				disabled={cooking || !delivery}
				onclick={() => {
					sendCart();
				}}
			>
				{cooking ? '📩 Acheminement...' : '🧑‍🍳 Envoyer en cuisine'}
			</button>
		{/if}
	</div>
{/if}
