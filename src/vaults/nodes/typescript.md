---
id: typescript
label: TypeScript
category: langage
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T18:00:20.714Z'
updatedAt: '2026-04-14T18:00:20.714Z'
relations:
  - target: javascript
    type: extends
    weight: 0.9
resources:
  - type: documentation
    title: Documentation officielle TypeScript
    url: 'https://www.typescriptlang.org/docs/'
  - type: cours
    title: TypeScript Handbook
    url: 'https://www.typescriptlang.org/docs/handbook/intro.html'
  - type: vidéo
    title: TypeScript Full Course - freeCodeCamp
    url: 'https://www.youtube.com/watch?v=30LWjhZzg50'
  - type: blog
    title: Total TypeScript — Matt Pocock
    url: 'https://www.totaltypescript.com/'
  - type: documentation
    title: TypeScript Playground
    url: 'https://www.typescriptlang.org/play'
---

## Résumé rapide
TypeScript est un surensemble typé de JavaScript développé par Microsoft. Il ajoute un système de types statiques optionnel qui permet de détecter les erreurs à la compilation avant même l'exécution du code. TypeScript compile vers du JavaScript standard et est devenu le choix par défaut pour les projets JavaScript de grande envergure.

---

## Définition
TypeScript est un langage de programmation open source créé par Anders Hejlsberg (également créateur de C#) chez Microsoft en 2012. C'est un surensemble strict de JavaScript : tout code JavaScript valide est également du TypeScript valide. TypeScript ajoute un système de types statiques, des interfaces, des generics et d'autres fonctionnalités qui sont effacées à la compilation (type erasure) pour produire du JavaScript pur.

---

## Histoire
* **2012** — Anders Hejlsberg présente TypeScript 0.8 chez Microsoft, visant à résoudre les problèmes de maintenabilité du JavaScript à grande échelle.
* **2014** — TypeScript 1.0 est publié, intégrant le support dans Visual Studio.
* **2016** — TypeScript 2.0 introduit les types non-nullable, les tagged unions et le contrôle strict de null.
* **2020** — TypeScript 4.0 ajoute les tuple types variadiques et les template literal types.
* **2023-2024** — TypeScript 5.x introduit les décorateurs standardisés (TC39 stage 3), les const type parameters et des performances de compilation améliorées.

---

## Objectif
* Ajouter la sûreté de type statique à JavaScript sans sacrifier sa flexibilité.
* Améliorer la maintenabilité et la lisibilité des grandes bases de code JavaScript.
* Fournir un outillage supérieur (autocomplétion, refactoring, navigation) grâce aux informations de type.
* Rester un surensemble strict de JavaScript : adoption progressive et compatibilité totale.

---

## Domaines d'utilisation
* **Applications web front-end** — Frameworks majeurs : Angular (natif TS), React, Vue.js, Svelte.
* **Applications back-end** — Node.js avec NestJS, Express, Fastify en TypeScript.
* **Applications full-stack** — Next.js, Nuxt, SvelteKit avec typage de bout en bout.
* **Bibliothèques et SDK** — La majorité des bibliothèques npm fournissent désormais des types TypeScript.

---

## Fonctionnement
* Le **compilateur TypeScript (tsc)** analyse le code source, vérifie les types et transpile en JavaScript.
* Les types sont **effacés à la compilation** (type erasure) : le JavaScript produit ne contient aucune information de type.
* Le fichier **`tsconfig.json`** configure les options du compilateur (cible ES, mode strict, résolution des modules).
* Les **fichiers de déclaration** (`.d.ts`) fournissent des types pour les bibliothèques JavaScript existantes.
* Le **Language Service Protocol** alimente les IDE pour l'autocomplétion, les erreurs en temps réel et le refactoring.

---

## Concepts clés
* **Types d'union et d'intersection** — Combinaisons de types (`string | number`, `A & B`) pour modéliser des données complexes.
* **Generics** — Types paramétrés (`Array<T>`, `Promise<T>`) pour écrire du code réutilisable et type-safe.
* **Type guards** — Fonctions et opérateurs (`typeof`, `instanceof`, `in`) qui affinent le type dans un bloc conditionnel.
* **Utility types** — Types prédéfinis (`Partial<T>`, `Pick<T,K>`, `Omit<T,K>`, `Record<K,V>`) pour transformer les types.
* **Interfaces vs Types** — Deux mécanismes pour définir la forme des objets, avec des différences subtiles de capacités.
* **Inférence de type** — TypeScript déduit automatiquement les types quand ils ne sont pas annotés explicitement.

---

## Exemple
```typescript
// Interfaces et generics
interface Utilisateur {
  id: number;
  nom: string;
  email: string;
  role: 'admin' | 'utilisateur' | 'moderateur';
}

// Fonction générique avec contrainte
function filtrerParCle<T, K extends keyof T>(
  items: T[],
  cle: K,
  valeur: T[K]
): T[] {
  return items.filter(item => item[cle] === valeur);
}

const utilisateurs: Utilisateur[] = [
  { id: 1, nom: "Alice", email: "alice@ex.com", role: "admin" },
  { id: 2, nom: "Bob", email: "bob@ex.com", role: "utilisateur" },
];

// Type-safe : seules les clés valides sont acceptées
const admins = filtrerParCle(utilisateurs, 'role', 'admin');

// Type guard personnalisé
function estAdmin(u: Utilisateur): u is Utilisateur & { role: 'admin' } {
  return u.role === 'admin';
}
```

---

## Avantages
* Détection des erreurs à la compilation avant l'exécution, réduisant drastiquement les bugs en production.
* Autocomplétion et refactoring intelligents dans les IDE grâce aux informations de type.
* Adoption progressive : on peut ajouter TypeScript fichier par fichier dans un projet JavaScript existant.
* Système de types très expressif (union, intersection, mapped types, conditional types) capable de modéliser des API complexes.
* Documentation vivante : les types servent de documentation toujours à jour du code.

---

## Inconvénients
* Étape de compilation supplémentaire qui allonge le cycle de développement.
* Courbe d'apprentissage pour les types avancés (conditional types, template literal types, infer).
* Les fichiers de déclaration (`.d.ts`) de certaines bibliothèques peuvent être incorrects ou incomplets.
* La tentation de sur-typer (over-engineering des types) peut complexifier inutilement le code.

---

## Pièges courants
* **`any` comme échappatoire** — Utiliser `any` supprime toute vérification de type ; préférer `unknown` qui force la vérification.
* **Non-null assertion (`!`)** — L'opérateur `!` contourne le contrôle de null sans garantie, pouvant masquer des bugs.
* **Type assertions abusives** — `as Type` ne valide rien à l'exécution ; un `as` incorrect provoque un crash silencieux.
* **Confondre `interface` et `type`** — Les interfaces sont extensibles par déclaration (declaration merging), les types alias ne le sont pas.

---

## À ne pas confondre
* **TypeScript vs JavaScript** — TypeScript est un surensemble de JavaScript avec typage statique ; le JS est exécuté directement, le TS doit être compilé.
* **TypeScript vs Flow** — Flow (Meta) est un vérificateur de types pour JS, mais TypeScript a largement gagné en adoption et en écosystème.
* **Type checking vs runtime validation** — TypeScript ne vérifie les types qu'à la compilation. Pour les données externes (API, formulaires), il faut une validation runtime (Zod, Yup).

---

## Explication simplifiée
TypeScript est comme un correcteur orthographique pour votre code JavaScript. Tout comme un correcteur souligne les fautes avant que vous n'envoyiez votre message, TypeScript signale les erreurs de type avant que votre programme ne s'exécute. Vous écrivez toujours du JavaScript, mais avec un filet de sécurité qui vous empêche de passer un nombre là où une chaîne est attendue.

---

## Explication avancée
Le système de types de TypeScript est structurellement typé (duck typing statique) plutôt que nominalement typé : deux types sont compatibles si leur structure correspond, indépendamment de leur nom. Le système de types est Turing-complet, permettant des computations de type au niveau du compilateur via les conditional types, les mapped types et l'inférence récursive. TypeScript utilise le control flow analysis pour affiner les types dans les branches conditionnelles, éliminant les cas impossibles (narrowing). Les template literal types permettent de manipuler des chaînes au niveau du type (`\`get${Capitalize<string>}\``), tandis que les satisfies operator (TS 5.0) permet de valider qu'une expression satisfait un type sans élargir son type inféré. L'erasure complète des types au runtime signifie qu'aucune information de type n'existe à l'exécution, nécessitant des bibliothèques comme Zod pour la validation runtime.

---

## Points critiques à retenir
* [CRITIQUE] TypeScript ne protège qu'à la compilation : les données externes (API, entrées utilisateur) nécessitent une validation runtime séparée.
* [IMPORTANT] Activer le mode `strict: true` dans `tsconfig.json` dès le début du projet — le réactiver plus tard est très coûteux.
* [PIÈGE] `any` est contagieux : une variable `any` contamine tous les types qui en dépendent, désactivant silencieusement le type checking.
* [IMPORTANT] Préférer `unknown` à `any` pour les valeurs de type inconnu — `unknown` force une vérification avant utilisation.
* [CRITIQUE] Le typage structurel peut surprendre : un objet avec des propriétés supplémentaires est compatible avec un type qui en attend moins (excess property checks ne s'appliquent qu'aux littéraux).
