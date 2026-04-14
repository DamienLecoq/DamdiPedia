---
id: sass
label: Sass
category: framework
priority: medium
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:59:54.686Z'
updatedAt: '2026-04-14T17:59:54.686Z'
relations:
  - target: css-modules
    type: related
    weight: 0.6
resources:
  - type: documentation
    title: Documentation officielle Sass
    url: 'https://sass-lang.com/documentation/'
  - type: cours
    title: Sass Tutorial for Beginners - freeCodeCamp
    url: 'https://www.youtube.com/watch?v=_a5j7KoflTs'
  - type: documentation
    title: Sass Playground
    url: 'https://sass-lang.com/playground/'
  - type: blog
    title: Blog officiel Sass
    url: 'https://sass-lang.com/blog/'
  - type: documentation
    title: Sass sur MDN Web Docs
    url: 'https://developer.mozilla.org/fr/docs/Glossary/Sass'
---

## Résumé rapide
Sass (Syntactically Awesome Style Sheets) est le préprocesseur CSS le plus populaire et le plus mature. Il étend la syntaxe CSS avec des variables, des fonctions, des mixins, l'imbrication et l'héritage, rendant les feuilles de style plus maintenables et organisées. Sass compile en CSS standard compatible avec tous les navigateurs.
---
## Définition
Sass est un préprocesseur CSS qui ajoute des fonctionnalités de programmation (variables, boucles, conditions, fonctions) à la syntaxe CSS. Il existe en deux syntaxes : SCSS (Sassy CSS, extension `.scss`, compatible CSS) et la syntaxe indentée originale (extension `.sass`, sans accolades ni points-virgules). Le code Sass est compilé en CSS standard lors du build.
---
## Histoire
* **2006** — Hampton Catlin crée Sass, le premier préprocesseur CSS, initialement écrit en Ruby.
* **2010** — SCSS (Sassy CSS) est introduit avec Sass 3.0, offrant une syntaxe compatible avec le CSS standard.
* **2014** — LibSass (implémentation C/C++) améliore drastiquement les performances de compilation par rapport à la version Ruby.
* **2019** — Dart Sass devient l'implémentation officielle, remplaçant Ruby Sass (obsolète) et LibSass (déprécié).
* **2022-2024** — Sass continue d'évoluer avec les modules (`@use`/`@forward`), la dépréciation de `@import` et de nouvelles fonctions.
---
## Objectif
* Étendre CSS avec des fonctionnalités de programmation pour une meilleure maintenabilité.
* Permettre la réutilisation du code CSS via les mixins, les fonctions et l'héritage.
* Organiser les feuilles de style en fichiers modulaires compilés en un seul fichier CSS.
* Réduire la répétition dans les feuilles de style grâce aux variables et aux boucles.
---
## Domaines d'utilisation
* **Grands projets web** — gestion de feuilles de style complexes avec des centaines de règles.
* **Systèmes de design** — définition centralisée des tokens de design (couleurs, espacements, typographie).
* **Thématisation** — création de thèmes multiples via des variables et des mixins.
* **Frameworks CSS** — Bootstrap, Foundation et d'autres frameworks sont construits avec Sass.
---
## Fonctionnement
* Le **compilateur Dart Sass** transforme les fichiers `.scss`/`.sass` en fichiers `.css` standard.
* Les **variables** (`$primary: #3498db`) stockent des valeurs réutilisables dans toute la feuille de style.
* L'**imbrication** (nesting) permet d'écrire les sélecteurs enfants à l'intérieur de leur parent.
* Les **mixins** (`@mixin`) encapsulent des blocs de CSS réutilisables avec des paramètres.
* Le système de **modules** (`@use` et `@forward`) organise le code en fichiers partiels importables.
---
## Concepts clés
* **Variables** — Valeurs nommées préfixées par `$` réutilisables dans toute la feuille de style.
* **Imbrication (Nesting)** — Écriture des sélecteurs enfants à l'intérieur du bloc parent pour refléter la structure HTML.
* **Mixins** — Blocs de styles réutilisables pouvant accepter des paramètres, inclus avec `@include`.
* **Partials et Modules** — Fichiers préfixés par `_` (partials) importés via `@use` pour une organisation modulaire.
* **Héritage (@extend)** — Mécanisme permettant à un sélecteur d'hériter des styles d'un autre sélecteur.
* **Fonctions** — Fonctions personnalisées retournant des valeurs calculées (couleurs, dimensions, etc.).
---
## Exemple
```scss
// _variables.scss
$couleur-primaire: #3498db;
$couleur-secondaire: #2ecc71;
$espacement-base: 1rem;
$rayon-bordure: 8px;

// _mixins.scss
@mixin responsive($breakpoint) {
  @if $breakpoint == mobile {
    @media (max-width: 768px) { @content; }
  } @else if $breakpoint == tablette {
    @media (max-width: 1024px) { @content; }
  }
}

@mixin bouton($couleur) {
  background-color: $couleur;
  color: white;
  padding: $espacement-base ($espacement-base * 2);
  border: none;
  border-radius: $rayon-bordure;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: darken($couleur, 10%);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

// main.scss
@use 'variables' as v;
@use 'mixins' as m;

.carte {
  padding: v.$espacement-base * 2;
  border-radius: v.$rayon-bordure;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &__titre {
    color: v.$couleur-primaire;
    margin-bottom: v.$espacement-base;
  }

  &__bouton {
    @include m.bouton(v.$couleur-primaire);
  }

  @include m.responsive(mobile) {
    padding: v.$espacement-base;
  }
}
```
---
## Avantages
* Variables, mixins et fonctions rendant le CSS maintenable et réutilisable.
* Organisation modulaire du code via les partials et le système de modules `@use`.
* Imbrication reflétant la structure HTML et réduisant la répétition de sélecteurs.
* Compatibilité CSS — tout CSS valide est du SCSS valide, facilitant la migration.
* Écosystème mature et stable avec des décennies de développement et d'utilisation.
---
## Inconvénients
* Nécessite une étape de compilation ajoutant de la complexité au processus de build.
* Les fonctionnalités natives de CSS (variables CSS, nesting) réduisent progressivement la nécessité de Sass.
* L'imbrication excessive peut produire des sélecteurs CSS trop spécifiques et difficiles à maintenir.
* Le debugging nécessite des source maps pour faire le lien entre le CSS compilé et le SCSS source.
---
## Pièges courants
* **Imbrication excessive** — Imbriquer plus de 3-4 niveaux produit des sélecteurs CSS trop longs et spécifiques. Limiter la profondeur d'imbrication.
* **Utiliser @import au lieu de @use** — `@import` est déprécié et sera supprimé. Toujours utiliser `@use` et `@forward` pour les imports.
* **@extend avec précaution** — L'héritage avec `@extend` peut produire des sélecteurs inattendus et gonfler le CSS. Préférer les mixins.
* **Ignorer les variables CSS natives** — Pour les valeurs qui changent au runtime (mode sombre), les variables CSS (`--couleur`) sont plus adaptées que les variables Sass (`$couleur`).
---
## À ne pas confondre
* **Sass vs SCSS** — Sass est le langage avec deux syntaxes : SCSS (avec accolades, extension `.scss`) et la syntaxe indentée (sans accolades, extension `.sass`). SCSS est le standard moderne.
* **Sass vs Less** — Les deux sont des préprocesseurs CSS, mais Sass est plus mature, plus puissant et plus populaire.
* **Variables Sass vs Variables CSS** — Les variables Sass (`$var`) sont résolues à la compilation, les variables CSS (`--var`) existent au runtime et sont modifiables dynamiquement.
---
## Explication simplifiée
Sass est comme une version améliorée du CSS avec des super-pouvoirs. Au lieu de répéter les mêmes couleurs et valeurs partout, vous les mettez dans des variables. Au lieu de réécrire les mêmes blocs de style, vous les mettez dans des mixins réutilisables. Ensuite, Sass traduit tout ça en CSS normal que le navigateur comprend.
---
## Explication avancée
Sass opère comme un compilateur qui transforme un langage étendu (SCSS/Sass) en CSS standard via plusieurs phases : parsing de l'arbre syntaxique, résolution des variables et des imports, évaluation des expressions et fonctions, expansion des mixins, résolution de l'héritage (`@extend`) et génération du CSS final. Le système de modules (`@use`) crée des espaces de noms isolés qui évitent les conflits de variables entre fichiers, contrairement à `@import` qui met tout dans l'espace global. Dart Sass, l'implémentation officielle, est écrit en Dart et compilé en JavaScript pour une utilisation dans les outils de build (Vite, Webpack). Les fonctions Sass intégrées (manipulation de couleurs, mathématiques, chaînes de caractères) permettent des calculs complexes à la compilation, comme la génération automatique de palettes de couleurs accessibles.
---
## Points critiques à retenir
* [CRITIQUE] Toujours utiliser `@use` et `@forward` au lieu de `@import` — ce dernier est déprécié et sera supprimé dans une future version de Sass.
* [IMPORTANT] Limiter l'imbrication à 3 niveaux maximum pour éviter des sélecteurs CSS trop spécifiques.
* [PIÈGE] Les variables Sass sont résolues à la compilation — pour des valeurs dynamiques (mode sombre, thèmes), utiliser les variables CSS natives (`--variable`).
* [IMPORTANT] Dart Sass est la seule implémentation activement maintenue — LibSass et Ruby Sass sont obsolètes.
* [CRITIQUE] Évaluer si CSS natif (nesting, variables, @layer) ne suffit pas avant d'ajouter Sass — les fonctionnalités CSS modernes couvrent de plus en plus les cas d'usage de Sass.
