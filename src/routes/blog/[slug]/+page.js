import { error } from '@sveltejs/kit';
import { posts } from '#lib/posts.js';

export const entries = () => posts.map((p) => ({ slug: p.slug }));

export function load({ params }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) error(404, 'Beitrag nicht gefunden');
  return { slug: post.slug };
}
