<script lang="ts">
	import Bounded from '$lib/components/Bounded.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import { formatDate } from '$lib/utils.js';

	export let data;
</script>

<svelte:head>
	<title>SaiX | {data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<Bounded tag="article">
	<div class="rounded-2xl border-2 border-zinc-700 px-4 py-10 backdrop-blur-xs md:px-8 md:py-10">
		<hgroup>
			<Heading tag="h1" size="sm">{data.meta.title}</Heading>
			<p>Published at {formatDate(data.meta.date)}</p>
		</hgroup>

		<div class="">
			{#each data.meta.categories as category}
				<span>&num;{category}</span>
			{/each}
		</div>

		<div>
			<svelte:component this={data.content} />
		</div>
	</div>
</Bounded>
