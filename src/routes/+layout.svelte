<script>
	import '../app.css';
	let { children } = $props();
</script>

<div
	class="flex min-h-screen w-screen flex-col bg-[linear-gradient(to_right,rgba(128,128,128,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.2)_1px,transparent_1px)] bg-[size:40px_40px]"
>
	<div
		class="pointer-events-none fixed inset-0 -z-40 h-full min-h-screen w-full bg-[url('noisetexture.jpg')] opacity-20 mix-blend-soft-light"
	></div>

	<div class="w-full flex-1">
		{@render children()}
	</div>
</div>
