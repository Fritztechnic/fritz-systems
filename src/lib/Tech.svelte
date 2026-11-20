<script>
  import * as si from 'simple-icons';

  const icons = {
    PHP: si.siPhp, Laravel: si.siLaravel, TypeScript: si.siTypescript, JavaScript: si.siJavascript,
    HTML: si.siHtml5, CSS: si.siCss, Python: si.siPython, Java: si.siOpenjdk, Rust: si.siRust,
    'ASP.NET Core': si.siDotnet, SvelteKit: si.siSvelte, 'Next.js': si.siNextdotjs, Linux: si.siLinux,
    Docker: si.siDocker, Kubernetes: si.siKubernetes, RKE2: si.siRancher, 'Argo CD': si.siArgo,
    MikroTik: si.siMikrotik, RouterOS: si.siMikrotik, 'Proxmox VE': si.siProxmox, WireGuard: si.siWireguard,
    Traefik: si.siTraefikproxy, MariaDB: si.siMariadb, MySQL: si.siMysql, PostgreSQL: si.siPostgresql,
    Redis: si.siRedis, InfluxDB: si.siInfluxdb, Longhorn: si.siLonghorn, Checkmk: si.siCheckmk,
    Grafana: si.siGrafana, 'Siemens S7': si.siSiemens, 'Fusion 360': si.siAutodesk, Pelican: si.siPelican,
    nginx: si.siNginx, Git: si.siGit, GitHub: si.siGithub
  };
  const urls = {
    PHP: 'https://www.php.net', Laravel: 'https://laravel.com', TypeScript: 'https://www.typescriptlang.org',
    JavaScript: 'https://developer.mozilla.org/docs/Web/JavaScript', HTML: 'https://developer.mozilla.org/docs/Web/HTML',
    CSS: 'https://developer.mozilla.org/docs/Web/CSS', Python: 'https://www.python.org', Java: 'https://openjdk.org',
    Rust: 'https://www.rust-lang.org', 'C#': 'https://learn.microsoft.com/dotnet/csharp/',
    'ASP.NET Core': 'https://dotnet.microsoft.com/apps/aspnet', SvelteKit: 'https://svelte.dev/docs/kit',
    'Next.js': 'https://nextjs.org', Linux: 'https://www.kernel.org', Docker: 'https://www.docker.com',
    Kubernetes: 'https://kubernetes.io', RKE2: 'https://docs.rke2.io', 'Argo CD': 'https://argo-cd.readthedocs.io',
    MikroTik: 'https://mikrotik.com', RouterOS: 'https://help.mikrotik.com/docs/spaces/ROS/overview',
    'Proxmox VE': 'https://www.proxmox.com/proxmox-virtual-environment', WireGuard: 'https://www.wireguard.com',
    Traefik: 'https://traefik.io/traefik', MariaDB: 'https://mariadb.org', MySQL: 'https://www.mysql.com',
    PostgreSQL: 'https://www.postgresql.org', Redis: 'https://redis.io', InfluxDB: 'https://www.influxdata.com',
    Longhorn: 'https://longhorn.io', Checkmk: 'https://checkmk.com', Grafana: 'https://grafana.com',
    'Siemens S7': 'https://www.siemens.com/global/en/products/automation/systems/industrial/plc.html',
    'Fusion 360': 'https://www.autodesk.com/products/fusion-360', Pelican: 'https://pelican.dev',
    nginx: 'https://nginx.org', 'cert-manager': 'https://cert-manager.io', EoIP: 'https://help.mikrotik.com/docs/spaces/ROS/pages/24805390/EoIP',
    Git: 'https://git-scm.com', GitHub: 'https://github.com'
  };
  let { name } = $props();
  const url = $derived(urls[name]);
  const icon = $derived(icons[name]);
</script>

<svelte:element this={url ? 'a' : 'span'} class="tech" href={url} rel={url ? 'noopener' : undefined} style:--brand="#{icon?.hex}">
  {#if icon}<svg viewBox="0 0 24 24" aria-hidden="true"><path d={icon.path} /></svg>{/if}
  {name}
</svelte:element>

<style>
  .tech { display: inline-flex; align-items: center; gap: 0.45em; white-space: nowrap; }
  a.tech { text-decoration: none; }
  a.tech:hover { text-decoration: underline; text-decoration-color: var(--signal); text-underline-offset: 0.25em; }
  svg { width: 1.15em; height: 1.15em; flex: none; fill: var(--brand); }
  :global([data-theme='dark']) svg { fill: color-mix(in srgb, var(--brand) 55%, white); }
</style>
