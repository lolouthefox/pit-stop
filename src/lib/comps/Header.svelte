<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import IconButton from './IconButton.svelte';
</script>

<div class="flex items-center justify-between p-4 py-0 pl-0">
	<img src="/logo.png" alt="Pit Stop Logo" class=" h-32" />
	<IconButton
		makeBig
		onclick={() => {
			goto(resolve('/orderStatus'));
		}}>🚚</IconButton
	>
</div>
