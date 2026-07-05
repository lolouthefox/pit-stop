<script lang="ts">
	import IconButton from './IconButton.svelte';

	let { item, isInCart, removeFromCart, addToCart } = $props();
</script>

<div
	class="items-center overflow-hidden border-b border-black/10 p-4 odd:border-r {item.unavailable
		? 'opacity-50 grayscale-100'
		: ''}"
>
	<div class="flex h-full flex-col items-center gap-4 bg-white/75">
		<img src={item.image} alt={item.name} class="w-full rounded-sm object-cover object-center" />
		<div class="flex flex-1 flex-col justify-center">
			<span class="text-base font-bold">{item.name}</span>
			<span class="h-fill text-xs text-black/75"
				>{item.unavailable ? 'INDISPONIBLE' : item.desc}</span
			>
		</div>
		{#if isInCart(item)}
			{@const cartItem = isInCart(item)}
			<div class="flex w-full items-center justify-between">
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
			<button
				class="text-md h-10 w-full items-center justify-center rounded-full border border-red-800 bg-red-100 text-center disabled:opacity-50 disabled:grayscale-100"
				disabled={item.unavailable}
				onclick={() => {
					addToCart(item);
				}}>{item.unavailable ? '❌' : '🛒'}</button
			>
		{/if}
	</div>
</div>
