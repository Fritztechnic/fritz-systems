<svg viewBox="0 0 540 760" role="img" aria-labelledby="t d">
  <title id="t">Fritz, VioServe und die Infrastruktur dahinter</title>
  <desc id="d">
    Fritz entwickelt und betreibt VioServe: Kundenportal, Game-Server, VPS und Webhosting. Das läuft
    auf einem Kubernetes-Cluster hinter MikroTik-Router und Traefik, ausgerollt über Git und Argo CD.
    Darunter liegen Proxmox, Datenbanken, Longhorn-Speicher und Monitoring auf eigener Hardware.
  </desc>

  <!-- Wege: Code, Deploy, Anfragen, Schichten -->
  <path class="line flow" d="M170 42H370" />
  <path class="line flow deploy" d="M500 42H526V334H500" />
  <path class="line" d="M95 64V96M260 276V316M294 352V374M435 352V374M260 490V520M260 700V716" />
  <path class="line flow" d="M108 334H128M228 334H248" />
  <path class="line deploy" d="M435 352V374" />

  <g class="box">
    <rect x="20" y="20" width="150" height="44" class="hot" />
    <rect x="370" y="20" width="130" height="44" />
  </g>
  <text class="label on-hot" x="95" y="48" text-anchor="middle">Fritz</text>
  <text class="label" x="435" y="48" text-anchor="middle">Git</text>
  <text class="label small" x="270" y="34" text-anchor="middle">Code</text>

  <rect class="cluster" x="8" y="96" width="524" height="180" />
  <text class="label big" x="20" y="120">VioServe</text>
  <g class="box">
    <rect x="20" y="138" width="234" height="56" />
    <text class="label" x="32" y="162">Kundenportal</text>
    <text class="label small" x="32" y="181">Laravel, Next.js</text>
    <rect x="266" y="138" width="234" height="56" />
    <text class="label" x="278" y="162">Game-Server</text>
    <text class="label small" x="278" y="181">Pelican, Wings</text>
    <rect x="20" y="204" width="234" height="56" />
    <text class="label" x="32" y="228">VPS</text>
    <text class="label small" x="32" y="247">Proxmox VE</text>
    <rect x="266" y="204" width="234" height="56" />
    <text class="label" x="278" y="228">Webhosting</text>
    <text class="label small" x="278" y="247">Domains und Webseiten</text>
  </g>

  <text class="label small" x="272" y="300">läuft auf</text>

  <g class="box">
    <rect x="20" y="316" width="88" height="36" />
    <rect x="128" y="316" width="100" height="36" />
    <rect x="248" y="316" width="92" height="36" class="hot" />
    <rect x="370" y="316" width="130" height="36" />
  </g>
  <g class="label" text-anchor="middle">
    <text x="64" y="339">Internet</text>
    <text x="178" y="339">MikroTik</text>
    <text x="294" y="339" class="on-hot">Traefik</text>
    <text x="435" y="339">Argo CD</text>
  </g>

  <rect class="cluster" x="8" y="374" width="524" height="116" />
  <text class="label small" x="20" y="394">Kubernetes (RKE2), 3 Knoten</text>
  <rect class="node" x="20" y="402" width="150" height="76" />
  <text class="label" x="32" y="422">k8s1</text>
  <rect class="pod" x="32" y="434" width="18" height="14" />
  <rect class="pod" x="54" y="434" width="18" height="14" />
  <rect class="pod" x="76" y="434" width="18" height="14" />
  <rect class="pod" x="98" y="434" width="18" height="14" />
  <rect class="pod" x="120" y="434" width="18" height="14" />
  <rect class="pod" x="142" y="434" width="18" height="14" />
  <rect class="pod" x="32" y="454" width="18" height="14" />
  <rect class="pod" x="54" y="454" width="18" height="14" />
  <rect class="pod" x="76" y="454" width="18" height="14" />
  <rect class="pod" x="98" y="454" width="18" height="14" />
  <rect class="pod" x="120" y="454" width="18" height="14" />
  <rect class="pod" x="142" y="454" width="18" height="14" />
  <rect class="node" x="185" y="402" width="150" height="76" />
  <text class="label" x="197" y="422">k8s2</text>
  <rect class="pod" x="197" y="434" width="18" height="14" />
  <rect class="pod" x="219" y="434" width="18" height="14" />
  <rect class="pod" x="241" y="434" width="18" height="14" />
  <rect class="pod" x="263" y="434" width="18" height="14" />
  <rect class="pod" x="285" y="434" width="18" height="14" />
  <rect class="pod" x="307" y="434" width="18" height="14" />
  <rect class="pod" x="197" y="454" width="18" height="14" />
  <rect class="pod" x="219" y="454" width="18" height="14" />
  <rect class="pod" x="241" y="454" width="18" height="14" />
  <rect class="pod" x="263" y="454" width="18" height="14" />
  <rect class="pod" x="285" y="454" width="18" height="14" />
  <rect class="pod" x="307" y="454" width="18" height="14" />
  <rect class="node" x="350" y="402" width="150" height="76" />
  <text class="label" x="362" y="422">k8s3</text>
  <rect class="pod" x="362" y="434" width="18" height="14" />
  <rect class="pod" x="384" y="434" width="18" height="14" />
  <rect class="pod" x="406" y="434" width="18" height="14" />
  <rect class="pod" x="428" y="434" width="18" height="14" />
  <rect class="pod" x="450" y="434" width="18" height="14" />
  <rect class="pod" x="472" y="434" width="18" height="14" />
  <rect class="pod" x="362" y="454" width="18" height="14" />
  <rect class="pod" x="384" y="454" width="18" height="14" />
  <rect class="pod" x="406" y="454" width="18" height="14" />
  <rect class="pod" x="428" y="454" width="18" height="14" />
  <rect class="pod" x="450" y="454" width="18" height="14" />
  <rect class="pod" x="472" y="454" width="18" height="14" />

  <rect class="cluster" x="8" y="520" width="524" height="180" />
  <text class="label big" x="20" y="544">Betrieb und Daten</text>
  <g class="box">
    <rect x="20" y="562" width="234" height="56" />
    <text class="label" x="32" y="586">Proxmox VE</text>
    <text class="label small" x="32" y="605">VMs und Backups</text>
    <rect x="266" y="562" width="234" height="56" />
    <text class="label" x="278" y="586">Datenbanken</text>
    <text class="label small" x="278" y="605">MariaDB, PostgreSQL</text>
    <rect x="20" y="628" width="234" height="56" />
    <text class="label" x="32" y="652">Longhorn</text>
    <text class="label small" x="32" y="671">Volumes, 3 Replikate</text>
    <rect x="266" y="628" width="234" height="56" />
    <text class="label" x="278" y="652">Monitoring</text>
    <text class="label small" x="278" y="671">Checkmk, Grafana, Loki</text>
  </g>

  <rect class="store" x="8" y="716" width="524" height="36" />
  <text class="label small" x="270" y="739" text-anchor="middle">Eigene Hardware mit USV, Anbindung Equinix Frankfurt</text>
</svg>

<style>
  svg { display: block; width: 100%; height: auto; max-width: 36rem; }
  .line { fill: none; stroke: var(--fg); stroke-width: 2; }
  .flow { stroke-dasharray: 7 6; animation: flow 1.2s linear infinite; }
  .deploy { stroke: var(--signal); }
  .box rect, .node, .store { fill: var(--bg); stroke: var(--fg); stroke-width: 2; }
  .cluster { fill: var(--tint); stroke-dasharray: 2 6; stroke: var(--muted); stroke-width: 1.5; }
  .box .hot { fill: var(--signal); stroke: var(--signal); }
  .node { stroke-width: 1.5; }
  .store { fill: none; stroke-width: 1.5; stroke-dasharray: 2 6; stroke: var(--muted); }
  .pod { fill: var(--muted); opacity: 0.45; }
  .label { fill: var(--fg); font: 700 13px var(--mono); }
  .label.big { font-size: 16px; }
  .label.small { font-weight: 500; font-size: 12px; fill: var(--muted); }
  .on-hot { fill: var(--on-signal); }

  @keyframes flow { to { stroke-dashoffset: -13; } }
  @media (prefers-reduced-motion: reduce) { .flow { animation: none; } }
</style>
