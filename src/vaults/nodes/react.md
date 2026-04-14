---
id: react
label: React
category: framework
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:59:48.282Z'
updatedAt: '2026-04-14T17:59:48.282Z'
relations:
  - target: javascript
    type: depends_on
    weight: 0.9
  - target: nextjs
    type: related
    weight: 0.8
resources:
  - type: documentation
    title: Documentation officielle React
    url: 'https://react.dev/'
  - type: documentation
    title: React sur MDN Web Docs
    url: >-
      https://developer.mozilla.org/fr/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_getting_started
  - type: vidéo
    title: React Course - Beginner's Tutorial - freeCodeCamp
    url: 'https://www.youtube.com/watch?v=bMknfKXIFA8'
  - type: cours
    title: Full Stack Open - React
    url: 'https://fullstackopen.com/en/part1'
  - type: blog
    title: Blog officiel React
    url: 'https://react.dev/blog'
---

## Résumé rapide
React est une bibliothèque JavaScript open source créée par Meta (Facebook) pour construire des interfaces utilisateur interactives. Elle repose sur un système de composants réutilisables et un DOM virtuel qui optimise les mises à jour de l'interface. React est l'une des technologies front-end les plus populaires au monde.
---
## Définition
React est une bibliothèque JavaScript déclarative permettant de créer des interfaces utilisateur composables. Elle utilise un paradigme basé sur les composants où chaque élément de l'interface est une fonction ou une classe qui retourne du JSX, une extension syntaxique de JavaScript ressemblant à du HTML.
---
## Histoire
* **2011** — Jordan Walke, ingénieur chez Facebook, crée un prototype nommé "FaxJS", ancêtre de React.
* **2013** — React est rendu open source lors de la conférence JSConf US et commence à gagner en popularité.
* **2015** — React Native est annoncé, permettant de développer des applications mobiles avec React.
* **2019** — Les Hooks sont introduits avec React 16.8, révolutionnant la manière d'écrire des composants fonctionnels.
* **2022** — React 18 apporte le rendu concurrent, le batching automatique et les Server Components.
---
## Objectif
* Permettre la construction d'interfaces utilisateur dynamiques et performantes grâce au DOM virtuel.
* Favoriser la réutilisabilité du code via un système de composants modulaires.
* Simplifier la gestion de l'état de l'application avec un flux de données unidirectionnel.
* Offrir un écosystème riche et extensible pour le développement web et mobile.
---
## Domaines d'utilisation
* **Applications web monopage (SPA)** — tableaux de bord, réseaux sociaux, outils collaboratifs.
* **Applications mobiles** — via React Native pour iOS et Android.
* **Sites à rendu côté serveur (SSR)** — avec des frameworks comme Next.js.
* **Applications d'entreprise** — interfaces complexes nécessitant une gestion d'état avancée.
---
## Fonctionnement
* React utilise un **DOM virtuel** (Virtual DOM) qui est une représentation légère du DOM réel en mémoire.
* Lorsqu'un état change, React calcule la différence (diffing) entre l'ancien et le nouveau DOM virtuel.
* Seules les parties modifiées sont mises à jour dans le DOM réel, ce qui améliore les performances.
* Les composants reçoivent des **props** (propriétés) en entrée et gèrent leur propre **state** (état interne).
* Le JSX est compilé en appels `React.createElement()` par un transpileur comme Babel.
---
## Concepts clés
* **Composant** — Brique de base réutilisable qui encapsule une partie de l'interface utilisateur.
* **JSX** — Extension syntaxique qui permet d'écrire du HTML directement dans le JavaScript.
* **Props** — Données en lecture seule transmises d'un composant parent à un composant enfant.
* **State** — Données internes d'un composant qui peuvent changer et déclencher un nouveau rendu.
* **Hooks** — Fonctions spéciales (useState, useEffect, etc.) permettant d'utiliser l'état et les effets dans les composants fonctionnels.
* **Virtual DOM** — Représentation mémoire du DOM réel permettant des mises à jour optimisées.
---
## Exemple
```jsx
import { useState } from 'react';

function Compteur() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Compteur : {count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Incrémenter
      </button>
      <button onClick={() => setCount(0)}>
        Réinitialiser
      </button>
    </div>
  );
}

export default Compteur;
```
---
## Avantages
* Écosystème extrêmement riche avec des milliers de bibliothèques tierces disponibles.
* Communauté massive et active, facilitant l'apprentissage et la résolution de problèmes.
* Le DOM virtuel offre d'excellentes performances pour les interfaces dynamiques.
* Architecture par composants favorisant la réutilisabilité et la maintenabilité du code.
* Soutenu par Meta avec des mises à jour régulières et une feuille de route claire.
---
## Inconvénients
* React est une bibliothèque et non un framework complet : il faut assembler soi-même les outils (routage, gestion d'état, etc.).
* La courbe d'apprentissage peut être raide pour les débutants, notamment avec les Hooks et la gestion d'état avancée.
* Le JSX peut dérouter les développeurs habitués à la séparation stricte HTML/JS.
* Les changements fréquents d'API et de bonnes pratiques peuvent rendre la maintenance difficile.
---
## Pièges courants
* **Mutation directe de l'état** — Modifier directement l'état au lieu d'utiliser `setState` ou le setter de `useState`, ce qui empêche le re-rendu.
* **Dépendances manquantes dans useEffect** — Oublier des dépendances dans le tableau de dépendances provoque des comportements inattendus.
* **Re-rendus inutiles** — Ne pas utiliser `React.memo`, `useMemo` ou `useCallback` quand c'est nécessaire, causant des problèmes de performances.
* **Clé manquante dans les listes** — Oublier l'attribut `key` lors du rendu de listes, provoquant des bugs de mise à jour.
---
## À ne pas confondre
* **React vs React Native** — React cible le navigateur web, React Native cible les plateformes mobiles iOS et Android.
* **React vs Angular** — React est une bibliothèque centrée sur la vue, Angular est un framework complet avec routage, formulaires et injection de dépendances intégrés.
* **React vs Next.js** — React est la bibliothèque de base, Next.js est un framework construit par-dessus React qui ajoute le SSR, le routage et plus.
---
## Explication simplifiée
React, c'est comme un jeu de LEGO pour construire des pages web. Chaque brique (composant) peut être assemblée avec d'autres pour former une interface complète. Quand quelque chose change, React ne reconstruit que les briques concernées au lieu de tout refaire.
---
## Explication avancée
React implémente un algorithme de réconciliation qui compare deux arbres de DOM virtuel pour déterminer le minimum de modifications à appliquer au DOM réel. Le flux de données unidirectionnel garantit la prédictibilité de l'état de l'application. Avec React 18, le moteur de rendu concurrent permet de prioriser les mises à jour critiques tout en différant les moins urgentes. Les Server Components permettent d'exécuter certains composants exclusivement côté serveur, réduisant la taille du bundle JavaScript envoyé au client.
---
## Points critiques à retenir
* [CRITIQUE] Toujours traiter l'état comme **immuable** : ne jamais modifier directement un objet ou un tableau d'état, toujours créer une nouvelle référence.
* [IMPORTANT] Les Hooks doivent être appelés au niveau supérieur du composant, jamais dans des conditions ou des boucles.
* [PIÈGE] Un `useEffect` sans tableau de dépendances s'exécute après chaque rendu, ce qui peut provoquer des boucles infinies.
* [IMPORTANT] Privilégier les composants fonctionnels avec Hooks plutôt que les composants de classe depuis React 16.8.
* [CRITIQUE] L'attribut `key` dans les listes doit être stable et unique — ne jamais utiliser l'index du tableau comme clé si la liste peut être réordonnée.
