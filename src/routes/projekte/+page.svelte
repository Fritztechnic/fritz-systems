<script>
  import { projects } from '#lib/projects.js';
</script>

<svelte:head>
  <title>Projekte – Fritz Israel</title>
  <meta name="description" content="Projekte von Fritz Israel: VioServe, Kubernetes-Plattform, Netz und Überwachung." />
</svelte:head>

<article class="prose wide">
  <h1>Projekte</h1>
  <p class="lead">Was ich baue und betreibe, mit den Werkzeugen dahinter. Was dabei schiefging, steht im <a href="/blog/">Blog</a>.</p>

  {#each projects as p, i}
    <section id={p.id}>
      <span class="idx">{String(i + 1).padStart(2, '0')}</span>
      <div class="body">
        <h2>{p.title}</h2>
        {#each p.long as para}<p>{para}</p>{/each}
        {#if p.points.length}
          <ul>{#each p.points as pt}<li>{pt}</li>{/each}</ul>
        {/if}
        <p class="stack">{p.stack.join(' · ')}</p>
        {#if p.link}<p><a href={p.link[0]} rel="noopener">{p.link[1]}</a></p>{/if}
      </div>
    </section>
  {/each}
</article>

<style>
  .lead { max-width: 36rem; font-size: 1.25rem; font-weight: 300; margin-bottom: var(--s4); }
  section {
    display: grid;
    grid-template-columns: 5rem minmax(0, 42rem);
    gap: var(--s3);
    padding-block: var(--s3);
    border-top: 2px solid var(--fg);
  }
  .idx { font: 0.8125rem var(--mono); color: var(--signal); padding-top: 0.6rem; }
  section :global(h2) { margin: 0 0 var(--s2); padding: 0; border: 0; font-size: 2rem; }
  .stack { font: 0.8125rem/1.7 var(--mono); color: var(--muted); }
  @media (max-width: 45rem) { section { grid-template-columns: 1fr; gap: 0; } .idx { padding: 0 0 var(--s1); } }
</style>
