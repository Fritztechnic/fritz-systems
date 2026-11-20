<script>
  const skills = [
    ['Entwickeln', 'PHP, TypeScript, C#'],
    ['Ausrollen', 'Git, Argo CD'],
    ['Betreiben', 'Linux, Netz']
  ];
  const nodes = [20, 185, 350];
  const ops = [
    ['Proxmox VE', 'VMs, Backups'],
    ['Datenbanken', 'MariaDB, PG'],
    ['Longhorn', '3 Replikate'],
    ['Monitoring', 'Checkmk']
  ];
</script>

<svg viewBox="0 0 540 640" role="img" aria-labelledby="t d">
  <title id="t">Fritz, VioServe und die Infrastruktur dahinter</title>
  <desc id="d">
    Fritz entwickelt, rollt aus und betreibt VioServe: Kundenportal, Game-Server, VPS und Webhosting.
    Das läuft hinter MikroTik-Router und Traefik auf einem Kubernetes-Cluster. Darunter liegen Proxmox,
    Datenbanken, Longhorn-Speicher und Monitoring auf eigener Hardware.
  </desc>

  <path class="line" d="M260 104V124M260 304V324M294 360V378M260 462V482M260 586V600" />
  <path class="line flow" d="M108 342H128M228 342H248M340 342H360" />

  <rect class="hot-box" x="20" y="8" width="480" height="96" />
  <text class="label name on-hot" x="36" y="40">Fritz</text>
  <text class="label small on-hot" x="484" y="38" text-anchor="end">von Code bis Betrieb</text>
  {#each skills as [t, d], i}
    <text class="label on-hot" x={36 + i * 160} y="70">{t}</text>
    <text class="label small on-hot" x={36 + i * 160} y="88">{d}</text>
  {/each}

  <rect class="cluster" x="8" y="124" width="524" height="180" />
  <text class="label big" x="20" y="148">VioServe</text>
  <g class="box">
    <rect x="20" y="166" width="234" height="56" />
    <text class="label" x="32" y="190">Kundenportal</text>
    <text class="label small" x="32" y="209">Laravel, Next.js</text>
    <rect x="266" y="166" width="234" height="56" />
    <text class="label" x="278" y="190">Game-Server</text>
    <text class="label small" x="278" y="209">Pelican, Wings</text>
    <rect x="20" y="232" width="234" height="56" />
    <text class="label" x="32" y="256">VPS</text>
    <text class="label small" x="32" y="275">Proxmox VE</text>
    <rect x="266" y="232" width="234" height="56" />
    <text class="label" x="278" y="256">Webhosting</text>
    <text class="label small" x="278" y="275">Domains und Webseiten</text>
  </g>

  <text class="label small" x="272" y="319">läuft auf</text>
  <g class="box">
    <rect x="20" y="324" width="88" height="36" />
    <rect x="128" y="324" width="100" height="36" />
    <rect x="248" y="324" width="92" height="36" class="hot" />
    <rect x="360" y="324" width="140" height="36" />
  </g>
  <g class="label" text-anchor="middle">
    <text x="64" y="347">Internet</text>
    <text x="178" y="347">MikroTik</text>
    <text x="294" y="347" class="label on-hot">Traefik</text>
    <text x="430" y="347">Kubernetes</text>
  </g>

  <rect class="cluster" x="8" y="378" width="524" height="84" />
  <text class="label small" x="20" y="396">RKE2, 3 Knoten</text>
  {#each nodes as x, n}
    <rect class="node" {x} y="404" width="150" height="46" />
    <text class="label" x={x + 12} y="422">k8s{n + 1}</text>
    {#each Array(6) as _, i}
      <rect class="pod" x={x + 12 + i * 22} y="430" width="18" height="10" />
    {/each}
  {/each}

  <rect class="cluster" x="8" y="482" width="524" height="104" />
  <text class="label big" x="20" y="506">Betrieb und Daten</text>
  <g class="box">
    {#each ops as [t, d], i}
      <rect x={20 + i * 122} y="520" width="114" height="52" />
      <text class="label" x={30 + i * 122} y="541">{t}</text>
      <text class="label small" x={30 + i * 122} y="559">{d}</text>
    {/each}
  </g>

  <rect class="store" x="8" y="600" width="524" height="32" />
  <text class="label small" x="270" y="620" text-anchor="middle">Eigene Hardware mit USV, Anbindung Equinix Frankfurt</text>
</svg>

<style>
  svg { display: block; width: 100%; height: auto; max-width: 36rem; }
  .line { fill: none; stroke: var(--fg); stroke-width: 2; }
  .flow { stroke-dasharray: 7 6; animation: flow 1.2s linear infinite; }
  .deploy { stroke: var(--signal); }
  .box rect, .node, .store { fill: var(--bg); stroke: var(--fg); stroke-width: 2; }
  .cluster { fill: var(--tint); stroke-dasharray: 2 6; stroke: var(--muted); stroke-width: 1.5; }
  .box .hot { fill: var(--signal); stroke: var(--signal); }
  .hot-box { fill: var(--signal); }
  .node { stroke-width: 1.5; }
  .store { fill: none; stroke-width: 1.5; stroke-dasharray: 2 6; stroke: var(--muted); }
  .pod { fill: var(--muted); opacity: 0.45; }
  .label { fill: var(--fg); font: 700 13px var(--mono); }
  .label.big { font-size: 16px; }
  .label.small { font-weight: 500; font-size: 12px; fill: var(--muted); }
  .label.name { font-size: 24px; font-weight: 900; }
  .label.on-hot { fill: var(--on-signal); }
  .label.small.on-hot { opacity: 0.85; }

  @keyframes flow { to { stroke-dashoffset: -13; } }
  @media (prefers-reduced-motion: reduce) { .flow { animation: none; } }
</style>
