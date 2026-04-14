---
id: poo
label: Programmation Orientée Objet
category: concept
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:59:38.895Z'
updatedAt: '2026-04-14T17:59:38.895Z'
relations:
  - target: design-patterns
    type: related
    weight: 0.8
  - target: solid
    type: related
    weight: 0.8
resources:
  - type: documentation
    title: MDN Web Docs – Introduction à la POO
    url: 'https://developer.mozilla.org/fr/docs/Learn/JavaScript/Objects'
  - type: documentation
    title: Oracle – OOP Concepts
    url: 'https://docs.oracle.com/javase/tutorial/java/concepts/'
  - type: vidéo
    title: freeCodeCamp – Object Oriented Programming Course
    url: 'https://www.youtube.com/watch?v=Ej_02ICOIgs'
  - type: vidéo
    title: Mosh Hamedani – OOP Explained
    url: 'https://www.youtube.com/watch?v=pTB0EiLXUC8'
  - type: blog
    title: Baeldung – OOP Concepts
    url: 'https://www.baeldung.com/java-oop'
  - type: blog
    title: GeeksforGeeks – OOP
    url: >-
      https://www.geeksforgeeks.org/object-oriented-programming-oops-concept-in-java/
  - type: cours
    title: Coursera – Object Oriented Programming
    url: 'https://www.coursera.org/learn/object-oriented-programming'
  - type: livre
    title: Clean Code – Robert C. Martin
    url: 'https://www.amazon.com/dp/0132350882'
  - type: livre
    title: Design Patterns – Gang of Four
    url: 'https://www.amazon.com/dp/0201633612'
  - type: autre
    title: Refactoring Guru
    url: 'https://refactoring.guru/'
---

## Résumé rapide

La programmation orientée objet (POO) est un paradigme qui organise le code autour d'objets contenant des données et des comportements. Elle permet de structurer des applications complexes en les rendant plus modulaires, réutilisables et maintenables.

---

## Définition

La POO est un paradigme de programmation basé sur le concept d'objets, qui encapsulent des données (attributs) et des comportements (méthodes), et interagissent entre eux.

---

## Histoire

* Apparue dans les années 1960-70 avec Simula (premier langage à introduire les classes)
* Popularisée avec Smalltalk dans les années 1980
* Adoptée massivement avec C++ puis Java dans les années 1990
* Aujourd'hui omniprésente dans la majorité des langages modernes

---

## Objectif

* Structurer le code de manière modulaire
* Faciliter la maintenance et l'évolution
* Favoriser la réutilisation du code
* Modéliser des systèmes complexes proches du monde réel

---

## Domaines d'utilisation

* Applications backend
* Logiciels complexes (ERP, systèmes métiers)
* Jeux vidéo
* Applications desktop et mobiles

---

## Fonctionnement

* Le programme est composé d'objets
* Chaque objet possède un état (attributs) et des comportements (méthodes)
* Les objets interagissent entre eux via des appels de méthodes
* Les classes servent de modèles pour créer des objets

---

## Concepts clés

* **Classe** — Modèle permettant de créer des objets
* **Objet** — Instance d'une classe
* **Encapsulation** — Cacher les données internes et exposer uniquement ce qui est nécessaire
* **Héritage** — Créer une classe à partir d'une autre
* **Polymorphisme** — Utiliser une même interface pour différents types
* **Abstraction** — Masquer la complexité et ne montrer que l'essentiel

---

## Exemple

```java
class Animal {
    void speak() {
        System.out.println("Some sound");
    }
}

class Dog extends Animal {
    void speak() {
        System.out.println("Bark");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal a = new Dog();
        a.speak(); // Bark (polymorphisme)
    }
}
```

---

## Structure / Architecture

* Classes métier (modèles de données)
* Objets instanciés à l'exécution
* Relations entre classes : association, composition, héritage
* Interfaces et classes abstraites pour les contrats

---

## Syntaxe et spécificités

* Dépend du langage (Java, Python, C++, C#…)
* Utilisation de classes et méthodes
* Notions d'accès (public, private, protected)
* Constructeurs pour initialiser les objets

---

## Relations entre objets

* **Association** — Lien simple entre objets
* **Agrégation** — Un objet contient une référence à un autre (lien faible)
* **Composition** — Un objet contient un autre et le gère (lien fort)
* **Héritage** — Relation parent/enfant entre classes

---

## Avantages

* Code plus organisé et lisible
* Réutilisation (DRY — Don't Repeat Yourself)
* Facilite la maintenance et l'évolution
* Modélisation proche du monde réel

---

## Inconvénients

* Complexité initiale pour les débutants
* Risque de sur-ingénierie
* Peut être moins performant que le procédural
* Mauvaise conception → code rigide et difficile à modifier

---

## Pièges courants

* Abus d'héritage (préférer la composition dans la plupart des cas)
* Classes trop grosses (God Object / God Class)
* Mauvaise encapsulation (exposer trop d'attributs)
* Sur-ingénierie inutile (trop d'abstractions)

---

## À ne pas confondre

* Classe vs objet (modèle vs instance)
* Héritage vs composition (relation "est un" vs "a un")
* Interface vs implémentation (contrat vs code concret)
* POO vs programmation procédurale

---

## Explication simplifiée

La POO consiste à organiser ton programme comme un ensemble d'objets qui interagissent, un peu comme dans la vie réelle (une voiture, un utilisateur, un produit). Chaque objet sait ce qu'il est et ce qu'il peut faire.

---

## Explication avancée

La POO repose sur des principes d'encapsulation, d'héritage et de polymorphisme permettant de structurer le code en abstractions manipulables. Elle favorise la séparation des responsabilités et s'intègre avec des principes de conception comme SOLID et les design patterns pour produire un code extensible et testable.

---

## Points critiques à retenir

* [CRITIQUE] La POO structure le code autour d'objets (état + comportement)
* [CRITIQUE] Encapsulation, héritage et polymorphisme sont les 3 piliers
* [IMPORTANT] Préférer la composition à l'héritage dans la majorité des cas
* [IMPORTANT] Bien concevoir les classes est essentiel (responsabilité unique)
* [PIÈGE] Sur-ingénierie fréquente chez les débutants
* [PIÈGE] God Object = classe qui fait tout → à éviter absolument
