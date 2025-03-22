<script lang="ts">
	import IconCircle from '~icons/material-symbols/circle';
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import IconX from '~icons/mdi/star-four-points';

	gsap.registerPlugin(ScrollTrigger);

	let component: HTMLElement;

	let techList = [
		{ tech_color: '#FF5733', tech_name: 'Svelte' },
		{ tech_color: '#007ACC', tech_name: 'TypeScript' },
		{ tech_color: '#F7DF1E', tech_name: 'Javascript' },
		{ tech_color: '#61DAFB', tech_name: 'React' },
		{ tech_color: '#E34F26', tech_name: 'HTML' },
		{ tech_color: '#1572B6', tech_name: 'CSS' }
	];

	onMount(() => {
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: component,
				start: 'top bottom',
				end: 'bottom top',
				scrub: 4
			}
		});

		tl.fromTo(
			'.tech-row',
			{
				x: (index: number) =>
					index % 2 === 0 ? gsap.utils.random(300, 500) : gsap.utils.random(-500, -300)
			},
			{
				x: (index: number) =>
					index % 2 === 0 ? gsap.utils.random(-500, -300) : gsap.utils.random(300, 500),
				ease: 'power1.inOut'
			}
		);
	});
</script>

<section class="mt-20 overflow-hidden" bind:this={component}>
	<h1 class="flex text-3xl font-bold text-[#1bf9ab]" aria-label="Tech Stack">
		<span>
			<IconX class="-rotate-45" />
		</span>
		<span>Tech Stack</span>
	</h1>

	{#each techList as { tech_color, tech_name }}
		<div
			class="tech-row mb-8 flex items-center justify-center gap-4 text-zinc-800"
			aria-label={tech_name}
		>
			{#each Array(15) as _, index}
				<span
					class="tech-item text-8xl font-extrabold tracking-tighter uppercase transition-all duration-500"
					style="color: {index === 7 ? tech_color : 'inherit'}"
				>
					{tech_name}
				</span>
				<span class="text-3xl text-zinc-700">
					<IconCircle />
				</span>
			{/each}
		</div>
	{/each}
</section>

<style>
	.tech-row {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 750px;
		mask-image: linear-gradient(
			to right,
			rgba(0, 0, 0, 0) 0%,
			black 40%,
			black 60%,
			rgba(0, 0, 0, 0) 100%
		);
		-webkit-mask-image: linear-gradient(
			to right,
			rgba(0, 0, 0, 0) 0%,
			black 40%,
			black 60%,
			rgba(0, 0, 0, 0) 100%
		);
	}

	@media (max-width: 768px) {
		.tech-row {
			mask-image: none;
			-webkit-mask-image: none;
		}
	}
</style>
