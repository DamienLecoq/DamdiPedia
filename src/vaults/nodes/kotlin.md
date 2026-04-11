---
id: kotlin
label: Kotlin
category: langage
priority: medium
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-11T10:00:08.711Z'
updatedAt: '2026-04-11T10:00:08.711Z'
relations:
  - target: java
    type: related
    weight: 0.9
  - target: jvm
    type: runs_on
    weight: 0.9
  - target: poo
    type: implements
    weight: 0.7
  - target: spring-boot
    type: uses
    weight: 0.5
resources:
  - type: documentation
    title: Documentation officielle Kotlin
    url: 'https://kotlinlang.org/docs/home.html'
  - type: documentation
    title: Kotlin Playground
    url: 'https://play.kotlinlang.org/'
  - type: vidéo
    title: freeCodeCamp – Kotlin Full Course
    url: 'https://www.youtube.com/watch?v=F9UC9DY-vIU'
  - type: vidéo
    title: Philipp Lackner – Kotlin for Beginners
    url: 'https://www.youtube.com/watch?v=EExSSotojVI'
  - type: blog
    title: Kotlin Blog (JetBrains)
    url: 'https://blog.jetbrains.com/kotlin/'
  - type: cours
    title: Google – Kotlin pour Android
    url: 'https://developer.android.com/courses/android-basics-compose/course'
  - type: livre
    title: Kotlin in Action
    url: 'https://www.amazon.com/dp/1617293296'
  - type: autre
    title: Kotlin Koans – Exercices interactifs
    url: 'https://kotlinlang.org/docs/koans.html'
---

## Résumé rapide

Kotlin est un langage moderne développé par JetBrains qui tourne sur la JVM. Plus concis et sûr que Java, il est devenu le langage préféré pour Android et gagne du terrain côté backend. Il est interopérable à 100% avec Java.

---

## Définition

Kotlin est un langage de programmation statiquement typé, multiplateforme, qui combine la programmation orientée objet et fonctionnelle. Il compile en bytecode JVM, en JavaScript ou en code natif (Kotlin/Native).

---

## Histoire

* Créé par JetBrains (créateurs d'IntelliJ IDEA) en 2011
* Version 1.0 stable en 2016
* Adopté par Google comme langage officiel pour Android en 2017
* Préféré à Java pour Android depuis 2019
* Kotlin Multiplatform (KMP) pour le partage de code multiplateforme

---

## Objectif

* Corriger les faiblesses de Java (verbosité, null-safety)
* Interopérabilité à 100% avec le code Java existant
* Offrir un langage moderne sur la JVM
* Supporter le développement multiplateforme

---

## Domaines d'utilisation

* Développement Android (langage principal)
* Backend (Spring Boot + Kotlin, Ktor)
* Multiplateforme (Kotlin Multiplatform Mobile / KMP)
* Scripts et outils CLI
* Applications desktop (Compose Multiplatform)

---

## Fonctionnement

* Compile en bytecode JVM (comme Java)
* Interopérable avec les bibliothèques Java
* Null-safety intégrée dans le système de types
* Coroutines pour la concurrence légère
* Inférence de types forte

---

## Concepts clés

* **Null-safety** — Distinction entre types nullable (`String?`) et non-nullable (`String`)
* **Data classes** — Équivalent des records Java, génère equals/hashCode/toString
* **Coroutines** — Concurrence légère et structurée
* **Extension functions** — Ajouter des méthodes à des classes existantes sans héritage
* **Smart casts** — Cast automatique après un `is` check
* **Sealed classes** — Hiérarchies de types fermées (exhaustive when)

---

## Exemple

```kotlin
data class User(val name: String, val age: Int)

fun greet(user: User?): String {
    // Null-safe : le compilateur force la vérification
    return user?.let { "Bonjour ${it.name}, ${it.age} ans" }
        ?: "Utilisateur inconnu"
}

fun main() {
    val users = listOf(User("Alice", 30), User("Bob", 17))
    users.filter { it.age >= 18 }
         .forEach { println(greet(it)) }
}
```

---

## Structure / Architecture

* Fonctions au top-level (pas besoin de classe englobante)
* Data classes pour les modèles de données
* Object declarations pour les singletons
* Companion objects pour les membres statiques
* Sealed classes pour les hiérarchies fermées

---

## Syntaxe et spécificités

* Inférence de types : `val x = 42` (pas besoin de `int`)
* `val` (immutable) vs `var` (mutable)
* Pas de point-virgule en fin de ligne
* String templates : `"Hello $name"`
* `when` au lieu de `switch` (plus puissant, exhaustif avec sealed)

---

## Avantages

* Beaucoup plus concis que Java
* Null-safety élimine les NullPointerException
* Interopérable à 100% avec Java
* Coroutines pour la concurrence (plus simple que les threads)
* Multiplateforme (JVM, JS, Native)

---

## Inconvénients

* Communauté plus petite que Java
* Temps de compilation plus lent que Java
* Certaines fonctionnalités avancées complexes (coroutines, delegation)
* Moins de ressources d'apprentissage en français

---

## Pièges courants

* Abuser des extension functions (rend le code difficile à tracer)
* Confondre `val` et `var` dans des contextes concurrents
* Utiliser `!!` (force non-null) partout au lieu de gérer proprement les nulls
* Ignorer les coroutines et utiliser les threads Java classiques

---

## À ne pas confondre

* Kotlin vs Java (moderne/concis vs verbeux/mature)
* `val` vs `var` (immutable vs mutable)
* Coroutines vs threads (légères/coopératives vs lourdes/préemptives)
* Kotlin/JVM vs Kotlin/Native vs Kotlin/JS (mêmes syntaxe, cibles différentes)

---

## Explication simplifiée

Kotlin c'est du Java en mieux : même plateforme (JVM), même écosystème, mais avec moins de code à écrire, moins de bugs possibles (null-safety) et des fonctionnalités modernes. Tout code Java existant est directement utilisable depuis Kotlin.

---

## Explication avancée

Kotlin est un langage à typage statique avec inférence de types, compilant vers le bytecode JVM via un compilateur indépendant. Son système de types intègre la nullabilité (types non-nullable par défaut), éliminant structurellement les NullPointerException. Les coroutines offrent de la concurrence structurée via des continuations, sans créer de threads OS. L'interopérabilité Java est assurée au niveau du bytecode : les annotations `@JvmStatic`, `@JvmField`, `@JvmOverloads` permettent d'exposer du Kotlin idiomatique vers Java.

---

## Points critiques à retenir

* [CRITIQUE] Null-safety intégrée dans le système de types (élimine les NPE)
* [CRITIQUE] Interopérable à 100% avec Java (même bytecode JVM)
* [IMPORTANT] Langage officiel pour Android depuis 2019
* [IMPORTANT] Coroutines = concurrence légère et structurée
* [PIÈGE] `!!` (force non-null) est un anti-pattern — gérer les nulls proprement
* [PIÈGE] Extension functions excessives → code difficile à suivre
