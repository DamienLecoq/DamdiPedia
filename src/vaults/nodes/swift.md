---
id: swift
label: Swift
category: langage
priority: medium
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T18:00:13.241Z'
updatedAt: '2026-04-14T18:00:13.241Z'
relations:
  - target: xcode
    type: uses
    weight: 0.9
resources:
  - type: documentation
    title: Swift Documentation officielle
    url: 'https://www.swift.org/documentation/'
  - type: documentation
    title: Apple Developer – Swift
    url: 'https://developer.apple.com/swift/'
  - type: vidéo
    title: Sean Allen – Swift Tutorials
    url: 'https://www.youtube.com/c/SeanAllen'
  - type: cours
    title: Hacking with Swift
    url: 'https://www.hackingwithswift.com/'
---

## Résumé rapide

Swift est le langage moderne d'Apple pour iOS, macOS, watchOS et tvOS. Il remplace Objective-C avec une syntaxe plus sûre, expressive et performante, tout en restant compatible avec les frameworks Cocoa.

---

## Définition

Swift est un langage compilé, statiquement typé, multi-paradigme (POO, fonctionnel, protocol-oriented), développé par Apple pour remplacer Objective-C. Il combine sécurité mémoire, performance native et syntaxe moderne.

---

## Histoire

* Développé par Chris Lattner chez Apple à partir de 2010
* Présenté publiquement en 2014 à la WWDC
* Open-source depuis 2015 (swift.org)
* Swift 5 (2019) stabilise l'ABI
* SwiftUI introduit en 2019 pour le déclaratif UI

---

## Objectif

* Remplacer Objective-C par un langage moderne
* Offrir la sécurité mémoire sans sacrifier la performance
* Simplifier le développement d'apps Apple
* Encourager le style protocol-oriented

---

## Domaines d'utilisation

* Apps iOS, macOS, watchOS, tvOS, visionOS
* SwiftUI pour interfaces déclaratives
* Swift sur serveur (Vapor)
* Machine learning (Core ML)

---

## Fonctionnement

* Compilation AOT vers code natif via LLVM
* Gestion mémoire par ARC (Automatic Reference Counting)
* Optionals pour éviter les nil pointer crashes
* Value types (struct) privilégiés aux reference types (class)
* Protocols avec extensions pour composition

---

## Concepts clés

* **Optional** — Type `T?` qui peut être nil, déballé explicitement
* **ARC** — Gestion mémoire par comptage de références automatique
* **Protocol** — Contrat, peut avoir des implémentations par défaut
* **Struct vs Class** — Value vs reference semantics
* **Closure** — Fonction anonyme, capture son environnement
* **Property Wrapper** — Syntaxe `@State`, `@Published` pour SwiftUI

---

## Exemple

```swift
struct Person {
    let name: String
    var age: Int
}

let people = [
    Person(name: "Alice", age: 30),
    Person(name: "Bob", age: 25)
]

let names = people
    .filter { $0.age > 26 }
    .map { $0.name }

print(names) // ["Alice"]
```

---

## Avantages

* Sûr par défaut (optionals, bounds checking)
* Performances natives
* Syntaxe moderne et concise
* Interopérable avec Objective-C
* SwiftUI très productif

---

## Inconvénients

* Limité principalement à l'écosystème Apple
* Temps de compilation parfois lents
* ABI stability récente
* Breaking changes entre versions majeures

---

## Pièges courants

* Force-unwrap (`!`) sur un optional nil
* Retain cycles avec closures (oubli `[weak self]`)
* Confusion struct vs class (copies vs références)
* Mauvaise utilisation de `@State` vs `@StateObject`

---

## À ne pas confondre

* Swift vs Objective-C (moderne vs historique)
* SwiftUI vs UIKit (déclaratif vs impératif)
* Struct vs Class (valeur vs référence)

---

## Explication simplifiée

Swift c'est le langage qu'Apple a créé pour remplacer Objective-C. Plus facile à lire, plus sûr (il t'empêche d'avoir des crashs dus à des valeurs vides), et spécialement conçu pour faire des apps iPhone, iPad et Mac.

---

## Explication avancée

Swift utilise ARC pour la gestion mémoire, avec des annotations `weak`/`unowned` pour éviter les cycles de rétention. Le système de types est basé sur les protocoles avec extensions, favorisant la composition à l'héritage. Les optionals éliminent le billion-dollar mistake du null en forçant le déballage explicite. SwiftUI utilise les property wrappers et result builders pour une DSL déclarative.

---

## Points critiques à retenir

* [CRITIQUE] Éviter les force-unwrap (`!`) en production
* [CRITIQUE] Utiliser `[weak self]` dans les closures retenues
* [IMPORTANT] Struct par défaut, class quand nécessaire
* [IMPORTANT] SwiftUI pour le nouveau code UI
* [PIÈGE] Les retain cycles ne sont pas détectés au runtime
