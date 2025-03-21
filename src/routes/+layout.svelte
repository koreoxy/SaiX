<script>
	import '../app.css';
	let { children } = $props();
</script>

<div
	class="h-screen w-screen bg-[linear-gradient(to_right,rgba(128,128,128,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.2)_1px,transparent_1px)] bg-[size:40px_40px]"
>
	<div
		class="pointer-events-none absolute inset-0 -z-40 h-full bg-[url('noisetexture.jpg')] opacity-20 mix-blend-soft-light"
	/>
	{@render children()}
</div>
