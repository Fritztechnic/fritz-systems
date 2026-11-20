<svelte:head>
  <title>Über mich – Fritz Israel</title>
  <meta name="description" content="Fritz Israel, Software- und Webentwickler aus Königswinter." />
</svelte:head>

<article class="prose">
  <h1>Über mich</h1>
  <p>
    Ich bin Fritz, Student und Webentwickler aus Königswinter. Ich baue Software gern von der
    Anwendung bis zum Server, weil man dabei am meisten darüber lernt, was im Betrieb wirklich
    kaputtgeht.
  </p>
  <p>Mit VioServe betreibe ich ein kleines Hosting-Angebot und kümmere mich um Code, Cluster und Netz.</p>

  <h2>Womit ich arbeite</h2>
  <dl>
    <div><dt>Betrieb</dt><dd>Linux, Kubernetes, Argo CD, Docker</dd></div>
    <div><dt>Netz</dt><dd>MikroTik, WireGuard, Proxmox VE, Traefik, DNS</dd></div>
    <div><dt>Daten</dt><dd>MariaDB, PostgreSQL, Longhorn, Backups</dd></div>
    <div><dt>Code</dt><dd>PHP und Laravel, TypeScript, Svelte und Next.js, C#, Python, Bash</dd></div>
  </dl>
</article>

<style>
  dl { margin: 0; }
  dl div { display: grid; grid-template-columns: 7rem minmax(0, 1fr); gap: var(--s2); padding-block: 0.9rem; border-bottom: 1px solid var(--rule); }
  dt { font: 700 0.875rem var(--mono); }
  dd { margin: 0; }
  @media (max-width: 45rem) { dl div { grid-template-columns: 1fr; gap: 0; } }
</style>
