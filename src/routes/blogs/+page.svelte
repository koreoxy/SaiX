<script lang="ts">
	import * as config from '$lib/config';
	import { formatDate } from '$lib/utils';

	export let data;
</script>

<svelte:head>
	<title>{config.title} | All Posts</title>
</svelte:head>

<!-- <pre>
    {JSON.stringify(data, null, 2)}
</pre> -->

<section>
	<ul>
		{#each data.posts as post}
			<li>
				<a href={post.slug}>{post.title}</a>
				<p>{formatDate(post.date)}</p>
				<p>{post.description}</p>
			</li>
		{/each}
	</ul>
</section>
