---
id: strategy
label: Strategy (Pattern)
category: concept
priority: medium
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T18:00:09.551Z'
updatedAt: '2026-04-14T18:00:09.551Z'
relations:
  - target: design-patterns
    type: part_of
    weight: 0.95
  - target: poo
    type: related
    weight: 0.7
resources:
  - type: blog
    title: Refactoring Guru – Strategy
    url: 'https://refactoring.guru/design-patterns/strategy'
  - type: livre
    title: Design Patterns (GoF)
    url: 'https://www.goodreads.com/book/show/85009.Design_Patterns'
  - type: vidéo
    title: Strategy Pattern – Christopher Okhravi
    url: 'https://www.youtube.com/watch?v=v9ejT8FO-7I'
---

## Résumé rapide

Strategy est un pattern comportemental qui définit une famille d'algorithmes interchangeables, encapsulés dans des objets distincts, permettant de faire varier l'algorithme indépendamment du client qui l'utilise.

---

## Définition

Le pattern Strategy extrait des variantes d'un algorithme dans des classes séparées implémentant une interface commune. Le client détient une référence à cette interface et peut changer la stratégie à l'exécution.

---

## Histoire

* Décrit dans "Design Patterns" du Gang of Four (1994)
* Pattern comportemental fondamental
* Omniprésent en pratique (tri, validation, pricing)
* Base du polymorphisme en conception
* Remplacé par des lambdas dans les langages modernes

---

## Objectif

* Éliminer les longues chaînes `if/else`
* Permettre de changer d'algorithme à runtime
* Isoler chaque variante dans sa classe
* Respecter le principe Open/Closed
* Faciliter l'ajout de nouvelles stratégies

---

## Domaines d'utilisation

* Algorithmes de tri, compression, chiffrement
* Calculs de prix et remises
* Validation de formulaires
* Règles de routage
* Politiques d'authentification

---

## Fonctionnement

* **Strategy** — Interface commune aux variantes
* **ConcreteStrategy** — Chaque implémentation
* **Context** — Détient une référence à Strategy
* Le client injecte la stratégie choisie

---

## Concepts clés

* **Strategy interface** — Contrat commun
* **Concrete strategy** — Algorithme spécifique
* **Context** — Utilise la stratégie
* **Runtime swap** — Changement à l'exécution
* **Lambda alternative** — Fonction de première classe

---

## Exemple

```typescript
// Interface stratégie
interface ShippingStrategy {
  calculate(weight: number, distance: number): number;
}

// Implémentations
class StandardShipping implements ShippingStrategy {
  calculate(w: number, d: number) { return 5 + w * 0.5; }
}

class ExpressShipping implements ShippingStrategy {
  calculate(w: number, d: number) { return 15 + w * 1 + d * 0.1; }
}

class FreeShipping implements ShippingStrategy {
  calculate() { return 0; }
}

// Context
class Order {
  constructor(private shipping: ShippingStrategy) {}
  setShipping(s: ShippingStrategy) { this.shipping = s; }
  total(weight: number, distance: number) {
    return this.shipping.calculate(weight, distance);
  }
}

// Usage
const order = new Order(new StandardShipping());
if (isPremium) order.setShipping(new FreeShipping());
```

---

## Avantages

* Élimine les if/else complexes
* Ajout facile de nouvelles stratégies (Open/Closed)
* Chaque algo est testable isolément
* Runtime swap possible
* Respecte le SRP

---

## Inconvénients

* Augmente le nombre de classes
* Le client doit connaître les stratégies
* Surcoût pour des cas simples
* Parfois remplaçable par une lambda

---

## Pièges courants

* Créer une stratégie par branche d'un `if` trivial
* Stratégies avec signatures différentes (viole l'interface)
* Trop de stratégies → refactoring vers table de dispatch
* Oublier que dans les langages modernes, une fonction suffit souvent

---

## À ne pas confondre

* Strategy vs State (algo vs état interne)
* Strategy vs Template Method (composition vs héritage)
* Strategy vs Command (algo vs requête)

---

## Explication simplifiée

Tu veux calculer le coût de livraison, mais ça dépend : standard, express, gratuit pour les premium… Au lieu d'un gros `if`, tu crées une classe par méthode de livraison, chacune avec son calcul, et tu choisis laquelle utiliser selon le client.

---

## Explication avancée

Strategy favorise la composition sur l'héritage : le Context délègue à un Strategy injecté plutôt que d'hériter pour spécialiser. Dans les langages fonctionnels ou modernes (JS, Python, Kotlin), une simple fonction de première classe peut remplir le rôle sans cérémonie OOP. Spring utilise massivement Strategy via l'injection de dépendances. La frontière avec State est subtile : Strategy encapsule un algorithme, State encapsule un comportement conditionné par l'état interne de l'objet.

---

## Points critiques à retenir

* [CRITIQUE] Interface commune stricte entre stratégies
* [CRITIQUE] Injection depuis l'extérieur, pas de new interne
* [IMPORTANT] Permet de respecter Open/Closed
* [IMPORTANT] Lambda souvent suffisante en moderne
* [PIÈGE] Ne pas sur-appliquer pour des cas triviaux
