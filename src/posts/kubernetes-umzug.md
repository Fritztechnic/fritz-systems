---
title: Warum die Plattform auf Kubernetes umgezogen ist
date: '2026-11-20'
summary: Von einzelnen VMs zu einem Drei-Knoten-Cluster mit GitOps. Was besser wurde, was langsamer wurde und was Argo CD beim Aufräumen übersieht.
---

VioServe lief lange auf einzelnen virtuellen Maschinen. Jeder Dienst hatte seine VM, jede VM ihre eigene Handarbeit: per SSH rein, Datei ändern, Dienst neu starten. Das funktioniert, solange man sich erinnert, was man wann geändert hat. Bei mehreren Diensten und zwei Leuten im Team wurde das fragil. Dieser Beitrag beschreibt, was ich stattdessen gebaut habe, und vor allem, wo es unerwartet hakte.

## Das Ziel

Ich wollte drei Dinge:

- Jede Änderung ist nachvollziehbar, also ein Commit statt eines Befehls im Terminal.
- Ein ausgefallener Server ist kein Notfall mehr.
- Ich kann den Stand der Plattform aus einem Repository wiederherstellen.

Kubernetes ist dafür nicht die einzige Lösung, aber die, die ich ohnehin lernen wollte und die zu dem passt, was VioServe später braucht.

## Der Aufbau

Der Cluster nutzt RKE2 mit drei Knoten. Auf jedem laufen sowohl Control Plane als auch Workloads. Das ist für meine Größe in Ordnung, weil drei Knoten ein Quorum für etcd bilden und einer ausfallen darf.

Die Bausteine:

- **Argo CD** gleicht den Cluster mit einem Git-Repository ab.
- **Traefik** nimmt Anfragen an und verteilt sie.
- **cert-manager** besorgt Zertifikate.
- **Longhorn** stellt Speicher bereit, der auf mehrere Knoten repliziert wird.
- **Cilium** vergibt die internen und öffentlichen Adressen der Dienste.

Jede App hat im Repository einen Ordner mit ihren Manifesten und eine Argo-Application, die darauf zeigt. Eine neue App anzulegen heißt: Ordner anlegen, Pull Request öffnen, mergen. Den Rest erledigt Argo.

## GitOps im Alltag

Der Workflow ist bewusst langweilig. Ich ändere eine Datei auf einem Branch, öffne einen Pull Request und sehe im Diff genau, was sich ändert. Nach dem Merge zieht Argo den neuen Stand. Wenn etwas schiefgeht, mache ich den Commit rückgängig.

Der größte Gewinn ist nicht die Automatisierung, sondern dass der Stand der Plattform an einem Ort steht. Wenn ich wissen will, welche Adresse ein Dienst hat, schaue ich ins Repository und nicht auf den Server.

## Was dabei hakte

### Replizierter Speicher ist langsamer

Longhorn schreibt synchron auf mehrere Knoten. Eine Schreiboperation ist erst fertig, wenn alle Replikate sie bestätigt haben. Auf einer lokalen Platte entfällt dieser Schritt, deshalb sind schreibintensive Aktionen im Cluster spürbar langsamer.

Das ist der Preis für Ausfallsicherheit, und ich habe ihn bewusst gewählt. Der falsche Weg wäre, synchrones Schreiben abzuschalten, um die Zahlen zu verbessern. Dann sieht der Benchmark besser aus, aber bei einem Ausfall gehen genau die Daten verloren, für die ich die Replikation eingerichtet habe. Stattdessen plane ich jetzt, welche Last auf replizierten Speicher gehört und welche nicht.

### Argo räumt nicht alles weg

Als ich eine App wieder entfernt habe, hat Argo die Deployments, Services und Ingresses gelöscht, aber das Volume und der Namespace blieben stehen. Das ist Absicht: Argo löscht keine Daten, die es für wertvoll hält. Aufräumen musste ich von Hand.

Dazu kommt, dass meine Longhorn-Volumes die Reclaim-Policy `Retain` haben. Auch nach dem Löschen des Claims bleibt das eigentliche Volume im Zustand `Released` bestehen, bis ich es selbst entferne. Das schützt vor versehentlichem Datenverlust, bedeutet aber, dass ich nach jedem Rückbau prüfen muss, was übrig ist.

### Ein Branch, der nicht übernommen wird

Mehrmals habe ich Änderungen gemergt, und Argo hat sie nicht übernommen. Ursache war, dass die Anwendung noch eine alte Fassung des Repositorys im Cache hatte. Ein harter Refresh behebt das:

```sh
kubectl -n argocd annotate app portfolio \
  argocd.argoproj.io/refresh=hard --overwrite
```

Wenn sich die Quelle einer App ändert, etwa weil ich ein Repository ersetze, muss manchmal zuerst die übergeordnete App aktualisiert werden. Das ist eine Reihenfolge, die man einmal erlebt haben muss.

### Feste Adressen für Dienste

Cilium vergibt Adressen aus Pools. Damit ein Dienst immer dieselbe Adresse bekommt, reicht der Pool allein nicht. Ich hänge dem Service zusätzlich eine Annotation an, die die gewünschte Adresse festlegt. Für interne Dienste lege ich dafür einen eigenen kleinen Pool an und beschränke den Zugriff auf die internen Netze.

## Fazit

Am Anfang war es deutlich mehr Aufwand als eine VM mit Docker. Dafür sind Änderungen heute nachvollziehbar, ein ausgefallener Knoten ist kein Notfall mehr, und ich muss nicht mehr raten, was auf einem Server eigentlich läuft.

Wer nur einen Dienst betreibt, braucht das nicht. Sobald mehrere Dienste, mehrere Menschen und Wiederherstellbarkeit zusammenkommen, lohnt es sich. Im nächsten Beitrag geht es darum, wie ich eigene Images ohne Registry in den Cluster bekomme.
