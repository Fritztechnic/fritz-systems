<script>
  import Tech from '#lib/Tech.svelte';
</script>

<svelte:head>
  <title>Über mich – Fritz Israel</title>
  <meta name="description" content="Fritz Israel, Schüler und Webentwickler aus Königswinter: Erfahrung, Sprachen und Werkzeuge." />
</svelte:head>

<article class="prose">
  <h1>Über mich</h1>
  <p>
    Ich bin Fritz, Schüler und Webentwickler aus Königswinter. Am liebsten baue ich etwas vom
    Code bis zum Server, denn erst im Betrieb zeigt sich, was wirklich kaputtgeht. Das meiste
    habe ich mir selbst beigebracht, und VioServe ist dafür mein Übungsfeld mit echten Kunden.
  </p>

  <h2>Erfahrung</h2>
  <ol class="timeline">
    <li>
      <span class="when">seit Okt. 2025</span>
      <div>
        <strong>Gründer und technischer Leiter, VioServe</strong>
        <p>
          Von einer einfachen Docker-Lösung für Minecraft-Server zur Hosting-Plattform mit Kundenportal
          (Laravel, Next.js), Gameservern über Pelican und VPS auf Proxmox mit Backups über den Proxmox
          Backup Server. Dazu das Netz mit MikroTik, EoIP-Tunneln und eigenem /27-Netz im Rechenzentrum
          Equinix Frankfurt, eigene Server-Hardware mit USV und inzwischen ein RKE2-Cluster mit Argo CD.
        </p>
      </div>
    </li>
    <li>
      <span class="when">Schule</span>
      <div>
        <strong>Gründer und Leiter der Programmier-AG</strong>
        <p>Ich bringe Mitschülerinnen und Mitschülern HTML, Python und aktuell Java bei.</p>
      </div>
    </li>
  </ol>

  <h2>Womit ich arbeite</h2>
  <dl>
    <div><dt>Sprachen</dt><dd><span class="tags"><Tech name="PHP" /><Tech name="JavaScript" /><Tech name="TypeScript" /><Tech name="HTML" /><Tech name="CSS" /><Tech name="Python" /><Tech name="Java" /></span><small>Dazu C# und Rust in Teilen.</small></dd></div>
    <div><dt>Frameworks</dt><dd><span class="tags"><Tech name="Laravel" /><Tech name="Next.js" /><Tech name="SvelteKit" /><Tech name="ASP.NET Core" /></span></dd></div>
    <div><dt>Betrieb</dt><dd><span class="tags"><Tech name="Linux" /><Tech name="Docker" /><Tech name="Kubernetes" /><Tech name="Argo CD" /><Tech name="Proxmox VE" /></span></dd></div>
    <div><dt>Netz</dt><dd><span class="tags"><Tech name="MikroTik" /><Tech name="WireGuard" /><Tech name="Traefik" /></span><small>Dazu EoIP, Routing, Subnetting, NAT und DNS.</small></dd></div>
    <div><dt>Daten</dt><dd><span class="tags"><Tech name="MariaDB" /><Tech name="PostgreSQL" /><Tech name="Redis" /><Tech name="InfluxDB" /><Tech name="Longhorn" /></span><small>Dazu Backups.</small></dd></div>
    <div><dt>Automation</dt><dd><span class="tags"><Tech name="Siemens S7" /></span><small>Mit TIA Portal und HMI-Panels, mehrere Zertifikate.</small></dd></div>
    <div><dt>Bauen</dt><dd><span class="tags"><Tech name="Fusion 360" /></span><small>Dazu 3D-Druck.</small></dd></div>
  </dl>

  <h2>Interessen</h2>
  <p>Physik, Mathematik, Elektrotechnik, Audiotechnik, IoT und alles, was sich messen lässt.</p>
</article>

<style>
  dl { margin: 0; }
  dl div { display: grid; grid-template-columns: 7rem minmax(0, 1fr); gap: var(--s2); padding-block: 0.9rem; border-bottom: 1px solid var(--rule); }
  dt { font: 700 0.875rem var(--mono); }
  dd { margin: 0; }
  .tags { display: flex; flex-wrap: wrap; gap: 0.4rem 1.1rem; font: 0.875rem var(--mono); }
  dd small { display: block; margin-top: 0.3rem; color: var(--muted); font-size: 0.875rem; }
  @media (max-width: 45rem) { dl div { grid-template-columns: 1fr; gap: 0; } }
  .timeline { list-style: none; margin: 0; padding: 0; }
  .timeline li { display: grid; grid-template-columns: 8rem minmax(0, 1fr); gap: var(--s2); padding-block: 1rem; border-bottom: 1px solid var(--rule); }
  .timeline p { margin: 0.3rem 0 0; }
  .when { font: 0.8125rem var(--mono); color: var(--muted); padding-top: 0.2rem; }
  @media (max-width: 45rem) { .timeline li { grid-template-columns: 1fr; gap: 0; } }
</style>
