---
title: Eigene Images ohne Registry in den Cluster bringen
date: '2026-11-20'
summary: Wie diese Seite auf drei Knoten läuft, ohne dass ich eine Container-Registry betreibe, und warum das Image-Tag jedes Mal neu sein muss.
---

Für diese Seite wollte ich keine Container-Registry betreiben. Die müsste ich absichern, sichern und überwachen, nur um ein paar Megabyte Webseite zu verteilen. Also lade ich das Image direkt in containerd auf den Knoten. Elegant ist das nicht, aber für ein kleines Projekt reicht es.

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

Den Namespace `k8s.io` darf man nicht vergessen. containerd trennt Images nach Namespaces, und Kubernetes sucht nur in diesem. Ein Import ohne `-n k8s.io` landet woanders und der Pod findet nichts.

Danach ändere ich in `deploy/k8s.yaml` das Tag und pushe auf `main`:

```yaml
containers:
  - name: web
    image: docker.io/library/fritz-systems:6
    imagePullPolicy: IfNotPresent
```

Argo CD sieht den neuen Stand und startet die Pods neu.

## Warum das Tag jedes Mal neu sein muss

Mit `imagePullPolicy: IfNotPresent` holt Kubernetes ein Image nur, wenn es nicht schon da ist. Nur deshalb funktioniert der Trick. Es heißt aber auch: Wenn ich ein neues Image unter dem alten Tag importiere, bleibt der Pod beim alten Stand, weil der Knoten das Tag schon kennt.

Deshalb zähle ich das Tag bei jedem Rollout hoch. Nebenbei steht im Manifest immer, welche Version läuft, und ein Rollback ist ein Commit, der das Tag zurücksetzt.

## Was das nicht kann

Grenzen hat das schon:

- Neue Knoten haben das Image nicht. Wenn ein Knoten ersetzt wird, muss ich es dort erst importieren, sonst bleiben Pods im Fehlerzustand `ErrImagePull`.
- Es skaliert nicht auf viele Knoten oder viele Menschen. Drei Knoten sind per Schleife machbar, dreißig nicht.
- Es gibt keine Prüfung des Images, keine Signatur und keine Schwachstellensuche, wie sie eine Registry bieten kann.

Sobald mehrere Projekte oder Personen dazukommen, ist eine echte Registry der nächste Schritt. Für eine einzelne statische Seite wäre sie übertrieben.

Nebenbei habe ich dabei gelernt, wie Kubernetes Images findet: Ein Image ist am Ende eine Datei auf dem Knoten, und viele Fehlermeldungen beim Pod-Start lesen sich danach anders. Der ganze Ablauf besteht aus ein paar Zeilen Shell und einem Commit.
