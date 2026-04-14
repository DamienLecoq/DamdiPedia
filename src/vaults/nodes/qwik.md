---
id: qwik
label: Qwik
category: framework
priority: low
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:59:47.285Z'
updatedAt: '2026-04-14T17:59:47.285Z'
relations:
  - target: typescript
    type: depends_on
    weight: 0.8
resources:
  - type: documentation
    title: Documentation officielle Qwik
    url: 'https://qwik.dev/docs/'
  - type: vidéo
    title: Qwik... the world's first O(1) JavaScript framework? - Fireship
    url: 'https://www.youtube.com/watch?v=x2eF3YLiNhY'
  - type: cours
    title: Tutoriel Qwik
    url: 'https://qwik.dev/docs/getting-started/'
  - type: blog
    title: Blog Builder.io sur Qwik
    url: 'https://www.builder.io/blog'
  - type: vidéo
    title: >-
      Qwik: A no-hydration instant-on personalized web applications - Miško
      Hevery
    url: 'https://www.youtube.com/watch?v=0tCuUQe_ZA0'
---

## Résumé rapide
Qwik est un framework JavaScript révolutionnaire créé par Miško Hevery (créateur d'AngularJS) qui élimine le concept d'hydratation. Il utilise la "résumabilité" pour rendre les applications interactives instantanément, sans avoir à télécharger et exécuter tout le JavaScript au chargement de la page. Qwik vise un temps de chargement O(1), indépendant de la complexité de l'application.
---
## Définition
Qwik est un framework web basé sur TypeScript qui repense fondamentalement le chargement des applications web grâce à la résumabilité. Au lieu de l'hydratation traditionnelle qui nécessite de re-télécharger et ré-exécuter le JavaScript côté client, Qwik sérialise l'état de l'application dans le HTML et charge le JavaScript de manière extrêmement granulaire, uniquement en réponse aux interactions de l'utilisateur.
---
## Histoire
* **2021** — Miško Hevery, créateur d'AngularJS chez Google, commence le développement de Qwik chez Builder.io.
* **2022** — Qwik est rendu public et gagne l'attention de la communauté avec son approche de résumabilité.
* **2023** — Qwik 1.0 est publié avec Qwik City (le méta-framework) atteignant la stabilité.
* **2024** — L'écosystème Qwik continue de croître avec des améliorations du compilateur et de l'intégration avec les outils existants.
* **2025** — Qwik explore de nouvelles optimisations et renforce sa compatibilité avec l'écosystème React.
---
## Objectif
* Éliminer l'hydratation traditionnelle pour atteindre un temps d'interactivité quasi instantané.
* Charger le JavaScript de manière extrêmement granulaire et paresseuse (lazy loading).
* Maintenir des performances constantes O(1) indépendamment de la taille de l'application.
* Offrir une expérience développeur familière avec une syntaxe proche de React.
---
## Domaines d'utilisation
* **Sites e-commerce** — où le temps de chargement impacte directement les conversions et les ventes.
* **Applications web à grande échelle** — où le bundle JavaScript deviendrait prohibitif avec une approche traditionnelle.
* **Sites orientés SEO et Core Web Vitals** — où les métriques de performance Google sont critiques.
* **Applications mobiles web** — où la bande passante est limitée et le JavaScript coûteux à parser.
---
## Fonctionnement
* La **résumabilité** permet au client de "reprendre" l'exécution là où le serveur s'est arrêté, sans ré-exécuter le code.
* Le **chargement paresseux automatique** découpe le code en micro-chunks téléchargés uniquement à la demande.
* Le signe **`$`** dans le code (`component$`, `useSignal`, `onClick$`) indique au compilateur les frontières de chargement paresseux.
* L'état de l'application est **sérialisé dans le HTML** rendu par le serveur, évitant la reconstruction côté client.
* Qwik utilise un **compilateur** (Optimizer) qui transforme le code en fragments téléchargeables indépendamment.
---
## Concepts clés
* **Résumabilité** — Capacité du client à reprendre l'exécution de l'application sans hydratation, en désérialisant l'état du HTML.
* **Chargement paresseux fin** — Le JavaScript est découpé en micro-chunks chargés uniquement quand l'utilisateur interagit.
* **Signe `$`** — Convention syntaxique qui marque les frontières de chargement paresseux pour le compilateur.
* **Signals** — Système de réactivité granulaire de Qwik pour gérer l'état de manière performante.
* **Qwik City** — Méta-framework de Qwik fournissant routage, layouts et intégrations côté serveur.
* **Sérialisation** — L'état, les listeners et les closures sont sérialisés dans le HTML pour être restaurés sans JavaScript.
---
## Exemple
```tsx
import { component$, useSignal } from '@builder.io/qwik';

export const Compteur = component$(() => {
  const count = useSignal(0);

  return (
    <div>
      <h1>Compteur : {count.value}</h1>
      <button onClick$={() => count.value++}>
        Incrémenter
      </button>
      <button onClick$={() => (count.value = 0)}>
        Réinitialiser
      </button>
    </div>
  );
});
```
---
## Avantages
* Temps de chargement quasi instantané grâce à l'élimination de l'hydratation.
* Performances O(1) — le temps d'interactivité ne dépend pas de la taille de l'application.
* Chargement paresseux automatique et granulaire sans configuration manuelle.
* Excellent pour les Core Web Vitals et le SEO grâce au SSR natif et au JavaScript minimal.
* Syntaxe JSX familière pour les développeurs React.
---
## Inconvénients
* Écosystème très jeune avec peu de bibliothèques tierces compatibles.
* La convention du `$` et le modèle mental de la résumabilité nécessitent un temps d'adaptation.
* Communauté encore petite, peu de ressources d'apprentissage disponibles.
* Le débogage peut être complexe en raison du chargement paresseux extrême et de la sérialisation.
---
## Pièges courants
* **Oublier le `$`** — Ne pas ajouter le suffixe `$` aux gestionnaires d'événements (`onClick$`) ou aux composants (`component$`), empêchant le chargement paresseux.
* **Sérialisation impossible** — Tenter de sérialiser des valeurs non sérialisables (fonctions complexes, classes, DOM nodes) dans l'état.
* **Penser en mode hydratation** — Appliquer des patterns d'hydratation traditionnels au lieu d'exploiter la résumabilité.
* **Closures et `$`** — Les fonctions marquées avec `$` capturent leur environnement de manière sérialisable, ce qui impose des contraintes sur les variables capturées.
---
## À ne pas confondre
* **Résumabilité vs Hydratation** — L'hydratation ré-exécute le JavaScript pour recréer l'état côté client ; la résumabilité restaure l'état depuis le HTML sans ré-exécution.
* **Qwik vs Next.js/Nuxt** — Qwik élimine l'hydratation, alors que Next.js et Nuxt utilisent l'hydratation (partielle ou complète).
* **Qwik vs Astro** — Astro envoie zéro JavaScript par défaut et hydrate les composants sélectivement ; Qwik charge le JavaScript de manière granulaire à la demande.
---
## Explication simplifiée
Imaginez que vous lisez un livre et que vous devez vous arrêter. Avec l'hydratation traditionnelle, quelqu'un relisant le livre depuis le début pour retrouver votre page. Avec Qwik (résumabilité), vous posez simplement un marque-page et reprenez exactement où vous en étiez. C'est pour ça que les sites Qwik sont interactifs instantanément.
---
## Explication avancée
Qwik sérialise l'intégralité du graphe de réactivité — état, listeners, closures et références DOM — directement dans le HTML rendu côté serveur sous forme d'attributs et de scripts JSON. Lorsqu'un utilisateur interagit avec la page, un petit service worker global intercepte l'événement, charge le micro-chunk JavaScript correspondant, désérialise uniquement la closure concernée et l'exécute. L'Optimizer de Qwik effectue une analyse statique du code pour identifier les frontières `$` et générer des chunks indépendants qui ne partagent pas de portée JavaScript. Ce modèle permet un temps de chargement O(1) car seul le code nécessaire à l'interaction précise est téléchargé et exécuté, indépendamment de la taille totale de l'application.
---
## Points critiques à retenir
* [CRITIQUE] Qwik n'utilise PAS l'hydratation — il utilise la résumabilité, un paradigme fondamentalement différent qui restaure l'état depuis le HTML.
* [IMPORTANT] Le signe `$` n'est pas décoratif : il indique au compilateur les frontières de chargement paresseux et de sérialisation.
* [PIÈGE] Toutes les valeurs capturées dans une closure `$` doivent être sérialisables — pas de classes, de fonctions natives ou de références DOM.
* [IMPORTANT] Qwik est créé par Miško Hevery, le même créateur qu'AngularJS — il applique les leçons apprises sur les problèmes de performance des SPA.
* [CRITIQUE] Les performances O(1) signifient que l'ajout de fonctionnalités n'augmente pas le temps de chargement initial — un avantage fondamental pour les grandes applications.
