<script lang="ts">
	import { formatDate } from '$lib/utils.js';

	export let data;
</script>

<svelte:head>
	<title>SaiX | {data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<article>
	<hgroup>
		<h1>{data.meta.title}</h1>
		<p>Published at {formatDate(data.meta.date)}</p>
	</hgroup>

	<div>
		{#each data.meta.categories as category}
			<span>&num;{category}</span>
		{/each}
	</div>

	<div>
		<svelte:component this={data.content} />
	</div>
</article>
