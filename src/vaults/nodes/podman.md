---
id: podman
label: Podman
category: logiciel
priority: medium
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:59:37.655Z'
updatedAt: '2026-04-14T17:59:37.655Z'
relations:
  - target: docker
    type: related
    weight: 0.9
  - target: containerd
    type: uses
    weight: 0.7
resources:
  - type: documentation
    title: Documentation officielle Podman
    url: 'https://podman.io/docs'
  - type: vidéo
    title: Podman vs Docker – TechWorld with Nana
    url: 'https://www.youtube.com/watch?v=YFl2mCHdv24'
  - type: blog
    title: Red Hat – Introduction à Podman
    url: 'https://www.redhat.com/en/topics/containers/what-is-podman'
  - type: documentation
    title: Podman Desktop
    url: 'https://podman-desktop.io/docs/intro'
  - type: blog
    title: Podman Tutorial – Red Hat Developer
    url: 'https://developers.redhat.com/articles/podman-basics'
---

## Résumé rapide

Podman est une alternative à Docker pour gérer des conteneurs sans nécessiter de daemon root. Compatible avec les commandes Docker, il offre une approche plus sécurisée grâce à son architecture sans daemon et sa capacité à exécuter des conteneurs en mode rootless.

---

## Définition

Podman (Pod Manager) est un outil de gestion de conteneurs open source développé par Red Hat. Il permet de créer, exécuter et gérer des conteneurs et des pods sans nécessiter de processus daemon permanent, contrairement à Docker.

---

## Histoire

* Développé par Red Hat à partir de 2018
* Conçu comme alternative sans daemon à Docker
* Intégré nativement dans RHEL, Fedora et CentOS
* Adopté progressivement par la communauté DevOps
* Podman Desktop lancé pour faciliter l'adoption

---

## Objectif

* Fournir une alternative sécurisée à Docker sans daemon root
* Permettre l'exécution de conteneurs en mode rootless
* Offrir une compatibilité CLI avec Docker
* Supporter nativement le concept de pods (groupes de conteneurs)

---

## Domaines d'utilisation

* Environnements nécessitant une sécurité renforcée
* Développement local sur distributions Red Hat
* Pipelines CI/CD sans privilèges root
* Gestion de pods locaux avant déploiement Kubernetes
* Entreprises soumises à des contraintes de sécurité strictes

---

## Fonctionnement

* Architecture sans daemon (fork-exec model)
* Chaque conteneur est un processus enfant direct de Podman
* Utilise les mêmes images OCI que Docker
* Supporte le mode rootless nativement
* Gère les pods (groupes de conteneurs partageant un réseau)

---

## Concepts clés

* Rootless : exécution de conteneurs sans privilèges root
* Pod : groupe de conteneurs partageant un espace réseau
* Daemonless : pas de processus permanent en arrière-plan
* Compatibilité OCI : utilise les mêmes standards d'images que Docker
* Systemd : intégration avec le système d'init Linux

---

## Exemple

```bash
# Commandes identiques à Docker
podman pull nginx:latest
podman run -d -p 8080:80 --name web nginx:latest

# Créer un pod (concept spécifique à Podman)
podman pod create --name mon-pod -p 8080:80
podman run -d --pod mon-pod nginx:latest
podman run -d --pod mon-pod redis:latest

# Générer un fichier systemd pour un conteneur
podman generate systemd --name web > web.service
```

---

## Avantages

* Sécurité renforcée (pas de daemon root)
* Compatibilité CLI avec Docker (alias docker=podman)
* Support natif des pods
* Intégration avec systemd
* Open source et soutenu par Red Hat

---

## Inconvénients

* Écosystème moins mature que Docker
* Docker Compose non supporté nativement (nécessite podman-compose)
* Certaines fonctionnalités réseau moins abouties
* Documentation moins abondante que Docker
* Moins de tutoriels et ressources communautaires

---

## Pièges courants

* Supposer une compatibilité à 100% avec Docker
* Oublier que le mode rootless a des limitations réseau
* Ne pas configurer correctement les sous-UID/GID pour le mode rootless
* Confondre pod Podman et pod Kubernetes (similaires mais pas identiques)

---

## À ne pas confondre

* Podman vs Docker : Podman n'a pas de daemon, Docker en nécessite un
* Pod Podman vs Pod Kubernetes : concept similaire mais implémentation différente
* Podman vs containerd : Podman est un outil utilisateur, containerd est un runtime
* podman-compose vs Docker Compose : compatibilité partielle

---

## Explication simplifiée

Podman fonctionne comme Docker mais sans le « chef d'orchestre permanent » (daemon). Chaque conteneur est lancé directement, ce qui est plus sûr car il n'y a pas besoin de droits administrateur. Les commandes sont les mêmes qu'avec Docker.

---

## Explication avancée

Podman adopte un modèle fork-exec où chaque conteneur est un processus enfant direct, éliminant le point unique de défaillance que représente le daemon Docker. Le mode rootless exploite les user namespaces Linux pour mapper les UID/GID, permettant l'isolation sans privilèges root. Podman utilise les runtimes OCI (comme crun ou runc) et stocke les images en couches via containers/storage. L'intégration avec systemd permet de gérer les conteneurs comme des services système classiques.

---

## Points critiques à retenir

* [CRITIQUE] Podman ne nécessite pas de daemon root
* [CRITIQUE] Compatible CLI avec Docker (même syntaxe de commandes)
* [IMPORTANT] Le mode rootless améliore significativement la sécurité
* [IMPORTANT] Support natif des pods pour regrouper des conteneurs
* [PIÈGE] Toutes les fonctionnalités Docker ne sont pas supportées
* [PIÈGE] Le mode rootless nécessite une configuration des sous-UID/GID
