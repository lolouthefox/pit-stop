<script lang="ts">
	let { onclick, children, class: className = '' } = $props();
</script>

<button
	class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-800 text-center {className}"
	{onclick}>{@render children()}</button
>
