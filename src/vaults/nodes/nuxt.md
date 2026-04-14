---
id: nuxt
label: Nuxt
category: framework
priority: medium
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:59:28.151Z'
updatedAt: '2026-04-14T17:59:28.151Z'
relations:
  - target: vuejs
    type: depends_on
    weight: 0.9
resources:
  - type: documentation
    title: Documentation officielle Nuxt
    url: 'https://nuxt.com/docs'
  - type: cours
    title: Nuxt 3 - Mastering Nuxt
    url: 'https://masteringnuxt.com/'
  - type: vidéo
    title: Nuxt 3 Full Course - The Net Ninja
    url: 'https://www.youtube.com/watch?v=GBdO5myZNsQ'
  - type: blog
    title: Blog officiel Nuxt
    url: 'https://nuxt.com/blog'
  - type: documentation
    title: Nuxt Modules
    url: 'https://nuxt.com/modules'
---

## Résumé rapide
Nuxt est le méta-framework officiel de Vue.js, équivalent de Next.js pour React. Il simplifie le développement d'applications Vue universelles avec le rendu côté serveur (SSR), la génération statique (SSG) et un système d'auto-imports. Nuxt 3 est construit sur Nitro, un moteur serveur universel qui peut se déployer partout.
---
## Définition
Nuxt est un framework full-stack basé sur Vue.js qui fournit un cadre de développement complet avec routage automatique basé sur les fichiers, rendu hybride, auto-imports et un moteur serveur universel (Nitro). Il abstrait les configurations complexes et impose des conventions qui accélèrent le développement tout en garantissant les meilleures pratiques.
---
## Histoire
* **2016** — Sébastien et Alexandre Chopin créent Nuxt.js, inspiré par Next.js, pour apporter le SSR à Vue.js.
* **2018** — Nuxt 2 est publié avec un écosystème de modules, le mode statique et une communauté grandissante.
* **2021** — Le développement de Nuxt 3 commence, basé sur Vue 3, Vite et le nouveau moteur serveur Nitro.
* **2022** — Nuxt 3 atteint la version stable avec une architecture moderne et des performances améliorées.
* **2023-2024** — Nuxt 3 mûrit avec les composants serveur, les couches (layers), et un écosystème de modules riche.
---
## Objectif
* Simplifier le développement d'applications Vue.js universelles avec SSR, SSG et rendu hybride.
* Automatiser les tâches répétitives grâce aux auto-imports, au routage par fichiers et aux conventions.
* Permettre le déploiement universel sur tout hébergeur grâce au moteur Nitro.
* Offrir un écosystème modulaire extensible via les modules et les couches Nuxt.
---
## Domaines d'utilisation
* **Sites vitrines et marketing** — génération statique pour des performances optimales et un SEO excellent.
* **Applications e-commerce** — SSR pour le SEO combiné avec l'interactivité Vue.js.
* **Applications d'entreprise** — structures organisées avec le système de couches pour partager la configuration.
* **Blogs et sites de contenu** — avec le module Nuxt Content pour la gestion de contenu en Markdown.
---
## Fonctionnement
* Le **routage automatique** génère les routes à partir de la structure de fichiers dans le dossier `pages/`.
* Les **auto-imports** détectent automatiquement les composants, les composables et les utilitaires sans instructions d'import explicites.
* **Nitro**, le moteur serveur, permet le déploiement sur Node.js, Deno, Cloudflare Workers, Vercel, Netlify et plus.
* Le **rendu hybride** permet de configurer le mode de rendu (SSR, SSG, SPA, ISR) par route.
* Les **modules Nuxt** étendent les fonctionnalités (Nuxt Content, Nuxt Image, Nuxt Auth, etc.) de manière plug-and-play.
---
## Concepts clés
* **Auto-imports** — Composants, composables et utilitaires sont automatiquement disponibles sans import explicite.
* **Nitro** — Moteur serveur universel qui compile l'application pour n'importe quelle plateforme de déploiement.
* **Composables** — Fonctions réactives réutilisables (useFetch, useState, useRoute) disponibles via auto-import.
* **Couches (Layers)** — Système permettant d'étendre et de partager la configuration et le code entre projets Nuxt.
* **Rendu hybride** — Configuration du mode de rendu (SSR, SSG, SPA, ISR) au niveau de chaque route.
* **Modules** — Extensions plug-and-play qui ajoutent des fonctionnalités au framework.
---
## Exemple
```html
<!-- pages/articles/[id].vue -->
<script setup>
const route = useRoute();

const { data: article } = await useFetch(
  `/api/articles/${route.params.id}`
);
</script>

<template>
  <article v-if="article">
    <h1>{{ article.titre }}</h1>
    <p>{{ article.contenu }}</p>
    <NuxtLink to="/articles">
      Retour aux articles
    </NuxtLink>
  </article>
</template>
```

```typescript
// server/api/articles/[id].get.ts
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  // Logique serveur pour récupérer l'article
  return {
    id,
    titre: 'Mon article',
    contenu: 'Contenu de l\'article...',
  };
});
```
---
## Avantages
* Auto-imports réduisant drastiquement le boilerplate et accélérant le développement.
* Moteur Nitro permettant un déploiement universel (serverless, edge, Node.js classique).
* Écosystème de modules riche et officiellement maintenu (Content, Image, Auth, i18n).
* Conventions fortes qui réduisent les décisions d'architecture et facilitent la collaboration.
* Support natif de TypeScript avec génération automatique des types.
---
## Inconvénients
* La magie des auto-imports peut rendre le code moins explicite et plus difficile à déboguer.
* La migration de Nuxt 2 vers Nuxt 3 est un effort significatif en raison des changements d'architecture.
* L'écosystème est plus petit que celui de Next.js, avec moins de ressources et de modules tiers.
* Les erreurs SSR peuvent être difficiles à diagnostiquer quand le code ne fait pas la distinction client/serveur.
---
## Pièges courants
* **Code client dans un contexte serveur** — Accéder à `window`, `document` ou `localStorage` côté serveur provoque des erreurs. Utiliser `process.client` ou `<ClientOnly>`.
* **useFetch dans onMounted** — Appeler `useFetch` dans un lifecycle hook au lieu du `<script setup>` empêche le SSR correct des données.
* **Auto-imports invisibles** — Les auto-imports rendent le code implicite ; les nouveaux développeurs ne savent pas d'où viennent les fonctions.
* **Conflits de noms** — Les auto-imports de composants et composables peuvent créer des conflits de noms silencieux.
---
## À ne pas confondre
* **Nuxt vs Vue.js** — Vue.js est le framework de composants, Nuxt est le méta-framework qui ajoute SSR, routage et conventions.
* **Nuxt vs Next.js** — Nuxt est basé sur Vue.js, Next.js est basé sur React. Les deux offrent des fonctionnalités similaires (SSR, SSG, routage par fichiers).
* **Nitro vs Vite** — Vite est l'outil de build frontend (dev server + bundler), Nitro est le moteur serveur backend de Nuxt.
---
## Explication simplifiée
Nuxt est comme un assistant personnel pour Vue.js : il organise votre code, génère automatiquement les routes, importe les composants tout seul et s'assure que votre site fonctionne bien pour les moteurs de recherche. Vous vous concentrez sur le contenu, Nuxt gère la plomberie.
---
## Explication avancée
Nuxt 3 repose sur un système de build à deux couches : Vite pour le frontend (compilation Vue, HMR) et Nitro pour le backend (serveur universel compilé pour la cible de déploiement). L'auto-import utilise les API de build de Vite pour scanner les répertoires et générer automatiquement les déclarations TypeScript. Nitro compile le serveur en un bundle optimisé spécifique à la plateforme cible (Node.js, Cloudflare Workers, AWS Lambda) grâce à des presets de déploiement. Le système de couches permet l'héritage de configuration et de code entre projets, fonctionnant comme un thème composable. Le rendu hybride par route utilise les règles de routage Nitro pour déterminer le mode de rendu au niveau du serveur.
---
## Points critiques à retenir
* [CRITIQUE] Toujours vérifier si le code s'exécute côté client ou serveur — utiliser `process.client`, `process.server` ou `<ClientOnly>`.
* [IMPORTANT] `useFetch` et `useAsyncData` doivent être appelés au niveau supérieur de `<script setup>`, jamais dans des callbacks ou des lifecycle hooks.
* [PIÈGE] Les auto-imports sont pratiques mais rendent le code implicite — documenter les composables utilisés pour les nouveaux développeurs.
* [IMPORTANT] Nuxt 3 utilise Nitro comme moteur serveur — le dossier `server/` est géré par Nitro, pas par Vue.
* [CRITIQUE] Le routage est automatiquement généré depuis la structure `pages/` — les paramètres dynamiques utilisent la convention `[param].vue`.
