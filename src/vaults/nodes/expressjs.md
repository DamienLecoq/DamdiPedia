---
id: expressjs
label: Express.js
category: framework
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:58:34.122Z'
updatedAt: '2026-04-14T17:58:34.122Z'
relations:
  - target: nodejs
    type: runs-on
    weight: 0.9
resources:
  - type: documentation
    title: Documentation officielle Express.js
    url: 'https://expressjs.com/fr/'
  - type: vidéo
    title: Fireship – Express.js in 100 Seconds
    url: 'https://www.youtube.com/watch?v=Sn1gfe2gzhg'
  - type: vidéo
    title: freeCodeCamp – Express.js Full Course
    url: 'https://www.youtube.com/watch?v=G8uL0lFFoN0'
  - type: blog
    title: MDN – Introduction à Express/Node
    url: >-
      https://developer.mozilla.org/fr/docs/Learn/Server-side/Express_Nodejs/Introduction
  - type: cours
    title: The Odin Project – Express
    url: 'https://www.theodinproject.com/lessons/nodejs-introduction-to-express'
---

## Résumé rapide

Express.js est le framework web minimaliste et flexible le plus populaire pour Node.js. Il fournit un ensemble robuste de fonctionnalités pour créer des API et des applications web, en s'appuyant sur un système de middleware simple et puissant.

---

## Définition

Express.js est un framework web minimaliste pour Node.js, non opiné, qui fournit une couche mince au-dessus de Node.js pour gérer le routage HTTP, les middlewares, les templates et la gestion d'erreurs, sans imposer de structure de projet.

---

## Histoire

* Créé par TJ Holowaychuk en 2010, inspiré de Sinatra (Ruby)
* Rapidement devenu le framework Node.js le plus utilisé
* Transféré à StrongLoop puis à l'OpenJS Foundation
* Express 4 (2014) a retiré les middlewares intégrés pour plus de modularité
* Express 5 en développement longtemps, le framework reste le standard de facto pour Node.js

---

## Objectif

* Fournir une abstraction légère au-dessus du module HTTP de Node.js
* Simplifier le routage et la gestion des requêtes/réponses
* Offrir un système de middleware extensible et composable
* Rester minimal et non opiné pour laisser le choix au développeur

---

## Domaines d'utilisation

* API REST et backends d'applications web
* Serveur de rendu côté serveur (SSR) avec moteurs de templates (EJS, Pug)
* Microservices légers
* Passerelles API (API gateways)
* Prototypage rapide d'applications web

---

## Fonctionnement

* Express enveloppe le module `http` natif de Node.js
* Les requêtes passent à travers une chaîne de middlewares (pipeline)
* Chaque middleware peut lire/modifier la requête (`req`) et la réponse (`res`)
* Le routeur associe les URL et méthodes HTTP aux handlers correspondants
* Les middlewares d'erreur capturent les exceptions (4 paramètres : `err, req, res, next`)

---

## Concepts clés

* **Middleware** — Fonction `(req, res, next)` qui traite une requête avant de la passer au suivant
* **Routage** — Mappage des URL et méthodes HTTP vers des fonctions de traitement
* **Router** — Mini-application Express pour modulariser les routes
* **req / res** — Objets requête et réponse enrichis par Express
* **Template engine** — Moteur de rendu HTML côté serveur (EJS, Pug, Handlebars)

---

## Exemple

```javascript
const express = require('express');
const app = express();

app.use(express.json()); // Middleware pour parser le JSON

app.get('/api/utilisateurs', (req, res) => {
  res.json([
    { id: 1, nom: 'Alice' },
    { id: 2, nom: 'Bob' }
  ]);
});

app.post('/api/utilisateurs', (req, res) => {
  const { nom } = req.body;
  res.status(201).json({ id: 3, nom });
});

// Middleware de gestion d'erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ erreur: 'Erreur serveur interne' });
});

app.listen(3000, () => console.log('Serveur Express sur le port 3000'));
```

---

## Avantages

* Minimaliste et très facile à prendre en main
* Écosystème de middlewares énorme (cors, helmet, morgan, etc.)
* Non opiné : liberté totale sur la structure du projet
* Documentation claire et communauté massive
* Standard de facto pour les API Node.js

---

## Inconvénients

* Pas de structure imposée → peut mener à du code désorganisé sur les gros projets
* Pas de support natif de TypeScript (nécessite une configuration manuelle)
* Pas de fonctionnalités avancées intégrées (validation, ORM, authentification)
* Gestion asynchrone parfois verbeuse (pas de support natif des async handlers avant Express 5)
* Performances inférieures à des alternatives plus récentes (Fastify)

---

## Pièges courants

* Oublier d'appeler `next()` dans un middleware → requête qui reste en attente indéfiniment
* Ne pas mettre le middleware d'erreur en dernier (4 paramètres obligatoires)
* Oublier `express.json()` pour parser le body des requêtes POST/PUT
* Ne pas gérer les erreurs asynchrones (les Promises rejetées ne sont pas capturées automatiquement)
* Confondre l'ordre des middlewares (ils s'exécutent dans l'ordre de déclaration)

---

## À ne pas confondre

* Express.js vs Fastify (minimaliste classique vs minimaliste performant)
* Express.js vs NestJS (non opiné vs opiné avec architecture structurée)
* Express.js vs Koa (même créateur, Koa est plus moderne avec async/await natif)
* Middleware vs Route handler (le middleware traite, le handler répond)

---

## Explication simplifiée

Express.js est comme un bureau de poste pour ton serveur web. Chaque lettre (requête) passe par différents guichets (middlewares) qui peuvent la vérifier, la tamponner, puis elle arrive au bon destinataire (la route) qui prépare la réponse.

---

## Explication avancée

Express.js fonctionne comme un pipeline de middlewares construit au-dessus du module `http.createServer()` de Node.js. Chaque middleware est une fonction qui reçoit les objets `req` et `res` enrichis (avec des méthodes comme `res.json()`, `req.params`, `req.query`) et un callback `next` pour passer au middleware suivant. Le routeur utilise un arbre de correspondance pour mapper les méthodes HTTP et les patterns d'URL (incluant les paramètres dynamiques `:id`) aux handlers. Les erreurs sont propagées via `next(err)` vers les middlewares d'erreur à 4 paramètres. Le pattern est extensible via `app.use()` et `Router` pour créer des sous-applications modulaires.

---

## Points critiques à retenir

* [CRITIQUE] Express repose sur le pattern middleware `(req, res, next)`
* [CRITIQUE] L'ordre de déclaration des middlewares et routes est déterminant
* [IMPORTANT] Framework non opiné — la structure du projet est à la charge du développeur
* [IMPORTANT] Le middleware d'erreur doit avoir exactement 4 paramètres
* [PIÈGE] Toujours appeler `next()` ou envoyer une réponse dans chaque middleware
* [PIÈGE] Les erreurs asynchrones ne sont pas capturées automatiquement (Express 4)
