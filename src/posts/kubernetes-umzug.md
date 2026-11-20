---
title: Warum die Plattform auf Kubernetes umgezogen ist
date: '2026-11-20'
summary: Von einzelnen VMs zu einem Drei-Knoten-Cluster mit GitOps, und was dabei hakte.
---

Lange liefen meine Dienste auf einzelnen virtuellen Maschinen. Das war einfach, aber jede Änderung hing an Handarbeit auf dem Server.

## Was sich geändert hat

Alle Dienste laufen jetzt in einem RKE2-Cluster. Die Konfiguration liegt in einem Git-Repository, Argo CD gleicht den Cluster mit dem Stand im Repository ab. Eine Änderung ist ein Pull Request.

## Was dabei hakte

Replizierter Speicher mit Longhorn schreibt synchron auf mehrere Knoten. Schreibintensive Aktionen sind dadurch spürbar langsamer als auf lokaler Platte. Das ist der Preis für Ausfallsicherheit.

## Fazit

Mehr Aufwand am Anfang, danach nachvollziehbare Änderungen und einfachere Wiederherstellung.
