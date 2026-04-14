---
id: rust
label: Rust
category: langage
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:59:53.697Z'
updatedAt: '2026-04-14T17:59:53.697Z'
relations:
  - target: cargo
    type: uses
    weight: 0.9
  - target: webassembly
    type: related
    weight: 0.7
resources:
  - type: documentation
    title: The Rust Programming Language (Le Livre)
    url: 'https://doc.rust-lang.org/book/'
  - type: documentation
    title: Rust by Example
    url: 'https://doc.rust-lang.org/rust-by-example/'
  - type: vidéo
    title: Let's Get Rusty – Rust Tutorial
    url: 'https://www.youtube.com/c/LetsGetRusty'
  - type: cours
    title: Rustlings
    url: 'https://github.com/rust-lang/rustlings'
---

## Résumé rapide

Rust est un langage système compilé axé sur la sécurité mémoire et la performance, sans garbage collector. Il garantit à la compilation l'absence de data races et de null pointer exceptions.

---

## Définition

Rust est un langage de programmation système, compilé, statiquement typé, qui garantit la sécurité mémoire et thread-safety à la compilation via son système d'ownership et de borrowing, sans runtime ni garbage collector.

---

## Histoire

* Créé par Graydon Hoare chez Mozilla en 2010
* Version 1.0 publiée en 2015
* Adopté par Microsoft, AWS, Google, Discord, Dropbox
* Intégré au noyau Linux en 2022 (premier langage non-C accepté)
* Élu langage le plus aimé sur Stack Overflow depuis 2016

---

## Objectif

* Remplacer C/C++ avec une sécurité mémoire garantie
* Offrir des performances natives sans compromis
* Éviter les data races en concurrence
* Produire des binaires fiables et compacts

---

## Domaines d'utilisation

* Systèmes d'exploitation et drivers
* WebAssembly et applications web performantes
* CLI tools (ripgrep, fd, bat)
* Blockchain et cryptographie
* Moteurs de jeu et embarqué

---

## Fonctionnement

* **Ownership** — chaque valeur a un propriétaire unique
* **Borrowing** — références empruntées vérifiées par le borrow checker
* **Lifetimes** — annotations explicites pour la durée de vie des références
* Compilation AOT vers code natif via LLVM
* Pas de runtime, pas de GC

---

## Concepts clés

* **Ownership** — Modèle d'appropriation unique avec move semantics
* **Borrowing** — Références &T (immutable) ou &mut T (mutable exclusive)
* **Lifetimes** — Garanties statiques sur la validité des références
* **Traits** — Équivalent des interfaces, polymorphisme statique
* **Enum** — Types algébriques (sum types) avec pattern matching
* **Result<T, E> / Option<T>** — Gestion d'erreurs sans exceptions

---

## Exemple

```rust
fn main() {
    let mut numbers = vec![1, 2, 3];
    numbers.push(4);

    let sum: i32 = numbers.iter().sum();
    println!("Somme: {}", sum);

    // Pattern matching
    match numbers.first() {
        Some(n) => println!("Premier: {}", n),
        None => println!("Vide"),
    }
}
```

---

## Avantages

* Sécurité mémoire garantie sans GC
* Performances égales à C/C++
* Concurrence sans data races
* Écosystème Cargo excellent
* Messages d'erreur extrêmement pédagogiques

---

## Inconvénients

* Courbe d'apprentissage très raide (borrow checker)
* Temps de compilation longs
* Écosystème moins mature que C++
* Verbeux pour du code simple

---

## Pièges courants

* Lutter contre le borrow checker au lieu de repenser l'architecture
* Abuser de `.clone()` pour contourner l'ownership
* Utiliser `unwrap()` en production (panic en cas de None/Err)
* Sous-estimer l'importance des lifetimes

---

## À ne pas confondre

* Rust vs C++ (sécurité mémoire garantie à la compilation)
* Rust vs Go (pas de GC, performance maximale vs simplicité)
* &T vs &mut T (référence partagée vs exclusive)

---

## Explication simplifiée

Rust c'est comme un compilateur ultra-strict qui vérifie chaque ligne de ton code pour s'assurer que tu ne peux jamais accéder à une mémoire invalide ou faire des erreurs de concurrence — avant même que ton programme ne tourne.

---

## Explication avancée

Rust utilise un système de types affin avec ownership linéaire pour tracer statiquement la propriété des valeurs. Le borrow checker applique des règles strictes : une référence mutable exclusive OU plusieurs références immutables, jamais les deux. Les lifetimes sont inférées quand possible et garantissent qu'aucune référence ne survit à son référent. Le compilateur transforme ces garanties en code machine zero-cost via LLVM.

---

## Points critiques à retenir

* [CRITIQUE] Pas de GC : tout est géré par ownership à la compilation
* [CRITIQUE] Une seule référence mutable OU plusieurs immutables
* [IMPORTANT] `Result<T, E>` pour les erreurs, jamais d'exceptions
* [IMPORTANT] `Cargo` est le gestionnaire de paquets officiel
* [PIÈGE] `unwrap()` peut panic — utiliser `?` ou match en production
