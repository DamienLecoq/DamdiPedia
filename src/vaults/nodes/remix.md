---
id: remix
label: Remix
category: framework
priority: medium
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:59:51.336Z'
updatedAt: '2026-04-14T17:59:51.336Z'
relations:
  - target: react
    type: depends_on
    weight: 0.9
resources:
  - type: documentation
    title: Documentation officielle Remix
    url: 'https://remix.run/docs/en/main'
  - type: cours
    title: Remix Tutorial officiel
    url: 'https://remix.run/docs/en/main/start/tutorial'
  - type: vidéo
    title: Remix Tutorial - Kent C. Dodds
    url: 'https://www.youtube.com/watch?v=hsIWJpuxNj0'
  - type: blog
    title: Blog officiel Remix
    url: 'https://remix.run/blog'
  - type: documentation
    title: Remix GitHub Repository
    url: 'https://github.com/remix-run/remix'
---

## Résumé rapide
Remix est un framework React full-stack qui mise sur les standards du Web (Request, Response, FormData) et le progressive enhancement. Créé par les auteurs de React Router, il privilégie le chargement de données par route, les mutations via formulaires et une architecture qui fonctionne même sans JavaScript côté client. Remix a été racheté par Shopify en 2022.
---
## Définition
Remix est un framework React côté serveur qui s'appuie sur les API standard du Web (Fetch API, FormData, Response) plutôt que sur des abstractions propriétaires. Il structure les applications autour de routes imbriquées (nested routes) où chaque route gère son propre chargement de données (loader) et ses mutations (action), avec un progressive enhancement natif.
---
## Histoire
* **2020** — Ryan Florence et Michael Jackson (créateurs de React Router) commencent le développement de Remix comme un framework React payant.
* **2021** — Remix devient open source et gagne rapidement en popularité grâce à son approche centrée sur les standards web.
* **2022** — Shopify rachète Remix et l'équipe pour en faire la base de leur écosystème développeur (Hydrogen).
* **2023** — Remix 2.0 est publié avec une intégration plus étroite avec React Router et des améliorations de performance.
* **2024** — Remix fusionne progressivement avec React Router v7, unifiant les deux projets.
---
## Objectif
* Construire des applications web robustes qui fonctionnent même sans JavaScript côté client grâce au progressive enhancement.
* Utiliser les standards du Web (Fetch, FormData, Request/Response) au lieu d'inventer des abstractions propriétaires.
* Simplifier le chargement de données et les mutations avec des conventions claires par route.
* Offrir une expérience utilisateur excellente même sur des connexions lentes ou instables.
---
## Domaines d'utilisation
* **Applications e-commerce** — Shopify Hydrogen utilise Remix pour les vitrines personnalisées.
* **Applications avec formulaires complexes** — la gestion native des formulaires de Remix excelle pour les CRUD.
* **Applications nécessitant la résilience** — le progressive enhancement garantit le fonctionnement sans JavaScript.
* **Applications full-stack** — loaders et actions permettent de gérer le backend dans le même fichier que le frontend.
---
## Fonctionnement
* Chaque route définit un **loader** (GET) pour charger les données côté serveur avant le rendu.
* Chaque route peut définir une **action** (POST, PUT, DELETE) pour gérer les mutations via des formulaires HTML.
* Les **routes imbriquées** (nested routes) permettent un chargement de données parallèle et une mise en page composable.
* Le composant **`<Form>`** de Remix intercepte les soumissions de formulaires pour une expérience SPA tout en fonctionnant sans JS.
* Les **erreurs** sont gérées par des `ErrorBoundary` au niveau de chaque route, isolant les erreurs sans casser toute l'application.
---
## Concepts clés
* **Loader** — Fonction serveur qui récupère les données pour une route spécifique (équivalent de getServerSideProps).
* **Action** — Fonction serveur qui gère les mutations (POST) pour une route, typiquement les soumissions de formulaires.
* **Routes imbriquées** — Architecture où les routes enfants sont rendues à l'intérieur des routes parentes, chacune avec son loader.
* **Progressive Enhancement** — L'application fonctionne en HTML/formulaires natifs et s'enrichit avec JavaScript quand disponible.
* **`<Form>`** — Composant qui remplace `<form>` pour intercepter les soumissions et fournir une expérience SPA.
* **ErrorBoundary** — Composant de gestion d'erreurs au niveau de chaque route, empêchant les erreurs de se propager.
---
## Exemple
```jsx
// app/routes/contacts.$contactId.tsx
import { json } from '@remix-run/node';
import { useLoaderData, Form } from '@remix-run/react';

// Loader : récupère les données pour cette route
export async function loader({ params }) {
  const contact = await getContact(params.contactId);
  if (!contact) {
    throw new Response('Contact non trouvé', { status: 404 });
  }
  return json({ contact });
}

// Action : gère la soumission du formulaire
export async function action({ request, params }) {
  const formData = await request.formData();
  const nom = formData.get('nom');
  await updateContact(params.contactId, { nom });
  return json({ ok: true });
}

// Composant de la route
export default function Contact() {
  const { contact } = useLoaderData();

  return (
    <div>
      <h1>{contact.nom}</h1>
      <Form method="post">
        <input name="nom" defaultValue={contact.nom} />
        <button type="submit">Modifier</button>
      </Form>
    </div>
  );
}

// Gestion des erreurs pour cette route
export function ErrorBoundary() {
  return <p>Une erreur est survenue avec ce contact.</p>;
}
```
---
## Avantages
* Progressive enhancement natif — l'application fonctionne sans JavaScript grâce aux formulaires HTML standards.
* Basé sur les standards du Web (Fetch API, Request, Response, FormData) — compétences transférables.
* Routes imbriquées avec chargement de données parallèle, optimisant les performances et l'expérience utilisateur.
* Gestion d'erreurs granulaire avec des ErrorBoundary par route.
* Architecture simple et prévisible — loader pour les lectures, action pour les écritures.
---
## Inconvénients
* L'écosystème est plus petit que celui de Next.js, avec moins de ressources et d'exemples disponibles.
* La fusion avec React Router v7 crée une incertitude sur l'avenir de la marque Remix.
* Pas de génération statique (SSG) native — Remix est principalement SSR.
* La dépendance à Shopify peut influencer la direction du framework vers le e-commerce.
---
## Pièges courants
* **Utiliser useEffect pour charger les données** — Les loaders Remix remplacent les appels fetch dans useEffect. Charger les données dans le loader, pas dans le composant.
* **Oublier le progressive enhancement** — Utiliser onClick au lieu de `<Form>` pour les mutations, perdant le fonctionnement sans JavaScript.
* **Ignorer les routes imbriquées** — Créer des routes plates au lieu d'utiliser les nested routes, perdant le chargement parallèle et les layouts partagés.
* **Confusion avec Next.js** — Appliquer les patterns Next.js (getServerSideProps, API routes) au lieu des conventions Remix (loader, action).
---
## À ne pas confondre
* **Remix vs Next.js** — Remix utilise les standards web et le progressive enhancement, Next.js offre plus de flexibilité de rendu (SSR, SSG, ISR, Server Components).
* **Remix vs React Router** — Remix est construit sur React Router et fusionne progressivement avec lui dans React Router v7.
* **Loader vs API Route** — Les loaders sont colocalisés avec le composant de route et s'exécutent automatiquement ; les API routes sont des endpoints séparés appelés manuellement.
---
## Explication simplifiée
Remix construit des sites web comme on les faisait avant — avec des formulaires HTML et des pages qui marchent sans JavaScript — mais en ajoutant la modernité de React par-dessus. C'est comme construire une maison avec des fondations solides (HTML standard) puis ajouter la domotique (JavaScript) en bonus.
---
## Explication avancée
Remix implémente un modèle de chargement de données basé sur les routes imbriquées où chaque segment de route possède son propre loader exécuté en parallèle côté serveur. Ce modèle élimine les waterfalls de données car toutes les données nécessaires à l'affichage d'une page sont récupérées simultanément. Les mutations utilisent le cycle natif du Web (formulaire POST → serveur → redirect → GET) que Remix enrichit côté client avec l'interception des soumissions et la revalidation automatique des loaders après chaque action. Le progressive enhancement est garanti car chaque `<Form>` fonctionne comme un `<form>` HTML natif quand JavaScript n'est pas disponible, tout en offrant des fonctionnalités avancées (optimistic UI, pending states) quand il l'est. La fusion avec React Router v7 permet d'utiliser les mêmes API (loader, action, routes) dans un contexte SPA ou SSR.
---
## Points critiques à retenir
* [CRITIQUE] Les données doivent être chargées dans les loaders, JAMAIS dans useEffect — c'est le fondement de l'architecture Remix.
* [IMPORTANT] Utiliser `<Form>` de Remix au lieu de `<form>` HTML pour bénéficier du progressive enhancement et de l'interception côté client.
* [PIÈGE] Remix ne fait PAS de génération statique (SSG) — si le site est entièrement statique, Astro ou Next.js sont de meilleurs choix.
* [IMPORTANT] Les routes imbriquées permettent un chargement parallèle des données — structurer les routes en profondeur pour en tirer parti.
* [CRITIQUE] Remix fusionne avec React Router v7 — les nouvelles applications peuvent utiliser React Router v7 avec les mêmes patterns (loaders, actions).
