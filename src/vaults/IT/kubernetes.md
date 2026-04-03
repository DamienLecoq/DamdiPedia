---
id: kubernetes
label: Kubernetes
category: devops
priority: high
status: learning
createdAt: 2025-01-11T10:00:00Z
updatedAt: 2025-01-11T10:00:00Z
relations:
  - target: docker
    type: orchestrates
    weight: 0.9
  - target: linux
    type: uses
    weight: 0.6
resources:
  - type: documentation
    title: Documentation officielle Kubernetes
    url: https://kubernetes.io/docs
---

## Qu'est-ce que Kubernetes ?

Kubernetes (K8s) est un système open-source d'orchestration de conteneurs qui automatise le déploiement, la mise à l'échelle et la gestion des applications conteneurisées.

## Concepts clés

- **Pod** : Plus petite unité déployable — un ou plusieurs conteneurs
- **Deployment** : Gère un ensemble de pods identiques
- **Service** : Expose les pods au trafic réseau
- **Namespace** : Cluster virtuel pour l'isolation des ressources
- **Node** : Machine de travail dans le cluster

## Commandes principales

- `kubectl get pods` — lister les pods en cours
- `kubectl apply -f deployment.yaml` — appliquer un fichier de configuration
- `kubectl scale deployment monapp --replicas=3` — mise à l'échelle

## Architecture

Le plan de contrôle (serveur API, planificateur, etcd) gère les nœuds de travail qui exécutent les charges de travail réelles.
