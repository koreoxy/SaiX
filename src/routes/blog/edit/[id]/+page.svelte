<script lang="ts">
  import { supabase } from '$lib';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { user } from '$lib/auth';
  let id = '';
  let title = '';
  let slug = '';
  let content = '';
  let image = '';
  let loading = true;
  let error = '';
  let success = false;
  $: id = $page.params.id;
  onMount(() => {
    if (!$user) goto('/login');
    else fetchPost();
  });
  async function fetchPost() {
    loading = true;
    error = '';
    const { data, error: fetchError } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single();
    if (fetchError) {
      error = fetchError.message;
    } else if (data) {
      title = data.title;
      slug = data.slug;
      content = data.content;
      image = data.image;
    }
    loading = false;
  }
  async function updatePost() {
    loading = true;
    error = '';
    success = false;
    if (!title || !slug || !content) {
      error = 'Title, slug, and content are required.';
      loading = false;
      return;
    }
    const { error: updateError } = await supabase
      .from('blog_posts')
      .update({ title, slug, content, image, updated_at: new Date().toISOString() })
      .eq('id', id);
    loading = false;
    if (updateError) {
      error = updateError.message;
    } else {
      success = true;
      setTimeout(() => goto('/blog'), 1200);
    }
  }
  async function logout() {
    await supabase.auth.signOut();
    goto('/login');
  }
</script>

<svelte:head>
  <title>Edit Blog Post | SaiX</title>
</svelte:head>

<section class="min-h-screen bg-neutral-950 flex items-center justify-center py-16 px-4">
  {#if loading}
    <div class="text-neutral-400">Loading...</div>
  {:else if $user}
    <form class="w-full max-w-xl bg-neutral-900 rounded-2xl shadow-xl p-10 flex flex-col gap-6" on:submit|preventDefault={updatePost}>
      <h1 class="text-3xl font-bold text-white mb-2">Edit Blog Post</h1>
      <div class="flex flex-col gap-2">
        <label class="text-neutral-300 text-sm font-medium">Title</label>
        <input class="bg-neutral-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" bind:value={title} required />
      </div>
      <div class="flex flex-col gap-2">
        <label class="text-neutral-300 text-sm font-medium">Slug</label>
        <input class="bg-neutral-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" bind:value={slug} required />
      </div>
      <div class="flex flex-col gap-2">
        <label class="text-neutral-300 text-sm font-medium">Image URL</label>
        <input class="bg-neutral-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" bind:value={image} />
      </div>
      <div class="flex flex-col gap-2">
        <label class="text-neutral-300 text-sm font-medium">Content</label>
        <textarea class="bg-neutral-800 text-white rounded-lg px-4 py-2 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-blue-500" bind:value={content} required />
      </div>
      {#if error}
        <div class="text-red-400 text-sm">{error}</div>
      {/if}
      {#if success}
        <div class="text-green-400 text-sm">Blog post updated! Redirecting...</div>
      {/if}
      <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-6 py-2 transition-colors disabled:opacity-60" disabled={loading}>
        {loading ? 'Updating...' : 'Update Post'}
      </button>
      <a href="/blog" class="text-blue-400 hover:underline text-sm mt-2">← Back to Blog</a>
      <button type="button" on:click={logout} class="bg-neutral-800 hover:bg-neutral-700 text-white rounded px-4 py-1 text-xs font-semibold transition-colors mt-4">Logout</button>
      <span class="text-neutral-400 text-xs mt-1">Signed in as {$user.email}</span>
    </form>
  {/if}
</section> 