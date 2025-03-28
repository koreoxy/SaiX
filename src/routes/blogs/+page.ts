import type { Post } from '$lib/type.js';

export async function load({ fetch }) {
	const response = await fetch('api/posts');
	const posts: Post[] = await response.json();

	return { posts };
}
