---
id: laravel
label: Laravel
category: framework
priority: medium
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:59:11.876Z'
updatedAt: '2026-04-14T17:59:11.876Z'
relations:
  - target: php
    type: uses
    weight: 0.9
resources:
  - type: documentation
    title: Documentation officielle Laravel
    url: 'https://laravel.com/docs'
  - type: vidéo
    title: freeCodeCamp – Laravel Full Course
    url: 'https://www.youtube.com/watch?v=ImtZ5yENzgE'
  - type: vidéo
    title: Fireship – Laravel in 100 Seconds
    url: 'https://www.youtube.com/watch?v=376vZ1wNYPA'
  - type: blog
    title: Laracasts – Tutoriels vidéo Laravel
    url: 'https://laracasts.com/'
  - type: blog
    title: Laravel News
    url: 'https://laravel-news.com/'
---

## Résumé rapide

Laravel est le framework PHP le plus populaire, conçu pour rendre le développement web élégant et expressif. Il fournit un écosystème complet avec ORM Eloquent, système de templates Blade, gestion des files d'attente, authentification et bien plus, suivant le pattern MVC.

---

## Définition

Laravel est un framework web PHP open source, full-stack et opiné, qui suit le pattern MVC (Model-View-Controller). Il offre une syntaxe élégante et un ensemble complet d'outils (ORM, migrations, templates, authentification, files d'attente) pour le développement rapide d'applications web modernes.

---

## Histoire

* Créé par Taylor Otwell en 2011 comme alternative plus moderne à CodeIgniter
* Inspiré de Ruby on Rails (convention over configuration) et ASP.NET MVC
* Laravel 4 (2013) reconstruit de zéro avec Composer et les packages
* Écosystème étendu : Forge, Vapor, Nova, Livewire, Inertia.js
* Devenu le framework PHP dominant, avec la plus grande communauté PHP

---

## Objectif

* Rendre le développement PHP élégant, expressif et agréable
* Fournir un écosystème complet pour le développement web
* Suivre les conventions pour accélérer le développement
* Offrir des outils modernes (ORM, migrations, queues, events)

---

## Domaines d'utilisation

* Applications web full-stack (e-commerce, SaaS, CMS)
* API REST et backends d'applications
* Applications temps réel avec Laravel Echo et WebSocket
* Back-offices et tableaux de bord administratifs
* Applications monolithiques avec Livewire ou Inertia.js

---

## Fonctionnement

* Architecture MVC : les routes dirigent vers les contrôleurs qui utilisent les modèles Eloquent
* Eloquent ORM (Active Record) mappe les classes PHP aux tables de la base de données
* Blade est le moteur de templates avec héritage et composants
* Le service container gère l'injection de dépendances et le cycle de vie des services
* Artisan CLI fournit des commandes pour générer du code, lancer des migrations, etc.

---

## Concepts clés

* **Eloquent ORM** — ORM Active Record qui mappe les modèles PHP aux tables SQL
* **Blade** — Moteur de templates avec directives (`@if`, `@foreach`, `@extends`)
* **Artisan** — CLI intégré pour la génération de code et les tâches d'administration
* **Middleware** — Filtres HTTP appliqués aux routes (auth, CORS, rate limiting)
* **Migration** — Gestion versionnée du schéma de base de données
* **Service Container** — Conteneur IoC pour l'injection de dépendances

---

## Exemple

```php
// app/Models/Article.php
class Article extends Model
{
    protected $fillable = ['titre', 'contenu'];

    public function auteur()
    {
        return $this->belongsTo(User::class);
    }
}

// routes/api.php
Route::get('/articles', function () {
    return Article::with('auteur')->latest()->get();
});

Route::post('/articles', function (Request $request) {
    $validated = $request->validate([
        'titre' => 'required|max:200',
        'contenu' => 'required',
    ]);

    $article = Article::create($validated);
    return response()->json($article, 201);
});
```

---

## Avantages

* Syntaxe élégante et expressive ("developer happiness")
* Écosystème complet et intégré (ORM, auth, queues, events, mail)
* Eloquent ORM puissant et intuitif
* Documentation excellente et communauté très active (Laracasts)
* Artisan CLI accélère considérablement le développement

---

## Inconvénients

* Performances inférieures aux frameworks compilés (PHP reste interprété)
* Courbe d'apprentissage pour maîtriser tout l'écosystème
* "Magic" excessive : beaucoup de comportements implicites difficiles à tracer
* Couplage fort avec l'écosystème Laravel (vendor lock-in)
* Les mises à jour majeures peuvent nécessiter des refactoring importants

---

## Pièges courants

* Requêtes N+1 avec Eloquent (oublier `with()` pour l'eager loading)
* Mettre trop de logique dans les contrôleurs au lieu des services
* Ne pas utiliser les Form Requests pour la validation
* Confondre `$fillable` et `$guarded` pour la protection contre l'assignation de masse
* Ne pas utiliser les files d'attente (queues) pour les tâches longues

---

## À ne pas confondre

* Laravel vs Symfony (tout-en-un opiné vs composants modulaires)
* Eloquent vs Doctrine (Active Record vs Data Mapper)
* Blade vs Twig (template Laravel vs template Symfony)
* Laravel vs Lumen (full-stack vs micro-framework, Lumen abandonné)

---

## Explication simplifiée

Laravel est comme un atelier de menuiserie tout équipé pour construire des sites web en PHP. Il te donne tous les outils dont tu as besoin, bien rangés et avec un mode d'emploi clair, pour que tu puisses te concentrer sur la création plutôt que sur la recherche d'outils.

---

## Explication avancée

Laravel s'articule autour d'un Service Container IoC qui résout les dépendances via la réflexion PHP et les Service Providers. L'ORM Eloquent implémente le pattern Active Record avec des relations lazy-loadées (hasMany, belongsTo, etc.) et des query scopes chainables. Le pipeline de requêtes traverse les middlewares globaux et de route avant d'atteindre le contrôleur. Le système d'événements permet un découplage via des listeners et observers. Les files d'attente (queues) délèguent les tâches asynchrones à des workers via Redis, SQS ou d'autres drivers. Le service container supporte le binding contextuel, les singletons, et l'auto-wiring par type-hinting.

---

## Points critiques à retenir

* [CRITIQUE] Architecture MVC avec Eloquent ORM (Active Record)
* [CRITIQUE] Service Container IoC pour l'injection de dépendances
* [IMPORTANT] Artisan CLI pour la génération de code et les tâches d'administration
* [IMPORTANT] Blade pour le rendu de templates côté serveur
* [PIÈGE] Toujours utiliser eager loading (`with()`) pour éviter les requêtes N+1
* [PIÈGE] Protéger les modèles contre l'assignation de masse (`$fillable`)
