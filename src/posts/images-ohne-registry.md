---
title: Eigene Images ohne Registry in den Cluster bringen
date: '2026-11-20'
summary: 'Wie diese Seite auf drei Knoten läuft, ohne dass ich eine Registry betreibe, und warum das Image-Tag bei jedem Rollout neu sein muss.'
---

Eine Container-Registry ist ein weiterer Dienst. Ich müsste ihn absichern, sichern und überwachen, und das nur, damit ein paar Megabyte Webseite auf drei Knoten landen. Das war mir zu viel. Diese Seite kommt deshalb ohne aus: Ich lade das Image direkt in containerd auf den Knoten. Elegant ist das nicht, für ein kleines Projekt reicht es.

## Die Idee

RKE2 nutzt containerd. Ein Pod kann jedes Image verwenden, das auf seinem Knoten schon liegt, und lädt dann nichts herunter. Es genügt also, das Image auf alle Knoten zu bringen: lokal bauen, als Archiv exportieren, auf jedem Knoten importieren, danach das Tag im Manifest erhöhen und pushen.

## Der Ablauf

Bauen und verteilen sieht bei mir so aus:

```sh
docker build -t fritz-systems:6 .

for host in 192.168.30.51 192.168.30.52 192.168.30.53; do
  docker save fritz-systems:6 | ssh ops@$host \
    'sudo /var/lib/rancher/rke2/bin/ctr \
       -a /run/k3s/containerd/containerd.sock \
       -n k8s.io images import -'
done
```

Der Namespace `k8s.io` ist leicht zu vergessen. containerd trennt Images nach Namespaces, und Kubernetes schaut nur in diesem. Wer ohne `-n k8s.io` importiert, hat das Image zwar auf dem Knoten, aber der Pod findet es nicht.

Danach ändere ich in `deploy/k8s.yaml` das Tag und pushe auf `main`:

```yaml
containers:
  - name: web
    image: docker.io/library/fritz-systems:6
    imagePullPolicy: IfNotPresent
```

Argo CD sieht den neuen Stand und startet die Pods neu.

## Warum das Tag jedes Mal neu sein muss

Mit `imagePullPolicy: IfNotPresent` holt Kubernetes ein Image nur, wenn der Knoten es nicht kennt. Nur deshalb funktioniert der Trick überhaupt. Es hat eine Kehrseite: Importiere ich ein neues Image unter dem alten Tag, bleibt der Pod beim alten Stand, weil der Knoten das Tag schon hat. Ich zähle das Tag deshalb bei jedem Rollout hoch. Nebenbei steht im Manifest damit immer, welche Version läuft, und ein Rollback ist ein Commit, der das Tag zurücksetzt.

## Wo es aufhört

Ein neuer Knoten hat das Image nicht. Ersetze ich einen Knoten, muss ich es dort zuerst importieren, sonst hängen die Pods in `ErrImagePull`. Mit drei Knoten ist die Schleife kein Problem, mit dreißig wäre sie eins. Eine Prüfung des Images gibt es auch nicht, keine Signatur und keine Schwachstellensuche, wie manche Registries sie bieten.

Kommen mehr Projekte oder mehr Leute dazu, brauche ich eine richtige Registry. Für eine einzelne statische Seite wäre sie übertrieben.

Ich habe dabei gelernt, wie Kubernetes Images findet: Am Ende ist ein Image eine Datei auf dem Knoten. Seitdem lese ich Fehlermeldungen beim Pod-Start anders.
