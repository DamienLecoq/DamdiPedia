---
id: docker
label: Docker
category: devops
priority: high
status: learning
createdAt: 2025-01-10T10:00:00Z
updatedAt: 2025-01-10T10:00:00Z
relations:
  - target: kubernetes
    type: depends_on
    weight: 0.9
  - target: linux
    type: uses
    weight: 0.7
resources:
  - type: documentation
    title: Documentation officielle Docker
    url: https://docs.docker.com
---

## Qu'est-ce que Docker ?

Docker est une plateforme de conteneurisation permettant d'empaqueter des applications et leurs dépendances dans des conteneurs isolés.

## Concepts clés

- **Image** : Modèle en lecture seule utilisé pour créer des conteneurs
- **Conteneur** : Instance en cours d'exécution d'une image
- **Dockerfile** : Script définissant comment construire une image
- **Registre** : Stockage d'images Docker (ex. Docker Hub)

## Commandes courantes

- `docker build -t monapp .` — construire une image depuis un Dockerfile
- `docker run -p 8080:80 monapp` — lancer un conteneur avec mappage de port
- `docker ps` — lister les conteneurs actifs
- `docker compose up` — démarrer des applications multi-conteneurs

## Pourquoi utiliser Docker ?

Élimine le problème « ça marche sur ma machine » en empaquetant l'environnement complet.
