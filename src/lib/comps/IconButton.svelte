<script lang="ts">
	let { onclick, children, class: className = '', makeBig = false } = $props();
</script>

<button
	class="flex {makeBig
		? 'h-14 w-14 text-xl'
		: 'text-md h-10 w-10'} items-center justify-center rounded-full border border-red-800 bg-red-100 text-center {className}"
	{onclick}>{@render children()}</button
>
