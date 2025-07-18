<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { supabase } from '$lib';
	import { marked } from 'marked';
	// @ts-ignore
	import hljs from 'highlight.js';
	import 'highlight.js/lib/common';
	import 'highlight.js/styles/github-dark.css';

	(marked as any).setOptions({
		gfm: true,
		breaks: true,
		highlight: (code: string, lang: string) => {
			if (lang && hljs.getLanguage(lang)) {
				return hljs.highlight(code, { language: lang }).value;
			}
			return hljs.highlightAuto(code).value;
		}
	});

	let post: any = null;
	let loading = true;
	let error = '';
	let htmlContent = '';
	$: slug = $page.params.slug;

	async function fetchPost() {
		loading = true;
		error = '';
		const { data, error: fetchError } = await supabase
			.from('blog_posts')
			.select('*')
			.eq('slug', slug)
			.single();
		if (fetchError) {
			error = fetchError.message;
			post = null;
		} else {
			post = data;
			htmlContent = post?.content ? (marked.parse(post.content) as string) : '';
		}
		loading = false;
	}

	onMount(fetchPost);
</script>

<svelte:head>
	<title>{post ? post.title + ' | SaiX Blog' : 'Blog | SaiX'}</title>
	<meta name="description" content={post ? post.content?.slice(0, 120) : 'SaiX Blog post'} />
</svelte:head>

{#if loading}
	<section class="flex min-h-screen items-center justify-center bg-neutral-950">
		<span class="text-neutral-400">Loading...</span>
	</section>
{:else if error}
	<section class="flex min-h-screen items-center justify-center bg-neutral-950">
		<div class="text-center">
			<h2 class="mb-4 text-2xl text-red-400">{error}</h2>
			<a href="/blog" class="text-blue-400 hover:underline">Back to Blog</a>
		</div>
	</section>
{:else if post}
	<section
		class="mt-24 flex min-h-screen flex-col items-center px-4 py-16 sm:mt-20 sm:px-6 lg:px-8"
	>
		<div class="mx-auto w-full max-w-3xl">
			<div
				class="rounded-3xl border-neutral-800 bg-gradient-to-b from-neutral-900 to-neutral-950 p-5"
			>
				<a href="/blog" class="mb-8 inline-block text-sm text-blue-400 hover:underline"
					>← Back to Blog</a
				>
				{#if post.image}
					<img
						src={post.image}
						alt={post.title}
						class="mb-8 h-64 w-full rounded-2xl object-cover shadow-lg"
					/>
				{/if}
				<h1 class="mb-4 text-4xl leading-tight font-extrabold text-white">{post.title}</h1>
				<p class="mb-8 text-sm text-neutral-400">{post.created_at?.slice(0, 10)}</p>
				<div class="markdown-body mb-12 max-w-none">
					{@html htmlContent}
				</div>
			</div>
		</div>
	</section>
{:else}
	<section class="flex min-h-screen items-center justify-center bg-neutral-950">
		<div class="text-center">
			<h2 class="mb-4 text-2xl text-white">Post not found</h2>
			<a href="/blog" class="text-blue-400 hover:underline">Back to Blog</a>
		</div>
	</section>
{/if}
