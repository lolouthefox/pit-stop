<script lang="ts">
	import { enhance } from '$app/forms';
	import IconButton from '$lib/comps/IconButton.svelte';
	import { categories } from '$lib/deliveryAddresses';
	import { MenuCategory, menu, type MenuItem } from '$lib/menu';
	import { onMount } from 'svelte';
	import { type OrderItem } from './+page.server';

	let cooking = $state(false);
	let { form, data } = $props();
	let order: OrderItem[] = $state([]);
	const categoryTabs = Object.values(MenuCategory);
	let selectedCategory: 'ALL' | MenuCategory = $state('ALL');
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

	let kitchenOpen = $derived(false);
	onMount(async () => {
		const res = await fetch('/api/kitchenStatus');
		if (res.ok) {
			const data = await res.json();
			kitchenOpen = data.status === 'open';
		} else {
			kitchenOpen = false;
		}
	});
</script>

{#if kitchenOpen === false}
	<div class="flex h-screen flex-col items-center justify-center gap-4 p-4 text-center">
		<span class="text-5xl">🍳</span>
		<span>La cuisine est fermé!</span>
	</div>
{:else}
	<div class="flex flex-col gap-2 p-4">
		<div
			class="sticky top-0 z-10 -mx-4 -mt-4 mb-2 flex gap-2 overflow-x-auto bg-white/85 px-4 py-3 backdrop-blur"
		>
			<button
				type="button"
				onclick={() => {
					selectedCategory = 'ALL';
				}}
				class={`rounded-full px-3 py-2 text-sm font-semibold whitespace-nowrap shadow-sm transition ${selectedCategory === 'ALL' ? 'bg-blue-800 text-white' : 'bg-white text-black/70 ring-1 ring-black/10'}`}
			>
				Tout
			</button>
			{#each categoryTabs as tab}
				<button
					type="button"
					onclick={() => {
						selectedCategory = tab;
					}}
					class={`rounded-full px-3 py-2 text-sm font-semibold whitespace-nowrap shadow-sm transition ${selectedCategory === tab ? 'bg-blue-800 text-white' : 'bg-white text-black/70 ring-1 ring-black/10'}`}
				>
					{tab}
				</button>
			{/each}
		</div>
		{#each filteredMenu as item}
			<div
				class="items-center overflow-hidden rounded-2xl bg-cover bg-center"
				style="background-image: url('{item.image}');"
			>
				<div class="flex items-center gap-4 bg-white/75 p-4 backdrop-blur-2xl">
					<img
						src={item.image}
						alt={item.name}
						class="h-14 w-14 rounded-sm object-cover object-center"
					/>
					<div class="flex flex-1 flex-col justify-center">
						<span class="text-base font-bold">{item.name}</span>
						<span class="text-xs text-black/75">{item.desc}</span>
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
							onclick={() => {
								addToCart(item);
							}}>🛒</IconButton
						>
					{/if}
				</div>
			</div>
		{/each}
		<form
			method="POST"
			class="flex flex-col gap-2"
			use:enhance={() => {
				cooking = true;
				return async ({ update }) => {
					await update();
					order = [];
					cooking = false;
					alert('Envoyé!\nVotre commande à été envoyé au chefs!');
				};
			}}
		>
			{#if order.length >= 1}
				<code class="mt-4 mb-4 rounded-2xl border bg-black/5 p-4">
					===== VOTRE COMMANDE =====
					<br />
					{order.length === 1 ? 'Article' : 'Articles'} dans votre commande:
					{#each order as item}
						{#each menu.filter((menuItem) => menuItem.id === item.itemId) as menuItem}
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
				{#each categories as category}
					<optgroup label={category.name}>
						{#each category.addresses as addresse}
							<option value={addresse.value}>{addresse.name}</option>
						{/each}
					</optgroup>
				{/each}
			</select>

			<input
				disabled={cooking}
				type="submit"
				value={cooking ? '📩 Acheminement...' : '🧑‍🍳 Envoyer en cuisine'}
				class="rounded-2xl bg-blue-800 p-4 text-white disabled:opacity-50 disabled:grayscale-100"
			/>
		</form>
		<button
			class="rounded-2xl bg-red-800 p-4 text-white disabled:opacity-50 disabled:grayscale-100"
			onclick={() => {
				order = [];
			}}
			disabled={order.length === 0}
		>
			Annuler la commande
		</button>
		<a
			href="/orderStatus"
			class="mt-4 flex justify-center rounded-2xl bg-blue-800 p-4 text-white disabled:opacity-50 disabled:grayscale-100"
			>🚚 Voir le statut des commandes</a
		>
	</div>
{/if}
