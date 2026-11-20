---
title: Warum VioServe auf Kubernetes umgezogen ist
date: '2026-11-20'
summary: 'Von einzelnen VMs zu drei Knoten mit GitOps. Was sich verbessert hat, was mich Nerven gekostet hat, und was ich über langsame Schreibzugriffe gemessen habe.'
---

Früher hatte bei VioServe jeder Dienst seine eigene VM. Wollte ich etwas ändern, ging ich per SSH drauf, bearbeitete eine Datei und startete den Dienst neu. Mit zwei Diensten klappt das. Mit mehr Diensten und einem zweiten Menschen im Team kam der Punkt, an dem ich nicht mehr sicher sagen konnte, was auf welchem Server eigentlich eingestellt ist. Wenn Mike fragte, musste ich nachsehen, und nachsehen hieß: einloggen.

Also habe ich die Plattform auf einen Kubernetes-Cluster umgezogen. Hier steht, wie der aussieht und wo es hakte.

## Was ich wollte

Ich wollte, dass jede Änderung ein Commit ist, den man lesen und zurückdrehen kann. Ich wollte, dass ein ausgefallener Server kein Notfall mehr ist. Und ich wollte den Zustand der Plattform aus einem Repository wiederherstellen können, falls mal etwas ganz weg ist. Dafür gibt es mehrere Wege. Ich habe Kubernetes genommen, weil ich es sowieso lernen wollte.

## Wie der Cluster aufgebaut ist

Der Cluster läuft mit RKE2 auf drei Knoten. Zwei davon stehen auf dem Proxmox-Host Helios1, einer auf Chronos1. Drei Knoten reichen für ein etcd-Quorum, einer darf also ausfallen.

Argo CD gleicht den Cluster ständig mit einem Git-Repository ab. Traefik nimmt die Anfragen an, cert-manager holt die Zertifikate, Longhorn repliziert den Speicher auf mehrere Knoten, und Cilium vergibt die Adressen der Dienste. Jede App hat im Repository einen Ordner mit ihren Manifesten und eine Argo-Application, die darauf zeigt. Eine neue App besteht aus einem neuen Ordner und einem Pull Request. Nach dem Merge kümmert sich Argo um den Rest.

## Der Alltag mit GitOps

Ich ändere eine Datei auf einem Branch und öffne einen Pull Request. Im Diff sehe ich, was sich ändert, und Mike sieht es auch. Nach dem Merge zieht Argo den neuen Stand. Geht etwas schief, revertiere ich den Commit.

Das Schöne daran ist weniger die Automatik als der eine Ort. Wenn ich wissen will, welche Adresse ein Dienst hat, schaue ich ins Repository.

## Was nicht so schön war

### Replizierter Speicher ist langsam

Longhorn bestätigt einen Schreibzugriff erst, wenn alle Replikate ihn haben. Das kostet Zeit, und ich wollte wissen, wie viel. Ich habe auf einem Knoten fio laufen lassen, mit 4k-Schreibzugriffen und fsync nach jedem Schreiben, also so, wie es eine Datenbank macht.

Mit drei Replikaten über alle Knoten schaffte der Test rund 15 IOPS. Das p99 der fsync-Latenz lag bei etwa 405 ms. Mit zwei Replikaten waren es rund 24 IOPS und 218 ms. Ich hatte das Netzwerk zwischen den Hosts im Verdacht.

Also habe ich die Replikate auf die beiden Knoten von Helios1 beschränkt. Das Ergebnis: rund 69 IOPS bei etwa 1,8 ms. Ein einzelnes lokales Replikat kam auf rund 80 IOPS und 4,8 ms. Der Weg zwischen den Hosts war also der größte Posten. Dahinter bleibt ein zweiter: Auf Helios1 liegt ZFS auf einer einzelnen Consumer-NVMe ohne Schutz gegen Stromausfall, und fsync muss dort auf das tatsächliche Wegschreiben warten.

Synchrones Schreiben abzuschalten, wäre die schnelle Lösung gewesen, und ich lasse es. Dann stünden die Zahlen besser da, aber bei einem Ausfall fehlten genau die Daten, für die ich die Replikation überhaupt habe. Der Preis für Replikate nur auf Helios1 ist ein anderer: Fällt der Host aus, sind alle Kopien weg. Dann zählen nur noch die Backups.

### Argo löscht keine Daten

Als ich eine App wieder entfernt habe, räumte Argo Deployments, Services und Ingresses ab. Volume und Namespace blieben. Das ist Absicht, denn Argo fasst Daten nicht an. Bei mir kommt hinzu, dass die Longhorn-Volumes die Reclaim-Policy `Retain` haben. Nach dem Löschen des Claims steht das Volume im Zustand `Released`, bis ich es selbst entferne. Das schützt vor Fehlern, heißt aber, dass ich nach jedem Rückbau nachsehen muss, was übrig ist.

Hängt eine App an einem alten Stand des Repositories, hilft ein harter Refresh:

```sh
kubectl -n argocd annotate app portfolio \
  argocd.argoproj.io/refresh=hard --overwrite
```

### Feste Adressen

Cilium vergibt Adressen aus Pools. Damit ein Dienst immer dieselbe bekommt, reicht der Pool nicht, der Service braucht zusätzlich eine Annotation mit der Wunschadresse. Für interne Dienste habe ich einen eigenen kleinen Pool angelegt und den Zugriff auf die internen Netze begrenzt.

## Würde ich es wieder tun?

Für einen einzelnen Dienst nicht. Der Aufwand am Anfang war deutlich höher als bei einer VM mit Docker. Bei mehreren Diensten, zwei Leuten im Team und dem Wunsch, alles wiederherstellen zu können, hat es sich gelohnt. Wie ich eigene Images ohne Registry auf die Knoten bekomme, steht im nächsten Beitrag.
