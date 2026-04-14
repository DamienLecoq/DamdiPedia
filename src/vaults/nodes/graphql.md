---
id: graphql
label: GraphQL
category: concept
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:58:49.327Z'
updatedAt: '2026-04-14T17:58:49.327Z'
relations:
  - target: api-rest
    type: related
    weight: 0.8
  - target: javascript
    type: related
    weight: 0.6
resources:
  - type: documentation
    title: GraphQL Documentation officielle
    url: 'https://graphql.org/learn/'
  - type: cours
    title: How to GraphQL
    url: 'https://www.howtographql.com/'
  - type: vidéo
    title: Fireship – GraphQL in 100 Seconds
    url: 'https://www.youtube.com/watch?v=eIQh02xuVw4'
---

## Résumé rapide

GraphQL est un langage de requête pour API, créé par Facebook, qui permet aux clients de demander exactement les données dont ils ont besoin en une seule requête, avec un schéma typé fort.

---

## Définition

GraphQL est à la fois un langage de requête pour API et un runtime côté serveur pour exécuter ces requêtes. Contrairement à REST où chaque endpoint retourne une structure fixe, GraphQL laisse le client spécifier la forme exacte de la réponse.

---

## Histoire

* Développé en interne chez Facebook en 2012
* Open-source en 2015
* GraphQL Foundation créée en 2018 (Linux Foundation)
* Adopté par GitHub, Shopify, Netflix, Airbnb
* Relay, Apollo, urql popularisent les clients

---

## Objectif

* Éviter le over-fetching et under-fetching de REST
* Typer fortement les contrats API
* Permettre l'évolution sans versioning
* Unifier plusieurs services en un seul endpoint

---

## Domaines d'utilisation

* API mobile (bande passante limitée)
* Agrégation de microservices (BFF)
* Applications React/Relay complexes
* API publiques typées (GitHub API v4)

---

## Fonctionnement

* Un seul endpoint POST `/graphql`
* Le client envoie une query décrivant les champs voulus
* Le serveur résout chaque champ via des resolvers
* Le schéma SDL définit types, queries, mutations, subscriptions
* Introspection : le schéma est auto-documenté

---

## Concepts clés

* **Query** — Lecture de données
* **Mutation** — Modification de données
* **Subscription** — Stream temps réel (WebSocket)
* **Resolver** — Fonction qui résout un champ
* **Schema (SDL)** — Définition typée de l'API
* **Fragment** — Fragment de query réutilisable

---

## Exemple

```graphql
# Schéma
type User {
  id: ID!
  name: String!
  posts: [Post!]!
}

type Query {
  user(id: ID!): User
}

# Query client
query {
  user(id: "42") {
    name
    posts {
      title
    }
  }
}
```

---

## Avantages

* Le client demande exactement ce qu'il veut
* Typage fort et introspection du schéma
* Pas de versioning (évolution via deprecation)
* Un seul endpoint pour toute l'API
* Excellent tooling (Apollo, GraphiQL)

---

## Inconvénients

* Caching HTTP plus complexe que REST
* Courbe d'apprentissage serveur
* Attaques par requêtes complexes (DoS)
* Le N+1 problem sans DataLoader

---

## Pièges courants

* Resolvers naïfs causant N+1 queries (utiliser DataLoader)
* Queries trop profondes non limitées (DoS)
* Mal gérer l'authn/authz au niveau des resolvers
* Confondre fragments et inline fragments

---

## À ne pas confondre

* GraphQL vs REST (client-driven vs server-driven)
* Query vs Mutation (lecture vs écriture)
* GraphQL vs gRPC (client web vs inter-services binaire)

---

## Explication simplifiée

GraphQL c'est comme commander au restaurant : au lieu de prendre le menu imposé (REST), tu dis exactement ce que tu veux dans ton assiette (name, email, posts.title). Plus de gaspillage, moins d'allers-retours.

---

## Explication avancée

GraphQL exécute les resolvers de manière récursive en fonction de l'AST de la query. Le schéma SDL est la source de vérité, permettant l'introspection et la génération de types TypeScript côté client. Le pattern DataLoader groupe et cache les appels aux bases pour éviter le N+1. Les subscriptions utilisent typiquement WebSocket pour le temps réel.

---

## Points critiques à retenir

* [CRITIQUE] DataLoader obligatoire pour éviter les N+1
* [CRITIQUE] Limiter profondeur et complexité des queries (DoS)
* [IMPORTANT] Authn/authz dans chaque resolver
* [IMPORTANT] Introspection désactivée en production
* [PIÈGE] Cache HTTP complexe : utiliser Apollo Client cache
