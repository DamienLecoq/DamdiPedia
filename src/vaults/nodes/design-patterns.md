---
id: design-patterns
label: Design Patterns
category: concept
priority: medium
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:58:25.188Z'
updatedAt: '2026-04-14T17:58:25.188Z'
relations: []
resources:
  - type: documentation
    title: Refactoring Guru – Design Patterns
    url: 'https://refactoring.guru/design-patterns'
  - type: documentation
    title: SourceMaking – Design Patterns
    url: 'https://sourcemaking.com/design_patterns'
  - type: vidéo
    title: Fireship – 10 Design Patterns Explained
    url: 'https://www.youtube.com/watch?v=tv-_1er1mWI'
  - type: vidéo
    title: Derek Banas – Design Patterns Tutorial
    url: 'https://www.youtube.com/watch?v=vNHpsC5ng_E'
  - type: blog
    title: Baeldung – Design Patterns in Java
    url: 'https://www.baeldung.com/design-patterns-series'
  - type: livre
    title: Design Patterns – Gang of Four
    url: 'https://www.amazon.com/dp/0201633612'
  - type: livre
    title: Head First Design Patterns
    url: 'https://www.amazon.com/dp/0596007124'
  - type: autre
    title: Refactoring Guru – Exemples interactifs
    url: 'https://refactoring.guru/design-patterns/catalog'
---

## Résumé rapide

Les design patterns sont des solutions réutilisables à des problèmes récurrents de conception logicielle. Ils fournissent un vocabulaire commun et des modèles éprouvés pour structurer du code orienté objet de manière flexible et maintenable.

---

## Définition

Un design pattern est une solution générale et réutilisable à un problème courant de conception logicielle. Ce n'est pas du code prêt à l'emploi, mais un modèle de conception à adapter selon le contexte.

---

## Histoire

* Concept emprunté à l'architecture (Christopher Alexander, 1977)
* Appliqué au logiciel par le "Gang of Four" (GoF) en 1994
* Livre fondateur : "Design Patterns: Elements of Reusable Object-Oriented Software"
* 23 patterns classiques répartis en 3 catégories
* Depuis : nouveaux patterns émergents (Repository, DTO, CQRS…)

---

## Objectif

* Résoudre des problèmes de conception récurrents
* Fournir un vocabulaire commun entre développeurs
* Produire du code flexible et extensible
* Documenter des solutions éprouvées par l'expérience

---

## Domaines d'utilisation

* Développement orienté objet (Java, C#, C++)
* Architecture logicielle
* Frameworks (Spring utilise Factory, Proxy, Observer…)
* Tout projet nécessitant une conception robuste

---

## Les 3 catégories

* **Créationnels** — Comment créer des objets
* **Structurels** — Comment composer des objets
* **Comportementaux** — Comment les objets interagissent

---

## Concepts clés

### Créationnels
* **Singleton** — Une seule instance dans toute l'application
* **Factory Method** — Déléguer la création d'objets à une méthode
* **Builder** — Construire des objets complexes étape par étape
* **Prototype** — Cloner un objet existant

### Structurels
* **Adapter** — Convertir une interface en une autre
* **Decorator** — Ajouter des comportements dynamiquement
* **Facade** — Interface simplifiée vers un sous-système complexe
* **Proxy** — Intermédiaire contrôlant l'accès à un objet

### Comportementaux
* **Observer** — Notifier des objets quand un état change
* **Strategy** — Interchanger des algorithmes à l'exécution
* **Template Method** — Définir le squelette d'un algorithme
* **Iterator** — Parcourir une collection sans exposer sa structure

---

## Exemple

```java
// Pattern Strategy
interface SortStrategy {
    void sort(int[] data);
}

class QuickSort implements SortStrategy {
    public void sort(int[] data) { /* ... */ }
}

class MergeSort implements SortStrategy {
    public void sort(int[] data) { /* ... */ }
}

class Sorter {
    private SortStrategy strategy;

    Sorter(SortStrategy strategy) {
        this.strategy = strategy;
    }

    void sort(int[] data) {
        strategy.sort(data);
    }
}

// Utilisation : on change l'algorithme sans modifier Sorter
Sorter s = new Sorter(new QuickSort());
s.sort(data);
```

---

## Structure / Architecture

* Un pattern définit des **rôles** (interfaces, classes abstraites, classes concrètes)
* Les rôles interagissent selon un **diagramme de classes** précis
* Le pattern est **adaptable** : le code exact varie selon le contexte
* Les patterns se combinent souvent entre eux

---

## Avantages

* Solutions éprouvées et documentées
* Vocabulaire commun (dire "c'est un Observer" est plus clair qu'expliquer le mécanisme)
* Code plus flexible et extensible
* Facilite la communication en équipe

---

## Inconvénients

* Risque de sur-ingénierie (appliquer un pattern sans raison)
* Ajoutent de la complexité (plus de classes, plus d'indirections)
* Certains patterns deviennent obsolètes avec les évolutions des langages
* Courbe d'apprentissage pour les reconnaître et les appliquer

---

## Pièges courants

* Appliquer un pattern "parce que c'est bien" sans problème concret
* Singleton surutilisé (cache l'état global, complique les tests)
* Confondre pattern et implémentation (le pattern est un concept, pas du code)
* Ajouter de l'abstraction là où un code simple suffirait

---

## À ne pas confondre

* Design pattern vs algorithme (structure de code vs procédure de calcul)
* Pattern vs anti-pattern (bonne pratique vs mauvaise pratique)
* Pattern vs framework (modèle de conception vs bibliothèque complète)
* Singleton vs variable globale (contrôlé vs chaotique)

---

## Explication simplifiée

Les design patterns, ce sont des recettes de cuisine pour programmeurs : face à un problème connu, tu as une solution éprouvée. Tu n'inventes pas la roue, tu adaptes une solution qui a déjà marché des milliers de fois.

---

## Explication avancée

Les design patterns du GoF formalisent des solutions en termes de rôles et de collaborations entre objets. Ils exploitent les mécanismes fondamentaux de la POO (héritage, composition, polymorphisme) pour atteindre des propriétés architecturales : faible couplage, forte cohésion, ouverture à l'extension. Les frameworks modernes (Spring, Angular) intègrent nativement de nombreux patterns (IoC/DI, Proxy, Observer, Template Method).

---

## Points critiques à retenir

* [CRITIQUE] 3 catégories : créationnels, structurels, comportementaux
* [CRITIQUE] Ce sont des modèles de conception, pas du code prêt à copier
* [IMPORTANT] Les patterns les plus utiles au quotidien : Strategy, Observer, Factory, Builder
* [IMPORTANT] Spring utilise massivement les patterns (Factory, Proxy, Template Method)
* [PIÈGE] Sur-ingénierie : n'utiliser un pattern que s'il résout un problème réel
* [PIÈGE] Singleton = état global caché, à utiliser avec parcimonie
