<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	let showGoUp = false;

	onMount(() => {
		const onScroll = () => {
			showGoUp = window.scrollY > 200;
		};
		window.addEventListener('scroll', onScroll);
		onScroll();
		onDestroy(() => window.removeEventListener('scroll', onScroll));
	});

	function goUp() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

{#if showGoUp}
	<button
		on:click={goUp}
		class="fixed right-6 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900/80 text-2xl font-bold text-yellow-400 shadow-2xl backdrop-blur-md transition-all duration-200 hover:scale-110 hover:bg-zinc-800/90"
		aria-label="Go to top"
		style="box-shadow: 0 8px 32px 0 rgba(255, 193, 7, 0.18);"
	>
		↑
	</button>
{/if}
