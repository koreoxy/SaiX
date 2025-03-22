<script>
	import Contact from '$lib/components/Contact.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Scene from '$lib/components/Model/Scene.svelte';
</script>

<section class="relative flex min-h-screen flex-col-reverse md:flex-row">
	<div class="flex-1 overflow-y-auto p-6">
		<Hero />
		<Contact />
	</div>

	<div class="-z-10 h-64 w-full flex-shrink-0 sm:block md:z-0 md:h-auto md:w-1/3 lg:w-1/2">
		<div class="md:sticky md:top-0 md:h-screen">
			<Scene />
		</div>
	</div>
</section>
