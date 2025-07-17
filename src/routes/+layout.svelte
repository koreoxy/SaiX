<script>
	import '../app.css';
	import { user } from '$lib/auth'; // Ensure session is always initialized
	import Navbar from '$lib/components/Navbar.svelte';
	import { page } from '$app/stores';
	let navItems = { '': 'Home', blog: 'Blog' };
</script>

<Navbar
	{navItems}
	currentPage={$page.url.pathname.replace(/^\//, '')}
	isLoggedIn={Boolean($user)}
/>

<div
	class="flex min-h-screen w-screen flex-col bg-[linear-gradient(to_right,rgba(128,128,128,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.2)_1px,transparent_1px)] bg-[size:40px_40px]"
>
	<div
		class="pointer-events-none fixed inset-0 -z-40 h-full min-h-screen w-full bg-[url('noisetexture.jpg')] opacity-20 mix-blend-soft-light"
	></div>

	<div class="w-full flex-1">
		<slot />
	</div>
</div>
