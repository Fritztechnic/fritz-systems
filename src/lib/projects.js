export const projects = [
  {
    id: 'vioserve',
    title: 'VioServe',
    short: 'Hosting für Game-Server, VPS und Webseiten, mit Kundenportal, Rechnungen und automatischer Bereitstellung.',
    long: [
      'VioServe vermietet Game-Server, virtuelle Server und Webhosting. Ich habe es im Oktober 2025 gegründet, anfangs als einfache Docker-Lösung für Minecraft-Server.',
      'Heute schreibe ich Backend und Frontend des Kundenportals und betreibe die Plattform: von der Bestellung über die Rechnung bis zum fertig eingerichteten Server.'
    ],
    points: [
      'Kundenportal mit Bestellung, Rechnungen und Verwaltung (Laravel, Next.js)',
      'Game-Server über Pelican und Wings',
      'VPS auf Proxmox, Backups über den Proxmox Backup Server',
      'Das alte Laravel-Backend läuft weiter, ein neues in ASP.NET Core ist im Aufbau'
    ],
    stack: ['Laravel', 'Next.js', 'ASP.NET Core', 'Pelican', 'Proxmox VE']
  },
  {
    id: 'kubernetes-plattform',
    title: 'Kubernetes-Plattform',
    short: 'Drei-Knoten-Cluster, Änderungen per Pull Request, Rollout durch Argo CD.',
    long: [
      'Der Betrieb von VioServe läuft auf einem RKE2-Cluster mit drei Knoten. Jede Änderung ist ein Pull Request: Argo CD gleicht den Cluster mit dem Repository ab und rollt sie aus.',
      'Traefik nimmt Anfragen an, cert-manager stellt Zertifikate aus und Longhorn hält den Speicher auf mehreren Knoten vor.'
    ],
    points: [],
    stack: ['RKE2', 'Argo CD', 'Traefik', 'cert-manager', 'Longhorn']
  },
  {
    id: 'netz-und-ueberwachung',
    title: 'Netz und Überwachung',
    short: 'Getrennte Netze auf MikroTik, eigene Hardware mit USV, Checkmk und Grafana.',
    long: [
      'Die Server stehen auf eigener Hardware mit USV und sind im Rechenzentrum Equinix Frankfurt angebunden, mit eigenem /27-Netz. Intern trennen MikroTik-Router die Netze, Tunnel laufen über EoIP und WireGuard.',
      'Checkmk und Grafana zeigen, was gerade kaputtgeht, bevor es ein Kunde merkt.'
    ],
    points: [],
    stack: ['RouterOS', 'EoIP', 'WireGuard', 'Checkmk', 'Grafana']
  },
  {
    id: 'diese-seite',
    title: 'Diese Seite',
    short: 'SvelteKit, statisch gebaut, nginx im Cluster, ausgerollt per GitOps.',
    long: [
      'SvelteKit baut die Seite statisch, ein nginx-Container liefert sie im selben Cluster aus. Es gibt kein Tracking, die Schriften sind selbst gehostet und alle Grafiken sind SVG.'
    ],
    points: [],
    stack: ['SvelteKit', 'nginx', 'Argo CD'],
    link: ['https://github.com/Fritztechnic/fritz-systems', 'Quellcode auf GitHub']
  }
];
