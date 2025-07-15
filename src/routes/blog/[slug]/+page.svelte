<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  // Sample blog data (in real app, fetch by slug)
  const posts = [
    {
      title: 'Introducing SaiX Blog',
      date: '2024-06-01',
      content: `Welcome to the SaiX blog! Stay tuned for updates, tutorials, and more.\n\nThis is a sample blog post.`,
      image: 'https://source.unsplash.com/random/1200x500?minimal,blog',
      slug: 'introducing-saix-blog'
    },
    {
      title: 'Building with Svelte and TailwindCSS',
      date: '2024-06-02',
      content: `A quick guide on how we use Svelte and TailwindCSS to build beautiful, modern UIs.\n\nThis is a sample blog post.`,
      image: 'https://source.unsplash.com/random/1200x500?code,svelte',
      slug: 'building-with-svelte-tailwindcss'
    },
    {
      title: 'Minimalism in Web Design',
      date: '2024-06-03',
      content: `Why less is more: embracing minimalism for better user experiences.\n\nThis is a sample blog post.`,
      image: 'https://source.unsplash.com/random/1200x500?minimal,design',
      slug: 'minimalism-in-web-design'
    }
  ];

  let post = null;
  $: slug = $page.params.slug;
  $: post = posts.find(p => p.slug === slug);

  onMount(() => {
    if (!post) goto('/blog');
  });
</script>

<svelte:head>
  <title>{post ? post.title + ' | SaiX Blog' : 'Blog | SaiX'}</title>
  <meta name="description" content={post ? post.content.slice(0, 120) : 'SaiX Blog post'} />
</svelte:head>

{#if post}
  <section class="min-h-screen py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
    <div class="w-full max-w-3xl mx-auto">
      <a href="/blog" class="text-blue-400 hover:underline text-sm mb-8 inline-block">← Back to Blog</a>
      <img src={post.image} alt={post.title} class="w-full h-64 object-cover rounded-2xl mb-8 shadow-lg" />
      <h1 class="text-4xl font-extrabold text-white mb-4 leading-tight">{post.title}</h1>
      <p class="text-neutral-400 text-sm mb-8">{post.date}</p>
      <div class="prose prose-invert prose-lg text-neutral-200 max-w-none mb-12 whitespace-pre-line">
        {post.content}
      </div>
    </div>
  </section>
{:else}
  <section class="min-h-screen flex items-center justify-center bg-neutral-950">
    <div class="text-center">
      <h2 class="text-2xl text-white mb-4">Post not found</h2>
      <a href="/blog" class="text-blue-400 hover:underline">Back to Blog</a>
    </div>
  </section>
{/if} 