---
id: dart
label: Dart
category: langage
priority: medium
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:58:22.966Z'
updatedAt: '2026-04-14T17:58:22.966Z'
relations:
  - target: flutter
    type: uses
    weight: 0.9
resources:
  - type: documentation
    title: Dart Documentation officielle
    url: 'https://dart.dev/guides'
  - type: documentation
    title: Dart Language Tour
    url: 'https://dart.dev/language'
  - type: vidéo
    title: Dart Programming Tutorial – freeCodeCamp
    url: 'https://www.youtube.com/watch?v=Ej_Pcr4uC2Q'
  - type: cours
    title: Dart Pad (interactive)
    url: 'https://dartpad.dev/'
---

## Résumé rapide

Dart est un langage développé par Google, principalement utilisé avec Flutter pour créer des applications multiplateformes. Il combine syntaxe familière, compilation AOT/JIT et typage fort optionnel.

---

## Définition

Dart est un langage orienté objet, statiquement typé, compilé AOT (production) ou JIT (développement), conçu pour construire des applications rapides sur toutes les plateformes : mobile, web, desktop et serveur.

---

## Histoire

* Annoncé par Google en 2011
* Initialement proposé comme alternative à JavaScript
* Repositionné en 2015 avec Dart 2 sur Flutter
* Dart 3 (2023) introduit la sound null safety par défaut
* Propulse Flutter, framework multi-plateforme de Google

---

## Objectif

* Fournir un langage unifié pour UI multi-plateforme
* Offrir hot-reload grâce à la compilation JIT
* Générer du code natif performant via AOT
* Simplifier le développement d'applications réactives

---

## Domaines d'utilisation

* Applications mobiles (Flutter)
* Applications desktop (Flutter Desktop)
* Applications web (Flutter Web, compilation vers JS)
* Serveurs légers (Shelf, Aqueduct)

---

## Fonctionnement

* Compilation JIT en développement (hot-reload)
* Compilation AOT en production (native)
* Sound null safety à la compilation
* Garbage collector générationnel
* Isolates pour concurrence (mémoire isolée)

---

## Concepts clés

* **Sound Null Safety** — Types non-nullables par défaut
* **async/await** — Programmation asynchrone native
* **Future/Stream** — Asynchrone et flux réactifs
* **Isolate** — Unité de concurrence avec mémoire isolée
* **Mixin** — Réutilisation de comportement sans héritage
* **Extension methods** — Ajouter des méthodes à des types existants

---

## Exemple

```dart
class Person {
  final String name;
  int age;

  Person({required this.name, required this.age});
}

void main() {
  final people = [
    Person(name: 'Alice', age: 30),
    Person(name: 'Bob', age: 25),
  ];

  final names = people
      .where((p) => p.age > 26)
      .map((p) => p.name)
      .toList();

  print(names); // [Alice]
}
```

---

## Avantages

* Hot-reload instantané en développement
* Null safety à la compilation
* Syntaxe familière (inspirée de Java/JS)
* Compilation native pour performance
* Écosystème Flutter très riche

---

## Inconvénients

* Écosystème limité hors Flutter
* Communauté plus petite que JS/Python
* Moins d'emplois dédiés à Dart seul
* Packages externes moins nombreux

---

## Pièges courants

* Oublier `await` sur un Future
* Modifier une liste pendant son itération
* Confusion Stream vs Future
* Ne pas dispose les controllers/streams

---

## À ne pas confondre

* Dart vs JavaScript (typé statiquement)
* Dart vs Flutter (langage vs framework)
* Future vs Stream (une valeur vs plusieurs)

---

## Explication simplifiée

Dart est le langage que tu utilises quand tu fais du Flutter. Il ressemble à Java et JavaScript mélangés, et il te permet de créer des apps qui tournent sur iPhone, Android, web et desktop avec un seul code.

---

## Explication avancée

Dart utilise deux modes de compilation : JIT pour le développement (hot-reload en millisecondes) et AOT pour la production (code natif ARM/x64). La sound null safety garantit à la compilation qu'une variable non-nullable ne peut jamais être null. Les isolates permettent la vraie parallélisation en communiquant par messages (pas de mémoire partagée).

---

## Points critiques à retenir

* [CRITIQUE] Null safety par défaut depuis Dart 3
* [CRITIQUE] Toujours `await` les Future
* [IMPORTANT] Dispose controllers et streams pour éviter les leaks
* [IMPORTANT] Utiliser `const` pour les widgets immuables Flutter
* [PIÈGE] Les isolates ne partagent pas la mémoire
