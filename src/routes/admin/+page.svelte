<script lang="ts">
	import IconButton from '$lib/comps/IconButton.svelte';
	import CategoryTabs from '$lib/comps/CategoryTabs.svelte';

	type AdminMenuItem = {
		id: string;
		name: string;
		price: number;
		description?: string;
		imageUrl?: string;
		category: string;
		unavailable: boolean;
	};

	const { data } = $props();

	// Local state initialised from server-provided data
	let items: AdminMenuItem[] = $state([] as AdminMenuItem[]);
	$effect(() => {
		items = (data?.items ?? []) as AdminMenuItem[];
	});
	let loading: boolean = $state(false);
	let error: string | null = $state(null);

	const categories = $derived(Array.from(new Set(items.map((i) => i.category))));
	let selectedCategory: string = $state('ALL');
	const visibleItems = $derived(
		selectedCategory === 'ALL' ? items : items.filter((i) => i.category === selectedCategory)
	);

	// Data is loaded server-side; no client reload

	async function toggleAvailability(item: AdminMenuItem) {
		const targetUnavailable = !item.unavailable;
		error = null;
		try {
			const res = await fetch(`/admin/api/menu/${encodeURIComponent(item.id)}/availability`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ unavailable: targetUnavailable })
			});
			if (!res.ok) {
				const data = await res.json().catch(() => ({}));
				throw new Error(data.error ?? "Échec de la mise à jour de l'article");
			}
			const data = await res.json();
			const updated = data.item as AdminMenuItem;
			items = items.map((i) => (i.id === item.id ? { ...i, unavailable: updated.unavailable } : i));
		} catch (e: any) {
			error = e?.message ?? String(e);
		}
	}
</script>

<section class="space-y-4">
	{#if error}
		<div class="rounded border border-red-300 bg-red-50 p-2 text-red-700">{error}</div>
	{/if}

	<CategoryTabs
		{categories}
		selected={selectedCategory}
		onSelect={(value) => {
			selectedCategory = value;
		}}
		allLabel="Tous"
		allValue="ALL"
	/>

	{#if items.length === 0}
		<p class="text-slate-600">Chargement du menu…</p>
	{:else if visibleItems.length === 0}
		<p class="text-slate-600">Aucun élément trouvé.</p>
	{:else}
		<div class="flex flex-col">
			{#each visibleItems as item}
				<div class="flex items-center justify-between border-b border-black/25 p-4">
					<div class="flex items-center gap-3">
						{#if item.imageUrl}
							<img src={item.imageUrl} alt={item.name} class="h-12 w-12 rounded object-cover" />
						{/if}
						<div>
							<div class="font-medium">{item.name}</div>
							<div class="text-sm text-slate-600">{item.category} · {item.price / 100}¤</div>
						</div>
					</div>
					<div class="flex items-center gap-3">
						{#if item.unavailable}
							<span class="rounded bg-red-100 px-2 py-0.5 text-sm text-red-700">Indisponible</span>
						{:else}
							<span class="rounded bg-green-100 px-2 py-0.5 text-sm text-green-700">Disponible</span
							>
						{/if}
						<IconButton onclick={() => toggleAvailability(item)} disabled={loading}>
							{item.unavailable ? '✅' : '❌'}
						</IconButton>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</section>
