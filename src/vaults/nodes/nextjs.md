---
id: nextjs
label: Next.js
category: framework
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:59:21.535Z'
updatedAt: '2026-04-14T17:59:21.535Z'
relations:
  - target: react
    type: depends_on
    weight: 0.9
resources:
  - type: documentation
    title: Documentation officielle Next.js
    url: 'https://nextjs.org/docs'
  - type: cours
    title: Learn Next.js - Tutoriel officiel
    url: 'https://nextjs.org/learn'
  - type: vidéo
    title: Next.js 14 Full Course - JavaScript Mastery
    url: 'https://www.youtube.com/watch?v=wm5gMKuwSYk'
  - type: blog
    title: Blog officiel Next.js
    url: 'https://nextjs.org/blog'
  - type: documentation
    title: Next.js GitHub Repository
    url: 'https://github.com/vercel/next.js'
---

## Résumé rapide
Next.js est le framework React le plus populaire, développé par Vercel, qui ajoute le rendu côté serveur (SSR), la génération de sites statiques (SSG) et le routage basé sur le système de fichiers à React. Il est devenu le standard de facto pour les applications React en production. Depuis la version 13, l'App Router avec les Server Components transforme fondamentalement l'architecture des applications React.
---
## Définition
Next.js est un méta-framework React full-stack qui fournit un cadre de développement complet incluant le routage, le rendu hybride (SSR, SSG, ISR, CSR), l'optimisation automatique et les fonctionnalités backend. Il abstrait la complexité de la configuration (Webpack/Turbopack, Babel/SWC) pour permettre aux développeurs de se concentrer sur le code applicatif.
---
## Histoire
* **2016** — Guillermo Rauch et l'équipe Vercel (alors ZEIT) créent Next.js pour simplifier le SSR avec React.
* **2020** — Next.js 10 introduit l'optimisation d'images, l'internationalisation et l'analyse de performance intégrées.
* **2022** — Next.js 13 lance l'App Router avec les React Server Components, bouleversant l'architecture des applications.
* **2023** — Next.js 14 stabilise l'App Router et introduit les Server Actions pour les mutations de données.
* **2024** — Next.js 15 apporte le compilateur Turbopack stable, le cache amélioré et la prise en charge de React 19.
---
## Objectif
* Fournir un framework React de production avec SSR, SSG et ISR intégrés pour des performances et un SEO optimaux.
* Simplifier le développement full-stack en unifiant frontend et backend dans un même projet.
* Optimiser automatiquement les performances (code splitting, préchargement, optimisation d'images).
* Offrir une expérience développeur fluide avec un rechargement à chaud rapide et un routage basé sur les fichiers.
---
## Domaines d'utilisation
* **Sites e-commerce** — rendu côté serveur pour le SEO et ISR pour les pages produits dynamiques.
* **Applications SaaS** — tableaux de bord, outils collaboratifs, plateformes B2B nécessitant du SSR.
* **Sites vitrines et blogs** — génération statique pour des performances maximales et un coût d'hébergement minimal.
* **Applications full-stack** — API Routes et Server Actions permettant de gérer le backend dans le même projet.
---
## Fonctionnement
* Le **routage basé sur les fichiers** utilise la structure de dossiers (`app/` ou `pages/`) pour définir automatiquement les routes.
* Les **React Server Components** s'exécutent sur le serveur, n'envoient pas de JavaScript au client et ont un accès direct aux données.
* Les **Client Components** (marqués `'use client'`) s'exécutent dans le navigateur et gèrent l'interactivité.
* Le **rendu hybride** permet de choisir SSR, SSG, ISR ou CSR page par page selon les besoins.
* Les **Server Actions** (`'use server'`) permettent d'exécuter des fonctions serveur directement depuis les composants client.
---
## Concepts clés
* **App Router** — Système de routage basé sur les dossiers du répertoire `app/`, utilisant les Server Components par défaut.
* **Server Components** — Composants exécutés uniquement sur le serveur, réduisant le JavaScript envoyé au client.
* **Server Actions** — Fonctions serveur invocables depuis le client via des formulaires ou des appels directs.
* **ISR (Incremental Static Regeneration)** — Régénération incrémentale des pages statiques en arrière-plan.
* **Middleware** — Code exécuté avant chaque requête pour l'authentification, la réécriture d'URL ou la géolocalisation.
* **Layout** — Composant partagé entre les routes enfants, préservant l'état lors de la navigation.
---
## Exemple
```jsx
// app/page.jsx — Server Component par défaut
async function getArticles() {
  const res = await fetch('https://api.exemple.com/articles', {
    next: { revalidate: 3600 }, // ISR : revalider toutes les heures
  });
  return res.json();
}

export default async function PageAccueil() {
  const articles = await getArticles();

  return (
    <main>
      <h1>Derniers articles</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <a href={`/articles/${article.slug}`}>
              {article.titre}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
```
---
## Avantages
* Framework React le plus complet avec SSR, SSG, ISR et Server Components intégrés.
* Optimisations automatiques : code splitting, préchargement des liens, optimisation d'images et polices.
* Écosystème massif et forte adoption par l'industrie (Vercel, Netflix, TikTok, Twitch).
* Server Components réduisant drastiquement le JavaScript envoyé au client.
* Déploiement optimisé sur Vercel mais compatible avec tout hébergeur Node.js.
---
## Inconvénients
* Complexité croissante avec l'App Router, les Server Components et le modèle de cache.
* Forte dépendance à Vercel pour les fonctionnalités avancées (ISR edge, analytics intégrés).
* La coexistence Pages Router / App Router crée de la confusion dans les ressources d'apprentissage.
* Les Server Components introduisent un nouveau modèle mental qui peut dérouter les développeurs React habitués.
---
## Pièges courants
* **Confondre Server et Client Components** — Utiliser des hooks React (useState, useEffect) dans un Server Component provoque une erreur.
* **Cache inattendu** — Le système de cache de Next.js peut servir des données périmées si la stratégie de revalidation n'est pas configurée correctement.
* **Bundle client gonflé** — Marquer trop de composants avec `'use client'`, annulant les bénéfices des Server Components.
* **Confusion routage** — Mélanger Pages Router (`pages/`) et App Router (`app/`) dans un même projet sans stratégie claire.
---
## À ne pas confondre
* **Next.js vs React** — React est la bibliothèque de composants, Next.js est le framework full-stack construit au-dessus de React.
* **Pages Router vs App Router** — Le Pages Router est l'ancien système de routage, l'App Router est le nouveau standard utilisant les Server Components.
* **Next.js vs Remix** — Les deux sont des frameworks React avec SSR, mais Remix mise sur les standards web tandis que Next.js offre plus de flexibilité de rendu.
---
## Explication simplifiée
Next.js, c'est React avec des super-pouvoirs. Si React est le moteur d'une voiture, Next.js est la voiture complète : il ajoute le châssis (routage), la carrosserie (SSR pour le SEO), le GPS (optimisations automatiques) et tout ce qu'il faut pour rouler en production.
---
## Explication avancée
Next.js implémente un modèle de rendu hybride où chaque route peut combiner Server Components (exécutés une seule fois sur le serveur), Client Components (hydratés dans le navigateur) et Server Actions (RPC typé pour les mutations). Le système de cache à plusieurs niveaux (Data Cache, Full Route Cache, Router Cache) permet d'optimiser les performances en évitant les requêtes réseau redondantes. L'App Router utilise React Suspense pour le streaming SSR, envoyant le HTML progressivement au navigateur. Turbopack, le successeur de Webpack écrit en Rust, améliore significativement les temps de compilation en développement. Le Middleware s'exécute sur l'Edge Runtime pour des décisions de routage à latence minimale.
---
## Points critiques à retenir
* [CRITIQUE] Dans l'App Router, tous les composants sont des Server Components par défaut — ajouter `'use client'` uniquement quand l'interactivité est nécessaire.
* [IMPORTANT] Les Server Components ne peuvent pas utiliser useState, useEffect ou d'autres hooks React côté client.
* [PIÈGE] Le système de cache de Next.js peut être agressif — toujours configurer explicitement la stratégie de revalidation (`revalidate`, `no-store`).
* [IMPORTANT] Les Server Actions remplacent les API Routes pour les mutations de données dans l'App Router.
* [CRITIQUE] Ne pas confondre le Pages Router (`pages/`) et l'App Router (`app/`) — ce sont deux architectures fondamentalement différentes qui coexistent temporairement.
