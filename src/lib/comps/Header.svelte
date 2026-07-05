<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import IconButton from './IconButton.svelte';
</script>

<div class="flex items-center justify-between p-4">
	<IconButton
		makeBig
		onclick={() => {
			window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
		}}>🛒</IconButton
	>
	<img src="/logo.png" alt="Pit Stop Logo" class="mx-auto my-4 h-32 w-auto" />
	<IconButton
		makeBig
		onclick={() => {
			goto(resolve('/orderStatus'));
		}}>🚚</IconButton
	>
</div>
