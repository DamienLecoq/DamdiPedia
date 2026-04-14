---
id: javascript
label: JavaScript
category: langage
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:58:58.766Z'
updatedAt: '2026-04-14T17:58:58.767Z'
relations:
  - target: typescript
    type: related
    weight: 0.9
  - target: nodejs
    type: uses
    weight: 0.8
resources:
  - type: documentation
    title: MDN Web Docs — JavaScript
    url: 'https://developer.mozilla.org/fr/docs/Web/JavaScript'
  - type: documentation
    title: JavaScript.info — Tutoriel moderne
    url: 'https://javascript.info/'
  - type: vidéo
    title: JavaScript Full Course - freeCodeCamp
    url: 'https://www.youtube.com/watch?v=PkZNo7MFNFg'
  - type: livre
    title: Eloquent JavaScript — Marijn Haverbeke
    url: 'https://eloquentjavascript.net/'
  - type: documentation
    title: Spécification ECMAScript — TC39
    url: 'https://tc39.es/ecma262/'
---

## Résumé rapide
JavaScript est le langage de programmation du web, exécuté nativement par tous les navigateurs. Initialement conçu pour ajouter de l'interactivité aux pages web, il est devenu un langage universel utilisé aussi bien côté client (navigateur) que côté serveur (Node.js). C'est le langage de programmation le plus utilisé au monde selon les enquêtes développeurs.

---

## Définition
JavaScript est un langage de programmation interprété, dynamiquement typé, multi-paradigme (orienté objet par prototypes, fonctionnel, impératif). Créé par Brendan Eich en 1995 chez Netscape, il est standardisé sous le nom ECMAScript par l'ECMA International. JavaScript est le seul langage exécuté nativement par les navigateurs web et constitue l'un des trois piliers du développement web avec HTML et CSS.

---

## Histoire
* **1995** — Brendan Eich crée JavaScript en 10 jours chez Netscape, initialement nommé "Mocha" puis "LiveScript".
* **1997** — Première standardisation sous le nom ECMAScript (ECMA-262) pour éviter les guerres de navigateurs.
* **2009** — Node.js est créé par Ryan Dahl, permettant l'exécution de JavaScript côté serveur.
* **2015** — ES6/ES2015 révolutionne le langage avec les classes, les arrow functions, les Promises, let/const et les modules.
* **2020-2024** — Évolutions annuelles régulières : optional chaining, nullish coalescing, top-level await, records & tuples (propositions).

---

## Objectif
* Rendre les pages web interactives et dynamiques dans le navigateur.
* Fournir un langage universel fonctionnant aussi bien côté client que serveur.
* Permettre le développement full-stack avec un seul langage (JavaScript partout).
* Supporter un écosystème riche de frameworks et bibliothèques pour tous les cas d'usage.

---

## Domaines d'utilisation
* **Développement web front-end** — Interfaces utilisateur interactives avec React, Vue.js, Angular et Svelte.
* **Développement back-end** — Serveurs et API avec Node.js, Express, NestJS.
* **Applications mobiles** — React Native, Ionic pour les applications mobiles multiplateformes.
* **Applications desktop** — Electron (VS Code, Discord, Slack) et Tauri.

---

## Fonctionnement
* JavaScript est exécuté par un **moteur** intégré au navigateur (V8 pour Chrome/Node.js, SpiderMonkey pour Firefox).
* Le moteur utilise une **compilation JIT** (Just-In-Time) qui optimise le code à la volée pendant l'exécution.
* JavaScript est **mono-thread** mais gère l'asynchrone via la **boucle d'événements** (event loop) et les callbacks/Promises.
* Le **garbage collector** gère automatiquement la mémoire en libérant les objets non référencés.
* Les modules ES (`import`/`export`) permettent d'organiser le code en fichiers réutilisables.

---

## Concepts clés
* **Closures** — Fonctions qui capturent les variables de leur portée englobante, base de nombreux patterns.
* **Prototypes** — Système d'héritage basé sur la chaîne de prototypes, différent de l'héritage classique par classes.
* **Event Loop** — Boucle d'événements mono-thread qui gère les opérations asynchrones via une file de tâches.
* **Promises / async-await** — Abstractions pour la programmation asynchrone, remplaçant les callbacks imbriqués.
* **Destructuring** — Extraction concise de valeurs depuis des objets et tableaux (`const { a, b } = obj`).
* **Spread/Rest operator** — Opérateur `...` pour décomposer ou regrouper des éléments.

---

## Exemple
```javascript
// Programmation asynchrone avec async/await
async function recupererUtilisateurs() {
  try {
    const response = await fetch('https://api.exemple.com/utilisateurs');
    const utilisateurs = await response.json();

    // Destructuring et méthodes de tableaux
    const noms = utilisateurs
      .filter(({ age }) => age >= 18)
      .map(({ nom, prenom }) => `${prenom} ${nom}`)
      .sort();

    console.log('Utilisateurs majeurs :', noms);
    return noms;
  } catch (erreur) {
    console.error('Erreur lors de la récupération :', erreur);
  }
}

// Closures et fonctions d'ordre supérieur
const creerCompteur = (initial = 0) => {
  let count = initial;
  return {
    incrementer: () => ++count,
    valeur: () => count,
  };
};

const compteur = creerCompteur(10);
compteur.incrementer(); // 11
```

---

## Avantages
* Ubiquité absolue : c'est le seul langage exécuté nativement par tous les navigateurs web.
* Écosystème npm gigantesque avec plus de 2 millions de paquets disponibles.
* Polyvalence : front-end, back-end, mobile, desktop, IoT avec un seul langage.
* Courbe d'apprentissage initiale accessible grâce à une syntaxe flexible et un typage dynamique.
* Évolution constante et rétrocompatible grâce au processus de standardisation TC39.

---

## Inconvénients
* Le typage dynamique faible entraîne des comportements surprenants (coercion implicite : `"1" + 1 === "11"`).
* Les incohérences historiques du langage (`typeof null === "object"`, `NaN !== NaN`).
* L'écosystème npm souffre de fragmentation et de dépendances excessives.
* Le mono-threading limite les performances pour les calculs intensifs (mitigé par les Web Workers).

---

## Pièges courants
* **`this` dynamique** — La valeur de `this` dépend du contexte d'appel, pas de la déclaration, ce qui cause des bugs fréquents. Utiliser les arrow functions pour capturer le `this` lexical.
* **Coercion de types** — `==` effectue des conversions implicites (`"0" == false` est `true`). Toujours utiliser `===`.
* **Hoisting** — Les déclarations `var` et les fonctions sont remontées en haut de leur portée, causant des résultats inattendus. Préférer `let`/`const`.
* **Référence vs valeur** — Les objets et tableaux sont passés par référence ; modifier un paramètre modifie l'original.

---

## À ne pas confondre
* **JavaScript vs Java** — Malgré le nom, ces deux langages n'ont rien en commun. Le nom "JavaScript" était un choix marketing de Netscape.
* **JavaScript vs TypeScript** — TypeScript est un surensemble de JavaScript ajoutant le typage statique. Tout code JS valide est du TS valide.
* **JavaScript vs ECMAScript** — ECMAScript est la spécification standard, JavaScript est l'implémentation la plus connue.

---

## Explication simplifiée
JavaScript est comme le chef d'orchestre d'une page web : il coordonne les instruments (HTML pour la structure, CSS pour l'apparence) et les fait jouer ensemble de manière interactive. Imaginez un site web statique comme un livre, et JavaScript comme la baguette magique qui transforme ce livre en une application vivante où les boutons réagissent, les données se mettent à jour et tout bouge.

---

## Explication avancée
JavaScript repose sur un modèle d'exécution mono-thread événementiel. Le moteur V8 utilise un pipeline de compilation à plusieurs niveaux : le code est d'abord interprété par Ignition (bytecode), puis les "hot paths" sont optimisés par TurboFan (code machine natif). L'event loop coordonne la pile d'exécution (call stack) avec les files de tâches (macrotask queue pour setTimeout, microtask queue pour les Promises), garantissant que les microtasks sont vidées entre chaque macrotask. Le système de prototypes permet un héritage différentiel : les objets délèguent les propriétés non trouvées à leur prototype via la chaîne `__proto__`. Les closures capturent l'environnement lexical complet de leur portée englobante via des "Lexical Environments" chaînés, permettant des patterns comme les modules et la mémoïsation.

---

## Points critiques à retenir
* [CRITIQUE] JavaScript est mono-thread : une boucle infinie bloque toute l'interface utilisateur. Utiliser les Web Workers pour les calculs lourds.
* [IMPORTANT] Toujours utiliser `===` au lieu de `==` pour éviter les conversions de type implicites et imprévisibles.
* [PIÈGE] Les callbacks asynchrones ne sont pas exécutés immédiatement même avec `setTimeout(fn, 0)` — ils attendent que la pile d'exécution soit vide.
* [IMPORTANT] Préférer `const` par défaut, `let` quand la réassignation est nécessaire, et ne jamais utiliser `var` en JavaScript moderne.
* [CRITIQUE] Les Promises non gérées (sans `.catch()` ou `try/catch` dans async) provoquent des `UnhandledPromiseRejection` qui peuvent crasher Node.js.
