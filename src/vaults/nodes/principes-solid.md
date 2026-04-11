---
id: principes-solid
label: Principes SOLID
category: concept
priority: medium
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-11T10:01:44.850Z'
updatedAt: '2026-04-11T10:01:44.850Z'
relations:
  - target: poo
    type: extends
    weight: 0.9
  - target: design-patterns
    type: related
    weight: 0.8
  - target: java
    type: used_by
    weight: 0.6
resources:
  - type: documentation
    title: Wikipedia – SOLID
    url: 'https://fr.wikipedia.org/wiki/SOLID_(informatique)'
  - type: vidéo
    title: freeCodeCamp – SOLID Principles
    url: 'https://www.youtube.com/watch?v=_jDNAf3CzeY'
  - type: vidéo
    title: Fireship – SOLID in 100 Seconds
    url: 'https://www.youtube.com/watch?v=q1qKv5TBaOA'
  - type: blog
    title: Baeldung – SOLID Principles in Java
    url: 'https://www.baeldung.com/solid-principles'
  - type: blog
    title: DigitalOcean – SOLID Explained
    url: >-
      https://www.digitalocean.com/community/conceptual-articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design
  - type: livre
    title: Clean Architecture – Robert C. Martin
    url: 'https://www.amazon.com/dp/0134494164'
  - type: livre
    title: 'Agile Principles, Patterns and Practices – Robert C. Martin'
    url: 'https://www.amazon.com/dp/0131857258'
---

## Résumé rapide

SOLID est un ensemble de 5 principes de conception orientée objet qui guident la création de code maintenable, extensible et robuste. Formulés par Robert C. Martin (Uncle Bob), ils sont la base de la bonne conception logicielle.

---

## Définition

SOLID est un acronyme représentant 5 principes de design en programmation orientée objet : Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, et Dependency Inversion.

---

## Histoire

* Principes formulés par Robert C. Martin dans les années 2000
* Acronyme "SOLID" inventé par Michael Feathers
* Issus de décennies d'expérience en conception logicielle
* Aujourd'hui enseignés comme fondamentaux de la POO
* Intégrés dans les frameworks modernes (Spring, Angular)

---

## Objectif

* Produire du code facile à maintenir et à faire évoluer
* Réduire le couplage entre les modules
* Faciliter les tests unitaires
* Éviter le code rigide et fragile

---

## Domaines d'utilisation

* Tout projet orienté objet (Java, C#, Python, C++)
* Architecture logicielle
* Code reviews et bonnes pratiques d'équipe
* Refactoring de code existant

---

## Les 5 principes

### S — Single Responsibility Principle (SRP)
Une classe ne doit avoir qu'**une seule raison de changer**. Elle doit faire une seule chose et la faire bien.

### O — Open/Closed Principle (OCP)
Une classe doit être **ouverte à l'extension** mais **fermée à la modification**. On ajoute du comportement sans modifier le code existant.

### L — Liskov Substitution Principle (LSP)
Un objet d'une sous-classe doit pouvoir **remplacer** un objet de sa classe parente sans casser le programme.

### I — Interface Segregation Principle (ISP)
Mieux vaut **plusieurs interfaces spécifiques** qu'une seule interface générale. Un client ne doit pas dépendre de méthodes qu'il n'utilise pas.

### D — Dependency Inversion Principle (DIP)
Les modules de haut niveau ne doivent pas dépendre des modules de bas niveau. Les deux doivent dépendre d'**abstractions** (interfaces).

---

## Exemple

```java
// ❌ Violation SRP : une classe qui fait tout
class UserManager {
    void createUser() { /* ... */ }
    void sendEmail() { /* ... */ }
    void generateReport() { /* ... */ }
}

// ✅ SRP respecté : chaque classe a une responsabilité
class UserService {
    void createUser() { /* ... */ }
}
class EmailService {
    void sendEmail() { /* ... */ }
}
class ReportService {
    void generateReport() { /* ... */ }
}

// ✅ DIP : dépendre d'une abstraction
interface UserRepository {
    User findById(int id);
}

class UserService {
    private final UserRepository repo; // interface, pas implémentation
    UserService(UserRepository repo) { this.repo = repo; }
}
```

---

## Structure / Architecture

* SRP → classes petites et focalisées
* OCP → extension via interfaces et polymorphisme
* LSP → hiérarchies d'héritage cohérentes
* ISP → interfaces granulaires
* DIP → injection de dépendances via abstractions

---

## Avantages

* Code plus modulaire et testable
* Facilite l'évolution sans casser l'existant
* Réduit la complexité des classes
* Encourage la composition plutôt que l'héritage
* Code plus lisible et compréhensible

---

## Inconvénients

* Peut mener à trop de petites classes (over-engineering)
* Ajoute de l'indirection (plus d'interfaces et d'abstractions)
* Difficile à appliquer rétroactivement sur du code legacy
* Nécessite de l'expérience pour trouver le bon équilibre

---

## Pièges courants

* Appliquer SOLID de manière dogmatique sans réfléchir au contexte
* Créer des interfaces avec une seule implémentation "au cas où"
* Confondre SRP avec "une classe = une méthode"
* Ajouter de l'abstraction là où un code simple suffit

---

## À ne pas confondre

* SOLID vs KISS (principes de design vs simplicité)
* SRP vs séparation des couches (responsabilité vs architecture)
* DIP vs DI (principe vs implémentation technique)
* OCP vs héritage (extension peut se faire par composition)

---

## Explication simplifiée

SOLID, ce sont 5 règles pour écrire du code propre : chaque classe fait une seule chose (S), tu peux ajouter des fonctionnalités sans toucher au code existant (O), les sous-classes se comportent comme attendu (L), les interfaces sont petites et ciblées (I), et tu dépends d'abstractions plutôt que d'implémentations concrètes (D).

---

## Explication avancée

Les principes SOLID formalisent des heuristiques de conception qui réduisent le couplage et augmentent la cohésion. Le SRP limite la surface d'impact des changements. L'OCP et le DIP favorisent l'extensibilité par polymorphisme et injection de dépendances. Le LSP garantit la substituabilité dans les hiérarchies. L'ISP évite les dépendances inutiles. Ensemble, ils produisent un code dont les modules sont indépendants, testables et évolutifs.

---

## Points critiques à retenir

* [CRITIQUE] S = une classe, une responsabilité, une raison de changer
* [CRITIQUE] D = dépendre d'abstractions (interfaces), pas d'implémentations concrètes
* [IMPORTANT] O = ajouter du comportement sans modifier le code existant
* [IMPORTANT] SOLID est un guide, pas un dogme — l'excès d'abstraction est un anti-pattern
* [PIÈGE] Appliquer SOLID sans besoin réel → sur-ingénierie
* [PIÈGE] Ne pas confondre SRP avec "une seule méthode par classe"
