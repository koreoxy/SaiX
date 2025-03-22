<script lang="ts">
	import IconEmail from '~icons/material-symbols/mail-outline-rounded';
	import IconCircle from '~icons/material-symbols/circle';

	let email = 'rayssankn@gmail.com';
	let copied = false;

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(email);
			copied = true;
			setTimeout(() => (copied = false), 1000);
		} catch (err) {
			console.error('Gagal menyalin: ', err);
		}
	};

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Enter' || e.key === ' ') {
			copyToClipboard();
		}
	};
</script>

<section class="mt-8">
	<div class="flex flex-col gap-5">
		<div class="flex items-center gap-2 text-orange-400" aria-label="Currently looking for a job.">
			<span class="relative">
				<span
					class="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"
				></span>

				<IconCircle class="relative h-3 w-3 text-orange-400 drop-shadow-md" />
			</span>

			<span class="font-semibold tracking-tighter uppercase">Currently looking for a job.</span>
		</div>

		<div class="flex flex-col">
			<div class="flex items-center gap-2">
				<a
					href="mailto:rayssankn@gmail.com"
					class="group relative flex w-fit cursor-pointer items-center justify-center overflow-hidden rounded-md border p-2 font-bold transition-transform ease-out hover:scale-105"
				>
					<span
						class="absolute inset-0 z-0 h-full translate-y-9 rounded bg-orange-400 transition-transform duration-300 ease-in-out group-hover:translate-y-0"
					></span>

					<span
						class="relative flex items-center justify-center gap-2 text-orange-400 transition-colors duration-300 group-hover:text-white"
					>
						<IconEmail />
					</span>
				</a>
				<div class="flex flex-col text-zinc-300">
					<h1>Want to collaborate or work together?</h1>

					<h2>Send me an email.</h2>
				</div>
			</div>
			<div>
				<button
					on:click={copyToClipboard}
					on:keydown={handleKeyDown}
					class="group relative inline-block cursor-pointer rounded-md px-2 py-1 font-semibold text-white transition-all duration-500 ease-out hover:scale-105 hover:text-orange-400 hover:italic focus:ring-2 focus:ring-orange-400 focus:outline-none"
					aria-label="Click to copy email"
				>
					<span class="relative">
						{email}
						<span
							class="absolute top-5 bottom-0 left-1/2 h-[2px] w-0 bg-orange-400 transition-all duration-500 ease-out group-hover:left-0 group-hover:w-full"
						></span>
					</span>

					{#if copied}
						<span
							class="absolute right-[-20] mt-0 -translate-x-1/2 rounded-md bg-black px-2 py-1 text-xs text-white opacity-100 transition-opacity duration-300"
						>
							Copied!
						</span>
					{/if}
				</button>
			</div>
		</div>
	</div>
</section>
