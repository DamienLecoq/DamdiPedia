---
id: php
label: PHP
category: langage
priority: medium
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:59:33.931Z'
updatedAt: '2026-04-14T17:59:33.931Z'
relations:
  - target: laravel
    type: uses
    weight: 0.8
resources:
  - type: documentation
    title: Manuel officiel PHP
    url: 'https://www.php.net/manual/fr/'
  - type: cours
    title: PHP The Right Way
    url: 'https://phptherightway.com/'
  - type: vidéo
    title: PHP Full Course - freeCodeCamp
    url: 'https://www.youtube.com/watch?v=OK_JCtrrv-c'
  - type: documentation
    title: PHP-FIG — Standards PSR
    url: 'https://www.php-fig.org/psr/'
  - type: blog
    title: Stitcher.io — Blog PHP moderne
    url: 'https://stitcher.io/'
---

## Résumé rapide
PHP (PHP: Hypertext Preprocessor) est un langage de script côté serveur spécialisé dans le développement web. Il alimente environ 75% des sites web dans le monde, dont WordPress, Wikipédia et Facebook (via HHVM/Hack). Après une réputation mitigée, PHP 8.x s'est considérablement modernisé avec le typage strict, les attributs et les fibres.

---

## Définition
PHP est un langage de programmation interprété, dynamiquement typé, créé par Rasmus Lerdorf en 1994 pour gérer sa page personnelle (Personal Home Page). Il s'exécute côté serveur et génère du HTML envoyé au navigateur. PHP est intégré à la plupart des serveurs web (Apache, Nginx via PHP-FPM) et dispose d'un écosystème mature avec Composer comme gestionnaire de paquets.

---

## Histoire
* **1994** — Rasmus Lerdorf crée PHP/FI (Personal Home Page / Forms Interpreter) pour suivre les visites de son CV en ligne.
* **1998** — PHP 3 réécrit par Andi Gutmans et Zeev Suraski, introduisant le moteur Zend et le PHP moderne.
* **2004** — PHP 5 apporte un véritable modèle objet avec visibilité, interfaces, exceptions et PDO.
* **2015** — PHP 7 double les performances grâce au nouveau moteur Zend Engine 3 (phpng) et introduit les déclarations de types scalaires.
* **2020-2023** — PHP 8.x introduit le compilateur JIT, les union types, les enums, les fibres (programmation asynchrone) et les types DNF.

---

## Objectif
* Fournir un langage simple et accessible pour le développement web côté serveur.
* Permettre la génération dynamique de pages HTML avec intégration facile aux bases de données.
* Offrir un déploiement simplifié via les hébergeurs mutualisés supportant PHP nativement.

---

## Domaines d'utilisation
* **Sites et applications web** — WordPress, Drupal, Joomla et la majorité des CMS du marché.
* **E-commerce** — Magento, PrestaShop, WooCommerce pour les boutiques en ligne.
* **API REST** — Laravel, Symfony pour construire des API modernes et performantes.
* **Applications SaaS** — De nombreuses plateformes (Slack, Mailchimp initialement) reposent sur PHP.

---

## Fonctionnement
* Le serveur web (Apache/Nginx) transmet les requêtes HTTP aux **processus PHP** (mod_php ou PHP-FPM).
* L'interpréteur PHP parse le code source et le compile en **opcodes** exécutés par la Zend VM.
* **OPcache** met en cache les opcodes compilés pour éviter la recompilation à chaque requête.
* Le **JIT compiler** (PHP 8.0+) compile les opcodes en code machine natif pour les sections critiques.
* Chaque requête HTTP est un **processus isolé** (shared-nothing architecture) : la mémoire est libérée après chaque requête.

---

## Concepts clés
* **Architecture shared-nothing** — Chaque requête est indépendante, sans état partagé entre les requêtes (simplifie la scalabilité).
* **Composer** — Gestionnaire de dépendances standard de PHP, équivalent de npm/pip.
* **PSR (PHP Standards Recommendations)** — Standards communautaires pour le style de code, l'autoloading et les interfaces HTTP.
* **PHP-FPM** — FastCGI Process Manager, mode d'exécution performant pour les serveurs web de production.
* **Attributs (PHP 8)** — Métadonnées structurées remplaçant les annotations en commentaires (similaires aux decorators).

---

## Exemple
```php
<?php
declare(strict_types=1);

// Enum (PHP 8.1)
enum Statut: string {
    case Actif = 'actif';
    case Inactif = 'inactif';
    case Suspendu = 'suspendu';
}

// Classe avec propriétés promues (PHP 8.0)
class Utilisateur {
    public function __construct(
        private readonly string $nom,
        private readonly string $email,
        private Statut $statut = Statut::Actif
    ) {}

    public function estActif(): bool {
        return $this->statut === Statut::Actif;
    }
}

// Match expression (PHP 8.0)
$message = match($utilisateur->estActif()) {
    true => "Compte actif",
    false => "Compte désactivé",
};

// Named arguments et null-safe operator
$resultat = $utilisateur?->getNom();
```

---

## Avantages
* Courbe d'apprentissage très accessible : idéal pour les débutants en développement web.
* Déploiement simple : la quasi-totalité des hébergeurs web supportent PHP nativement.
* Écosystème mature avec des frameworks robustes (Laravel, Symfony) et des CMS dominants (WordPress).
* PHP 8.x offre des performances comparables à d'autres langages interprétés grâce au JIT.
* L'architecture shared-nothing facilite la mise à l'échelle horizontale.

---

## Inconvénients
* Héritage historique d'une API incohérente (ordre des paramètres variable, nommage incohérent des fonctions).
* Historiquement associé à de mauvaises pratiques de sécurité (register_globals, magic_quotes).
* Moins adapté aux applications temps réel ou aux processus longue durée (bien que les Fibers améliorent cela).
* La réputation du langage pâtit encore des versions anciennes malgré les améliorations majeures de PHP 8.x.

---

## Pièges courants
* **Comparaison laxiste** — L'opérateur `==` effectue des conversions implicites surprenantes (`"0" == false` est `true`). Utiliser `===`.
* **Injection SQL** — Ne jamais concaténer des variables dans les requêtes SQL ; toujours utiliser les requêtes préparées PDO.
* **Oublier `declare(strict_types=1)`** — Sans cette directive, PHP effectue des coercitions de type silencieuses sur les paramètres.
* **Variables non initialisées** — PHP ne lève pas d'erreur par défaut pour les variables non définies, ce qui masque les bugs.

---

## À ne pas confondre
* **PHP vs JavaScript** — PHP s'exécute côté serveur et génère du HTML, JavaScript s'exécute côté client dans le navigateur (et côté serveur avec Node.js).
* **PHP vs Python** — PHP est spécialisé dans le web, Python est un langage généraliste utilisé aussi en data science et en IA.
* **PHP-FPM vs mod_php** — PHP-FPM gère un pool de processus PHP indépendant du serveur web, offrant de meilleures performances et isolation.

---

## Explication simplifiée
PHP est comme un cuisinier dans les coulisses d'un restaurant (le serveur web). Quand un client (le navigateur) commande un plat (une page web), le cuisinier PHP prépare le plat en combinant les ingrédients (données de la base de données, logique métier) et envoie le plat fini (HTML) au serveur qui le sert au client. Le client ne voit jamais la cuisine.

---

## Explication avancée
PHP utilise une architecture shared-nothing où chaque requête HTTP est traitée par un processus isolé, démarrant avec un état propre. Le moteur Zend compile le code source en opcodes (un bytecode intermédiaire) qui sont exécutés par la Zend VM. OPcache stocke ces opcodes en mémoire partagée entre les processus pour éviter la recompilation. Le JIT de PHP 8.0 (basé sur DynASM) effectue une compilation tracing qui identifie les hot paths et les compile en code machine natif. PHP-FPM gère un pool de processus worker préforqués avec des stratégies de gestion dynamique (static, dynamic, ondemand). Les Fibers (PHP 8.1) introduisent des coroutines stackful permettant de suspendre/reprendre l'exécution, ouvrant la voie à des frameworks asynchrones (ReactPHP, Swoole, FrankenPHP).

---

## Points critiques à retenir
* [CRITIQUE] Toujours utiliser les requêtes préparées PDO pour les accès base de données — les injections SQL restent la vulnérabilité n°1 des applications PHP.
* [IMPORTANT] Activer `declare(strict_types=1)` dans chaque fichier PHP pour activer le typage strict et éviter les coercitions silencieuses.
* [PIÈGE] L'opérateur `==` en PHP a des règles de coercion très permissives — `0 == "foo"` était `true` avant PHP 8.0. Toujours utiliser `===`.
* [IMPORTANT] PHP 8.x est un langage radicalement différent de PHP 5 : les pratiques modernes (types stricts, enums, match, readonly) doivent être adoptées.
* [CRITIQUE] Ne jamais désactiver les rapports d'erreur en production ; utiliser un système de logging (Monolog) et configurer correctement `error_reporting`.
