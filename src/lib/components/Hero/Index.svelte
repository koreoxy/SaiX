<script lang="ts">
	import Scene from './Scene.svelte';
	import IconX from '~icons/mdi/star-four-points';
	import IconLine from '~icons/mdi/vector-line';
</script>

<section>
	<div class="mx-auto w-full max-w-7xl">
		<div class="grid min-h-[65vh] grid-cols-1 items-center md:grid-cols-2">
			<div
				class="relative z-10 row-span-1 row-start-1 -my-10 aspect-[1/1.3] overflow-hidden md:col-span-1 md:col-start-2 md:mt-0"
			>
				<Scene />
			</div>

			<div class="col-start-1 md:row-start-1">
				<h1
					class="mb-2 text-[clamp(3rem,20vmin,13rem)] leading-none font-extrabold tracking-tighter text-nowrap md:mb-8"
					aria-label="Sai fullah"
				>
					<span class="bg-gradient-to-r bg-clip-text font-bold text-[#1bf9ab]">Sai</span>
					<span class=" text-[#1bf9ab]">
						<IconX class="-rotate-45" />
					</span>

					<span
						class="bg-gradient-to-r from-[#1bf9ab] via-red-500 to-yellow-500 bg-clip-text font-bold text-transparent"
					>
						Fullah
					</span>
				</h1>

				<h2 class="flex flex-col" aria-label="Web Developer Focused on Frontend.">
					<span class="flex flex-row items-center gap-2"
						><IconLine class="text-2xl font-extralight" aria-hidden="true" />
						<span class="cutive-font text-2xl md:text-4xl">Web Developer</span>
					</span>

					<span class="cutive-font text-2xl md:text-4xl">Focused on Frontend. </span>
				</h2>
			</div>
		</div>
	</div>
</section>
