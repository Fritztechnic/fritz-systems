<script>
  import { posts, formatDate } from '#lib/posts.js';
</script>

<svelte:head>
  <title>Blog – Fritz Israel</title>
  <meta name="description" content="Notizen zu Infrastruktur, Kubernetes und Betrieb." />
</svelte:head>

<section class="prose wide">
  <h1>Blog</h1>
  {#if posts.length}
    <ol class="posts">
      {#each posts as p}
        <li>
          <time datetime={p.date}>{formatDate(p.date)}</time>
          <div>
            <h2><a href="/blog/{p.slug}/">{p.title}</a></h2>
            <p>{p.summary}</p>
          </div>
        </li>
      {/each}
    </ol>
  {:else}
    <p>Noch keine Beiträge.</p>
  {/if}
</section>

<style>
  .posts { margin: 0; padding: 0; list-style: none; }
  li { display: grid; grid-template-columns: 11rem minmax(0, 1fr); gap: var(--s3); padding-block: var(--s3); border-top: 1px solid var(--rule); }
  time { padding-top: 0.45rem; font: 0.8125rem var(--mono); color: var(--muted); }
  .posts :global(h2) { margin: 0 0 0.4rem; padding: 0; border: 0; font-size: 1.75rem; letter-spacing: -0.02em; }
  h2 a { text-decoration: none; }
  h2 a:hover { color: var(--signal); }
  p { margin: 0; color: var(--muted); max-width: 40rem; }
  @media (max-width: 45rem) { li { grid-template-columns: 1fr; gap: var(--s1); } time { padding: 0; } }
</style>
