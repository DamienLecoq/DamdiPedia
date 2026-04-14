---
id: astro
label: Astro
category: framework
priority: medium
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:58:04.465Z'
updatedAt: '2026-04-14T17:58:04.465Z'
relations:
  - target: javascript
    type: depends_on
    weight: 0.8
resources:
  - type: documentation
    title: Documentation officielle Astro
    url: 'https://docs.astro.build/fr/'
  - type: cours
    title: Tutoriel officiel Astro
    url: 'https://docs.astro.build/fr/tutorial/0-introduction/'
  - type: vidéo
    title: >-
      Astro just mass mass mass murdered mass mass mass every web framework -
      Fireship
    url: 'https://www.youtube.com/watch?v=dsTXcSeAZq8'
  - type: blog
    title: Blog officiel Astro
    url: 'https://astro.build/blog/'
  - type: documentation
    title: Astro Integrations
    url: 'https://astro.build/integrations/'
---

## Résumé rapide
Astro est un framework web centré sur le contenu qui envoie zéro JavaScript au navigateur par défaut. Il permet d'utiliser n'importe quel framework UI (React, Vue, Svelte, etc.) tout en générant du HTML statique ultra-performant. Astro est idéal pour les sites de contenu comme les blogs, les documentations et les sites marketing.
---
## Définition
Astro est un framework web multi-framework qui utilise une architecture en "îles" (Islands Architecture) pour livrer des pages HTML statiques avec des composants interactifs hydratés sélectivement. Il se distingue par son approche "zéro JavaScript par défaut" où seuls les composants explicitement marqués comme interactifs envoient du JavaScript au client.
---
## Histoire
* **2021** — Fred K. Schott et l'équipe derrière Snowpack créent Astro pour répondre au problème du JavaScript excessif sur les sites de contenu.
* **2022** — Astro 1.0 est publié, introduisant l'architecture en îles et le support multi-framework en production.
* **2023** — Astro 2.0 apporte Content Collections et le type-safety pour le contenu, Astro 3.0 introduit View Transitions.
* **2024** — Astro 4.0 améliore les performances et l'expérience développeur, ajoutant la barre d'outils de développement et les actions serveur.
* **2025** — Astro continue d'évoluer avec Astro DB, les Server Islands et le rendu à la demande amélioré.
---
## Objectif
* Envoyer le minimum absolu de JavaScript au navigateur pour des performances optimales.
* Permettre l'utilisation de n'importe quel framework UI (React, Vue, Svelte, Solid) dans un même projet.
* Fournir une expérience de développement excellente pour les sites orientés contenu.
* Optimiser automatiquement les performances avec la génération statique et l'hydratation sélective.
---
## Domaines d'utilisation
* **Blogs et sites personnels** — génération statique avec Markdown/MDX et performances maximales.
* **Sites de documentation** — avec le thème Starlight dédié aux documentations techniques.
* **Sites marketing et vitrines** — pages performantes avec un SEO optimal.
* **Portfolios et sites d'agences** — combinaison de contenu statique et de composants interactifs ciblés.
---
## Fonctionnement
* Par défaut, Astro génère du **HTML statique** sans aucun JavaScript côté client.
* Les **îles** (Islands) sont des composants interactifs isolés qui sont hydratés indépendamment dans une page statique.
* Les directives `client:*` (`client:load`, `client:visible`, `client:idle`) contrôlent quand et comment un composant est hydraté.
* Astro peut utiliser des composants de **n'importe quel framework** (React, Vue, Svelte, Solid, Preact) dans un même projet.
* Les **Content Collections** offrent une gestion typée du contenu Markdown/MDX avec validation par schéma Zod.
---
## Concepts clés
* **Architecture en îles** — Les composants interactifs sont des "îles" de JavaScript dans un "océan" de HTML statique.
* **Zéro JS par défaut** — Aucun JavaScript n'est envoyé au navigateur sauf si explicitement demandé avec les directives `client:*`.
* **Directives client** — `client:load` (immédiat), `client:idle` (après chargement), `client:visible` (quand visible), contrôlant l'hydratation.
* **Content Collections** — Système de gestion de contenu typé pour Markdown, MDX et données structurées.
* **Composants `.astro`** — Syntaxe native d'Astro combinant frontmatter JavaScript et template HTML.
* **Intégrations** — Plugins ajoutant le support de frameworks UI, d'outils CSS, de déploiement et plus.
---
## Exemple
```astro
---
// src/pages/index.astro
import Layout from '../layouts/Layout.astro';
import CarteBlog from '../components/CarteBlog.astro';
import CompteurReact from '../components/CompteurReact';

// Récupération des articles au build time
const articles = await Astro.glob('./blog/*.md');
const articlesRecents = articles
  .sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date))
  .slice(0, 3);
---

<Layout titre="Accueil">
  <h1>Bienvenue sur mon site</h1>

  <section>
    <h2>Derniers articles</h2>
    {articlesRecents.map((article) => (
      <CarteBlog
        titre={article.frontmatter.titre}
        url={article.url}
      />
    ))}
  </section>

  <!-- Ce composant React sera hydraté uniquement quand il devient visible -->
  <CompteurReact client:visible />
</Layout>
```
---
## Avantages
* Performances exceptionnelles grâce au zéro JavaScript par défaut — scores Lighthouse quasi parfaits.
* Flexibilité multi-framework : utiliser React, Vue, Svelte ou tout autre framework dans le même projet.
* Content Collections offrant une gestion de contenu typée et validée.
* Idéal pour le SEO grâce à la génération statique et au HTML sémantique.
* View Transitions natives pour des navigations fluides sans SPA.
---
## Inconvénients
* Moins adapté aux applications hautement interactives (dashboards, SaaS) où chaque composant est dynamique.
* L'architecture en îles peut devenir complexe quand les îles doivent communiquer entre elles.
* La communauté est plus petite que celle de Next.js ou Nuxt.
* Le mélange de frameworks dans un même projet peut compliquer la maintenance à long terme.
---
## Pièges courants
* **Oublier les directives `client:`** — Un composant React/Vue sans directive `client:*` sera rendu en HTML statique sans interactivité.
* **Utiliser Astro comme un SPA** — Astro est optimisé pour le contenu statique ; pour une application très interactive, Next.js ou Nuxt sont plus adaptés.
* **Communication entre îles** — Les îles sont isolées par défaut ; pour partager l'état, il faut utiliser des stores (nanostores) ou des événements.
* **Confusion entre composant `.astro` et composant framework** — Les fichiers `.astro` s'exécutent au build/serveur uniquement, sans état ni interactivité côté client.
---
## À ne pas confondre
* **Astro vs Next.js** — Astro envoie zéro JS par défaut avec hydratation sélective, Next.js envoie du JavaScript React pour l'hydratation complète.
* **Astro vs Gatsby** — Astro est plus léger, multi-framework et n'envoie pas de runtime React par défaut. Gatsby est un générateur de sites statiques basé exclusivement sur React.
* **Composants `.astro` vs Composants React/Vue** — Les composants `.astro` sont des templates serveur sans état côté client, les composants React/Vue sont des îles interactives.
---
## Explication simplifiée
Astro est comme un chef cuisinier qui prépare les plats à l'avance (HTML statique) et n'allume le feu (JavaScript) que pour les plats qui doivent être servis chauds (composants interactifs). Résultat : le repas arrive plus vite parce qu'on ne gaspille pas d'énergie à chauffer ce qui peut être servi froid.
---
## Explication avancée
Astro implémente l'architecture en îles (Islands Architecture) théorisée par Jason Miller, où chaque composant interactif est hydraté de manière indépendante dans une page HTML sinon statique. Le compilateur Astro effectue un partial hydration en ne générant du JavaScript que pour les composants portant une directive `client:*`, avec différentes stratégies de chargement (eager, idle, visible, media query). Les composants `.astro` sont compilés en fonctions de rendu pures qui génèrent du HTML au build time ou au request time (SSR), sans envoyer de runtime. Le support multi-framework est rendu possible par un système de renderers qui intègrent les compilateurs de chaque framework (React, Vue, Svelte, Solid) comme des plugins Vite. Les Content Collections utilisent Zod pour la validation des frontmatter et génèrent des types TypeScript automatiques.
---
## Points critiques à retenir
* [CRITIQUE] Astro envoie zéro JavaScript par défaut — les composants interactifs DOIVENT avoir une directive `client:*` pour fonctionner côté client.
* [IMPORTANT] Les composants `.astro` s'exécutent uniquement au build/serveur — ils ne peuvent pas avoir d'état ou d'événements côté client.
* [PIÈGE] Choisir la bonne directive `client:` est essentiel pour les performances : `client:visible` pour les composants en bas de page, `client:idle` pour les non-critiques.
* [IMPORTANT] Astro est optimisé pour les sites de contenu — pour les applications très interactives, considérer Next.js, Nuxt ou SvelteKit.
* [CRITIQUE] Les îles sont isolées — utiliser nanostores ou un mécanisme externe pour partager l'état entre des îles de frameworks différents.
