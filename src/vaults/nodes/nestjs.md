---
id: nestjs
label: NestJS
category: framework
priority: medium
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:59:20.510Z'
updatedAt: '2026-04-14T17:59:20.510Z'
relations:
  - target: nodejs
    type: runs-on
    weight: 0.9
  - target: typescript
    type: uses
    weight: 0.8
resources:
  - type: documentation
    title: Documentation officielle NestJS
    url: 'https://docs.nestjs.com/'
  - type: vidéo
    title: Fireship – NestJS in 100 Seconds
    url: 'https://www.youtube.com/watch?v=0M8AYU_hPas'
  - type: vidéo
    title: freeCodeCamp – NestJS Full Course
    url: 'https://www.youtube.com/watch?v=GHTA143_b-s'
  - type: blog
    title: NestJS – Blog officiel
    url: 'https://trilon.io/blog'
  - type: cours
    title: NestJS Fundamentals – Cours officiel
    url: 'https://courses.nestjs.com/'
---

## Résumé rapide

NestJS est un framework Node.js progressif et fortement structuré, construit avec TypeScript. Inspiré d'Angular, il utilise les décorateurs, l'injection de dépendances et une architecture modulaire pour créer des applications serveur maintenables et testables.

---

## Définition

NestJS est un framework Node.js opiné pour construire des applications côté serveur efficaces et scalables. Il utilise TypeScript par défaut, s'appuie sur Express (ou Fastify) en dessous, et impose une architecture modulaire inspirée d'Angular avec des décorateurs et l'injection de dépendances.

---

## Histoire

* Créé par Kamil Myśliwiec en 2017
* Inspiré directement de l'architecture d'Angular (modules, décorateurs, DI)
* Conçu pour combler le manque de structure dans l'écosystème Node.js
* Adopté rapidement par les entreprises pour les backends complexes
* Devenu le framework TypeScript côté serveur le plus populaire

---

## Objectif

* Apporter une architecture solide et opinée au développement Node.js
* Faciliter la création d'applications maintenables et testables à grande échelle
* Exploiter pleinement TypeScript (décorateurs, types, interfaces)
* Fournir une solution complète avec des modules intégrés (GraphQL, WebSocket, microservices)

---

## Domaines d'utilisation

* API REST et GraphQL d'entreprise
* Architectures microservices
* Applications temps réel (WebSocket, Server-Sent Events)
* Backends complexes nécessitant une architecture stricte
* Applications full-stack avec Angular ou React

---

## Fonctionnement

* Construit au-dessus d'Express.js (ou Fastify en option) comme couche HTTP
* Architecture modulaire : chaque fonctionnalité est encapsulée dans un module
* Injection de dépendances gérée par un conteneur IoC (Inversion of Control)
* Les décorateurs TypeScript (`@Controller`, `@Injectable`, `@Module`) définissent les métadonnées
* Le cycle de vie d'une requête passe par guards → interceptors → pipes → handlers → interceptors

---

## Concepts clés

* **Module** — Unité d'organisation qui regroupe controllers, providers et imports (`@Module`)
* **Controller** — Gère les routes HTTP entrantes et retourne les réponses (`@Controller`)
* **Provider / Service** — Classe injectable contenant la logique métier (`@Injectable`)
* **Pipe** — Transforme ou valide les données d'entrée avant le handler
* **Guard** — Contrôle l'accès aux routes (authentification, autorisation)
* **Interceptor** — Logique avant/après l'exécution du handler (logging, transformation)

---

## Exemple

```typescript
// utilisateurs.controller.ts
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UtilisateursService } from './utilisateurs.service';

@Controller('utilisateurs')
export class UtilisateursController {
  constructor(private readonly utilisateursService: UtilisateursService) {}

  @Get()
  trouverTous() {
    return this.utilisateursService.trouverTous();
  }

  @Get(':id')
  trouverParId(@Param('id') id: string) {
    return this.utilisateursService.trouverParId(+id);
  }

  @Post()
  creer(@Body() dto: { nom: string; email: string }) {
    return this.utilisateursService.creer(dto);
  }
}
```

---

## Avantages

* Architecture modulaire et structurée dès le départ
* TypeScript natif avec décorateurs et typage fort
* Injection de dépendances intégrée → testabilité excellente
* Écosystème riche (modules officiels pour GraphQL, WebSocket, CQRS, etc.)
* CLI puissant pour générer du code (`nest generate`)

---

## Inconvénients

* Courbe d'apprentissage élevée (beaucoup de concepts à maîtriser)
* Boilerplate important pour les petits projets
* Surcharge d'abstraction par rapport à Express brut
* Les décorateurs TypeScript sont encore expérimentaux dans le standard ECMAScript
* Performances légèrement inférieures à Express/Fastify pur (couches d'abstraction)

---

## Pièges courants

* Oublier d'ajouter un service dans le tableau `providers` du module
* Dépendances circulaires entre modules (utiliser `forwardRef()`)
* Confondre les scopes des providers (singleton par défaut vs request-scoped)
* Ne pas utiliser les DTOs et pipes de validation pour sécuriser les entrées
* Surcharger les interceptors avec trop de logique

---

## À ne pas confondre

* NestJS vs Express.js (opiné et structuré vs minimaliste et libre)
* NestJS vs Angular (backend vs frontend, même philosophie)
* Module NestJS vs module ES/CommonJS (organisation applicative vs système d'import)
* Provider vs Controller (logique métier vs gestion des routes)

---

## Explication simplifiée

NestJS est comme un plan d'architecte pour construire ton serveur Node.js. Au lieu de poser les briques toi-même n'importe comment (comme avec Express), NestJS te donne un cadre précis avec des pièces prédéfinies (modules, contrôleurs, services) pour que tout soit bien organisé.

---

## Explication avancée

NestJS utilise le pattern d'injection de dépendances via un conteneur IoC qui résout automatiquement les dépendances à partir des métadonnées des décorateurs TypeScript (`reflect-metadata`). Chaque module définit un scope d'injection avec ses providers, imports et exports. Le système de pipeline de requêtes suit un ordre précis : Guards (autorisation) → Interceptors (pré-traitement) → Pipes (validation/transformation) → Handler → Interceptors (post-traitement) → Exception Filters. Sous le capot, NestJS abstrait la couche HTTP via un adaptateur (Express ou Fastify), permettant de changer de moteur sans modifier le code applicatif.

---

## Points critiques à retenir

* [CRITIQUE] Architecture modulaire obligatoire (Module → Controller → Service)
* [CRITIQUE] Injection de dépendances gérée par conteneur IoC
* [IMPORTANT] TypeScript est le langage par défaut et recommandé
* [IMPORTANT] Pipeline de requêtes : Guards → Interceptors → Pipes → Handler
* [PIÈGE] Toujours déclarer les providers dans le bon module
* [PIÈGE] Attention aux dépendances circulaires entre modules
