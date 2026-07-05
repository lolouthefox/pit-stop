<script lang="ts">
	let { featuredItem, isInCart, removeFromCart, addToCart } = $props();
</script>

<div
	class="m-4 overflow-hidden rounded-2xl bg-cover bg-center shadow-lg"
	style={`background-image: url('${featuredItem?.image ?? '/assets/ferrero.webp'}');`}
>
	<div class="flex h-full flex-col gap-4 bg-white/75 p-4 backdrop-blur-md">
		<img
			src={featuredItem?.image}
			alt={featuredItem?.name ?? 'Chargement...'}
			class="mb-2 h-40 w-40 rounded-lg object-cover object-center"
		/>
		<div class="flex w-full gap-4">
			<div class="flex flex-1 flex-col justify-center">
				<span class="text-xl font-bold">Pour vous...</span>
				<span class="text-md text-black/75">
					{#if featuredItem}
						{featuredItem.name}
					{:else}
						Chargement...
					{/if}
				</span>
			</div>
			<button
				class="rounded-full bg-red-800 px-4 py-2 font-semibold text-white disabled:opacity-50 disabled:grayscale-100"
				disabled={!featuredItem || featuredItem.unavailable}
				onclick={() => {
					if (featuredItem) {
						if (isInCart(featuredItem)) {
							removeFromCart(featuredItem);
						} else {
							addToCart(featuredItem);
						}
					}
				}}
			>
				{#if featuredItem}
					{@const cartItem = isInCart(featuredItem)}
					{cartItem
						? `Retirer (${cartItem.amount})`
						: featuredItem.unavailable
							? 'Indisponible'
							: 'Ajouter au panier'}
				{:else}
					Chargement...
				{/if}
			</button>
		</div>
	</div>
</div>
