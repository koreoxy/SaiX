<script lang="ts">
	import IconX from '~icons/mdi/star-four-points';
	import { projects } from '$lib/data';
	import type { Project } from '$lib/data';
	import { onMount } from 'svelte';
	const projectList: Project[] = projects;

	const randomChar = () => {
		const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		return chars[Math.floor(Math.random() * chars.length)];
	};

	const animateTextLoop = (element: HTMLElement, originalText: string) => {
		let textArray = originalText.split('');
		let frame = 0;
		const speed = 9;

		const startAnimation = () => {
			if (frame % speed === 0) {
				const newText = textArray.map(() => randomChar()).join('');
				element.innerText = newText;
			}
			frame++;

			requestAnimationFrame(startAnimation);
		};

		startAnimation();
	};

	onMount(() => {
		const textElements = document.querySelectorAll('.random-text');
		textElements.forEach((el) => {
			const originalText = el.textContent || '';
			animateTextLoop(el as HTMLElement, originalText);
		});
	});
</script>

<section class="mt-20">
	<h1 class="flex text-3xl font-bold text-[#1bf9ab]" aria-label="Tech Stack">
		<span>
			<IconX class="-rotate-45" />
		</span>
		<span>Project</span>
	</h1>

	<div class="mt-4 space-y-4">
		{#each projectList as { title, description, subTitle, tech, icon, link, status }}
			<div
				class="rounded-lg border border-zinc-700 p-2 transition-all
					duration-300 ease-in-out hover:border-amber-400 hover:shadow-[0px_0px_20px_rgba(255,193,7,0.6)]"
			>
				<a href={link} target="_blank" rel="noopener noreferrer">
					<div
						class="card-container transform rounded-lg border border-zinc-700 p-4 backdrop-blur-md transition-all duration-300 ease-in-out hover:scale-105 hover:cursor-pointer hover:border-amber-400 hover:bg-zinc-900/50"
					>
						{#if title || status}
							<div class="flex flex-row justify-between">
								{#if title}
									<h2 class="text-animated text-xl font-semibold text-orange-400">{title}</h2>
								{/if}

								{#if status}
									<span
										class="text-animated status rounded-lg border border-zinc-700 px-3 py-1 text-sm"
										>{status}</span
									>
								{/if}
							</div>
						{/if}
						<div class="flex flex-row items-center gap-1">
							<p class="text-lg text-gray-400">{subTitle}</p>
							{#if icon}
								<svelte:component this={icon} class="text-animated icon text-orange-400" />
							{/if}
						</div>
						<p class="text-sm text-gray-300">{description}</p>
					</div>
				</a>
				<div class=" mt-2 flex flex-wrap gap-2">
					{#if tech.length > 0}
						<div class="flex flex-wrap gap-2">
							{#each tech as { name }}
								<span class="rounded-md bg-amber-500 px-2 py-1 text-[10px] text-black">{name}</span>
							{/each}
						</div>
					{/if}
				</div>
			</div>
		{/each}

		<!-- RANDOM CARD -->
		<div class="flex flex-row gap-5">
			<div class="w-full rounded-lg border border-zinc-700 p-2">
				<div class="transform rounded-lg border border-zinc-700 p-4 backdrop-blur-md">
					<div class="flex flex-row justify-between">
						<h2 class="random-text text-xl font-semibold text-orange-400">RANDOM</h2>
						<span class="rounded-lg border border-zinc-700 px-3 py-1 text-sm">SOON</span>
					</div>
					<p class="random-text text-lg text-gray-400">RANDOM</p>
					<p class="random-text text-sm text-gray-300">RANDOM</p>
				</div>
				<div class="mt-2 flex flex-wrap gap-2">
					<div class="flex flex-wrap gap-2">
						<span class="random-text rounded-md bg-amber-500 px-2 py-1 text-[10px] text-black"
							>RANDOM</span
						>
					</div>
				</div>
			</div>
			<div class="hidden w-full rounded-lg border border-zinc-700 p-2 sm:block">
				<div class="transform rounded-lg border border-zinc-700 p-4 backdrop-blur-md">
					<div class="flex flex-row justify-between">
						<h2 class="random-text text-xl font-semibold text-orange-400">RANDOM</h2>
						<span class="rounded-lg border border-zinc-700 px-3 py-1 text-sm">SOON</span>
					</div>
					<p class="random-text text-lg text-gray-400">RANDOM</p>
					<p class="random-text text-sm text-gray-300">RANDOM</p>
				</div>
				<div class="mt-2 flex flex-wrap gap-2">
					<div class="flex flex-wrap gap-2">
						<span class="random-text rounded-md bg-amber-500 px-2 py-1 text-[10px] text-black"
							>RANDOM</span
						>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.text-animated {
		transition: color 0.3s ease-in-out;
	}

	.card-container:hover h2,
	.card-container:hover .status,
	.card-container:hover :global(.icon) {
		animation: smoothTextColor 2s infinite alternate;
	}

	@keyframes smoothTextColor {
		0% {
			color: #f97316;
		}
		25% {
			color: #ff007f;
		}
		50% {
			color: #00ccff;
		}
		75% {
			color: #32ff7e;
		}
		100% {
			color: #f97316;
		}
	}
</style>
