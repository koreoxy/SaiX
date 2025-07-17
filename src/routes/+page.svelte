<script>
	import Bounded from '$lib/components/Bounded.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Github from '$lib/components/Github.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Scene from '$lib/components/Model/Scene.svelte';
	import Project from '$lib/components/Project.svelte';
	import Social from '$lib/components/Social.svelte';
	import TechList from '$lib/components/TechList.svelte';
	import * as config from '$lib/config';
</script>

<svelte:head>
	<title>{config.title}</title>
</svelte:head>

<section class="relative mt-24 flex min-h-screen flex-col-reverse sm:mt-20 md:flex-row">
	<Bounded tag="div">
		<div class="flex-1 p-0 md:p-6">
			<Hero />
			<Contact />
			<Social />
			<Github />
			<TechList />
			<Project />
		</div>
	</Bounded>

	<div
		class="-z-10 h-0 w-full flex-shrink-0 pl-[120px] sm:block sm:h-64 sm:pl-0 md:z-0 md:h-auto md:w-1/3 lg:w-1/2"
	>
		<div class="mt-10 md:sticky md:top-0 md:mt-0 md:h-screen">
			<Scene />
		</div>
	</div>
</section>
