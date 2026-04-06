---
id: docker
label: Docker
category: logiciel
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: 'Fri Jan 10 2025 11:00:00 GMT+0100 (heure normale d’Europe centrale)'
updatedAt: '2026-04-06T13:35:34.731Z'
relations:
  - target: kubernetes
    type: depends_on
    weight: 0.9
resources:
  - type: documentation
    title: Documentation officielle Docker
    url: 'https://docs.docker.com'
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
