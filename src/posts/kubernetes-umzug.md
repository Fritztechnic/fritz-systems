---
title: Warum die Plattform auf Kubernetes umgezogen ist
date: '2026-11-20'
summary: 'Von einzelnen VMs zu einem Drei-Knoten-Cluster mit GitOps: was besser wurde, wo es hakte und warum Schreibzugriffe auf replizierten Speicher teuer sind.'
---

VioServe lief lange auf einzelnen virtuellen Maschinen. Jeder Dienst hatte seine VM, jede VM ihre eigene Handarbeit: per SSH rein, Datei ändern, Dienst neu starten. Das geht gut, solange man weiß, was man wann geändert hat. Mit mehreren Diensten und zwei Leuten im Team wusste ich das irgendwann nicht mehr. Hier steht, was ich stattdessen gebaut habe und wo es hakte.

## Das Ziel

Ich wollte:

- Jede Änderung ist nachvollziehbar, also ein Commit statt eines Befehls im Terminal.
- Ein ausgefallener Server ist kein Notfall mehr.
- Den Stand der Plattform kann ich aus einem Repository wiederherstellen.

Dafür gibt es andere Lösungen. Ich habe Kubernetes genommen, weil ich es ohnehin lernen wollte.

## Der Aufbau

Der Cluster nutzt RKE2 mit drei Knoten. Zwei davon stehen auf dem Proxmox-Host Helios1, einer auf Chronos1. Drei Knoten bilden ein Quorum für etcd, einer darf also ausfallen.

Die Bausteine:

- Argo CD gleicht den Cluster mit einem Git-Repository ab.
- Traefik nimmt Anfragen an und verteilt sie.
- cert-manager besorgt Zertifikate.
- Longhorn stellt Speicher bereit, der auf mehrere Knoten repliziert wird.
- Cilium vergibt die internen und öffentlichen Adressen der Dienste.

Jede App hat im Repository einen Ordner mit ihren Manifesten und eine Argo-Application, die darauf zeigt. Eine neue App anzulegen heißt: Ordner anlegen, Pull Request öffnen, mergen. Den Rest erledigt Argo.

## GitOps im Alltag

Der Ablauf ist langweilig, und so soll er sein. Ich ändere eine Datei auf einem Branch, öffne einen Pull Request und sehe im Diff genau, was sich ändert. Nach dem Merge zieht Argo den neuen Stand. Wenn etwas schiefgeht, mache ich den Commit rückgängig.

Am meisten bringt mir, dass der Stand der Plattform an einem Ort steht, nicht die Automatisierung. Wenn ich wissen will, welche Adresse ein Dienst hat, schaue ich ins Repository und nicht auf den Server.

## Was dabei hakte

### Replizierter Speicher ist langsamer

Longhorn schreibt synchron auf mehrere Knoten. Ein Schreibzugriff ist erst fertig, wenn alle Replikate ihn bestätigt haben. Ich wollte wissen, wie viel das kostet, und habe mit fio gemessen: 4k-Schreibzugriffe mit fsync, auf einem Knoten.

Mit drei Replikaten über alle Knoten kam ich auf rund 15 IOPS, der p99 der fsync-Latenz lag bei etwa 405 ms. Mit zwei Replikaten waren es rund 24 IOPS und 218 ms. Der Verdacht lag nahe, dass das Netzwerk zwischen den Hosts schuld ist.

Dann habe ich beide Replikate auf die beiden Knoten desselben Hosts gelegt. Ergebnis: rund 69 IOPS und etwa 1,8 ms p99. Ein einzelnes lokales Replikat schaffte rund 80 IOPS bei 4,8 ms. Die Latenz kam also vom Weg zwischen den Hosts. Der Speicher selbst ist eine einzelne Consumer-NVMe mit ZFS darüber, ohne Schutz gegen Stromausfall, und fsync wartet dort ohnehin auf das Wegschreiben.

Synchrones Schreiben abzuschalten, um die Zahlen zu verbessern, kommt für mich nicht in Frage. Dann würden bei einem Ausfall genau die Daten fehlen, für die ich die Replikation eingerichtet habe. Der Preis für Replikate auf nur einem Host ist ein anderer: Fällt dieser Host aus, sind alle Kopien weg. Dagegen helfen nur Backups.

### Argo räumt nicht alles weg

Als ich eine App wieder entfernt habe, hat Argo die Deployments, Services und Ingresses gelöscht, aber das Volume und der Namespace blieben stehen. Das ist Absicht: Argo löscht keine Daten, die es für wertvoll hält. Aufräumen musste ich von Hand.

Dazu kommt, dass meine Longhorn-Volumes die Reclaim-Policy `Retain` haben. Auch nach dem Löschen des Claims bleibt das eigentliche Volume im Zustand `Released` bestehen, bis ich es selbst entferne. Das schützt vor versehentlichem Datenverlust, bedeutet aber, dass ich nach jedem Rückbau prüfen muss, was übrig ist.

### Feste Adressen für Dienste

Cilium vergibt Adressen aus Pools. Damit ein Dienst immer dieselbe Adresse bekommt, reicht der Pool allein nicht. Ich hänge dem Service zusätzlich eine Annotation an, die die gewünschte Adresse festlegt. Für interne Dienste lege ich dafür einen eigenen kleinen Pool an und beschränke den Zugriff auf die internen Netze.

## Wann sich das lohnt

Am Anfang war es deutlich mehr Aufwand als eine VM mit Docker. Für einen einzelnen Dienst würde ich es nicht machen. Mit mehreren Diensten, mehreren Leuten und dem Wunsch, alles wiederherstellen zu können, hat es sich für mich gelohnt.

Im nächsten Beitrag geht es darum, wie ich eigene Images ohne Registry in den Cluster bekomme.
