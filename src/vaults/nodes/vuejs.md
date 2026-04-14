---
id: vuejs
label: Vue.js
category: framework
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T18:00:22.949Z'
updatedAt: '2026-04-14T18:00:22.949Z'
relations:
  - target: javascript
    type: depends_on
    weight: 0.9
  - target: nuxt
    type: related
    weight: 0.8
resources:
  - type: documentation
    title: Documentation officielle Vue.js
    url: 'https://vuejs.org/'
  - type: documentation
    title: Vue.js sur MDN Web Docs
    url: >-
      https://developer.mozilla.org/fr/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Vue_getting_started
  - type: vidéo
    title: Vue.js Course for Beginners - freeCodeCamp
    url: 'https://www.youtube.com/watch?v=FXpIoQ_rT_c'
  - type: cours
    title: Vue Mastery - Intro to Vue 3
    url: 'https://www.vuemastery.com/courses/intro-to-vue-3/intro-to-vue3'
  - type: blog
    title: Blog officiel Vue.js
    url: 'https://blog.vuejs.org/'
---

## Résumé rapide
Vue.js est un framework JavaScript progressif et open source conçu par Evan You pour construire des interfaces utilisateur. Il se distingue par sa courbe d'apprentissage douce et sa capacité à être adopté de manière incrémentale. Vue.js combine les meilleures idées de React et Angular dans une approche élégante et accessible.
---
## Définition
Vue.js est un framework JavaScript réactif qui utilise un système de composants mono-fichier (Single File Components) combinant template HTML, logique JavaScript et styles CSS dans un seul fichier `.vue`. Il repose sur un système de réactivité granulaire qui traque automatiquement les dépendances et met à jour le DOM efficacement.
---
## Histoire
* **2013** — Evan You, ancien ingénieur chez Google travaillant sur AngularJS, commence le développement de Vue.js.
* **2014** — Vue.js 0.x est publié et commence à attirer l'attention de la communauté JavaScript.
* **2016** — Vue 2.0 est lancé avec un DOM virtuel, le rendu côté serveur et une architecture améliorée.
* **2020** — Vue 3.0 (nom de code "One Piece") est publié avec la Composition API, le moteur de réactivité Proxy et des performances améliorées.
* **2023** — Vue 3 devient la version par défaut, avec un écosystème mature incluant Pinia, Vue Router et Vite.
---
## Objectif
* Offrir un framework progressif adoptable de manière incrémentale, de la simple interactivité à l'application complète.
* Simplifier le développement d'interfaces réactives avec une syntaxe intuitive et déclarative.
* Fournir une solution tout-en-un légère avec un écosystème officiel cohérent (routeur, store, outils de build).
---
## Domaines d'utilisation
* **Applications web monopage (SPA)** — interfaces d'administration, tableaux de bord, applications métier.
* **Intégration progressive** — ajout d'interactivité à des pages existantes sans réécriture complète.
* **Applications d'entreprise** — utilisé par Alibaba, GitLab, Nintendo et d'autres grandes entreprises.
* **Prototypage rapide** — grâce à sa simplicité de mise en place et sa courbe d'apprentissage faible.
---
## Fonctionnement
* Vue utilise un **système de réactivité** basé sur les Proxy JavaScript (Vue 3) qui traque automatiquement les dépendances des données.
* Les **composants mono-fichier** (`.vue`) encapsulent le template, le script et le style dans un seul fichier.
* Le compilateur de template transforme le HTML déclaratif en fonctions de rendu JavaScript optimisées.
* Le **DOM virtuel** compare l'ancien et le nouveau rendu pour appliquer les modifications minimales au DOM réel.
* La **Composition API** permet d'organiser la logique par fonctionnalité plutôt que par option du composant.
---
## Concepts clés
* **Réactivité** — Système automatique qui détecte les changements de données et met à jour l'interface en conséquence.
* **Composant mono-fichier (SFC)** — Fichier `.vue` regroupant template, script et style dans une structure organisée.
* **Directives** — Instructions spéciales préfixées par `v-` (v-if, v-for, v-bind, v-model) appliquées au template HTML.
* **Composition API** — API fonctionnelle introduite avec Vue 3 pour mieux organiser et réutiliser la logique de composants.
* **Pinia** — Gestionnaire d'état officiel de Vue, successeur de Vuex, plus simple et typé.
* **Slots** — Mécanisme permettant de passer du contenu template d'un composant parent à un composant enfant.
---
## Exemple
```html
<script setup>
import { ref, computed } from 'vue';

const taches = ref([
  { id: 1, texte: 'Apprendre Vue.js', fait: true },
  { id: 2, texte: 'Créer un projet', fait: false },
]);

const nouvelleTache = ref('');

const tachesRestantes = computed(() =>
  taches.value.filter(t => !t.fait).length
);

function ajouterTache() {
  if (nouvelleTache.value.trim()) {
    taches.value.push({
      id: Date.now(),
      texte: nouvelleTache.value,
      fait: false,
    });
    nouvelleTache.value = '';
  }
}
</script>

<template>
  <div>
    <h1>Liste de tâches ({{ tachesRestantes }} restantes)</h1>
    <input v-model="nouvelleTache" @keyup.enter="ajouterTache" />
    <ul>
      <li v-for="tache in taches" :key="tache.id">
        <input type="checkbox" v-model="tache.fait" />
        {{ tache.texte }}
      </li>
    </ul>
  </div>
</template>
```
---
## Avantages
* Courbe d'apprentissage douce et documentation exceptionnelle, idéale pour les débutants.
* Composants mono-fichier offrant une organisation claire et une expérience de développement agréable.
* Système de réactivité granulaire performant sans nécessiter d'optimisations manuelles.
* Écosystème officiel cohérent (Vue Router, Pinia, Vite) maintenu par l'équipe principale.
* Léger en taille de bundle comparé à Angular et comparable à React.
---
## Inconvénients
* Écosystème plus petit que celui de React, moins de bibliothèques tierces disponibles.
* Marché de l'emploi moins développé que React ou Angular dans certaines régions.
* La migration de Vue 2 vers Vue 3 a fragmenté la communauté et les ressources d'apprentissage.
* La flexibilité entre Options API et Composition API peut créer de la confusion dans les équipes.
---
## Pièges courants
* **Réactivité perdue** — Déstructurer un objet réactif sans utiliser `toRefs()` fait perdre la réactivité des propriétés.
* **Mutation de props** — Modifier directement une prop reçue au lieu d'émettre un événement vers le parent.
* **Oubli de `.value`** — Avec la Composition API, oublier d'accéder à `.value` sur les `ref()` dans le script (mais pas dans le template).
* **v-if et v-for ensemble** — Utiliser `v-if` et `v-for` sur le même élément cause des problèmes de priorité.
---
## À ne pas confondre
* **Vue.js vs Nuxt** — Vue.js est le framework de base, Nuxt est un méta-framework construit par-dessus Vue qui ajoute le SSR, le routage automatique et plus.
* **Options API vs Composition API** — L'Options API organise le code par type (data, methods, computed), la Composition API organise par fonctionnalité logique.
* **Vue.js vs React** — Vue utilise des templates HTML avec des directives, React utilise du JSX qui mélange HTML et JavaScript.
---
## Explication simplifiée
Vue.js, c'est comme un tableau blanc interactif : vous décrivez ce que vous voulez afficher et quelles données utiliser, et Vue se charge automatiquement de mettre à jour l'affichage chaque fois que les données changent. C'est conçu pour être simple à comprendre et à utiliser dès le départ.
---
## Explication avancée
Vue 3 utilise un système de réactivité basé sur les Proxy ES6 qui intercepte les accès et modifications aux propriétés des objets réactifs. Le compilateur de templates effectue des optimisations statiques comme le hoisting des nœuds statiques et le patch flags pour réduire le travail du DOM virtuel. La Composition API s'appuie sur les closures JavaScript pour encapsuler la logique réactive dans des fonctions composables (`composables`), permettant une réutilisation fine de la logique entre composants. Le système de build avec Vite offre un rechargement à chaud quasi instantané grâce aux modules ES natifs.
---
## Points critiques à retenir
* [CRITIQUE] Toujours utiliser `toRefs()` ou `toRef()` lors de la déstructuration d'objets réactifs pour préserver la réactivité.
* [IMPORTANT] Privilégier la Composition API avec `<script setup>` pour les nouveaux projets Vue 3.
* [PIÈGE] Ne jamais utiliser `v-if` et `v-for` sur le même élément — utiliser un `<template>` wrapper à la place.
* [IMPORTANT] Utiliser Pinia plutôt que Vuex pour la gestion d'état dans les nouveaux projets Vue 3.
* [CRITIQUE] Les `ref()` nécessitent `.value` dans le script mais PAS dans le template — cette asymétrie est source fréquente d'erreurs.
