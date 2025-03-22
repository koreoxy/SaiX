<script>
	import Bounded from '$lib/components/Bounded.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Scene from '$lib/components/Model/Scene.svelte';
	import TechList from '$lib/components/TechList.svelte';
</script>

<section class="relative flex min-h-screen flex-col-reverse md:flex-row">
	<Bounded tag="div">
		<div class="flex-1 p-0 md:p-6">
			<Hero />
			<Contact />
			<TechList />
		</div>
	</Bounded>

	<div
		class="-z-10 ml-16 h-0 w-full flex-shrink-0 sm:ml-0 sm:block sm:h-64 md:z-0 md:h-auto md:w-1/3 lg:w-1/2"
	>
		<div class="mt-10 md:sticky md:top-0 md:mt-0 md:h-screen">
			<Scene />
		</div>
	</div>
</section>
