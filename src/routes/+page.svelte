<script lang="ts">
	import { enhance } from '$app/forms';
	import IconButton from '$lib/comps/IconButton.svelte';
	import { categories } from '$lib/deliveryAddresses';
	import CategoryTabs from '$lib/comps/CategoryTabs.svelte';
	import { type MenuItem } from '$lib/menu';
	import { onMount } from 'svelte';
	import { type OrderItem } from './+page.server';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import Header from '$lib/comps/Header.svelte';
	import Featurette from '$lib/comps/Featurette.svelte';

	let cooking = $state(false);
	let { form, data } = $props();

	let order: OrderItem[] = $state([]);
	let menu: MenuItem[] = $derived(data.menu ?? []);
	const categoryTabs = $derived(Array.from(new Set(menu.map((item) => item.category))));
	let selectedCategory: string = $state('ALL');
	const filteredMenu = $derived(
		selectedCategory === 'ALL' ? menu : menu.filter((item) => item.category === selectedCategory)
	);

	$effect(() => {
		if (form?.orderId) {
			const key = 'orderIds';
			try {
				// ensure localStorage is available (SSR guard)
				if (typeof localStorage !== 'undefined') {
					const raw = localStorage.getItem(key);
					const ids: string[] = raw ? JSON.parse(raw) : [];
					const id = String(form.orderId);
					if (!ids.includes(id)) {
						ids.push(id);
						localStorage.setItem(key, JSON.stringify(ids));
					}
				}
			} catch (e) {
				console.error('unable to update localStorage orderIds', e);
			}
		}
	});

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
		// Pick a random menu item on the client.
		if (menu.length > 0) {
			const idx = Math.floor(Math.random() * menu.length);
			featuredItem = menu[idx];
		}
	});
</script>

<svelte:head>
	<title>Menu - Pit Stop</title>
</svelte:head>

{#if kitchenOpen === false}
	<div class="z-50 flex h-screen flex-col items-center justify-center gap-4 p-4 text-center">
		<span class="text-5xl">🍳</span>
		<span>La cuisine est fermée !</span>
	</div>
{:else}
	<Header />

	{#if data.flags.featurette}
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
	<div class="flex flex-col">
		{#each filteredMenu as item (item.id)}
			<div
				class="items-center overflow-hidden border-b border-black/10 p-2 {item.unavailable
					? 'opacity-50 grayscale-100'
					: ''}"
			>
				<div class="flex items-center gap-4 bg-white/75 p-4">
					<img
						src={item.image}
						alt={item.name}
						class="h-14 w-14 rounded-sm object-cover object-center"
					/>
					<div class="flex flex-1 flex-col justify-center">
						<span class="text-base font-bold">{item.name}</span>
						<span class="text-xs text-black/75"
							>{item.unavailable ? 'INDISPONIBLE' : item.desc}</span
						>
					</div>
					{#if isInCart(item)}
						{@const cartItem = isInCart(item)}
						<div class="flex items-center justify-center gap-4">
							<IconButton
								onclick={() => {
									addToCart(item);
								}}>➕</IconButton
							>
							{cartItem ? cartItem.amount : '?'}
							<IconButton
								onclick={() => {
									removeFromCart(item);
								}}>➖</IconButton
							>
						</div>
					{:else}
						<IconButton
							disabled={item.unavailable}
							onclick={() => {
								addToCart(item);
							}}>{item.unavailable ? '❌' : '🛒'}</IconButton
						>
					{/if}
				</div>
			</div>
		{/each}
		<form
			method="POST"
			class="flex flex-col gap-2 p-4 pb-2"
			use:enhance={() => {
				cooking = true;
				return async ({ update }) => {
					await update();
					order = [];
					cooking = false;
					if (
						confirm(
							'Envoyé!\nVotre commande à été envoyé au chefs!\n\nVoulez-vous suivre votre livraison?'
						)
					) {
						goto(resolve('/orderStatus'));
					}
				};
			}}
		>
			{#if order.length >= 1}
				<code class="mt-4 mb-4 rounded-2xl border bg-black/5 p-4">
					===== VOTRE COMMANDE =====
					<br />
					{order.length === 1 ? 'Article' : 'Articles'} dans votre commande:
					{#each order as item, i (i)}
						{#each menu.filter((menuItem) => menuItem.id === item.itemId) as menuItem (menuItem.id)}
							<br />
							- {item.amount}x {menuItem.name}
						{/each}
					{/each}
					<br />
					----
					<br />
					TOTAL: {order.length}
					<br />
					==========================
				</code>
			{/if}
			<input type="hidden" name="order" value={JSON.stringify(order)} />
			<input type="text" name="username" placeholder="Prénom" class="rounded-2xl p-4" />

			<select name="delivery" class="rounded-2xl p-4" placeholder="Livraison...">
				<option disabled={true}>Livraison...</option>
				{#each categories as category, i (i)}
					<optgroup label={category.name}>
						{#each category.addresses as addresse, j (j)}
							<option value={addresse.value}>{addresse.name}</option>
						{/each}
					</optgroup>
				{/each}
			</select>

			<input
				disabled={cooking}
				type="submit"
				value={cooking ? '📩 Acheminement...' : '🧑‍🍳 Envoyer en cuisine'}
				class="rounded-2xl bg-red-800 p-4 text-white disabled:opacity-50 disabled:grayscale-100"
			/>
		</form>
		<div class="px-4">
			<button
				class="w-full rounded-2xl bg-red-800 p-4 text-white disabled:opacity-50 disabled:grayscale-100"
				onclick={() => {
					order = [];
				}}
				disabled={order.length === 0}
			>
				Annuler la commande
			</button>
			<a
				href={resolve('/admin')}
				class="my-8 flex justify-center rounded-2xl border border-red-800 bg-red-100 p-4 disabled:opacity-50 disabled:grayscale-100"
				>🔐 Administrateur</a
			>
		</div>
	</div>
{/if}
