---
id: sveltekit
label: SvelteKit
category: framework
priority: medium
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T18:00:12.092Z'
updatedAt: '2026-04-14T18:00:12.092Z'
relations:
  - target: svelte
    type: depends_on
    weight: 0.9
resources:
  - type: documentation
    title: Documentation officielle SvelteKit
    url: 'https://kit.svelte.dev/docs'
  - type: cours
    title: Tutoriel interactif SvelteKit
    url: 'https://learn.svelte.dev/'
  - type: vidéo
    title: SvelteKit Full Course - Joy of Code
    url: 'https://www.youtube.com/watch?v=MoGkX4RvZ38'
  - type: blog
    title: Annonce SvelteKit 1.0
    url: 'https://svelte.dev/blog/announcing-sveltekit-1.0'
  - type: documentation
    title: SvelteKit GitHub Repository
    url: 'https://github.com/sveltejs/kit'
---

## Résumé rapide
SvelteKit est le méta-framework officiel de Svelte, équivalent de Next.js pour React ou Nuxt pour Vue.js. Il fournit le routage basé sur les fichiers, le SSR, la génération statique et les fonctions serveur. Construit sur Vite, il offre une expérience de développement rapide et un déploiement universel grâce aux adaptateurs.
---
## Définition
SvelteKit est un framework d'application full-stack basé sur Svelte qui combine le routage par système de fichiers, le rendu côté serveur, la génération de sites statiques et les endpoints API dans un cadre cohérent. Il utilise Vite comme outil de build et propose un système d'adaptateurs permettant de déployer sur n'importe quelle plateforme.
---
## Histoire
* **2020** — Rich Harris annonce Sapper (prédécesseur de SvelteKit) comme obsolète et commence le développement de SvelteKit.
* **2021** — SvelteKit entre en bêta publique, attirant les développeurs Svelte vers la nouvelle architecture.
* **2022** — SvelteKit 1.0 est officiellement publié après une longue période de bêta et de retours communautaires.
* **2023** — SvelteKit 2.0 est lancé avec le support de Vite 5 et des améliorations de performance.
* **2024** — SvelteKit s'adapte à Svelte 5 (Runes) et continue d'améliorer le SSR et le déploiement.
---
## Objectif
* Fournir le framework d'application de référence pour Svelte avec toutes les fonctionnalités nécessaires en production.
* Offrir un routage basé sur les fichiers intuitif avec le support du SSR, SSG et SPA dans un même projet.
* Permettre le déploiement universel grâce à un système d'adaptateurs (Node.js, Vercel, Netlify, Cloudflare, statique).
* Simplifier le développement full-stack avec les actions de formulaires et les fonctions de chargement côté serveur.
---
## Domaines d'utilisation
* **Sites web et blogs** — génération statique avec `adapter-static` pour un hébergement gratuit et performant.
* **Applications web progressives** — SSR avec Svelte pour des applications rapides et accessibles.
* **Plateformes de contenu** — blogs, documentations et sites éditoriaux avec chargement de données côté serveur.
* **Applications full-stack** — API endpoints intégrés et actions de formulaires pour le backend.
---
## Fonctionnement
* Le **routage par fichiers** utilise le dossier `src/routes/` où chaque dossier représente une route et `+page.svelte` le composant de la page.
* Les fichiers **`+page.server.js`** contiennent les fonctions `load` pour récupérer les données côté serveur avant le rendu.
* Les **actions de formulaires** (`+page.server.js` avec `actions`) gèrent les soumissions de formulaires sans JavaScript côté client.
* Les **layouts** (`+layout.svelte`) définissent des structures partagées entre les routes enfants.
* Les **adaptateurs** transforment l'application pour la plateforme cible (Node.js, serverless, statique).
---
## Concepts clés
* **Routage par fichiers** — La structure de dossiers dans `src/routes/` détermine automatiquement les URL de l'application.
* **Fonction load** — Fonction côté serveur ou universelle qui récupère les données avant le rendu de la page.
* **Actions de formulaires** — Mécanisme natif pour gérer les mutations (POST) via des formulaires HTML progressivement améliorés.
* **Adaptateurs** — Plugins qui compilent l'application pour une cible spécifique (adapter-node, adapter-vercel, adapter-static).
* **Hooks** — Fonctions interceptant les requêtes (`handle`, `handleError`, `handleFetch`) pour l'authentification ou la transformation.
* **Layout** — Composant `+layout.svelte` partagé entre les routes enfants, persistant entre les navigations.
---
## Exemple
```html
<!-- src/routes/articles/+page.svelte -->
<script>
  export let data;
</script>

<h1>Articles</h1>
<ul>
  {#each data.articles as article}
    <li>
      <a href="/articles/{article.slug}">
        {article.titre}
      </a>
    </li>
  {/each}
</ul>
```

```javascript
// src/routes/articles/+page.server.js
export async function load({ fetch }) {
  const response = await fetch('/api/articles');
  const articles = await response.json();

  return {
    articles,
  };
}
```

```javascript
// src/routes/api/articles/+server.js
import { json } from '@sveltejs/kit';

export function GET() {
  return json([
    { slug: 'premier', titre: 'Premier article' },
    { slug: 'second', titre: 'Second article' },
  ]);
}
```
---
## Avantages
* Architecture intuitive avec un routage par fichiers clair et des conventions logiques.
* Actions de formulaires progressivement améliorées — fonctionnent sans JavaScript, meilleures avec.
* Système d'adaptateurs offrant un déploiement universel sans vendor lock-in.
* Construit sur Vite, offrant un rechargement à chaud quasi instantané en développement.
* Héritage de toutes les qualités de Svelte : bundles légers, performances et syntaxe concise.
---
## Inconvénients
* Écosystème plus petit que Next.js ou Nuxt, moins de solutions pré-construites disponibles.
* Les conventions de nommage (`+page.svelte`, `+layout.server.js`) peuvent sembler inhabituelles au départ.
* Moins de ressources d'apprentissage et de tutoriels disponibles comparé aux alternatives.
* La transition Svelte 4 vers Svelte 5 affecte les patterns établis dans SvelteKit.
---
## Pièges courants
* **Confondre load serveur et universel** — `+page.server.js` s'exécute uniquement côté serveur, `+page.js` s'exécute des deux côtés. Les données sensibles doivent être dans `.server.js`.
* **Oublier le préfixe `+`** — Les fichiers de routage doivent être préfixés par `+` (`+page.svelte`, `+server.js`). Un fichier sans `+` est un composant normal.
* **Formulaires sans action** — Oublier de définir les actions dans `+page.server.js` et tenter de gérer les formulaires uniquement côté client.
* **Invalidation des données** — Ne pas appeler `invalidate()` ou `invalidateAll()` après une mutation pour rafraîchir les données chargées.
---
## À ne pas confondre
* **SvelteKit vs Svelte** — Svelte est le compilateur de composants, SvelteKit est le framework d'application fournissant routage, SSR et backend.
* **SvelteKit vs Sapper** — Sapper est le prédécesseur obsolète de SvelteKit. SvelteKit est la solution moderne officielle.
* **`+page.js` vs `+page.server.js`** — `+page.js` est une fonction load universelle (client + serveur), `+page.server.js` s'exécute uniquement côté serveur et peut accéder à la base de données.
---
## Explication simplifiée
SvelteKit, c'est comme un assistant qui organise votre projet Svelte : il range les pages dans des dossiers pour créer les URL automatiquement, va chercher les données sur le serveur avant d'afficher la page, et emballe le tout pour que ça fonctionne partout, que ce soit sur un serveur classique ou un hébergement gratuit.
---
## Explication avancée
SvelteKit implémente un modèle de chargement de données en cascade où les fonctions `load` des layouts et des pages s'exécutent en parallèle lorsque possible, avec un mécanisme de dépendance basé sur les URL et les invalidations. Les actions de formulaires utilisent le progressive enhancement : elles fonctionnent via des soumissions HTML natives mais sont interceptées par SvelteKit côté client pour fournir une expérience utilisateur améliorée sans rechargement de page. Le système d'adaptateurs transforme l'application en la compilant pour la cible de déploiement, en adaptant le serveur HTTP, les fonctions serverless ou en pré-rendant les pages statiques. Les hooks serveur (`hooks.server.js`) permettent d'intercepter chaque requête pour implémenter l'authentification, les CORS ou la transformation des réponses.
---
## Points critiques à retenir
* [CRITIQUE] Les données sensibles (clés API, accès base de données) doivent être dans les fichiers `+page.server.js` ou `+server.js`, jamais dans `+page.js`.
* [IMPORTANT] Les actions de formulaires sont le mécanisme recommandé pour les mutations — elles fonctionnent sans JavaScript et offrent un progressive enhancement natif.
* [PIÈGE] Les fichiers de routage DOIVENT être préfixés par `+` — un fichier `page.svelte` (sans `+`) sera ignoré par le routeur.
* [IMPORTANT] Choisir l'adaptateur approprié dès le début du projet (adapter-auto pour Vercel/Netlify, adapter-node pour un serveur, adapter-static pour du statique).
* [CRITIQUE] Les fonctions `load` universelles (`+page.js`) s'exécutent aussi côté client lors de la navigation — ne jamais y mettre de secrets ou d'accès directs à la base de données.
