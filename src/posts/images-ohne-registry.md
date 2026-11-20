---
title: Eigene Images ohne Registry in den Cluster bringen
date: '2026-11-20'
summary: Wie diese Seite auf drei Knoten läuft, ohne dass ich eine Container-Registry betreibe, und warum das Image-Tag jedes Mal neu sein muss.
---

Für diese Seite wollte ich nicht extra eine Container-Registry aufsetzen. Eine Registry ist noch ein Dienst, den ich absichern, sichern und überwachen müsste, nur um ein paar Megabyte Webseite zu verteilen. Stattdessen lade ich das Image direkt in die Container-Laufzeit der Knoten. Das ist unelegant, aber für ein kleines Projekt ehrlich und überschaubar.

## Das Prinzip

RKE2 nutzt containerd. Jedes Image, das auf einem Knoten bereits vorhanden ist, kann ein Pod verwenden, ohne etwas herunterzuladen. Also muss das Image nur auf die Knoten kommen:

1. Image lokal bauen.
2. Als Archiv exportieren.
3. Auf jedem Knoten in containerd importieren.
4. Das Tag in den Manifesten erhöhen und pushen.

## Der Ablauf

Bauen und verteilen:

```sh
docker build -t fritz-systems:6 .

for host in 192.168.30.51 192.168.30.52 192.168.30.53; do
  docker save fritz-systems:6 | ssh ops@$host \
    'sudo /var/lib/rancher/rke2/bin/ctr \
       -a /run/k3s/containerd/containerd.sock \
       -n k8s.io images import -'
done
```

Der Namespace `k8s.io` ist wichtig. containerd trennt Images nach Namespaces, und Kubernetes sucht nur in diesem. Ein Import ohne `-n k8s.io` landet woanders und der Pod findet nichts.

Danach ändere ich in `deploy/k8s.yaml` das Tag und pushe auf `main`:

```yaml
containers:
  - name: web
    image: docker.io/library/fritz-systems:6
    imagePullPolicy: IfNotPresent
```

Argo CD sieht den neuen Stand und startet die Pods neu.

## Warum das Tag jedes Mal neu sein muss

Mit `imagePullPolicy: IfNotPresent` holt Kubernetes ein Image nur, wenn es nicht schon da ist. Genau deshalb funktioniert der Trick überhaupt. Es bedeutet aber auch: Wenn ich ein neues Image unter dem alten Tag importiere, bleibt der Pod beim alten Stand, weil der Knoten das Tag schon kennt.

Deshalb zähle ich das Tag bei jedem Rollout hoch. Das ist ein netter Nebeneffekt: Im Manifest steht immer, welche Version gerade läuft, und ein Rollback ist ein Commit, der das Tag zurücksetzt.

## Was das nicht kann

Der Ansatz hat klare Grenzen:

- **Neue Knoten** haben das Image nicht. Wenn ein Knoten ersetzt wird, muss ich es dort erst importieren, sonst bleiben Pods im Fehlerzustand `ErrImagePull`.
- **Es skaliert nicht** auf viele Knoten oder viele Menschen. Drei Knoten sind per Schleife machbar, dreißig nicht.
- **Es gibt keine Prüfung** des Images, keine Signatur und keine Schwachstellensuche, wie sie eine Registry bieten kann.

Sobald mehrere Projekte oder mehrere Personen dazukommen, ist eine echte Registry der nächste Schritt. Für eine einzelne statische Seite ist der Aufwand zu hoch, und ich lerne dabei mehr darüber, wie Kubernetes Images eigentlich findet.

## Fazit

Das Verfahren ist drei Zeilen Shell und ein Commit. Es ersetzt keine Registry, aber es zeigt, dass ein Image im Kern nur eine Datei auf einem Knoten ist. Wer versteht, wie containerd seine Images verwaltet, versteht auch viele Fehlermeldungen besser, die Kubernetes beim Starten eines Pods ausgibt.
