---
id: bootstrap
label: Bootstrap
category: framework
priority: medium
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:58:09.315Z'
updatedAt: '2026-04-14T17:58:09.315Z'
relations:
  - target: javascript
    type: related
    weight: 0.6
resources:
  - type: documentation
    title: Documentation officielle Bootstrap
    url: 'https://getbootstrap.com/docs/'
  - type: vidéo
    title: Bootstrap 5 Crash Course - Traversy Media
    url: 'https://www.youtube.com/watch?v=4sosXZsdy-s'
  - type: cours
    title: Bootstrap Tutorial - W3Schools
    url: 'https://www.w3schools.com/bootstrap5/'
  - type: blog
    title: Blog officiel Bootstrap
    url: 'https://blog.getbootstrap.com/'
  - type: documentation
    title: Bootstrap Icons
    url: 'https://icons.getbootstrap.com/'
---

## Résumé rapide
Bootstrap est le framework CSS le plus ancien et le plus utilisé au monde, créé par Twitter en 2011. Il fournit des composants d'interface pré-stylisés (boutons, modales, formulaires, navigation) et un système de grille responsive. Bootstrap reste un choix solide pour le prototypage rapide et les projets nécessitant une interface fonctionnelle sans effort de design.
---
## Définition
Bootstrap est un framework CSS orienté composants qui fournit un système de grille responsive, des composants d'interface pré-construits et des utilitaires CSS prêts à l'emploi. Il inclut du JavaScript optionnel pour les composants interactifs (modales, carrousels, menus déroulants) et peut être personnalisé via des variables Sass.
---
## Histoire
* **2011** — Mark Otto et Jacob Thornton créent Bootstrap (alors "Twitter Blueprint") chez Twitter pour harmoniser le développement interne.
* **2013** — Bootstrap 3 introduit l'approche mobile-first et le design flat, devenant le framework CSS le plus populaire au monde.
* **2018** — Bootstrap 4 adopte Flexbox pour la grille, remplace Less par Sass et modernise les composants.
* **2021** — Bootstrap 5 supprime la dépendance à jQuery, ajoute les classes utilitaires et les nouvelles API JavaScript vanilla.
* **2023-2024** — Bootstrap 5.3 ajoute le support natif du mode sombre (dark mode) et continue d'évoluer avec des mises à jour régulières.
---
## Objectif
* Fournir des composants d'interface pré-stylisés et cohérents pour un développement rapide.
* Offrir un système de grille responsive puissant et intuitif basé sur un système à 12 colonnes.
* Permettre le prototypage rapide d'interfaces fonctionnelles sans expertise en design.
* Garantir la compatibilité cross-browser et l'accessibilité des composants.
---
## Domaines d'utilisation
* **Prototypage rapide** — créer des interfaces fonctionnelles en quelques heures sans designer.
* **Applications d'entreprise internes** — back-offices, tableaux de bord, outils d'administration.
* **Sites web classiques** — sites vitrines, blogs, pages d'atterrissage avec un design propre et responsive.
* **Projets éducatifs** — premier framework CSS enseigné dans la plupart des formations web.
---
## Fonctionnement
* Le **système de grille** divise la page en 12 colonnes avec des classes comme `col-md-6` (6 colonnes à partir du breakpoint medium).
* Les **composants** (navbar, card, modal, accordion) sont des structures HTML prédéfinies avec des classes Bootstrap.
* Les **utilitaires** (spacing, display, flex, text) permettent des ajustements rapides sans CSS personnalisé.
* Le **JavaScript vanilla** (sans jQuery depuis Bootstrap 5) gère l'interactivité des composants via des attributs `data-bs-*`.
* La **personnalisation** se fait via les variables Sass ou les thèmes pour adapter les couleurs, espacements et typographie.
---
## Concepts clés
* **Grille 12 colonnes** — Système de mise en page basé sur des rangées (row) et des colonnes (col) avec des breakpoints responsives.
* **Composants** — Éléments d'interface pré-stylisés (Navbar, Card, Modal, Alert, Badge, etc.) prêts à l'emploi.
* **Breakpoints** — Points de rupture responsives : xs (<576px), sm, md (768px), lg (992px), xl (1200px), xxl (1400px).
* **Utilitaires** — Classes de bas niveau pour l'espacement (`m-3`, `p-2`), l'affichage (`d-flex`, `d-none`), etc.
* **Variables Sass** — Variables personnalisables (`$primary`, `$font-size-base`) pour thématiser Bootstrap.
* **Data attributes** — Attributs HTML `data-bs-*` qui contrôlent le comportement JavaScript des composants sans écrire de code.
---
## Exemple
```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <title>Exemple Bootstrap</title>
</head>
<body>
  <!-- Navigation -->
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container">
      <a class="navbar-brand" href="#">Mon Site</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navMenu">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item"><a class="nav-link active" href="#">Accueil</a></li>
          <li class="nav-item"><a class="nav-link" href="#">Articles</a></li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- Contenu principal -->
  <div class="container mt-4">
    <div class="row g-4">
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Carte 1</h5>
            <p class="card-text">Contenu de la carte...</p>
            <a href="#" class="btn btn-primary">En savoir plus</a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```
---
## Avantages
* Facilité d'utilisation extrême — des composants prêts à l'emploi fonctionnels en quelques lignes de HTML.
* Documentation exhaustive et communauté massive — facile à apprendre et à trouver de l'aide.
* Système de grille responsive éprouvé et intuitif.
* Compatibilité cross-browser garantie avec tous les navigateurs modernes.
* Personnalisation via Sass permettant d'adapter le framework à la charte graphique du projet.
---
## Inconvénients
* Les sites Bootstrap se ressemblent souvent — l'aspect "Bootstrap générique" est reconnaissable.
* Le CSS inclus est volumineux si tous les composants sont chargés sans personnalisation.
* Moins adapté aux designs très personnalisés ou uniques qui nécessitent de surcharger massivement le framework.
* L'approche composants pré-stylisés est moins flexible que l'approche utilitaire de Tailwind CSS.
---
## Pièges courants
* **Surcharger Bootstrap avec du CSS personnalisé** — Écrire du CSS pour contrer les styles Bootstrap au lieu de personnaliser via les variables Sass.
* **Charger tout Bootstrap** — Inclure l'intégralité du CSS et du JS quand seuls quelques composants sont utilisés, alourdissant le bundle.
* **Mauvaise utilisation de la grille** — Oublier le conteneur (`container`), la rangée (`row`) ou imbriquer des colonnes incorrectement.
* **Dépendance excessive** — Utiliser Bootstrap pour tout sans apprendre le CSS sous-jacent, rendant difficile la migration vers une autre solution.
---
## À ne pas confondre
* **Bootstrap vs Tailwind CSS** — Bootstrap fournit des composants pré-stylisés, Tailwind fournit des classes utilitaires de bas niveau pour construire des designs personnalisés.
* **Bootstrap vs Material UI** — Bootstrap est un framework CSS pur (avec JS vanilla), Material UI est une bibliothèque de composants React suivant les guidelines Material Design de Google.
* **Bootstrap CSS vs Bootstrap JS** — Le CSS de Bootstrap (grille, composants) peut être utilisé sans le JavaScript ; le JS n'est nécessaire que pour les composants interactifs (modales, dropdowns).
---
## Explication simplifiée
Bootstrap est comme un kit de construction IKEA pour les sites web : vous prenez des éléments pré-fabriqués (boutons, barres de navigation, cartes), vous les assemblez en suivant les instructions, et vous obtenez un site fonctionnel et professionnel rapidement. Pas besoin d'être menuisier (designer) pour obtenir un résultat correct.
---
## Explication avancée
Bootstrap utilise une architecture basée sur Sass avec un système de variables, de mixins et de fonctions qui génèrent l'ensemble des classes CSS du framework. Le système de grille est implémenté avec CSS Flexbox (et optionnellement CSS Grid) via des mixins Sass qui génèrent les classes pour chaque breakpoint. Les composants JavaScript utilisent une architecture de plugins modulaires instanciables via les attributs `data-bs-*` (initialisation déclarative) ou via l'API JavaScript (initialisation programmatique). Le tree-shaking du JavaScript est possible grâce aux imports ESM individuels. La personnalisation via les variables Sass permet de modifier en cascade toutes les propriétés du framework, car les composants héritent leurs valeurs des variables globales (`$primary`, `$border-radius`, etc.).
---
## Points critiques à retenir
* [CRITIQUE] Toujours personnaliser Bootstrap via les variables Sass plutôt que de surcharger les styles avec du CSS personnalisé.
* [IMPORTANT] Bootstrap 5 ne nécessite plus jQuery — utiliser le JavaScript vanilla natif de Bootstrap 5.
* [PIÈGE] Ne pas charger l'intégralité de Bootstrap si seuls quelques composants sont nécessaires — utiliser les imports Sass sélectifs.
* [IMPORTANT] La grille Bootstrap nécessite la structure `container > row > col` — sauter un niveau provoque des problèmes de mise en page.
* [CRITIQUE] Bootstrap est idéal pour le prototypage rapide et les interfaces génériques, mais Tailwind CSS est préférable pour les designs personnalisés et les applications modernes.
