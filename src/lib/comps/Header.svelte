<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { statusTraductions } from '$lib/deliveryStatus';

	let { profile, orderStatusesLoading, orderStatuses } = $props();

	let profileOpened = $state(false);
	let profileMenu: 'main' | 'pastOrders' | 'settings' = $state('main');
</script>

<div class="flex items-center justify-between pr-8">
	<img src="/logo.png" alt="Pit Stop Logo" class=" h-32" />
	<button
		onclick={() => {
			profileOpened = true;
		}}
		class="h-14 w-14 overflow-hidden rounded-full"
	>
		<img src={profile.profilePicture} alt="Avatar" class="h-14 w-14 object-cover" />
	</button>
</div>

{#if profileOpened}
	<div class="fixed inset-0 z-50 bg-white">
		<div class="flex w-full p-4">
			<button
				class="rounded-full bg-red-100 px-4 py-2 font-semibold text-red-900 disabled:opacity-50 disabled:grayscale-100"
				onclick={() => {
					if (profileMenu != 'main') {
						profileMenu = 'main';
						return;
					}
					profileOpened = false;
				}}
			>
				{profileMenu == 'main' ? 'Fermer' : 'Retour'}
			</button>
		</div>

		{#if profileMenu == 'main'}
			<div class="flex w-full flex-col items-center gap-2 py-8">
				<img
					src={profile.profilePicture}
					alt="Avatar"
					class="h-32 w-32 rounded-full object-cover"
				/>
				<h1 class="mb-8 flex items-center gap-1 text-2xl font-bold">
					{profile.username}
					{#if profile.role === 'admin'}
						<i class="ph-fill ph-shield-star text-red-700"></i>
					{/if}
				</h1>
			</div>
			<div class="flex w-full flex-col gap-1 px-4">
				<button
					class="justi flex w-full items-center justify-between rounded-2xl bg-red-100 px-8 py-4 text-left text-xl text-red-900"
					onclick={() => {
						profileMenu = 'pastOrders';
					}}
				>
					<span>Livraisons passées</span>
					<i class="ph-fill ph-caret-right"></i>
				</button>
				<button
					class="flex w-full items-center justify-between rounded-2xl bg-red-100 px-8 py-4 text-left text-xl text-red-900"
					onclick={() => {
						profileMenu = 'settings';
					}}
				>
					<span>Paramètres</span>
					<i class="ph-fill ph-caret-right"></i>
				</button>
				<button
					class="flex w-full items-center justify-between rounded-2xl bg-red-100 px-8 py-4 text-left text-xl text-red-900"
					onclick={() => {
						window.location.href = 'https://familyid.liam-cheneval.dev/';
					}}
				>
					<span>FamilyID</span>
					<i class="ph-fill ph-caret-right"></i>
				</button>
				<button
					class="flex w-full items-center justify-between rounded-2xl bg-red-100 px-8 py-4 text-left text-xl text-red-900"
					onclick={() => {
						goto(resolve('/logout'));
					}}
				>
					<span>Déconnexion</span>
					<i class="ph-fill ph-sign-out"></i>
				</button>
			</div>
		{:else if profileMenu == 'pastOrders'}
			{#if orderStatuses.length > 0}
				<div class="m-4 flex flex-col gap-4">
					{#each orderStatuses as order, i (order.id)}
						<div class="flex flex-col gap-2 rounded-2xl border border-black/25 p-4 shadow-md">
							<div><strong>Livraison {i + 1}</strong></div>
							{#if order.status == 'done'}
								<div class="flex w-fit rounded-full bg-green-100 p-2 pr-4 pl-4 text-green-800">
									{statusTraductions[order.status]}
								</div>
							{:else if order.status == 'cancelled'}
								<div class="flex w-fit rounded-full bg-red-100 p-2 pr-4 pl-4 text-red-800">
									{statusTraductions[order.status]}
								</div>
							{:else}
								<div class="flex w-fit rounded-full bg-amber-100 p-2 pr-4 pl-4 text-amber-800">
									{statusTraductions[order.status]}
								</div>
							{/if}
						</div>
					{/each}
				</div>
			{:else}
				<div class="flex h-screen flex-col items-center justify-center gap-4 p-4 text-center">
					<span class="text-5xl">🍳</span>
					<span>{orderStatusesLoading}</span>
				</div>
			{/if}
		{:else if profileMenu == 'settings'}
			<div class="flex w-full flex-col items-center gap-2 py-8"></div>
		{/if}
	</div>
{/if}
