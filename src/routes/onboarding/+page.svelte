<main class="align-center fixed inset-0 flex flex-col justify-center">
	<img src="/logo.png" alt="Pit Stop Logo" class="mx-auto my-4 h-32 w-auto" />
	<div class="flex h-full flex-col justify-center gap-4 p-6">
		<img src="/assets/fox.webp" alt="" class="h-32 w-32" />
		<h1 class="text-2xl font-bold">Hello there partner!</h1>
		<p>
			Pit Stop à besoin d'un compte pour pouvoir suivre vos commandes, enregistrer vos préférences,
			donner des résultats personnalisés et accéder à votre profil.
		</p>
	</div>
	<button
		class="m-4 flex items-center justify-center gap-2 rounded-full bg-red-800 p-4 pr-4 font-bold text-red-200"
		onclick={() => {
			window.location.href =
				'https://familyid.liam-cheneval.dev/oauth?app_id=d5b5358f-54ee-4b82-8399-7979126d17a9&redirect_uri=https://pit-stop.liam-cheneval.dev/callback/&scope=openid,profile&response_type=code';
		}}
	>
		<img
			src="https://familyid.liam-cheneval.dev/branding/icon-neutral.svg"
			alt="FamilyID"
			class="h-8 w-8 opacity-75"
		/>
		Connexion avec FamilyID
	</button>
</main>
