---
id: java
label: Java
category: langage
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-11T08:48:26.970Z'
updatedAt: '2026-04-11T08:48:26.970Z'
relations:
  - target: poo
    type: implements
    weight: 0.9
  - target: docker
    type: deployed_with
    weight: 0.6
  - target: linux
    type: runs_on
    weight: 0.5
  - target: http
    type: uses
    weight: 0.5
resources:
  - type: documentation
    title: Documentation officielle Java (Oracle)
    url: 'https://docs.oracle.com/en/java/javase/'
  - type: documentation
    title: Java Tutorials (Oracle)
    url: 'https://docs.oracle.com/javase/tutorial/'
  - type: vidéo
    title: Java Full Course – freeCodeCamp
    url: 'https://www.youtube.com/watch?v=grEKMHGYyns'
  - type: vidéo
    title: Java Programming – Programming with Mosh
    url: 'https://www.youtube.com/watch?v=eIrMbAQSU34'
  - type: blog
    title: Baeldung (très complet sur Java/Spring)
    url: 'https://www.baeldung.com/'
  - type: blog
    title: Dev.to (articles variés)
    url: 'https://dev.to/t/java'
  - type: cours
    title: Java Programming (Coursera)
    url: 'https://www.coursera.org/specializations/java-programming'
  - type: cours
    title: Udemy – Java Masterclass
    url: 'https://www.udemy.com/course/java-the-complete-java-developer-course/'
  - type: livre
    title: Effective Java – Joshua Bloch
    url: 'https://www.amazon.com/dp/0134685997'
  - type: livre
    title: Head First Java – Kathy Sierra
    url: 'https://www.amazon.com/dp/1491910771'
  - type: autre
    title: LeetCode
    url: 'https://leetcode.com/'
  - type: autre
    title: HackerRank
    url: 'https://www.hackerrank.com/domains/java'
  - type: autre
    title: JDoodle – Playground en ligne
    url: 'https://www.jdoodle.com/online-java-compiler'
---

## Résumé rapide

Java est un langage très utilisé dans les systèmes backend et les applications d'entreprise. Il est reconnu pour sa robustesse, sa portabilité grâce à la JVM et son énorme écosystème, mais il peut être plus verbeux et complexe que des langages modernes.

---

## Définition

Java est un langage de programmation orienté objet, compilé en bytecode et exécuté sur une machine virtuelle (JVM), permettant de faire fonctionner un même programme sur différents systèmes.

---

## Histoire

* Créé en 1995 par Sun Microsystems (James Gosling)
* Objectif : "Write once, run anywhere"
* Racheté par Oracle en 2010
* Largement adopté dans les grandes entreprises
* Toujours très utilisé aujourd'hui malgré la concurrence

---

## Objectif

* Construire des applications robustes et maintenables
* Permettre la portabilité entre systèmes
* Fournir un cadre stable pour des applications complexes

---

## Domaines d'utilisation

* Applications backend (API REST)
* Applications d'entreprise (banque, assurance…)
* Android (historiquement)
* Big Data (ex : Hadoop)
* Systèmes distribués

---

## Fonctionnement

* Code compilé en bytecode (.class)
* Exécution via la JVM
* Garbage Collector pour la mémoire
* Typage statique (types vérifiés à la compilation)
* Chargement dynamique des classes

---

## Concepts clés

* Programmation orientée objet (encapsulation, héritage, polymorphisme)
* JVM (Java Virtual Machine)
* Garbage Collection
* Exceptions (checked / unchecked)
* Packages et modularité

---

## Exemple

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}
```

---

## Structure / Architecture

* Classes (unité de base)
* Interfaces (contrats)
* Packages (organisation)
* Méthodes (comportement)
* Attributs (état)

---

## Syntaxe et spécificités

* Typage statique strict
* Verbosité importante (beaucoup de code "boilerplate")
* Tout repose sur des classes
* Point d'entrée obligatoire : main()
* Utilisation fréquente de getters/setters

---

## Gestion de la mémoire

* Automatique via Garbage Collector
* Basée sur le heap et la stack
* Pas de libération manuelle
* Risques : fuites mémoire logiques (références conservées)

---

## Concurrence

* Threads natifs (Thread, Runnable)
* Synchronisation (synchronized)
* Problèmes possibles : deadlocks, race conditions
* Solutions modernes : ExecutorService, CompletableFuture

---

## Avantages

* Portabilité (JVM)
* Écosystème énorme (Spring, Hibernate…)
* Bonne performance globale
* Typage fort → moins d'erreurs runtime
* Stabilité et maturité

---

## Inconvénients

* Verbosité
* Courbe d'apprentissage pour débutants
* Démarrage lent (JVM)
* Code parfois sur-ingénieré

---

## Pièges courants

* Mauvaise gestion des exceptions
* NullPointerException fréquentes
* Mauvaise utilisation des threads
* Confusion entre == et equals()
* Code trop complexe inutilement

---

## À ne pas confondre

* JDK vs JRE vs JVM
* == vs equals()
* Compilation vs exécution JVM
* Thread vs process

---

## Explication simplifiée

Java est un langage strict qui oblige à bien structurer son code. En échange, il permet de créer des programmes solides qui fonctionnent sur presque tous les ordinateurs.

---

## Explication avancée

Java compile le code source en bytecode exécuté par la JVM, ce qui permet une abstraction du système. La gestion mémoire repose sur un garbage collector, et le typage statique permet de détecter les erreurs à la compilation. La JVM inclut aussi des optimisations comme le JIT (Just-In-Time compilation).

---

## Points critiques à retenir

* [CRITIQUE] Java repose sur la JVM pour la portabilité
* [CRITIQUE] Langage fortement typé et orienté objet
* [IMPORTANT] Gestion mémoire automatique (GC)
* [IMPORTANT] Écosystème très riche
* [PIÈGE] == vs equals()
* [PIÈGE] NullPointerException très fréquente
