<script lang="ts">
	import { onMount } from 'svelte';

	type AdminMenuItem = {
		id: string;
		name: string;
		price: number;
		description?: string;
		imageUrl?: string;
		category: string;
		unavailable: boolean;
	};

	let items: AdminMenuItem[] = $state([]);
	let loading: boolean = $state(false);
	let error: string | null = $state(null);

	const categories = $derived(Array.from(new Set(items.map((i) => i.category))));
	let selectedCategory: string = $state('ALL');
	const visibleItems = $derived(
		selectedCategory === 'ALL' ? items : items.filter((i) => i.category === selectedCategory)
	);

	async function loadMenu() {
		loading = true;
		error = null;
		try {
			const res = await fetch('/admin/api/menu');
			if (!res.ok) {
				const data = await res.json().catch(() => ({}));
				throw new Error(data.error ?? 'Échec du chargement du menu');
			}
			const data = await res.json();
			items = (data.items ?? []) as AdminMenuItem[];
		} catch (e: any) {
			error = e?.message ?? String(e);
		} finally {
			loading = false;
		}
	}

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

	onMount(loadMenu);
</script>

<section class="space-y-4 p-4">
	<header class="flex items-center justify-between">
		<h1 class="text-2xl font-bold">Administration · Disponibilité du menu</h1>
		<div class="flex items-center gap-2">
			<button
				class="rounded bg-slate-800 px-3 py-1 text-white"
				onclick={loadMenu}
				disabled={loading}
			>
				{loading ? 'Actualisation…' : 'Rafraîchir'}
			</button>
		</div>
	</header>

	{#if error}
		<div class="rounded border border-red-300 bg-red-50 p-2 text-red-700">{error}</div>
	{/if}

	<div class="flex items-center gap-2">
		<label class="text-sm font-medium" for="admin-category">Catégorie :</label>
		<select id="admin-category" class="rounded border p-1" bind:value={selectedCategory}>
			<option value="ALL">Tous</option>
			{#each categories as c}
				<option value={c}>{c}</option>
			{/each}
		</select>
	</div>

	{#if loading && items.length === 0}
		<p class="text-slate-600">Chargement du menu…</p>
	{:else if visibleItems.length === 0}
		<p class="text-slate-600">Aucun élément trouvé.</p>
	{:else}
		<ul class="space-y-2">
			{#each visibleItems as item}
				<li class="flex items-center justify-between gap-4 rounded border p-3">
					<div class="flex items-center gap-3">
						{#if item.imageUrl}
							<img src={item.imageUrl} alt={item.name} class="h-12 w-12 rounded object-cover" />
						{/if}
						<div>
							<div class="font-medium">{item.name}</div>
							<div class="text-sm text-slate-600">{item.category} · €{item.price}</div>
						</div>
					</div>
					<div class="flex items-center gap-3">
						{#if item.unavailable}
							<span class="rounded bg-red-100 px-2 py-0.5 text-sm text-red-700">Indisponible</span>
						{:else}
							<span class="rounded bg-green-100 px-2 py-0.5 text-sm text-green-700">Disponible</span
							>
						{/if}
						<button
							class="rounded border bg-white px-3 py-1 hover:bg-slate-50"
							onclick={() => toggleAvailability(item)}
							disabled={loading}
						>
							{item.unavailable ? 'Rendre disponible' : 'Rendre indisponible'}
						</button>
					</div>
				</li>
			{/each}
		</ul>
	{/if}
</section>
