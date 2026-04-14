---
id: domain-driven-design
label: Domain-Driven Design
category: concept
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:58:29.191Z'
updatedAt: '2026-04-14T17:58:29.191Z'
relations:
  - target: microservices
    type: related
    weight: 0.8
  - target: poo
    type: related
    weight: 0.7
resources:
  - type: livre
    title: Domain-Driven Design – Eric Evans
    url: 'https://www.goodreads.com/book/show/179133.Domain_Driven_Design'
  - type: livre
    title: Implementing Domain-Driven Design – Vaughn Vernon
    url: >-
      https://www.goodreads.com/book/show/15756865-implementing-domain-driven-design
  - type: blog
    title: DDD Community
    url: 'https://www.domainlanguage.com/ddd/'
---

## Résumé rapide

Domain-Driven Design (DDD) est une approche de conception logicielle introduite par Eric Evans qui place le domaine métier au cœur de l'architecture, en collaboration étroite entre développeurs et experts métier.

---

## Définition

DDD est une méthodologie qui modélise le logiciel autour d'un domaine métier complexe, en utilisant un langage omniprésent (ubiquitous language), des contextes délimités (bounded contexts) et des patterns tactiques (entities, value objects, aggregates).

---

## Histoire

* Introduit par Eric Evans en 2003 dans son "Blue Book"
* Complété par Vaughn Vernon avec le "Red Book" en 2013
* Popularisé avec la montée des microservices
* Devient référence pour décomposer les systèmes complexes
* Fondement théorique des architectures orientées événements

---

## Objectif

* Aligner le code sur le métier
* Gérer la complexité des domaines riches
* Faciliter la communication devs ↔ métier
* Décomposer les systèmes en contextes cohérents

---

## Domaines d'utilisation

* Systèmes métier complexes (finance, santé, logistique)
* Microservices (un service = un bounded context)
* Refactoring de monolithes legacy
* Projets long-terme évolutifs

---

## Fonctionnement

* **Strategic Design** — Découpage en bounded contexts
* **Tactical Design** — Patterns dans un context
* Ubiquitous language partagé équipe/métier
* Context map pour les relations inter-contexts
* Event storming pour découvrir le domaine

---

## Concepts clés

* **Bounded Context** — Frontière sémantique d'un modèle
* **Ubiquitous Language** — Vocabulaire partagé
* **Entity** — Objet avec identité
* **Value Object** — Objet immuable sans identité
* **Aggregate** — Cluster cohérent avec racine
* **Domain Event** — Fait métier significatif
* **Repository** — Abstraction de persistance

---

## Exemple

```typescript
// Value Object
class Money {
  constructor(public amount: number, public currency: string) {
    Object.freeze(this);
  }
  add(other: Money): Money {
    if (other.currency !== this.currency) throw new Error();
    return new Money(this.amount + other.amount, this.currency);
  }
}

// Aggregate Root
class Order {
  private items: OrderItem[] = [];
  private constructor(public readonly id: OrderId) {}

  addItem(product: Product, qty: number) {
    if (this.items.length >= 100) throw new Error('Too many items');
    this.items.push(new OrderItem(product, qty));
  }

  total(): Money {
    return this.items.reduce((acc, i) => acc.add(i.subtotal()), new Money(0, 'EUR'));
  }
}
```

---

## Avantages

* Code aligné sur le métier
* Communication facilitée avec les experts
* Décomposition naturelle en microservices
* Testabilité de la logique métier
* Longévité face aux changements

---

## Inconvénients

* Courbe d'apprentissage élevée
* Surcoût pour domaines simples (CRUD)
* Nécessite accès aux experts métier
* Parfois mal compris et mal appliqué

---

## Pièges courants

* Appliquer DDD à un CRUD simple
* Aggregates trop gros (performance)
* Ignorer le strategic design (bounded contexts)
* Anemic domain model (logique dans les services)

---

## À ne pas confondre

* DDD vs Clean Architecture (complémentaires)
* Strategic vs Tactical DDD
* Aggregate vs Entity (le premier contient des entities)

---

## Explication simplifiée

DDD c'est coder comme parlent les experts métier. Si le banquier dit "compte", "débit", "virement", ton code dit exactement ça — pas "User" et "Transaction". Et tu découpes ton système en zones (bounded contexts) où chaque mot a un sens précis.

---

## Explication avancée

DDD distingue le core domain (l'avantage compétitif) des sous-domaines supporting et generic. Les bounded contexts isolent des modèles qui peuvent être contradictoires (un "Customer" en ventes ≠ "Customer" en support). Les aggregates garantissent les invariants métier via une racine unique. Les domain events propagent les changements entre contexts, souvent via un event bus, ce qui facilite les architectures event-driven et CQRS.

---

## Points critiques à retenir

* [CRITIQUE] Ubiquitous language partagé avec le métier
* [CRITIQUE] Un bounded context = un modèle cohérent
* [IMPORTANT] Aggregates avec racine, invariants garantis
* [IMPORTANT] Value objects immuables
* [PIÈGE] DDD tactique sans strategic design = dette
