<script lang="ts">
	import { enhance } from '$app/forms';
	import IconButton from '$lib/comps/IconButton.svelte';
	import { categories } from '$lib/deliveryAddresses';
	import { menu, type MenuItem } from '$lib/menu';
	import { type OrderItem } from './+page.server';

	let cooking = $state(false);
	let { form } = $props();
	let order: OrderItem[] = $state([]);

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
</script>

<div class="flex flex-col gap-2 p-4">
	{#each menu as item}
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
	<a
		href="/orderStatus"
		class="flex justify-center rounded-2xl bg-blue-800 p-4 text-white disabled:opacity-50 disabled:grayscale-100"
		>🚚 Voir le statut des commandes</a
	>
</div>
