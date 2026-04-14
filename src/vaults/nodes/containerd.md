---
id: containerd
label: Containerd
category: logiciel
priority: low
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:58:15.619Z'
updatedAt: '2026-04-14T17:58:15.619Z'
relations:
  - target: docker
    type: part_of
    weight: 0.9
resources:
  - type: documentation
    title: Documentation officielle containerd
    url: 'https://containerd.io/docs/'
  - type: documentation
    title: containerd sur GitHub
    url: 'https://github.com/containerd/containerd'
  - type: vidéo
    title: What is containerd? – IBM Technology
    url: 'https://www.youtube.com/watch?v=aV2yBBg5K0Y'
  - type: blog
    title: containerd – CNCF Project
    url: 'https://www.cncf.io/projects/containerd/'
  - type: blog
    title: Docker vs containerd – Aqua Security
    url: >-
      https://www.aquasec.com/cloud-native-academy/container-security/containerd/
---

## Résumé rapide

Containerd est un runtime de conteneurs de niveau industriel qui gère le cycle de vie complet des conteneurs sur un hôte. C'est le composant sous-jacent utilisé par Docker et Kubernetes pour exécuter les conteneurs de manière fiable et performante.

---

## Définition

Containerd est un daemon de runtime de conteneurs qui gère le cycle de vie complet des conteneurs : téléchargement d'images, stockage, exécution, supervision et mise en réseau. Il s'agit d'un projet gradué de la CNCF (Cloud Native Computing Foundation).

---

## Histoire

* Initialement développé comme composant interne de Docker
* Extrait de Docker en 2016 pour devenir un projet indépendant
* Donné à la CNCF en 2017
* Devenu projet gradué CNCF en 2019
* Adopté par Kubernetes comme runtime par défaut (remplacement de dockershim)

---

## Objectif

* Fournir un runtime de conteneurs stable et performant
* Servir de couche intermédiaire entre les outils utilisateur et le noyau
* Gérer le cycle de vie complet des conteneurs
* Offrir une API simple pour les plateformes d'orchestration

---

## Domaines d'utilisation

* Runtime sous-jacent de Docker
* Runtime de conteneurs pour Kubernetes (via CRI)
* Plateformes cloud (AWS ECS, Google GKE)
* Systèmes embarqués nécessitant un runtime léger
* Infrastructure de conteneurs personnalisée

---

## Fonctionnement

* Fonctionne comme daemon système
* Gère les images via des snapshots (couches de système de fichiers)
* Délègue l'exécution réelle au runtime OCI (runc)
* Expose une API gRPC pour l'interaction
* Supporte le Container Runtime Interface (CRI) de Kubernetes

---

## Concepts clés

* Runtime OCI : standard d'exécution de conteneurs (runc)
* Snapshot : gestion des couches de système de fichiers des images
* CRI (Container Runtime Interface) : interface standard pour Kubernetes
* gRPC API : interface de communication avec containerd
* Namespace : isolation logique des ressources dans containerd

---

## Exemple

```bash
# Utilisation de ctr (CLI de containerd)
# Télécharger une image
ctr images pull docker.io/library/nginx:latest

# Créer et démarrer un conteneur
ctr run --rm docker.io/library/nginx:latest mon-nginx

# Lister les conteneurs
ctr containers list

# Lister les images
ctr images list
```

---

## Avantages

* Léger et performant (moins de surcharge que Docker complet)
* Standard de l'industrie (CNCF gradué)
* Intégration native avec Kubernetes via CRI
* API stable et bien définie
* Utilisé en production par les grands fournisseurs cloud

---

## Inconvénients

* CLI (ctr) moins conviviale que celle de Docker
* Pas conçu pour une utilisation directe par les développeurs
* Documentation technique moins accessible aux débutants
* Nécessite des outils supplémentaires pour la construction d'images

---

## Pièges courants

* Vouloir utiliser containerd directement au lieu de Docker pour le développement
* Confondre containerd avec un outil de construction d'images
* Ne pas comprendre la hiérarchie : Docker > containerd > runc
* Ignorer la migration de dockershim vers containerd dans Kubernetes

---

## À ne pas confondre

* containerd vs Docker : containerd est le runtime, Docker est l'outil complet
* containerd vs runc : containerd gère le cycle de vie, runc exécute le conteneur
* containerd vs CRI-O : deux implémentations concurrentes du CRI pour Kubernetes
* ctr vs docker CLI : ctr est bas niveau, docker est haut niveau

---

## Explication simplifiée

Containerd est le moteur caché qui fait réellement tourner les conteneurs. Quand on utilise Docker ou Kubernetes, c'est en fait containerd qui travaille en arrière-plan pour démarrer, arrêter et surveiller les conteneurs.

---

## Explication avancée

Containerd est un daemon qui implémente la gestion complète du cycle de vie des conteneurs via une architecture de plugins. Il gère les snapshots (overlayfs, btrfs) pour le stockage des images en couches, utilise le content store pour la déduplication du contenu, et délègue l'exécution au runtime OCI (runc par défaut). L'interface CRI permet à Kubernetes de communiquer directement avec containerd via gRPC, éliminant la couche intermédiaire dockershim. Les namespaces internes permettent l'isolation multi-tenant.

---

## Points critiques à retenir

* [CRITIQUE] Containerd est le runtime sous-jacent de Docker et Kubernetes
* [CRITIQUE] Il gère le cycle de vie complet des conteneurs (pas juste l'exécution)
* [IMPORTANT] Projet gradué CNCF, standard de l'industrie
* [IMPORTANT] Kubernetes utilise containerd via le CRI depuis la suppression de dockershim
* [PIÈGE] Ne pas confondre avec un outil de développement : il est destiné aux plateformes
* [PIÈGE] ctr n'est pas conçu pour remplacer la CLI Docker
