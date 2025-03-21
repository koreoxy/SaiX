<script>
	import '../app.css';
	let { children } = $props();
</script>

<div
	class="h-screen w-screen bg-[linear-gradient(to_right,rgba(128,128,128,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.2)_1px,transparent_1px)] bg-[size:40px_40px]"
>
	{@render children()}
</div>
