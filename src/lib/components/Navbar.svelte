<script lang="ts">
	import { goto } from '$app/navigation';
	import { supabase } from '$lib';
	export let navItems: Record<string, string> = {
		'': 'Home',
		blog: 'Blog'
	};
	export let currentPage: string = '';
	export let isLoggedIn: boolean = false;

	let mobileMenuOpen = false;

	async function handleLogout(event: Event) {
		event.preventDefault();
		await supabase.auth.signOut();
		goto('/login');
	}
</script>

<nav
	class="fixed top-6 left-1/2 z-40 mx-auto flex w-[95vw] max-w-4xl -translate-x-1/2 items-center justify-between gap-4 rounded-2xl border border-zinc-800 bg-zinc-950/80 px-6 py-3 shadow-2xl backdrop-blur-md transition-all duration-300"
>
	<div class="logo flex flex-row items-center gap-2">
		<span
			class="bg-gradient-to-r from-[#1bf9ab] via-red-500 to-yellow-500 bg-clip-text text-lg font-semibold tracking-tight text-transparent"
			>SaiX</span
		>
	</div>

	<!-- Desktop Nav Links -->
	<ul class="link hidden flex-row items-center gap-2 md:flex md:gap-4">
		{#each Object.entries(navItems) as [key, label]}
			<li>
				<a
					href={key === '' ? '/' : `/${key}`}
					class="rounded px-3 py-1 font-semibold text-zinc-200 underline-offset-8 transition-colors duration-150 hover:bg-zinc-800/60 hover:text-yellow-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
					class:underline={currentPage === key}
					class:bg-gradient-to-r={currentPage === key}
					class:from-[#1bf9ab]={currentPage === key}
					class:via-red-500={currentPage === key}
					class:to-yellow-500={currentPage === key}
					class:bg-clip-text={currentPage === key}
					class:text-transparent={currentPage === key}
					class:border-b-2={currentPage === key}
					class:border-yellow-400={currentPage === key}
				>
					{label}
				</a>
			</li>
		{/each}
	</ul>

	<!-- Desktop Auth Buttons -->
	<div class="hidden gap-2 md:flex">
		{#if isLoggedIn}
			<button
				type="button"
				on:click={handleLogout}
				class="button group relative inline-block rounded-lg bg-zinc-800/80 text-[17px] font-bold shadow-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
			>
				<span
					class="button_top box-border block rounded-lg border-2 border-zinc-700 bg-zinc-200/90 px-6 py-2 font-bold text-zinc-900 transition-transform duration-200 group-hover:-translate-y-1 group-hover:scale-105 group-hover:bg-zinc-300/80 group-hover:shadow-lg group-active:scale-95 group-active:shadow-inner"
					>Logout</span
				>
			</button>
		{:else}
			<a
				class="button group relative inline-block rounded-lg bg-gradient-to-r from-[#1bf9ab] via-red-500 to-yellow-500 text-[17px] font-bold shadow-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
				href="/login"
			>
				<span
					class="button_top box-border block rounded-lg border-2 border-yellow-400/60 bg-white/10 px-6 py-2 font-bold text-yellow-900 transition-transform duration-200 group-hover:-translate-y-1 group-hover:scale-105 group-hover:bg-gradient-to-r group-hover:from-[#1bf9ab]/80 group-hover:via-red-500/80 group-hover:to-yellow-500/80 group-hover:shadow-lg group-active:scale-95 group-active:shadow-inner"
					>Login</span
				>
			</a>
		{/if}
	</div>

	<!-- Hamburger Button (Mobile) -->
	<button
		class="flex items-center justify-center rounded-lg p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 md:hidden"
		aria-label="Open menu"
		on:click={() => (mobileMenuOpen = !mobileMenuOpen)}
	>
		<svg class="h-7 w-7 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			{#if !mobileMenuOpen}
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 6h16M4 12h16M4 18h16"
				/>
			{:else}
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M6 18L18 6M6 6l12 12"
				/>
			{/if}
		</svg>
	</button>

	<!-- Mobile Menu -->
	<div class="md:hidden">
		{#if mobileMenuOpen}
			<div
				class="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm transition-opacity duration-200"
				on:click={() => (mobileMenuOpen = false)}
			></div>
			<div
				class="animate-fade-in-up absolute top-16 right-4 z-40 w-56 rounded-2xl border border-zinc-800 bg-zinc-950/95 p-6 shadow-2xl backdrop-blur-md"
			>
				<ul class="mb-4 flex flex-col gap-3">
					{#each Object.entries(navItems) as [key, label]}
						<li>
							<a
								href={key === '' ? '/' : `/${key}`}
								class="block rounded px-3 py-2 font-semibold text-zinc-200 transition-colors duration-150 hover:bg-zinc-800/60 hover:text-yellow-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
								on:click={() => (mobileMenuOpen = false)}
								class:underline={currentPage === key}
								class:bg-gradient-to-r={currentPage === key}
								class:from-[#1bf9ab]={currentPage === key}
								class:via-red-500={currentPage === key}
								class:to-yellow-500={currentPage === key}
								class:bg-clip-text={currentPage === key}
								class:text-transparent={currentPage === key}
								class:border-b-2={currentPage === key}
								class:border-yellow-400={currentPage === key}
							>
								{label}
							</a>
						</li>
					{/each}
				</ul>
				<div class="flex flex-col gap-2">
					{#if isLoggedIn}
						<button
							type="button"
							on:click={(e) => {
								handleLogout(e);
								mobileMenuOpen = false;
							}}
							class="button group relative inline-block rounded-lg bg-zinc-800/80 text-[17px] font-bold shadow-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
						>
							<span
								class="button_top box-border block rounded-lg border-2 border-zinc-700 bg-zinc-200/90 px-6 py-2 font-bold text-zinc-900 transition-transform duration-200 group-hover:-translate-y-1 group-hover:scale-105 group-hover:bg-zinc-300/80 group-hover:shadow-lg group-active:scale-95 group-active:shadow-inner"
								>Logout</span
							>
						</button>
					{:else}
						<a
							class="button group relative inline-block rounded-lg bg-gradient-to-r from-[#1bf9ab] via-red-500 to-yellow-500 text-[17px] font-bold shadow-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
							href="/login"
							on:click={() => (mobileMenuOpen = false)}
						>
							<span
								class="button_top box-border block rounded-lg border-2 border-yellow-400/60 bg-white/10 px-6 py-2 font-bold text-yellow-900 transition-transform duration-200 group-hover:-translate-y-1 group-hover:scale-105 group-hover:bg-gradient-to-r group-hover:from-[#1bf9ab]/80 group-hover:via-red-500/80 group-hover:to-yellow-500/80 group-hover:shadow-lg group-active:scale-95 group-active:shadow-inner"
								>Login</span
							>
						</a>
					{/if}
				</div>
			</div>
		{/if}
	</div>
</nav>

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
		animation: fade-in-up 0.3s cubic-bezier(0.22, 1, 0.36, 1) both;
	}
</style>
