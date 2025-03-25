<script lang="ts">
	import IconActiveOnline from '~icons/majesticons/status-online';
	import { socials } from '$lib/data';
	import type { Social } from '$lib/data';

	const socialList: Social[] = socials;
</script>

<section class="mt-8">
	<span class="flex flex-row items-center gap-2">
		<span class="icon-active-online">
			<IconActiveOnline class="h-5 w-5 text-orange-400" />
		</span>
		<h1 class="text-animated font-semibold text-orange-400 uppercase" aria-label="Active On">
			Active On
		</h1>
	</span>

	<div class="mt-2 grid grid-cols-2 gap-2 sm:flex sm:flex-row">
		{#each socialList as { name, link, icon }}
			<a
				href={link}
				target="_blank"
				rel="noopener noreferrer"
				class="group relative cursor-pointer rounded-md px-2 py-1 font-semibold text-orange-400 transition-all duration-500 ease-out hover:scale-105 hover:text-white hover:italic"
				aria-label={`Visit ${name}`}
			>
				<span class="relative">
					<h1 class="flex flex-row items-center gap-1 uppercase" aria-label={name}>
						{#if icon}
							<svelte:component this={icon} class="h-4 w-4 text-orange-400" />
						{/if}
						{name}
					</h1>
					<span
						class="group-hover: absolute top-full left-1/2 h-[2px] w-full -translate-x-1/2 translate-y-0 rounded bg-orange-400 transition-all duration-300 ease-in-out group-hover:w-5 group-hover:translate-y-2"
					></span>
				</span>
			</a>
		{/each}
	</div>
</section>

<style>
	@keyframes pulseOnline {
		0% {
			transform: scale(1);
			opacity: 1;
		}
		50% {
			transform: scale(1.2);
			opacity: 0.6;
		}
		100% {
			transform: scale(1);
			opacity: 1;
		}
	}

	@keyframes glowText {
		0% {
			color: #f97316;
			text-shadow: 0 0 5px rgba(249, 115, 22, 0.5);
		}
		50% {
			color: #ffcc00;
			text-shadow: 0 0 10px rgba(255, 204, 0, 0.8);
		}
		100% {
			color: #f97316;
			text-shadow: 0 0 5px rgba(249, 115, 22, 0.5);
		}
	}

	.icon-active-online {
		animation: pulseOnline 1.5s infinite ease-in-out;
	}

	.text-animated {
		animation: glowText 2s infinite alternate ease-in-out;
	}
</style>
