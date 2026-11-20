# fritz.systems

Persönliche Website: SvelteKit (statisch gebaut), Markdown-Blog, hell und dunkel, alle Grafiken als SVG.
Läuft als nginx-Container auf Kubernetes, ausgerollt per Argo CD (GitOps).

## Entwickeln

```sh
npm ci
npm run dev      # http://localhost:5173
npm run build    # statische Seite nach build/
```

## Inhalte

- Seiten: `src/routes/`
- Projekte (Startseite und Projektseite): `src/lib/projects.js`
- Blog: neue Datei `src/posts/mein-thema.md` mit diesem Kopf, mit `draft: true` bleibt sie unsichtbar:

  ```md
  ---
  title: Titel
  date: '2026-11-21'
  summary: Ein Satz für die Übersicht.
  ---
  ```

## Ausrollen

1. Image bauen: `docker build -t fritz-systems:N .`
2. Auf alle Cluster-Knoten laden (`ctr -n k8s.io images import`), es gibt keine Registry.
3. Tag in `deploy/k8s.yaml` anheben und nach `main` pushen. Argo CD (`gitops/platform/portfolio.yaml` im Repo VioServe/infra) rollt `deploy/` aus.
