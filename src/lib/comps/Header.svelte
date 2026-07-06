<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	let { avatarUrl } = $props();
</script>

<div class="flex items-center justify-between p-4 py-0 pl-0">
	<img src="/logo.png" alt="Pit Stop Logo" class=" h-32" />
	<button
		onclick={() => {
			goto(resolve('/orderStatus'));
		}}
		class="h-16 w-16 overflow-hidden rounded-full"
	>
		<img src={avatarUrl} alt="Avatar" class="h-16 w-16 object-cover" />
	</button>
</div>
