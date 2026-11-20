export const projects = [
  {
    id: 'vioserve',
    title: 'VioServe',
    short: 'Hosting für Game-Server, VPS und Webseiten, mit Kundenportal, Rechnungen und automatischer Bereitstellung.',
    long: [
      'Hosting für Game-Server, VPS und Webseiten. Ich schreibe Backend und Frontend und betreibe die Plattform.'
    ],
    points: [
      'Kundenportal mit Bestellung, Rechnungen und Verwaltung',
      'Game-Server über Pelican und Wings',
      'Altes Laravel-Backend, neues Backend in ASP.NET Core im Aufbau'
    ],
    stack: ['Laravel', 'Next.js', 'ASP.NET Core', 'Pelican']
  },
  {
    id: 'kubernetes-plattform',
    title: 'Kubernetes-Plattform',
    short: 'Drei-Knoten-Cluster, Änderungen per Pull Request, Rollout durch Argo CD.',
    long: [
      'Der Betrieb von VioServe läuft auf einem RKE2-Cluster mit drei Knoten. Änderungen gehen als Pull Request durch Git, Argo CD rollt sie aus, cert-manager stellt Zertifikate aus, Longhorn liefert replizierten Speicher.'
    ],
    points: [],
    stack: ['RKE2', 'Argo CD', 'Traefik', 'cert-manager', 'Longhorn']
  },
  {
    id: 'netz-und-ueberwachung',
    title: 'Netz und Überwachung',
    short: 'Getrennte Netze auf MikroTik, Proxmox, Checkmk und Grafana.',
    long: [
      'Getrennte Netze auf MikroTik, Anbindung per WireGuard, Virtualisierung mit Proxmox. Überwacht wird mit Checkmk und Grafana.'
    ],
    points: [],
    stack: ['RouterOS', 'WireGuard', 'Proxmox VE', 'Checkmk', 'Grafana']
  },
  {
    id: 'diese-seite',
    title: 'Diese Seite',
    short: 'SvelteKit, statisch gebaut, nginx im Cluster, ausgerollt per GitOps.',
    long: [
      'SvelteKit baut die Seite statisch, ein nginx-Container liefert sie im selben Cluster aus. Argo CD gleicht den Cluster mit dem Repository ab. Es gibt kein Tracking, die Schriften sind selbst gehostet und alle Grafiken sind SVG.'
    ],
    points: [],
    stack: ['SvelteKit', 'nginx', 'Argo CD'],
    link: ['https://github.com/Fritztechnic/fritz-systems', 'Quellcode auf GitHub']
  }
];
