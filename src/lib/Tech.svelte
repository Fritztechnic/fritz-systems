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
  let { name } = $props();
  const icon = $derived(icons[name]);
</script>

<span class="tech">
  {#if icon}<svg viewBox="0 0 24 24" aria-hidden="true"><path d={icon.path} /></svg>{/if}
  {name}
</span>

<style>
  .tech { display: inline-flex; align-items: center; gap: 0.45em; white-space: nowrap; }
  svg { width: 1.15em; height: 1.15em; flex: none; fill: currentColor; }
</style>
