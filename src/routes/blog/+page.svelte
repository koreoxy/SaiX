<svelte:head>
  <title>Blog | SaiX</title>
  <meta name="description" content="Insights, tutorials, and updates from the SaiX team." />
</svelte:head>

<script lang="ts">
  import { supabase } from '$lib';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { user } from '$lib/auth';

  let posts: any[] = [];
  let loading = true;
  let error = '';
  let deleting = '';

  async function fetchPosts() {
    loading = true;
    error = '';
    const { data, error: fetchError } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });
    if (fetchError) {
      error = fetchError.message;
      posts = [];
    } else {
      posts = data;
    }
    loading = false;
  }

  async function deletePost(id: string) {
    if (!confirm('Delete this blog post?')) return;
    deleting = id;
    const { error: deleteError } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);
    if (deleteError) {
      error = deleteError.message;
    } else {
      posts = posts.filter(p => p.id !== id);
    }
    deleting = '';
  }

  async function logout() {
    await supabase.auth.signOut();
    goto('/login');
  }

  onMount(fetchPosts);
</script>

<section class="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-neutral-950">
  <div class="max-w-2xl mx-auto text-center mb-12">
    <h1 class="text-5xl font-extrabold text-white mb-4 tracking-tight">Blog</h1>
    <p class="text-xl text-neutral-400 font-light mb-6">Insights, tutorials, and updates from the SaiX team.</p>
    {#if $user}
      <div class="flex flex-col items-center gap-2 mb-4">
        <span class="text-neutral-400 text-sm">Signed in as {$user.email}</span>
        <button on:click={logout} class="bg-neutral-800 hover:bg-neutral-700 text-white rounded px-4 py-1 text-xs font-semibold transition-colors">Logout</button>
      </div>
      <a href="/blog/new" class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-6 py-2 transition-colors mb-2">+ Create New Post</a>
    {:else}
      <a href="/login" class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-6 py-2 transition-colors mb-2">Login with GitHub</a>
    {/if}
  </div>
  {#if loading}
    <div class="flex justify-center items-center min-h-[200px]">
      <span class="text-neutral-400">Loading...</span>
    </div>
  {:else if error}
    <div class="flex justify-center items-center min-h-[200px]">
      <span class="text-red-400">{error}</span>
    </div>
  {:else if posts.length === 0}
    <div class="flex justify-center items-center min-h-[200px]">
      <span class="text-neutral-400">No blog posts found.</span>
    </div>
  {:else}
    <div class="grid gap-10 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
      {#each posts as post}
        <div class="group block rounded-3xl overflow-hidden bg-gradient-to-b from-neutral-900 to-neutral-950 shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-neutral-800 hover:border-blue-700 relative">
          <a href={`/blog/${post.slug}`} class="block">
            <img src={post.image} alt={post.title} class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100" />
            <div class="p-7 flex flex-col gap-3">
              <h2 class="text-2xl font-semibold text-white group-hover:text-blue-400 mb-1 transition-colors duration-300 leading-tight">{post.title}</h2>
              <p class="text-xs text-neutral-500 mb-2 tracking-wide uppercase">{post.created_at?.slice(0, 10)}</p>
              <p class="text-neutral-300 font-light mb-4 line-clamp-3">{post.content?.slice(0, 120)}...</p>
            </div>
          </a>
          {#if $user}
            <div class="absolute top-4 right-4 flex gap-2 z-10">
              <a href={`/blog/edit/${post.id}`} class="bg-yellow-500 hover:bg-yellow-600 text-white rounded px-3 py-1 text-xs font-semibold transition-colors">Edit</a>
              <button on:click={() => deletePost(post.id)} class="bg-red-600 hover:bg-red-700 text-white rounded px-3 py-1 text-xs font-semibold transition-colors disabled:opacity-60" disabled={deleting === post.id}>
                {deleting === post.id ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  {/if}
</section> 