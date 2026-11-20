---
title: Warum die Plattform auf Kubernetes umgezogen ist
date: '2026-11-20'
summary: Von einzelnen VMs zu einem Drei-Knoten-Cluster mit GitOps, und was dabei hakte.
---

Lange liefen meine Dienste auf einzelnen virtuellen Maschinen. Das war einfach, aber jede Änderung war Handarbeit auf dem Server, und niemand konnte danach nachvollziehen, was genau geändert wurde. Dieser Zustand war mir irgendwann zu fragil.

## Was sich geändert hat

Alle Dienste laufen jetzt in einem RKE2-Cluster mit drei Knoten. Die Konfiguration liegt in einem Git-Repository, Argo CD gleicht den Cluster mit diesem Stand ab. Eine Änderung ist ein Pull Request: Ich sehe vorher, was passiert, und kann es zurücknehmen.

## Was dabei hakte

Longhorn schreibt Daten synchron auf mehrere Knoten. Schreibintensive Aktionen sind dadurch spürbar langsamer als auf einer lokalen Platte. Das ist der Preis für Ausfallsicherheit, und ich plane Datenbanken jetzt bewusst danach.

## Fazit

Am Anfang war es mehr Aufwand. Dafür sind Änderungen nachvollziehbar, und ein ausgefallener Knoten ist kein Notfall mehr.
