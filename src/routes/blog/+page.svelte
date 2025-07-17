<script lang="ts">
	import { supabase } from '$lib';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { user } from '$lib/auth';

	// Set your allowed GitHub email here
	const ALLOWED_EMAIL = 'rayssankn@gmail.com';

	let posts: any[] = [];
	let loading = true;
	let error = '';
	let deleting = '';
	let loginError = '';

	$: if ($user && $user.email !== ALLOWED_EMAIL) {
		loginError = `Only ${ALLOWED_EMAIL} is allowed to login.`;
		supabase.auth.signOut();
	}

	$: isOwner = $user && $user.email === ALLOWED_EMAIL;

	async function fetchPosts() {
		loading = true;
		error = '';
		const { data, error: fetchError } = await supabase
			.from('blog_posts')
			.select('*')
			.order('created_at', { ascending: false });
		if (fetchError) {
			error = fetchError.message;
			posts = [];
		} else {
			posts = data;
		}
		loading = false;
	}

	async function deletePost(id: string) {
		if (!confirm('Delete this blog post?')) return;
		deleting = id;
		const { error: deleteError } = await supabase.from('blog_posts').delete().eq('id', id);
		if (deleteError) {
			error = deleteError.message;
		} else {
			posts = posts.filter((p) => p.id !== id);
		}
		deleting = '';
	}

	async function logout() {
		await supabase.auth.signOut();
		goto('/login');
	}

	onMount(fetchPosts);
</script>

<svelte:head>
	<title>Blog | SaiX</title>
	<meta name="description" content="Insights, tutorials, and updates from the SaiX team." />
</svelte:head>

<section class="min-h-screen px-4 py-20 sm:px-6 lg:px-8">
	<div class="mx-auto mb-12 max-w-2xl text-center">
		<div class="relative mb-16 flex min-h-[340px] flex-col items-center justify-center">
			<div class="absolute inset-0 -z-10 flex items-center justify-center">
				<div
					class="h-72 w-72 animate-pulse rounded-full bg-gradient-to-tr from-green-400/20 via-blue-400/10 to-transparent blur-3xl"
				></div>
			</div>
			<div class="relative mx-auto h-[260px] w-full max-w-md">
				<!-- Top box -->
				<div
					class="card-hero-box dark-glow absolute top-2 left-1/2 z-10 flex h-24 w-32 -translate-x-1/2 items-center justify-center rounded-xl border-2 border-green-400/40 bg-white/10 text-2xl font-extrabold text-green-400 shadow-lg backdrop-blur-md transition-transform duration-300 hover:scale-105 hover:shadow-2xl md:text-3xl"
				>
					Vibe.
				</div>
				<!-- Bottom left box -->
				<div
					class="card-hero-box dark-glow absolute bottom-6 left-6 z-10 flex h-24 w-32 items-center justify-center rounded-xl border-2 border-blue-400/40 bg-white/10 text-2xl font-extrabold text-blue-400 shadow-lg backdrop-blur-md transition-transform duration-300 hover:scale-105 hover:shadow-2xl md:text-3xl"
				>
					Code.
				</div>
				<!-- Bottom right box -->
				<div
					class="card-hero-box dark-glow absolute right-6 bottom-6 z-10 flex h-24 w-32 items-center justify-center rounded-xl border-2 border-purple-400/40 bg-white/10 text-2xl font-extrabold text-purple-400 shadow-lg backdrop-blur-md transition-transform duration-300 hover:scale-105 hover:shadow-2xl md:text-3xl"
				>
					Create.
				</div>
				<!-- Bottom center box -->
				<div
					class="card-hero-box dark-glow absolute bottom-0 left-1/2 z-10 flex h-24 w-32 -translate-x-1/2 items-center justify-center rounded-xl border-2 border-pink-400/40 bg-white/10 text-2xl font-extrabold text-pink-400 shadow-lg backdrop-blur-md transition-transform duration-300 hover:scale-105 hover:shadow-2xl md:text-3xl"
				>
					Share.
				</div>
				<!-- Center text -->
				<div
					class="absolute top-1/2 left-1/2 z-20 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white/10 bg-zinc-950/90 text-2xl font-extrabold text-white shadow-lg md:text-3xl"
				>
					SaiX
				</div>
			</div>
			<p
				class="mt-10 max-w-2xl text-center text-xl font-bold text-zinc-100/90 drop-shadow-lg md:text-2xl"
			>
				Insights, tutorials, and tools for modern developers and tech enthusiasts.
			</p>
		</div>
		{#if loginError}
			<div class="mb-4 text-lg font-semibold text-red-400">{loginError}</div>
		{/if}
		{#if $user}
			<div class="mb-4 flex flex-col items-center gap-2">
				<span class="text-sm text-neutral-400">Signed in as {$user.email}</span>
				<button
					on:click={logout}
					class="rounded bg-neutral-800 px-4 py-1 text-xs font-semibold text-white transition-colors hover:bg-neutral-700"
					>Logout</button
				>
			</div>
			{#if isOwner}
				<a
					href="/blog/new"
					class="mb-2 inline-block rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white transition-colors hover:bg-blue-700"
					>+ Create New Post</a
				>
			{:else}
				<div class="mb-2 text-sm text-red-400">You are not allowed to manage blog posts.</div>
			{/if}
		{:else}
			<a
				href="/login"
				class="mb-2 inline-block rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white transition-colors hover:bg-blue-700"
				>Login with GitHub</a
			>
		{/if}
	</div>
	{#if loading}
		<div class="flex min-h-[200px] items-center justify-center">
			<span class="text-neutral-400">Loading...</span>
		</div>
	{:else if error}
		<div class="flex min-h-[200px] items-center justify-center">
			<span class="text-red-400">{error}</span>
		</div>
	{:else if posts.length === 0}
		<div class="flex min-h-[200px] items-center justify-center">
			<span class="text-neutral-400">No blog posts found.</span>
		</div>
	{:else}
		<div class="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 lg:grid-cols-3">
			{#each posts as post}
				<div
					class="group relative block overflow-hidden rounded-3xl border border-neutral-800 bg-gradient-to-b from-neutral-900 to-neutral-950 shadow-xl transition-shadow duration-300 hover:border-blue-700 hover:shadow-2xl"
				>
					<a href={`/blog/${post.slug}`} class="block">
						<img
							src={post.image}
							alt={post.title}
							class="h-48 w-full object-cover opacity-90 transition-transform duration-300 group-hover:scale-105 group-hover:opacity-100"
						/>
						<div class="flex flex-col gap-3 p-7">
							<h2
								class="mb-1 text-2xl leading-tight font-semibold text-white transition-colors duration-300 group-hover:text-blue-400"
							>
								{post.title}
							</h2>
							<p class="mb-2 text-xs tracking-wide text-neutral-500 uppercase">
								{post.created_at?.slice(0, 10)}
							</p>
							<p class="mb-4 line-clamp-3 font-light text-neutral-300">
								{post.content?.slice(0, 120)}...
							</p>
						</div>
					</a>
					{#if $user && isOwner}
						<div class="absolute top-4 right-4 z-10 flex gap-2">
							<a
								href={`/blog/edit/${post.id}`}
								class="rounded bg-yellow-500 px-3 py-1 text-xs font-semibold text-white transition-colors hover:bg-yellow-600"
								>Edit</a
							>
							<button
								on:click={() => deletePost(post.id)}
								class="rounded bg-red-600 px-3 py-1 text-xs font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-60"
								disabled={deleting === post.id}
							>
								{deleting === post.id ? 'Deleting...' : 'Delete'}
							</button>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	{/if}
</section>

<style>
	@keyframes fade-in-up {
		0% {
			opacity: 0;
			transform: translateY(40px);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}
	.animate-fade-in-up {
		animation: fade-in-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
	}
	.card-hero-box {
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: inherit;
		font-weight: 700;
		box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.1);
		transition:
			transform 0.3s,
			box-shadow 0.3s;
		backdrop-filter: blur(8px);
	}
	.card-hero-box:hover {
		transform: scale(1.07);
		box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.18);
	}
	/* Dark ambient glow for all cards */
	.dark-glow {
		box-shadow:
			0 0 32px 0 #18181bcc,
			0 0 8px 0 #18181b99;
	}
	.dark-glow:hover {
		animation: dark-glow-pulse 1.2s infinite alternate cubic-bezier(0.4, 0, 0.2, 1);
	}
	@keyframes dark-glow-pulse {
		0% {
			box-shadow:
				0 0 32px 0 #18181bcc,
				0 0 8px 0 #18181b99;
		}
		100% {
			box-shadow:
				0 0 64px 8px #18181bcc,
				0 0 24px 8px #18181b99;
		}
	}
</style>
