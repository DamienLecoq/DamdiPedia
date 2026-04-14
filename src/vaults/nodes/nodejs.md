---
id: nodejs
label: Node.js
category: framework
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:59:23.949Z'
updatedAt: '2026-04-14T17:59:23.949Z'
relations:
  - target: javascript
    type: uses
    weight: 0.9
  - target: npm
    type: uses
    weight: 0.8
resources:
  - type: documentation
    title: Documentation officielle Node.js
    url: 'https://nodejs.org/fr/docs'
  - type: vidéo
    title: Fireship – Node.js in 100 Seconds
    url: 'https://www.youtube.com/watch?v=ENrzD9HAZK4'
  - type: vidéo
    title: freeCodeCamp – Node.js Full Course
    url: 'https://www.youtube.com/watch?v=Oe421EPjeBE'
  - type: blog
    title: Node.js Best Practices
    url: 'https://github.com/goldbergyoni/nodebestpractices'
  - type: cours
    title: The Odin Project – NodeJS Path
    url: 'https://www.theodinproject.com/paths/full-stack-javascript/courses/nodejs'
---

## Résumé rapide

Node.js est un environnement d'exécution JavaScript côté serveur, construit sur le moteur V8 de Chrome. Il permet de créer des applications réseau rapides et scalables grâce à son modèle d'E/S non bloquant et événementiel.

---

## Définition

Node.js est un runtime JavaScript open source, multiplateforme, qui exécute du code JavaScript en dehors du navigateur web. Il utilise un modèle asynchrone piloté par les événements, conçu pour construire des applications réseau performantes.

---

## Histoire

* Créé par Ryan Dahl en 2009, frustré par les limitations des serveurs HTTP classiques (Apache)
* Basé sur le moteur V8 de Google Chrome pour exécuter JavaScript rapidement
* npm (Node Package Manager) lancé en 2010, devenu le plus grand registre de packages au monde
* io.js fork en 2014, réunifié avec Node.js en 2015 sous la Node.js Foundation
* Aujourd'hui maintenu par l'OpenJS Foundation et utilisé par Netflix, LinkedIn, PayPal, Uber

---

## Objectif

* Permettre l'exécution de JavaScript côté serveur
* Offrir un modèle d'E/S non bloquant pour gérer de nombreuses connexions simultanées
* Unifier le langage entre frontend et backend (JavaScript partout)
* Fournir un écosystème riche via npm pour accélérer le développement

---

## Domaines d'utilisation

* API REST et GraphQL (Express.js, Fastify, NestJS)
* Applications temps réel (chat, notifications via WebSocket)
* Microservices et architectures serverless
* Outils de développement et CLI (Webpack, Babel, ESLint)
* Streaming de données et applications IoT

---

## Fonctionnement

* Le moteur V8 compile JavaScript en code machine natif (JIT compilation)
* Boucle d'événements (event loop) mono-thread pour gérer les requêtes de manière non bloquante
* libuv gère les opérations d'E/S asynchrones (fichiers, réseau, DNS) via un pool de threads
* Les callbacks, Promises et async/await permettent de gérer l'asynchronisme
* Les modules sont chargés via CommonJS (`require`) ou ES Modules (`import`)

---

## Concepts clés

* **Event Loop** — Boucle mono-thread qui traite les événements et les callbacks de manière non bloquante
* **Non-blocking I/O** — Les opérations d'E/S ne bloquent pas le thread principal
* **Streams** — Traitement de données en flux continu sans charger tout en mémoire
* **Modules** — Système de modules CommonJS (`require`) ou ESM (`import/export`)
* **Middleware** — Fonctions chaînées qui traitent les requêtes (pattern popularisé par Express)
* **Cluster** — Module permettant de créer des processus enfants pour exploiter les CPU multi-cœurs

---

## Exemple

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Bonjour depuis Node.js !' }));
});

server.listen(3000, () => {
  console.log('Serveur démarré sur http://localhost:3000');
});
```

---

## Avantages

* JavaScript côté serveur → un seul langage front et back
* Très performant pour les applications I/O-bound (réseau, fichiers)
* Écosystème npm massif (plus de 2 millions de packages)
* Démarrage rapide et prototypage efficace
* Grande communauté et support entreprise solide

---

## Inconvénients

* Mono-thread → inadapté aux tâches CPU-intensives (calcul lourd, compression)
* Callback hell historique (atténué par Promises et async/await)
* Écosystème fragmenté avec beaucoup de packages de qualité variable
* Gestion des erreurs asynchrones parfois complexe
* Pas de typage statique natif (nécessite TypeScript)

---

## Pièges courants

* Bloquer l'event loop avec du code synchrone ou du calcul CPU lourd
* Oublier de gérer les erreurs dans les Promises (unhandled rejection)
* Confondre `require` (CommonJS) et `import` (ESM) dans le même projet
* Ne pas gérer la mémoire des Streams correctement (fuites mémoire)
* Installer des packages npm sans vérifier leur fiabilité (sécurité)

---

## À ne pas confondre

* Node.js vs JavaScript (runtime vs langage)
* Node.js vs Deno (même créateur, architectures différentes)
* npm vs npx (gestionnaire de packages vs exécuteur de packages)
* `require` vs `import` (CommonJS vs ES Modules)

---

## Explication simplifiée

Node.js permet d'exécuter du JavaScript en dehors du navigateur, sur un serveur. Imagine un serveur de restaurant : au lieu d'attendre qu'un plat soit prêt avant de prendre la commande suivante, Node.js prend toutes les commandes en même temps et sert chaque plat dès qu'il est prêt.

---

## Explication avancée

Node.js repose sur le moteur V8 de Chrome pour la compilation JIT du JavaScript et sur libuv pour l'abstraction des E/S asynchrones multiplateformes. L'event loop, mono-thread, délègue les opérations bloquantes (fichiers, réseau, DNS) au pool de threads de libuv, puis exécute les callbacks correspondants via des phases ordonnées (timers, pending, poll, check, close). Le module cluster permet de fork des processus workers pour exploiter les architectures multi-cœurs. Les Worker Threads offrent une alternative pour le calcul CPU-intensif sans bloquer l'event loop principal.

---

## Points critiques à retenir

* [CRITIQUE] Node.js est mono-thread avec une event loop non bloquante
* [CRITIQUE] Conçu pour les applications I/O-bound, pas CPU-bound
* [IMPORTANT] npm est le plus grand registre de packages au monde
* [IMPORTANT] V8 compile le JavaScript en code machine via JIT
* [PIÈGE] Ne jamais bloquer l'event loop avec du code synchrone lourd
* [PIÈGE] Toujours gérer les rejections de Promises non capturées
