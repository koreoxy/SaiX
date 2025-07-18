<script lang="ts">
	import { supabase } from '$lib';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { user } from '$lib/auth';
	// Set your allowed GitHub email here
	const ALLOWED_EMAIL = 'rayssankn@gmail.com';
	let id = '';
	let title = '';
	let slug = '';
	let content = '';
	let image = '';
	let loading = true;
	let error = '';
	let success = false;
	$: id = $page.params.id;
	$: isOwner = $user && $user.email === ALLOWED_EMAIL;
	onMount(() => {
		if (!$user) goto('/login');
		else fetchPost();
	});
	async function fetchPost() {
		loading = true;
		error = '';
		const { data, error: fetchError } = await supabase
			.from('blog_posts')
			.select('*')
			.eq('id', id)
			.single();
		if (fetchError) {
			error = fetchError.message;
		} else if (data) {
			title = data.title;
			slug = data.slug;
			content = data.content;
			image = data.image;
		}
		loading = false;
	}
	async function updatePost() {
		loading = true;
		error = '';
		success = false;
		if (!title || !slug || !content) {
			error = 'Title, slug, and content are required.';
			loading = false;
			return;
		}
		const { error: updateError } = await supabase
			.from('blog_posts')
			.update({ title, slug, content, image, updated_at: new Date().toISOString() })
			.eq('id', id);
		loading = false;
		if (updateError) {
			error = updateError.message;
		} else {
			success = true;
			setTimeout(() => goto('/blog'), 1200);
		}
	}
	async function logout() {
		await supabase.auth.signOut();
		goto('/login');
	}
</script>

<svelte:head>
	<title>Edit Blog Post | SaiX</title>
</svelte:head>

<section class="mt-24 flex min-h-screen items-center justify-center px-4 py-16 sm:mt-20">
	{#if loading}
		<div class="text-neutral-400">Loading...</div>
	{:else if $user && isOwner}
		<form
			class="flex w-full max-w-xl flex-col gap-6 rounded-2xl bg-neutral-900 p-10 shadow-xl"
			on:submit|preventDefault={updatePost}
		>
			<h1 class="mb-2 text-3xl font-bold text-white">Edit Blog Post</h1>
			<div class="flex flex-col gap-2">
				<label class="text-sm font-medium text-neutral-300">Title</label>
				<input
					class="rounded-lg bg-neutral-800 px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
					bind:value={title}
					required
				/>
			</div>
			<div class="flex flex-col gap-2">
				<label class="text-sm font-medium text-neutral-300">Slug</label>
				<input
					class="rounded-lg bg-neutral-800 px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
					bind:value={slug}
					required
				/>
			</div>
			<div class="flex flex-col gap-2">
				<label class="text-sm font-medium text-neutral-300">Image URL</label>
				<input
					class="rounded-lg bg-neutral-800 px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
					bind:value={image}
				/>
			</div>
			<div class="flex flex-col gap-2">
				<label class="text-sm font-medium text-neutral-300"
					>Content <span class="ml-1 text-xs text-yellow-400">(Markdown supported)</span></label
				>
				<textarea
					class="min-h-[200px] rounded-lg bg-neutral-800 px-4 py-2 font-mono text-base text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
					bind:value={content}
					placeholder="Write your blog post in Markdown..."
					required
				/>
			</div>
			{#if error}
				<div class="text-sm text-red-400">{error}</div>
			{/if}
			{#if success}
				<div class="text-sm text-green-400">Blog post updated! Redirecting...</div>
			{/if}
			<button
				type="submit"
				class="rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-60"
				disabled={loading}
			>
				{loading ? 'Updating...' : 'Update Post'}
			</button>
			<a href="/blog" class="mt-2 text-sm text-blue-400 hover:underline">← Back to Blog</a>
			<button
				type="button"
				on:click={logout}
				class="mt-4 rounded bg-neutral-800 px-4 py-1 text-xs font-semibold text-white transition-colors hover:bg-neutral-700"
				>Logout</button
			>
			<span class="mt-1 text-xs text-neutral-400">Signed in as {$user.email}</span>
		</form>
	{:else if $user && !isOwner}
		<div class="text-lg font-semibold text-red-400">You are not allowed to edit blog posts.</div>
		<button
			type="button"
			on:click={logout}
			class="mt-4 rounded bg-neutral-800 px-4 py-1 text-xs font-semibold text-white transition-colors hover:bg-neutral-700"
			>Logout</button
		>
	{/if}
</section>
