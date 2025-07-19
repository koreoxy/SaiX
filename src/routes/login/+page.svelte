<script lang="ts">
	import { supabase } from '$lib';
	import { goto } from '$app/navigation';
	import { user } from '$lib/auth';
	import { SUPABASE_URL } from '$lib/config';
	const isProd = import.meta.env.PROD;
	let loading = false;
	let error = '';
	const ALLOWED_EMAIL = 'rayssankn@gmail.com';

	$: if ($user) {
		if ($user.email !== ALLOWED_EMAIL) {
			error = `Only author is allowed to login.`;
			supabase.auth.signOut();
		} else {
			goto('/blog');
		}
	}

	// Always redirect to /blog after login
	const redirectUrl = isProd
		? undefined // production pakai default redirect dari Supabase dashboard
		: 'http://localhost:5173/blog'; // sesuaikan dengan dev lokalmu

	async function signInWithGitHub() {
		loading = true;
		error = '';
		const { error: signInError } = await supabase.auth.signInWithOAuth({
			provider: 'github',
			options: {
				redirectTo: redirectUrl
			}
		});
		if (signInError) {
			error = signInError.message;
			loading = false;
		}
		// On success, Supabase will redirect automatically
	}
</script>

<svelte:head>
	<title>Login | SaiX</title>
</svelte:head>

<section class="flex min-h-screen items-center justify-center px-4 py-16">
	<div
		class="flex w-full max-w-md flex-col items-center gap-6 rounded-2xl border-neutral-800 bg-gradient-to-b from-neutral-900 to-neutral-950 p-10 shadow-xl"
	>
		<h1 class="mb-2 text-3xl font-bold text-white">Sign in</h1>
		<button
			on:click={signInWithGitHub}
			class="flex items-center gap-2 rounded-lg bg-neutral-800 px-6 py-3 font-semibold text-white transition-colors hover:bg-neutral-700 disabled:opacity-60"
			disabled={loading}
		>
			<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"
				><path
					d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.25 5.7.42.36.79 1.09.79 2.2 0 1.59-.01 2.87-.01 3.26 0 .31.21.68.8.56C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z"
				/></svg
			>
			{loading ? 'Signing in...' : 'Sign in with GitHub'}
		</button>
		{#if error}
			<div class="text-sm text-red-400">{error}</div>
		{/if}
	</div>
</section>
