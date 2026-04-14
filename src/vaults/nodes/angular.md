---
id: angular
label: Angular
category: framework
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:57:57.856Z'
updatedAt: '2026-04-14T17:57:57.856Z'
relations:
  - target: typescript
    type: depends_on
    weight: 0.9
resources:
  - type: documentation
    title: Documentation officielle Angular
    url: 'https://angular.dev/'
  - type: documentation
    title: Angular sur MDN Web Docs
    url: >-
      https://developer.mozilla.org/fr/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Angular_getting_started
  - type: vidéo
    title: Angular Tutorial for Beginners - Programming with Mosh
    url: 'https://www.youtube.com/watch?v=k5E2AVpwsko'
  - type: cours
    title: Tour of Heroes - Tutoriel officiel Angular
    url: 'https://angular.dev/tutorials/learn-angular'
  - type: blog
    title: Blog officiel Angular
    url: 'https://blog.angular.dev/'
---

## Résumé rapide
Angular est un framework TypeScript complet développé par Google pour construire des applications web à grande échelle. Il fournit une solution tout-en-un incluant le routage, les formulaires, le client HTTP et l'injection de dépendances. Angular est particulièrement populaire dans les environnements d'entreprise.
---
## Définition
Angular est un framework front-end basé sur TypeScript qui adopte une architecture orientée composants avec une approche opiniâtrée. Il se distingue par son injection de dépendances, son système de modules, ses formulaires réactifs et son compilateur AOT (Ahead-of-Time) qui transforme les templates en code JavaScript optimisé à la compilation.
---
## Histoire
* **2010** — AngularJS (Angular 1.x) est créé par Miško Hevery chez Google, utilisant JavaScript et le two-way data binding.
* **2016** — Angular 2 est publié, une réécriture complète en TypeScript avec une architecture radicalement différente.
* **2017-2020** — Versions 4 à 11 avec des améliorations régulières : Ivy renderer, lazy loading, et améliorations de performance.
* **2023** — Angular 16-17 introduisent les Signals, les composants standalone par défaut et une nouvelle syntaxe de contrôle de flux.
* **2024** — Angular continue d'évoluer avec les vues différées, l'hydratation partielle et les améliorations de SSR.
---
## Objectif
* Fournir un framework complet et structuré pour le développement d'applications web d'entreprise.
* Imposer des conventions et des bonnes pratiques via une architecture opiniâtrée et des outils CLI puissants.
* Offrir un support TypeScript natif pour la sécurité de type et la productivité des développeurs.
* Permettre la création d'applications performantes grâce à la compilation AOT et au tree-shaking.
---
## Domaines d'utilisation
* **Applications d'entreprise** — systèmes internes, ERP, CRM, plateformes bancaires.
* **Applications web complexes** — grandes SPA avec de nombreux formulaires et flux de données.
* **Applications progressives (PWA)** — support intégré pour les Service Workers et les manifestes.
* **Applications temps réel** — grâce à l'intégration avec RxJS pour la programmation réactive.
---
## Fonctionnement
* Angular utilise un **compilateur AOT** qui transforme les templates HTML et le TypeScript en JavaScript optimisé avant le déploiement.
* Le système d'**injection de dépendances** hiérarchique gère la création et le cycle de vie des services.
* Les **décorateurs TypeScript** (`@Component`, `@Injectable`, `@NgModule`) définissent les métadonnées des classes Angular.
* Le **change detection** parcourt l'arbre de composants pour détecter les modifications et mettre à jour le DOM.
* Les **Signals** (Angular 16+) offrent un système de réactivité granulaire qui remplace progressivement le change detection basé sur Zone.js.
---
## Concepts clés
* **Composant** — Classe TypeScript décorée par `@Component` associant un template HTML, des styles et une logique.
* **Service** — Classe injectable fournissant de la logique métier partagée entre composants via l'injection de dépendances.
* **Module (NgModule)** — Conteneur organisationnel regroupant composants, directives, pipes et services (remplacé par les composants standalone).
* **Directive** — Instruction qui modifie le comportement ou l'apparence d'un élément du DOM (`*ngIf`, `*ngFor`, directives personnalisées).
* **RxJS / Observables** — Bibliothèque de programmation réactive pour gérer les flux de données asynchrones.
* **Signals** — Primitives réactives introduites dans Angular 16 pour une gestion d'état plus performante et prévisible.
---
## Exemple
```typescript
import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-compteur',
  standalone: true,
  template: `
    <div>
      <h1>Compteur : {{ count() }}</h1>
      <p>Le double : {{ double() }}</p>
      <button (click)="incrementer()">Incrémenter</button>
      <button (click)="reinitialiser()">Réinitialiser</button>
    </div>
  `,
})
export class CompteurComponent {
  count = signal(0);
  double = computed(() => this.count() * 2);

  incrementer() {
    this.count.update(v => v + 1);
  }

  reinitialiser() {
    this.count.set(0);
  }
}
```
---
## Avantages
* Framework complet tout-en-un : pas besoin de choisir et assembler des bibliothèques tierces.
* TypeScript natif offrant une excellente sécurité de type et un outillage IDE performant.
* CLI puissant (`ng generate`, `ng test`, `ng build`) accélérant le développement et imposant des conventions.
* Injection de dépendances intégrée facilitant les tests unitaires et la modularité.
* Support long terme (LTS) garanti par Google avec des mises à jour prévisibles.
---
## Inconvénients
* Courbe d'apprentissage la plus raide parmi les frameworks front-end majeurs.
* Verbosité du code : beaucoup de boilerplate comparé à React ou Vue.
* Bundle initial plus lourd que les alternatives, bien que le tree-shaking ait amélioré la situation.
* La dépendance historique à RxJS ajoute une couche de complexité pour les développeurs non familiers avec la programmation réactive.
---
## Pièges courants
* **Fuites mémoire avec les Observables** — Oublier de se désabonner des Observables dans `ngOnDestroy`, provoquant des fuites mémoire.
* **Change detection excessive** — Ne pas utiliser `OnPush` ou les Signals, causant des vérifications inutiles sur tout l'arbre de composants.
* **Dépendances circulaires** — Créer des imports circulaires entre modules ou services, difficiles à déboguer.
* **Confusion NgModule vs Standalone** — Mélanger les deux approches de manière incohérente dans un même projet.
---
## À ne pas confondre
* **Angular vs AngularJS** — AngularJS (1.x) est l'ancien framework en JavaScript, Angular (2+) est une réécriture complète en TypeScript.
* **Angular vs React** — Angular est un framework complet et opiniâtré, React est une bibliothèque de vue flexible nécessitant des choix d'architecture.
* **Composants standalone vs NgModules** — Les composants standalone sont autonomes et importent directement leurs dépendances, les NgModules regroupent plusieurs éléments dans un conteneur.
---
## Explication simplifiée
Angular, c'est comme une boîte à outils complète pour construire une maison : tout est fourni et chaque outil a sa place définie. Contrairement à React où vous choisissez vos outils un par un, Angular vous donne un plan de construction avec des règles précises à suivre.
---
## Explication avancée
Angular repose sur un compilateur sophistiqué qui analyse les templates HTML à la compilation (AOT) pour générer du code JavaScript optimisé avec des instructions de création et de mise à jour du DOM. Le système d'injection de dépendances hiérarchique utilise des injecteurs à différents niveaux (racine, module, composant) pour résoudre les dépendances de manière efficace. Avec les Signals, Angular migre vers un modèle de réactivité push-based qui élimine le besoin de Zone.js et du change detection global, permettant des mises à jour chirurgicales du DOM. Le compilateur Ivy génère du code localisé par composant, permettant un tree-shaking efficace et des bundles plus légers.
---
## Points critiques à retenir
* [CRITIQUE] Toujours se désabonner des Observables ou utiliser le pipe `async` / `takeUntilDestroyed()` pour éviter les fuites mémoire.
* [IMPORTANT] Privilégier les composants standalone pour les nouveaux projets Angular (17+).
* [PIÈGE] Ne pas confondre Angular (2+) avec AngularJS (1.x) — ce sont deux frameworks fondamentalement différents.
* [IMPORTANT] Utiliser les Signals plutôt que les sujets RxJS pour la gestion d'état simple dans les composants.
* [CRITIQUE] Configurer `changeDetection: ChangeDetectionStrategy.OnPush` sur les composants pour éviter les problèmes de performance.
