---
id: api-rest
label: API REST
category: concept
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-11T14:14:44.191Z'
updatedAt: '2026-04-11T14:14:44.191Z'
relations:
  - target: http
    type: uses
    weight: 0.9
  - target: json
    type: uses
    weight: 0.8
resources:
  - type: documentation
    title: MDN – HTTP et REST
    url: 'https://developer.mozilla.org/fr/docs/Glossary/REST'
  - type: documentation
    title: RESTful API Design – Microsoft
    url: >-
      https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design
  - type: vidéo
    title: freeCodeCamp – APIs for Beginners
    url: 'https://www.youtube.com/watch?v=GZvSYJDk-us'
  - type: vidéo
    title: Fireship – RESTful APIs in 100 Seconds
    url: 'https://www.youtube.com/watch?v=-MTSQjw5DrM'
  - type: blog
    title: RESTful API Tutorial
    url: 'https://restfulapi.net/'
  - type: blog
    title: Swagger – OpenAPI Specification
    url: 'https://swagger.io/specification/'
  - type: cours
    title: Udemy – REST API Design
    url: 'https://www.udemy.com/course/rest-api/'
  - type: autre
    title: Postman – Outil de test d'APIs
    url: 'https://www.postman.com/'
  - type: autre
    title: Hoppscotch – Alternative open source à Postman
    url: 'https://hoppscotch.io/'
---

## Résumé rapide

Une API REST est une interface de communication entre systèmes basée sur le protocole HTTP. Elle utilise les méthodes HTTP (GET, POST, PUT, DELETE) pour manipuler des ressources identifiées par des URLs, généralement au format JSON.

---

## Définition

REST (Representational State Transfer) est un style architectural pour concevoir des services web. Une API REST expose des ressources via des endpoints HTTP, sans état côté serveur, permettant à des clients (frontend, mobile, autres services) d'interagir avec le système.

---

## Histoire

* Défini en 2000 par Roy Fielding dans sa thèse de doctorat
* Alternative plus légère aux services SOAP/XML des années 2000
* Adoption massive avec l'essor des applications web et mobiles
* Aujourd'hui le standard de facto pour les APIs web
* Complété par GraphQL et gRPC pour certains cas d'usage

---

## Objectif

* Fournir une interface standard pour la communication client-serveur
* Permettre l'interopérabilité entre systèmes hétérogènes
* Découpler le frontend du backend
* Faciliter l'intégration entre services

---

## Domaines d'utilisation

* Applications web (frontend ↔ backend)
* Applications mobiles (app ↔ serveur)
* Intégration entre microservices
* APIs publiques (GitHub, Stripe, Twitter…)
* IoT (capteurs → serveur)

---

## Fonctionnement

* Le client envoie une **requête HTTP** à un endpoint (URL)
* Le serveur traite la requête et renvoie une **réponse** avec un code de statut
* Les données sont échangées en **JSON** (ou XML)
* Chaque requête est **sans état** (stateless) : le serveur ne garde rien en mémoire entre les requêtes

---

## Concepts clés

* **Ressource** — Entité manipulée (utilisateur, produit, commande…)
* **Endpoint** — URL identifiant une ressource (`/api/users/42`)
* **Méthodes HTTP** — GET (lire), POST (créer), PUT (modifier), DELETE (supprimer)
* **Codes de statut** — 200 (OK), 201 (Créé), 404 (Non trouvé), 500 (Erreur serveur)
* **Stateless** — Pas d'état côté serveur entre les requêtes
* **HATEOAS** — Hypermedia comme moteur de l'état de l'application (niveau de maturité le plus élevé)

---

## Exemple

```
GET    /api/users        → Liste des utilisateurs
GET    /api/users/42     → Détail de l'utilisateur 42
POST   /api/users        → Créer un utilisateur (body JSON)
PUT    /api/users/42     → Modifier l'utilisateur 42
DELETE /api/users/42     → Supprimer l'utilisateur 42
```

```json
// Réponse GET /api/users/42
{
  "id": 42,
  "name": "Alice",
  "email": "alice@example.com"
}
```

---

## Structure / Architecture

* **Routes** — Définition des endpoints et méthodes acceptées
* **Controllers** — Traitement des requêtes
* **Services** — Logique métier
* **Modèles** — Représentation des données
* **Middleware** — Authentification, logging, validation

---

## Syntaxe et spécificités

* URLs au pluriel et hiérarchiques (`/users/42/orders`)
* Versioning : `/api/v1/users` ou header `Accept: application/vnd.api.v1+json`
* Pagination : `?page=2&limit=20`
* Filtrage : `?status=active&sort=name`
* Authentification : JWT, OAuth2, API keys

---

## Avantages

* Simple et intuitif (basé sur HTTP standard)
* Indépendant du langage (tout client HTTP peut consommer l'API)
* Scalable et cacheable
* Largement supporté par tous les frameworks

---

## Inconvénients

* Over-fetching / under-fetching (on reçoit trop ou pas assez de données)
* Pas de standard strict (chacun implémente différemment)
* Pas adapté au temps réel (WebSockets préférés)
* Versioning complexe à maintenir

---

## Pièges courants

* Utiliser GET pour des opérations de modification
* Ne pas versionner l'API dès le départ
* Retourner des erreurs avec un code 200 (masquer les erreurs)
* Exposer des données sensibles dans les réponses
* Oublier la pagination sur les listes

---

## À ne pas confondre

* REST vs SOAP (léger/HTTP vs protocole XML strict)
* REST vs GraphQL (endpoints multiples vs endpoint unique avec requêtes flexibles)
* REST vs gRPC (JSON/HTTP vs Protocol Buffers/HTTP2)
* API vs SDK (interface vs bibliothèque cliente)

---

## Explication simplifiée

Une API REST, c'est comme un serveur de restaurant : tu passes ta commande (requête HTTP), le serveur l'amène en cuisine (backend), et te rapporte ton plat (réponse JSON). Tu n'as pas besoin de savoir comment la cuisine fonctionne.

---

## Explication avancée

REST définit 6 contraintes architecturales : client-serveur, stateless, cacheable, interface uniforme, système en couches, et code-on-demand (optionnel). Le modèle de maturité de Richardson classe les APIs REST en 4 niveaux, du niveau 0 (RPC sur HTTP) au niveau 3 (HATEOAS), bien que la majorité des APIs se situent au niveau 2.

---

## Points critiques à retenir

* [CRITIQUE] REST utilise les méthodes HTTP (GET, POST, PUT, DELETE) sur des ressources
* [CRITIQUE] Stateless — chaque requête est indépendante
* [IMPORTANT] Les codes de statut HTTP doivent être utilisés correctement
* [IMPORTANT] JSON est le format d'échange standard
* [PIÈGE] Ne pas utiliser GET pour modifier des données
* [PIÈGE] Over-fetching : GraphQL peut être une meilleure alternative si les besoins sont complexes
