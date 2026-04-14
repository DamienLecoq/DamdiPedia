---
id: ruby
label: Ruby
category: langage
priority: medium
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:59:52.500Z'
updatedAt: '2026-04-14T17:59:52.500Z'
relations:
  - target: ruby-on-rails
    type: uses
    weight: 0.9
resources:
  - type: documentation
    title: Documentation officielle Ruby
    url: 'https://www.ruby-lang.org/fr/documentation/'
  - type: cours
    title: Ruby en 20 minutes — ruby-lang.org
    url: 'https://www.ruby-lang.org/fr/documentation/quickstart/'
  - type: vidéo
    title: Ruby Full Course - freeCodeCamp
    url: 'https://www.youtube.com/watch?v=t_ispmWmdjY'
  - type: livre
    title: The Well-Grounded Rubyist — David A. Black
    url: 'https://www.manning.com/books/the-well-grounded-rubyist-third-edition'
  - type: documentation
    title: Ruby API Documentation
    url: 'https://ruby-doc.org/'
---

## Résumé rapide
Ruby est un langage de programmation dynamique orienté objet conçu pour le bonheur du développeur. Créé par Yukihiro "Matz" Matsumoto au Japon, il met l'accent sur l'élégance et la lisibilité du code. Ruby est surtout connu grâce au framework Ruby on Rails qui a révolutionné le développement web dans les années 2000.

---

## Définition
Ruby est un langage de programmation interprété, dynamiquement typé, purement orienté objet (tout est un objet, y compris les nombres et `nil`). Créé en 1995 par Yukihiro Matsumoto, il s'inspire de Perl, Smalltalk, Eiffel et Lisp. Sa philosophie centrale est que le langage doit être optimisé pour le plaisir du programmeur, pas seulement pour la machine.

---

## Histoire
* **1995** — Yukihiro "Matz" Matsumoto publie Ruby 0.95 au Japon, cherchant un langage "plus puissant que Perl, plus orienté objet que Python".
* **2004** — David Heinemeier Hansson lance Ruby on Rails, propulsant Ruby sur la scène internationale.
* **2007** — Ruby 1.9 introduit YARV (Yet Another Ruby VM), améliorant significativement les performances.
* **2013** — Ruby 2.0 ajoute les keyword arguments, les lazy enumerators et le garbage collector générationnel.
* **2020-2023** — Ruby 3.x introduit le typage statique optionnel (RBS), Ractor (parallélisme sans GIL), et le compilateur JIT YJIT (CRuby).

---

## Objectif
* Créer un langage optimisé pour le bonheur et la productivité du développeur ("programmer's best friend").
* Fournir une syntaxe expressive et naturelle qui se lit presque comme de l'anglais.
* Tout est un objet : unifier le modèle de programmation pour une cohérence maximale.

---

## Domaines d'utilisation
* **Développement web** — Ruby on Rails pour les applications web, API et plateformes (GitHub, Shopify, Basecamp).
* **Scripts et automatisation** — Scripts système, outils en ligne de commande et DevOps (Chef, Vagrant, Homebrew).
* **Prototypage rapide** — La concision de Ruby permet de créer rapidement des preuves de concept.
* **Tests et QA** — RSpec, Cucumber et Capybara pour les tests automatisés et le BDD.

---

## Fonctionnement
* Le code Ruby est exécuté par l'interpréteur **CRuby (MRI)**, qui compile le code en bytecode puis l'exécute via YARV.
* Le **GIL (Global Interpreter Lock)** limite l'exécution parallèle de threads dans un même processus (contourné par Ractor en Ruby 3).
* **YJIT** (Ruby 3.1+) est un compilateur JIT intégré à CRuby qui compile les hot paths en code machine natif.
* Le **garbage collector** est générationnel et incrémental, optimisé pour les applications web avec beaucoup d'objets éphémères.
* **RubyGems** est le système de paquets et **Bundler** gère les dépendances de projet.

---

## Concepts clés
* **Tout est un objet** — Même les entiers, les booléens et `nil` sont des objets avec des méthodes (`5.times { puts "hello" }`).
* **Blocs et Procs** — Segments de code passés aux méthodes, fondement de l'API de Ruby (`[1,2,3].map { |n| n * 2 }`).
* **Duck typing** — "Si ça marche comme un canard, c'est un canard" — le type est déterminé par le comportement, pas par la déclaration.
* **Mixins** — Modules inclus dans les classes pour partager du comportement (alternative à l'héritage multiple).
* **Métaprogrammation** — Capacité de modifier les classes et méthodes au runtime (`method_missing`, `define_method`).
* **Convention over Configuration** — Principe popularisé par Rails : des valeurs par défaut sensées réduisent la configuration.

---

## Exemple
```ruby
# Tout est un objet
puts 42.even?        # true
puts "hello".reverse # "olleh"

# Blocs et itérateurs
nombres = [1, 2, 3, 4, 5]
pairs = nombres.select(&:even?).map { |n| n ** 2 }
puts pairs # [4, 16]

# Classes avec mixins
module Salutable
  def saluer
    "Bonjour, je suis #{nom} !"
  end
end

class Utilisateur
  include Salutable

  attr_reader :nom, :email

  def initialize(nom, email)
    @nom = nom
    @email = email
  end
end

alice = Utilisateur.new("Alice", "alice@exemple.com")
puts alice.saluer # "Bonjour, je suis Alice !"
```

---

## Avantages
* Syntaxe élégante et expressive qui favorise un code lisible et maintenable.
* Purement orienté objet avec une cohérence remarquable dans l'API.
* Métaprogrammation puissante permettant de créer des DSL (Domain-Specific Languages) expressifs.
* Communauté forte avec une culture de la qualité du code et des tests (TDD/BDD).
* Écosystème RubyGems riche avec plus de 170 000 gems disponibles.

---

## Inconvénients
* Performances inférieures à celles des langages compilés, bien que YJIT ait considérablement amélioré la situation.
* Le GIL limite le parallélisme réel des threads (Ruby 3 introduit Ractor comme alternative).
* L'adoption a diminué face à la montée de Node.js, Go et Python dans le développement web.
* La métaprogrammation excessive peut rendre le code difficile à comprendre et à déboguer.

---

## Pièges courants
* **Monkey patching** — Modifier les classes standard au runtime peut causer des conflits imprévisibles entre bibliothèques.
* **method_missing abusif** — Intercepter tous les appels de méthode rend le débogage très difficile et casse l'autocomplétion.
* **Symboles vs chaînes** — Confondre `:nom` (symbole, immuable) et `"nom"` (chaîne, mutable) est une source fréquente de bugs.
* **N+1 queries** — Piège classique avec ActiveRecord (Rails) : charger des associations une par une au lieu d'utiliser `includes`.

---

## À ne pas confondre
* **Ruby vs Ruby on Rails** — Ruby est le langage de programmation, Rails est un framework web écrit en Ruby.
* **Ruby vs Python** — Les deux sont des langages dynamiques interprétés, mais Ruby privilégie l'expressivité tandis que Python privilégie la clarté ("il n'y a qu'une seule façon de le faire").
* **CRuby vs JRuby** — CRuby (MRI) est l'implémentation de référence en C, JRuby tourne sur la JVM et offre un vrai parallélisme.

---

## Explication simplifiée
Ruby est comme un langage naturel pour la programmation : au lieu d'écrire des instructions techniques, vous décrivez presque en anglais ce que vous voulez faire. Par exemple, `5.times { puts "Bonjour" }` se lit littéralement "5 fois, affiche Bonjour". C'est un langage conçu pour que les développeurs prennent plaisir à écrire du code.

---

## Explication avancée
Ruby utilise un modèle objet basé sur les classes avec héritage simple, enrichi par les mixins (modules inclus dans la chaîne d'héritage via `include`/`prepend`). La résolution de méthode suit la Method Resolution Order (MRO) : l'objet, puis les modules prepended, la classe, les modules included, puis la superclasse, récursivement. Les blocs sont des closures légères (implémentées comme des `Proc`) passées implicitement aux méthodes via `yield`. La métaprogrammation repose sur l'ouverture des classes (open classes) et les hooks (`method_missing`, `included`, `inherited`). YJIT (Ruby 3.1+) utilise la technique de Lazy Basic Block Versioning pour compiler le bytecode en code x86-64/ARM64 natif incrémentalement, en spécialisant les blocs de base selon les types observés à l'exécution. Ractor (Ruby 3.0+) implémente le modèle acteur pour permettre un parallélisme réel sans mémoire partagée.

---

## Points critiques à retenir
* [CRITIQUE] La métaprogrammation est puissante mais doit être utilisée avec parcimonie — un code trop "magique" est impossible à déboguer et à maintenir.
* [IMPORTANT] Ruby on Rails a popularisé le pattern Convention over Configuration : comprendre les conventions Rails est essentiel pour être productif.
* [PIÈGE] Le GIL de CRuby empêche le parallélisme réel des threads — pour les tâches CPU-bound, utiliser Ractor ou des processus séparés.
* [IMPORTANT] YJIT (Ruby 3.1+) améliore les performances de 15-25% en moyenne — toujours utiliser une version récente de Ruby.
* [PIÈGE] Les symboles ne sont pas récupérés par le garbage collector dans les anciennes versions de Ruby — attention aux symboles dynamiques dans les applications longue durée.
