---
id: svelte
label: Svelte
category: framework
priority: medium
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T18:00:10.850Z'
updatedAt: '2026-04-14T18:00:10.850Z'
relations:
  - target: javascript
    type: depends_on
    weight: 0.9
  - target: sveltekit
    type: related
    weight: 0.8
resources:
  - type: documentation
    title: Documentation officielle Svelte
    url: 'https://svelte.dev/docs'
  - type: cours
    title: Tutoriel interactif Svelte
    url: 'https://learn.svelte.dev/'
  - type: vidéo
    title: Rethinking Reactivity - Rich Harris
    url: 'https://www.youtube.com/watch?v=AdNJ3fydeao'
  - type: blog
    title: Blog officiel Svelte
    url: 'https://svelte.dev/blog'
  - type: documentation
    title: Svelte REPL
    url: 'https://svelte.dev/repl'
---

## Résumé rapide
Svelte est un framework JavaScript qui se distingue fondamentalement de React et Vue par son approche de compilation. Au lieu d'utiliser un DOM virtuel à l'exécution, Svelte compile les composants en code JavaScript impératif optimisé au moment du build. Le résultat est des applications plus petites et plus rapides.
---
## Définition
Svelte est un compilateur de composants qui transforme du code déclaratif en JavaScript vanilla optimisé lors de la phase de build. Contrairement aux frameworks traditionnels qui embarquent un runtime, Svelte génère du code qui manipule directement le DOM, éliminant la surcouche du DOM virtuel et produisant des bundles significativement plus légers.
---
## Histoire
* **2016** — Rich Harris, développeur au New York Times, crée Svelte comme une expérience d'approche compilée des interfaces web.
* **2018** — Svelte 2 est publié avec une API améliorée et une meilleure gestion de l'état.
* **2019** — Svelte 3 représente une refonte majeure avec la réactivité par assignation et une syntaxe simplifiée.
* **2022** — SvelteKit 1.0 est lancé comme le framework d'application officiel de Svelte.
* **2023-2024** — Svelte 5 introduit les "Runes", un nouveau système de réactivité explicite basé sur des signaux.
---
## Objectif
* Réduire la taille des bundles en éliminant le runtime du framework grâce à la compilation.
* Offrir une syntaxe naturelle et concise qui minimise le boilerplate.
* Fournir des performances optimales en manipulant directement le DOM sans passer par un DOM virtuel.
* Simplifier le développement front-end avec une courbe d'apprentissage minimale.
---
## Domaines d'utilisation
* **Applications web performantes** — sites où la taille du bundle et les performances sont critiques.
* **Applications embarquées et IoT** — interfaces pour appareils à ressources limitées.
* **Composants interactifs** — widgets, visualisations de données, éléments interactifs à intégrer dans des pages existantes.
* **Applications éditoriales** — utilisé par le New York Times, la BBC et d'autres médias pour des expériences interactives.
---
## Fonctionnement
* Le **compilateur Svelte** analyse les fichiers `.svelte` et génère du JavaScript impératif qui crée et met à jour le DOM directement.
* La **réactivité** est gérée par le compilateur : en Svelte 3/4, une simple assignation (`count = count + 1`) déclenche une mise à jour.
* En **Svelte 5**, les Runes (`$state`, `$derived`, `$effect`) remplacent la réactivité implicite par un système explicite de signaux.
* Les **transitions et animations** sont intégrées nativement au framework avec des directives dédiées.
* Pas de DOM virtuel : les mises à jour sont compilées en instructions `element.textContent = value` directes.
---
## Concepts clés
* **Compilation** — Le code Svelte est transformé en JavaScript optimisé au build, pas à l'exécution.
* **Réactivité par assignation** — En Svelte 3/4, toute assignation à une variable déclarée déclenche automatiquement une mise à jour de l'interface.
* **Runes** — Système de réactivité explicite de Svelte 5 (`$state`, `$derived`, `$effect`) inspiré des signaux.
* **Composant mono-fichier** — Fichier `.svelte` contenant script, template et style dans une syntaxe HTML naturelle.
* **Stores** — Mécanisme réactif pour partager l'état entre composants (remplacé par les Runes en Svelte 5).
* **Transitions** — Animations déclaratives intégrées (`transition:fade`, `in:fly`, `out:slide`).
---
## Exemple
```html
<script>
  // Svelte 5 avec Runes
  let count = $state(0);
  let double = $derived(count * 2);

  function incrementer() {
    count++;
  }
</script>

<main>
  <h1>Compteur : {count}</h1>
  <p>Le double : {double}</p>
  <button onclick={incrementer}>
    Incrémenter
  </button>
</main>

<style>
  main {
    text-align: center;
    padding: 2rem;
  }

  button {
    background: #ff3e00;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
  }
</style>
```
---
## Avantages
* Bundles extrêmement légers grâce à l'absence de runtime — idéal pour les performances.
* Syntaxe concise et naturelle qui se rapproche du HTML/CSS/JS standard.
* Performances excellentes grâce à la manipulation directe du DOM sans diffing.
* Animations et transitions intégrées nativement, sans bibliothèque supplémentaire.
* Courbe d'apprentissage très faible pour les développeurs connaissant HTML, CSS et JavaScript.
---
## Inconvénients
* Écosystème plus petit que React, Vue ou Angular avec moins de bibliothèques tierces.
* Marché de l'emploi limité comparé aux frameworks plus établis.
* Le débogage peut être plus complexe car le code exécuté diffère du code source.
* La transition de Svelte 4 à Svelte 5 (Runes) représente un changement significatif de paradigme.
---
## Pièges courants
* **Réactivité sur les tableaux** — En Svelte 3/4, `array.push(item)` ne déclenche pas de mise à jour car il n'y a pas de réassignation. Il faut faire `array = [...array, item]`.
* **Logique dans le template** — Abuser des blocs `{#if}` et `{#each}` imbriqués rend le template difficile à lire.
* **Confusion entre Svelte 4 et 5** — Mélanger la syntaxe réactive implicite (Svelte 4) et les Runes (Svelte 5) dans un même projet.
---
## À ne pas confondre
* **Svelte vs SvelteKit** — Svelte est le compilateur de composants, SvelteKit est le framework d'application construit par-dessus Svelte (équivalent de Next.js pour React).
* **Svelte vs React/Vue** — Svelte est un compilateur qui génère du code optimisé, React et Vue embarquent un runtime avec DOM virtuel.
* **Runes vs Stores** — Les Runes (Svelte 5) sont le nouveau système de réactivité qui remplace les Stores réactifs de Svelte 3/4.
---
## Explication simplifiée
Svelte fonctionne comme un traducteur très efficace. Vous écrivez votre interface dans un langage simple et naturel, et Svelte le traduit en code JavaScript ultra-optimisé avant même que votre application ne soit mise en ligne. Résultat : votre application est plus légère et plus rapide.
---
## Explication avancée
Svelte opère comme un compilateur qui effectue une analyse statique du code source pour générer des instructions de mise à jour du DOM chirurgicales. En Svelte 5, le système de Runes introduit des signaux explicites qui permettent au compilateur de traquer les dépendances de manière fine et de ne mettre à jour que les nœuds DOM précisément affectés par un changement d'état. L'absence de DOM virtuel élimine le coût du diffing et de la réconciliation, résultant en des performances proches du JavaScript vanilla. Le compilateur génère également du code CSS scopé automatiquement, des blocs de transition optimisés et du code de destruction pour éviter les fuites mémoire.
---
## Points critiques à retenir
* [CRITIQUE] Svelte n'utilise pas de DOM virtuel — c'est un compilateur qui génère du code JavaScript impératif optimisé.
* [IMPORTANT] En Svelte 5, les Runes (`$state`, `$derived`, `$effect`) remplacent la réactivité implicite par assignation.
* [PIÈGE] En Svelte 3/4, les mutations de tableaux/objets (push, splice) ne déclenchent pas de mise à jour sans réassignation explicite.
* [IMPORTANT] Les styles dans un fichier `.svelte` sont automatiquement scopés au composant — pas de fuite CSS.
* [CRITIQUE] Svelte génère le code le plus léger parmi les frameworks majeurs, ce qui en fait un choix optimal pour les environnements contraints en bande passante.
