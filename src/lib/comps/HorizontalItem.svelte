<script lang="ts">
	import IconButton from './IconButton.svelte';

	let { item, isInCart, removeFromCart, addToCart } = $props();
</script>

<div
	class="items-center overflow-hidden border-b border-black/10 p-2 {item.unavailable
		? 'opacity-50 grayscale-100'
		: ''}"
>
	<div class="flex items-center gap-4 bg-white/75 p-4">
		<img src={item.image} alt={item.name} class="h-14 w-14 rounded-sm object-cover object-center" />
		<div class="flex flex-1 flex-col justify-center">
			<span class="text-base font-bold">{item.name}</span>
			<span class="text-xs text-black/75">{item.unavailable ? 'INDISPONIBLE' : item.desc}</span>
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
