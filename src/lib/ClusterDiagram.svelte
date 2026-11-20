<svg viewBox="0 0 520 420" role="img" aria-labelledby="t d">
  <title id="t">Aufbau der Plattform</title>
  <desc id="d">
    Anfragen aus dem Internet laufen über Traefik auf drei Kubernetes-Knoten. Änderungen kommen
    aus Git über Argo CD in den Cluster. Longhorn speichert Daten dreifach repliziert.
  </desc>

  <!-- Deploy-Pfad -->
  <path class="line flow deploy" d="M50 60V205" />
  <!-- Anfragen -->
  <path class="line" d="M435 60V110" />
  <path class="line flow" d="M435 150V185H90V225M260 185V225M435 185V225" />

  <g class="box">
    <rect x="20" y="20" width="130" height="40" />
    <rect x="20" y="110" width="130" height="40" />
    <rect x="370" y="20" width="130" height="40" />
    <rect x="370" y="110" width="130" height="40" class="hot" />
  </g>
  <g class="label" text-anchor="middle">
    <text x="85" y="45">Git</text>
    <text x="85" y="135">Argo CD</text>
    <text x="435" y="45">Internet</text>
    <text x="435" y="135" class="on-hot">Traefik</text>
  </g>

  <rect class="cluster" x="8" y="205" width="504" height="207" />
  <text class="label small" x="20" y="226">RKE2-Cluster</text>

  {#each [['k8s1', 20], ['k8s2', 190], ['k8s3', 360]] as [name, x]}
    <g class="box">
      <rect {x} y="238" width="140" height="116" />
    </g>
    <text class="label" x={x + 12} y="262">{name}</text>
    {#each [0, 1, 2] as i}
      <rect class="pod" x={x + 12 + i * 40} y="278" width="30" height="22" />
      <rect class="pod" x={x + 12 + i * 40} y="308" width="30" height="22" />
    {/each}
  {/each}

  <rect class="store" x="20" y="366" width="480" height="32" />
  <text class="label small" x="260" y="386" text-anchor="middle">Longhorn · Volumes mit 3 Replikaten</text>
</svg>

<style>
  svg { display: block; width: 100%; height: auto; max-width: 34rem; }
  .line { fill: none; stroke: var(--fg); stroke-width: 2; }
  .flow { stroke-dasharray: 7 6; animation: flow 1.2s linear infinite; }
  .deploy { stroke: var(--signal); }
  .box rect, .cluster, .store { fill: var(--bg); stroke: var(--fg); stroke-width: 2; }
  .cluster { fill: var(--tint); stroke-dasharray: 2 6; stroke: var(--muted); stroke-width: 1.5; }
  .box .hot { fill: var(--signal); stroke: var(--signal); }
  .store { fill: none; stroke-width: 1.5; }
  .pod { fill: var(--muted); opacity: 0.45; }
  .label { fill: var(--fg); font: 700 13px var(--mono); }
  .label.small { font-weight: 500; font-size: 11.5px; fill: var(--muted); }
  .on-hot { fill: var(--on-signal); }

  @keyframes flow { to { stroke-dashoffset: -13; } }
  @media (prefers-reduced-motion: reduce) { .flow { animation: none; } }
</style>
