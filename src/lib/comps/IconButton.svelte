<script lang="ts">
	let { onclick, children, class: className = '', makeBig = false, disabled = false } = $props();
</script>

<button
	class="flex {makeBig
		? 'h-14 w-14 text-xl'
		: 'text-md h-10 w-10'} items-center justify-center rounded-full border border-red-800 bg-red-100 text-center disabled:opacity-50 disabled:grayscale-100 {className}"
	{onclick}
	{disabled}>{@render children()}</button
>
