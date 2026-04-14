---
id: css-modules
label: CSS Modules
category: framework
priority: medium
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:58:20.778Z'
updatedAt: '2026-04-14T17:58:20.778Z'
relations:
  - target: react
    type: related
    weight: 0.7
resources:
  - type: documentation
    title: CSS Modules GitHub Repository
    url: 'https://github.com/css-modules/css-modules'
  - type: documentation
    title: CSS Modules dans Next.js
    url: 'https://nextjs.org/docs/app/building-your-application/styling/css-modules'
  - type: documentation
    title: CSS Modules dans Vite
    url: 'https://vitejs.dev/guide/features.html#css-modules'
  - type: vidéo
    title: CSS Modules Crash Course
    url: 'https://www.youtube.com/watch?v=pKMWU9OrA2s'
  - type: documentation
    title: CSS Modules sur MDN (mention dans CSS scoping)
    url: 'https://developer.mozilla.org/fr/docs/Web/CSS/CSS_scoping'
---

## Résumé rapide
CSS Modules est une approche de styling qui scope automatiquement les classes CSS au composant qui les utilise, éliminant les conflits de noms à l'échelle globale. Chaque fichier CSS est traité comme un module dont les noms de classes sont transformés en identifiants uniques au moment du build. CSS Modules est nativement supporté par la plupart des outils de build modernes (Vite, Webpack, Next.js).
---
## Définition
CSS Modules est une spécification et un système de build qui transforme les noms de classes CSS en identifiants uniques au moment de la compilation. Chaque fichier `.module.css` exporte un objet JavaScript dont les clés sont les noms de classes originaux et les valeurs sont les noms générés uniques. Cela garantit qu'aucune classe CSS ne peut entrer en conflit avec une autre, même dans une grande application.
---
## Histoire
* **2015** — CSS Modules est proposé par Glen Maddern et Mark Dalgleish comme solution aux conflits de noms CSS dans les applications JavaScript.
* **2016** — L'intégration avec Webpack via css-loader popularise CSS Modules dans les projets React.
* **2018** — Create React App ajoute le support natif des CSS Modules via la convention `.module.css`.
* **2020** — Next.js et d'autres frameworks adoptent CSS Modules comme solution de styling par défaut.
* **2022-2024** — Vite supporte nativement CSS Modules, renforçant sa position comme standard de l'industrie.
---
## Objectif
* Éliminer les conflits de noms CSS en scopant automatiquement les classes au composant.
* Permettre d'écrire du CSS standard tout en garantissant l'isolation des styles.
* Fournir une solution de styling sans runtime (pas de coût de performance côté client).
* Offrir une alternative simple au CSS-in-JS qui ne nécessite pas de changer de paradigme.
---
## Domaines d'utilisation
* **Applications React** — styling par composant avec isolation garantie (Next.js, Create React App).
* **Projets Vue.js** — alternative au scoped CSS natif de Vue.
* **Grandes équipes** — plusieurs développeurs peuvent nommer leurs classes sans risque de conflit.
* **Bibliothèques de composants** — garantie que les styles de la bibliothèque n'entrent pas en conflit avec l'application.
---
## Fonctionnement
* Les fichiers CSS avec l'extension **`.module.css`** sont traités comme des CSS Modules par le bundler.
* Le bundler (Vite, Webpack) transforme chaque nom de classe en un **identifiant unique** (ex: `titre` → `styles_titre_a3b2c`).
* L'import du fichier CSS retourne un **objet JavaScript** dont les clés sont les noms de classes originaux.
* Les noms de classes transformés sont appliqués aux éléments via l'objet importé (`styles.titre`).
* La **composition** (`composes`) permet de réutiliser des styles d'autres modules CSS.
---
## Concepts clés
* **Scoping automatique** — Les noms de classes sont transformés en identifiants uniques, empêchant tout conflit global.
* **Convention `.module.css`** — Le suffixe `.module.css` signale au bundler de traiter le fichier comme un CSS Module.
* **Objet de styles** — L'import d'un CSS Module retourne un objet `{ nomClasse: 'identifiant_unique' }`.
* **Composition (composes)** — Mécanisme permettant d'hériter des styles d'une autre classe, locale ou externe.
* **:global()** — Sélecteur spécial pour déclarer des classes qui ne seront PAS scopées (restent globales).
* **:local()** — Sélecteur explicite pour marquer une classe comme locale (comportement par défaut).
---
## Exemple
```css
/* components/Carte.module.css */
.conteneur {
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: white;
  transition: transform 0.2s;
}

.conteneur:hover {
  transform: translateY(-2px);
}

.titre {
  font-size: 1.25rem;
  font-weight: bold;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
}

.description {
  color: #666;
  line-height: 1.6;
}

.bouton {
  composes: boutonBase from './Boutons.module.css';
  background-color: #3498db;
  color: white;
}
```

```jsx
// components/Carte.jsx
import styles from './Carte.module.css';

export default function Carte({ titre, description }) {
  return (
    <div className={styles.conteneur}>
      <h2 className={styles.titre}>{titre}</h2>
      <p className={styles.description}>{description}</p>
      <button className={styles.bouton}>
        En savoir plus
      </button>
    </div>
  );
}

// Le HTML généré ressemble à :
// <div class="Carte_conteneur_a3b2c">
//   <h2 class="Carte_titre_x7y8z">...</h2>
// </div>
```
---
## Avantages
* Isolation totale des styles — aucun conflit de noms CSS possible entre composants.
* CSS standard — pas de nouvelle syntaxe à apprendre, juste du CSS normal dans un fichier `.module.css`.
* Aucun coût de runtime — les transformations se font au build, pas dans le navigateur.
* Support natif dans Vite, Webpack, Next.js, et la plupart des outils modernes sans configuration.
* Composition de classes entre modules pour la réutilisation de styles.
---
## Inconvénients
* La syntaxe `styles.nomClasse` dans le JSX peut être verbeuse, surtout pour les classes multiples.
* Pas de styles dynamiques basés sur les props ou l'état sans combiner avec des techniques supplémentaires.
* Le debugging dans le navigateur montre les noms de classes transformés (hachés), ce qui peut être déroutant.
* La composition (`composes`) est moins flexible que les mixins Sass ou les utilitaires Tailwind.
---
## Pièges courants
* **Noms de classes avec tirets** — Les classes avec tirets (`ma-classe`) doivent être accédées via `styles['ma-classe']` au lieu de `styles.maClasse`. Préférer le camelCase.
* **Styles globaux accidentels** — Oublier l'extension `.module.css` et utiliser `.css` fait que les styles sont globaux, pas scopés.
* **Classes multiples** — Appliquer plusieurs classes nécessite une concaténation manuelle ou une bibliothèque comme `clsx` : `className={`${styles.a} ${styles.b}`}`.
* **Styles dynamiques** — Les CSS Modules ne gèrent pas les styles conditionnels nativement — utiliser `clsx` ou les variables CSS pour le dynamisme.
---
## À ne pas confondre
* **CSS Modules vs CSS-in-JS** — CSS Modules utilise des fichiers CSS classiques scopés au build, CSS-in-JS (styled-components, Emotion) écrit du CSS dans le JavaScript avec un runtime.
* **CSS Modules vs Scoped CSS (Vue)** — Les deux scopent les styles au composant, mais CSS Modules transforme les noms de classes tandis que Vue scoped ajoute un attribut data unique.
* **CSS Modules vs Tailwind CSS** — CSS Modules isole du CSS personnalisé par composant, Tailwind utilise des classes utilitaires globales composées dans le HTML.
---
## Explication simplifiée
CSS Modules, c'est comme mettre une étiquette avec votre nom sur chaque vêtement (classe CSS) que vous mettez dans la machine à laver commune (l'application). Même si deux personnes ont un t-shirt bleu nommé pareil, l'étiquette unique empêche toute confusion. Chacun retrouve ses affaires sans mélange.
---
## Explication avancée
CSS Modules fonctionne comme une étape de transformation dans le pipeline de build (Vite, Webpack) qui parse les fichiers `.module.css` et remplace chaque nom de classe par un identifiant unique généré à partir du nom du fichier, du nom de la classe et d'un hash du contenu. Le loader génère simultanément un objet JavaScript qui mappe les noms originaux aux noms transformés, permettant leur utilisation dans le code. La directive `composes` est résolue au build time en ajoutant les classes composées à la liste des classes de l'élément. Le sélecteur `:global()` empêche la transformation pour les classes qui doivent rester accessibles globalement (animations, classes tierces). Cette approche élimine le besoin d'un runtime CSS-in-JS tout en garantissant l'isolation, ce qui en fait une solution optimale en termes de performance.
---
## Points critiques à retenir
* [CRITIQUE] Toujours utiliser l'extension `.module.css` — un fichier `.css` simple n'est PAS scopé et ses classes sont globales.
* [IMPORTANT] Préférer le camelCase pour les noms de classes (`monBouton` au lieu de `mon-bouton`) pour un accès simple via `styles.monBouton`.
* [PIÈGE] Les CSS Modules ne gèrent pas les styles dynamiques — combiner avec les variables CSS ou une bibliothèque comme `clsx` pour les classes conditionnelles.
* [IMPORTANT] CSS Modules est la solution de styling par défaut recommandée dans Next.js et fonctionne sans configuration dans Vite.
* [CRITIQUE] Aucun coût de runtime — contrairement au CSS-in-JS, les CSS Modules sont entièrement résolus au build time, offrant de meilleures performances.
