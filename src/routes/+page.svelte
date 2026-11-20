<script>
  import ClusterDiagram from '#lib/ClusterDiagram.svelte';
  import Arrow from '#lib/Arrow.svelte';
  import { projects } from '#lib/projects.js';
  import { posts, formatDate } from '#lib/posts.js';
</script>

<svelte:head>
  <title>Fritz Israel – Software und Infrastruktur</title>
  <meta name="description" content="Fritz Israel, Software- und Webentwickler aus Königswinter. Betreibt VioServe auf einem eigenen Kubernetes-Cluster." />
</svelte:head>

<section class="hero">
  <div class="text">
    <h1>Fritz<br />Israel</h1>
    <p class="intro">
      Ich entwickle Software und betreibe die Infrastruktur, auf der sie läuft.
      Student und Webentwickler aus Königswinter, nebenbei Betreiber von VioServe.
    </p>
    <p class="actions">
      <a class="primary" href="/projekte/">Projekte <Arrow /></a>
      <a href="/blog/">Blog <Arrow /></a>
      <a href="mailto:fritz.israel.tech@outlook.de">E-Mail <Arrow /></a>
    </p>
  </div>
  <div class="art"><ClusterDiagram /></div>
</section>

<section class="band">
  <h2><span class="n">01</span> Woran ich arbeite</h2>
  <ul class="rows">
    {#each projects.slice(0, 3) as p, i}
      <li>
        <span class="idx">{String(i + 1).padStart(2, '0')}</span>
        <div>
          <h3><a href="/projekte/#{p.id}">{p.title}</a></h3>
          <p>{p.short}</p>
        </div>
        <p class="stack">{p.stack.join(' · ')}</p>
      </li>
    {/each}
  </ul>
</section>

{#if posts.length}
  <section class="band latest">
    <h2><span class="n">02</span> Zuletzt im Blog</h2>
    <ol class="posts">
      {#each posts.slice(0, 3) as p}
        <li>
          <time datetime={p.date}>{formatDate(p.date)}</time>
          <a href="/blog/{p.slug}/">{p.title}</a>
        </li>
      {/each}
    </ol>
    <p class="more"><a href="/blog/">Alle Beiträge <Arrow /></a></p>
  </section>
{/if}

<style>
  .hero {
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
    gap: var(--s4);
    align-items: center;
    padding-block: var(--s4) var(--s5);
  }
  h1 {
    margin-bottom: var(--s3);
    font-size: clamp(4rem, 11vw, 9rem);
    font-weight: 900;
    line-height: 0.88;
    letter-spacing: -0.045em;
  }
  .intro { max-width: 30rem; margin-bottom: var(--s3); font-size: 1.3125rem; line-height: 1.5; font-weight: 300; }
  .actions { display: flex; flex-wrap: wrap; gap: var(--s1); font: 0.875rem var(--mono); }
  .actions a {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.7rem 1rem;
    border: 2px solid var(--fg);
    text-decoration: none;
    transition: background-color 0.15s ease-out, color 0.15s ease-out, border-color 0.15s ease-out;
  }
  .actions .primary { background: var(--fg); color: var(--bg); }
  .actions a:hover { background: var(--signal); border-color: var(--signal); color: var(--on-signal); }
  .art { justify-self: end; width: 100%; }

  .band h2 {
    display: flex;
    gap: var(--s2);
    align-items: baseline;
    margin-bottom: var(--s3);
    padding-top: var(--s2);
    border-top: 2px solid var(--fg);
    font: 700 1rem var(--mono);
  }
  .n { color: var(--signal); }
  .rows { margin: 0; padding: 0; list-style: none; }
  .rows li {
    display: grid;
    grid-template-columns: 3.5rem minmax(0, 1fr) 16rem;
    gap: var(--s3);
    padding-block: var(--s3);
    border-bottom: 1px solid var(--rule);
  }
  .rows li:first-child { padding-top: 0; }
  .idx { font: 0.8125rem var(--mono); color: var(--muted); padding-top: 0.5rem; }
  h3 { margin-bottom: 0.35rem; font-size: 1.5rem; font-weight: 700; letter-spacing: -0.015em; }
  h3 a { text-decoration: none; }
  h3 a:hover { text-decoration: underline; text-decoration-color: var(--signal); }
  .rows p { color: var(--muted); max-width: 40rem; }
  .stack { font: 0.8125rem/1.7 var(--mono); color: var(--fg) !important; }

  .latest { margin-top: var(--s5); }
  .posts { margin: 0; padding: 0; list-style: none; }
  .posts li { display: grid; grid-template-columns: 11rem minmax(0, 1fr); gap: var(--s3); padding-block: 1.1rem; border-bottom: 1px solid var(--rule); align-items: baseline; }
  .posts time { font: 0.8125rem var(--mono); color: var(--muted); }
  .posts li a { font-size: 1.25rem; font-weight: 700; letter-spacing: -0.015em; text-decoration: none; }
  .posts li a:hover { color: var(--signal); }
  .more { margin-top: var(--s2); font: 0.875rem var(--mono); }
  .more a { display: inline-flex; align-items: center; gap: 0.6rem; }

  @media (max-width: 60rem) {
    .hero { grid-template-columns: 1fr; gap: var(--s4); padding-block: var(--s3) var(--s4); }
    .art { justify-self: start; }
  }
  @media (max-width: 45rem) {
    .rows li { grid-template-columns: 1fr; gap: var(--s1); }
    .idx { padding: 0; }
    .posts li { grid-template-columns: 1fr; gap: 0; }
    .actions a { flex: 1 1 100%; justify-content: space-between; }
  }
  @media (prefers-reduced-motion: reduce) { .actions a { transition: none; } }
</style>
