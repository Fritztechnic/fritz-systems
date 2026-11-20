<script>
  import { posts, formatDate } from '#lib/posts.js';
  import Arrow from '#lib/Arrow.svelte';

  let { data } = $props();
  const post = $derived(posts.find((p) => p.slug === data.slug));
  const Body = $derived(post.component);
</script>

<svelte:head>
  <title>{post.title} – Fritz Israel</title>
  <meta name="description" content={post.summary} />
  <meta property="og:title" content={post.title} />
</svelte:head>

<article class="prose">
  <p class="meta">
    <time datetime={post.date}>{formatDate(post.date)}</time> · {post.minutes} Min. Lesezeit
  </p>
  <h1>{post.title}</h1>
  <Body />
  <p class="back"><a href="/blog/"><span class="flip"><Arrow /></span> Alle Beiträge</a></p>
</article>

<style>
  .back { margin-top: var(--s4); font: 0.875rem var(--mono); }
  .back a { display: inline-flex; align-items: center; gap: 0.6rem; }
  .flip { display: inline-flex; transform: scaleX(-1); }
</style>
