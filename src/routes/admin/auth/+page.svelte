<script>
	import { enhance } from '$app/forms';
	let { form } = $props();
	let loading = $state(false);
</script>

<div class="mx-auto max-w-md p-8">
	<form
		method="POST"
		use:enhance={() => {
			loading = true;
			return async ({ result }) => {
				loading = false;
			};
		}}
		class="flex flex-col gap-4"
	>
		<h1 class="text-2xl font-bold">Admin Authentication</h1>

		<div class="flex flex-col gap-2">
			<label for="password" class="font-medium">Password</label>
			<input
				id="password"
				type="password"
				name="password"
				required
				disabled={loading}
				class="rounded border border-gray-300 px-3 py-2 disabled:bg-gray-100"
			/>
		</div>

		{#if form?.error}
			<div class="rounded border border-red-400 bg-red-100 px-3 py-2 text-red-700">
				{form.error}
			</div>
		{/if}

		<button
			type="submit"
			disabled={loading}
			class="rounded bg-blue-500 px-3 py-2 text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-500"
		>
			{loading ? 'Authenticating...' : 'Submit'}
		</button>
	</form>
</div>
