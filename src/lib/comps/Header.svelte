<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	let { avatarUrl } = $props();
</script>

<div class="flex items-center justify-between pr-8">
	<img src="/logo.png" alt="Pit Stop Logo" class=" h-32" />
	<button
		onclick={() => {
			goto(resolve('/orderStatus'));
		}}
		class="h-14 w-14 overflow-hidden rounded-full"
	>
		<img src={avatarUrl} alt="Avatar" class="h-14 w-14 object-cover" />
	</button>
</div>
