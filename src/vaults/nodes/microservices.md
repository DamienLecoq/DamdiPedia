---
id: microservices
label: Microservices
category: concept
priority: medium
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-11T10:01:25.685Z'
updatedAt: '2026-04-11T10:01:25.685Z'
relations:
  - target: docker
    type: uses
    weight: 0.9
  - target: kubernetes
    type: uses
    weight: 0.8
  - target: api-rest
    type: uses
    weight: 0.8
  - target: spring-boot
    type: used_by
    weight: 0.7
  - target: json
    type: uses
    weight: 0.5
resources:
  - type: documentation
    title: Martin Fowler – Microservices
    url: 'https://martinfowler.com/articles/microservices.html'
  - type: documentation
    title: Microsoft – Microservices Architecture
    url: >-
      https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/microservices
  - type: vidéo
    title: TechWorld with Nana – Microservices Explained
    url: 'https://www.youtube.com/watch?v=rv4LlmLmVWk'
  - type: vidéo
    title: Fireship – Microservices Explained
    url: 'https://www.youtube.com/watch?v=lTAcCNbJ7KE'
  - type: blog
    title: Netflix Tech Blog – Microservices
    url: 'https://netflixtechblog.com/'
  - type: cours
    title: Udemy – Microservices with Spring Boot
    url: >-
      https://www.udemy.com/course/microservices-with-spring-boot-and-spring-cloud/
  - type: livre
    title: Building Microservices – Sam Newman
    url: 'https://www.amazon.com/dp/1492034029'
---

## Résumé rapide

Les microservices sont un style architectural où une application est découpée en petits services indépendants, chacun responsable d'une fonctionnalité métier, déployable et scalable individuellement, communiquant entre eux via des APIs.

---

## Définition

L'architecture microservices décompose une application en services autonomes, faiblement couplés, chacun avec sa propre base de données et sa logique métier. Les services communiquent via des APIs (REST, gRPC, messages).

---

## Histoire

* Concept émergé au début des années 2010
* Popularisé par Netflix, Amazon, Spotify
* Formalisé par Martin Fowler et James Lewis en 2014
* Adoption massive avec Docker et Kubernetes
* Aujourd'hui remis en question pour les petites équipes (retour au monolithe)

---

## Objectif

* Permettre le déploiement indépendant de chaque service
* Scaler uniquement les parties qui en ont besoin
* Permettre à des équipes autonomes de travailler en parallèle
* Utiliser la technologie la plus adaptée pour chaque service

---

## Domaines d'utilisation

* Applications à fort trafic (Netflix, Uber, Spotify)
* Plateformes e-commerce
* Systèmes SaaS
* Applications nécessitant une scalabilité fine

---

## Fonctionnement

* L'application est divisée en **services métier** indépendants
* Chaque service a sa propre **base de données** (database per service)
* Les services communiquent via **API REST**, **gRPC** ou **messages** (Kafka, RabbitMQ)
* Un **API Gateway** centralise les requêtes entrantes
* Chaque service est **conteneurisé** (Docker) et **orchestré** (Kubernetes)

---

## Concepts clés

* **Service** — Unité autonome de fonctionnalité métier
* **API Gateway** — Point d'entrée unique qui route les requêtes
* **Service Discovery** — Enregistrement et localisation dynamique des services
* **Circuit Breaker** — Protection contre les pannes en cascade
* **Event-driven** — Communication asynchrone via des événements
* **Saga** — Gestion de transactions distribuées entre services

---

## Exemple

```
┌─────────────┐
│ API Gateway  │
└─────┬───────┘
      │
  ┌───┴────┬──────────┐
  │        │          │
┌─┴──┐  ┌──┴──┐  ┌───┴───┐
│User│  │Order│  │Payment│
│Svc │  │Svc  │  │Svc    │
└─┬──┘  └──┬──┘  └───┬───┘
  │        │          │
┌─┴──┐  ┌──┴──┐  ┌───┴───┐
│ DB │  │ DB  │  │  DB   │
└────┘  └─────┘  └───────┘
```

---

## Structure / Architecture

* **API Gateway** — Routing, authentification, rate limiting
* **Service Registry** — Catalogue des services et leurs adresses
* **Config Server** — Configuration centralisée
* **Message Broker** — Communication asynchrone (Kafka, RabbitMQ)
* **Monitoring** — Logs centralisés, tracing distribué, métriques

---

## Avantages

* Déploiement indépendant (une équipe, un service)
* Scalabilité granulaire (scaler uniquement ce qui en a besoin)
* Résilience (un service en panne n'arrête pas tout)
* Liberté technologique par service
* Aligne l'architecture technique sur l'organisation (loi de Conway)

---

## Inconvénients

* Complexité opérationnelle énorme (réseau, déploiement, monitoring)
* Debugging difficile (tracing distribué nécessaire)
* Latence réseau entre services
* Cohérence des données complexe (transactions distribuées)
* Overhead pour les petites équipes

---

## Pièges courants

* Adopter les microservices trop tôt (commencer monolithique, découper après)
* Créer des "micro-monolithes" (services trop couplés entre eux)
* Négliger le monitoring et le tracing distribué
* Ignorer le coût opérationnel (DevOps nécessaire)
* Transactions distribuées mal gérées (pas de ACID entre services)

---

## À ne pas confondre

* Microservices vs monolithe (distribué vs unitaire)
* Microservices vs SOA (léger/autonome vs lourd/ESB)
* API Gateway vs Load Balancer (routing intelligent vs distribution de charge)
* Synchrone (REST) vs asynchrone (events/messages)

---

## Explication simplifiée

Au lieu d'une grosse application qui fait tout, tu la découpes en petites applications indépendantes. Chacune gère un domaine (utilisateurs, commandes, paiements) et elles communiquent entre elles via des APIs.

---

## Explication avancée

L'architecture microservices applique le principe de bounded contexts du Domain-Driven Design : chaque service encapsule un domaine métier avec ses propres données et sa propre logique. La cohérence est assurée par des patterns de communication : eventual consistency via event sourcing, saga pattern pour les transactions distribuées, et CQRS pour séparer lecture et écriture. L'observabilité (logging, metrics, tracing) devient critique pour le debugging.

---

## Points critiques à retenir

* [CRITIQUE] Chaque service est indépendant : propre code, propre base, propre déploiement
* [CRITIQUE] La complexité opérationnelle est le coût principal
* [IMPORTANT] Commencer par un monolithe, découper quand nécessaire
* [IMPORTANT] Docker + Kubernetes = infrastructure standard pour les microservices
* [PIÈGE] Microservices pour une petite équipe = overhead disproportionné
* [PIÈGE] Services couplés = les inconvénients du monolithe + ceux du distribué
