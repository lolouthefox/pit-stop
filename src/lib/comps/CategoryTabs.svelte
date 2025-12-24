<script lang="ts">
	type Props = {
		categories: string[];
		selected: string;
		onSelect: (category: string) => void;
		allValue?: string;
		allLabel?: string;
	};

	const {
		categories = [],
		selected,
		onSelect,
		allValue = 'ALL',
		allLabel = 'Tout'
	}: Props = $props();

	function handleSelect(value: string) {
		onSelect?.(value);
	}
</script>

<div class="sticky top-0 z-10 mb-2 flex gap-2 overflow-x-auto bg-white/85 px-4 py-3 backdrop-blur">
	<button
		type="button"
		class={`rounded-full px-3 py-2 text-sm font-semibold whitespace-nowrap shadow-sm transition ${selected === allValue ? 'bg-red-800 text-white' : 'bg-white text-black/70 ring-1 ring-black/10'}`}
		onclick={() => handleSelect(allValue)}
	>
		{allLabel}
	</button>
	{#each categories as category}
		<button
			type="button"
			class={`rounded-full px-3 py-2 text-sm font-semibold whitespace-nowrap shadow-sm transition ${selected === category ? 'bg-red-800 text-white' : 'bg-white text-black/70 ring-1 ring-black/10'}`}
			onclick={() => handleSelect(category)}
		>
			{category}
		</button>
	{/each}
</div>
