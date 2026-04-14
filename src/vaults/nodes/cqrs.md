---
id: cqrs
label: CQRS
category: concept
priority: medium
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:58:18.702Z'
updatedAt: '2026-04-14T17:58:18.702Z'
relations:
  - target: event-driven-architecture
    type: related
    weight: 0.8
  - target: domain-driven-design
    type: related
    weight: 0.7
resources:
  - type: blog
    title: Martin Fowler – CQRS
    url: 'https://martinfowler.com/bliki/CQRS.html'
  - type: documentation
    title: Microsoft – CQRS Pattern
    url: 'https://learn.microsoft.com/en-us/azure/architecture/patterns/cqrs'
  - type: vidéo
    title: CQRS Explained
    url: 'https://www.youtube.com/watch?v=dLKLT2j_DIg'
---

## Résumé rapide

CQRS (Command Query Responsibility Segregation) est un pattern qui sépare les opérations de lecture (queries) et d'écriture (commands) en deux modèles distincts, potentiellement avec des stores différents.

---

## Définition

CQRS sépare le modèle d'écriture (commands qui modifient l'état) du modèle de lecture (queries qui retournent des données). Chaque côté peut être optimisé indépendamment, avec des schémas, bases et technologies différents.

---

## Histoire

* Formalisé par Greg Young vers 2010
* Inspiré de la séparation Command/Query de Bertrand Meyer
* Popularisé avec Event Sourcing et DDD
* Adopté dans les systèmes high-throughput
* Base de nombreuses architectures microservices

---

## Objectif

* Optimiser lecture et écriture séparément
* Scaler read et write indépendamment
* Simplifier chaque modèle (pas de compromis)
* Préparer l'event sourcing et l'audit

---

## Domaines d'utilisation

* Systèmes avec lectures massives vs écritures rares
* Dashboards et reporting temps réel
* Applications CRUD complexes avec reads optimisées
* Architectures event-sourced

---

## Fonctionnement

* **Command side** — Valide et applique les changements
* **Query side** — Vues dénormalisées optimisées
* Projections pour matérialiser les reads depuis les events
* Cohérence éventuelle entre les deux côtés
* Bus de commandes et bus de queries séparés

---

## Concepts clés

* **Command** — Intention de modifier (impératif)
* **Query** — Demande de lecture (ne modifie rien)
* **Command Handler** — Exécute la command
* **Read Model** — Vue dénormalisée
* **Projection** — Construit le read model depuis events
* **Eventual Consistency** — Read peut être en retard

---

## Exemple

```typescript
// Command side
class CreateOrderCommand {
  constructor(public customerId: string, public items: Item[]) {}
}

class CreateOrderHandler {
  async handle(cmd: CreateOrderCommand) {
    const order = Order.create(cmd.customerId, cmd.items);
    await this.repo.save(order);
    await this.eventBus.publish(new OrderCreatedEvent(order));
  }
}

// Query side (dénormalisé)
class OrderSummaryView {
  orderId: string;
  customerName: string;
  totalAmount: number;
  itemCount: number;
}

class OrderSummaryProjection {
  on(event: OrderCreatedEvent) {
    this.readDb.upsert('order_summary', { /* ... */ });
  }
}
```

---

## Avantages

* Optimisation indépendante des deux côtés
* Scalabilité différenciée
* Modèles plus simples chacun
* Prépare l'event sourcing
* Supporte plusieurs read models pour un write model

---

## Inconvénients

* Complexité accrue (2 modèles à maintenir)
* Cohérence éventuelle à gérer
* Overhead pour les CRUD simples
* Duplication de données
* Courbe d'apprentissage

---

## Pièges courants

* Appliquer CQRS sur un CRUD trivial
* Oublier que les reads peuvent être en retard
* Mélanger commands et queries dans le même handler
* Ne pas gérer les échecs de projection

---

## À ne pas confondre

* CQRS vs Event Sourcing (souvent combinés mais distincts)
* CQRS vs CRUD (séparation vs unification)
* Command vs Event (intention vs fait)

---

## Explication simplifiée

Imagine un restaurant : la cuisine (write) et la salle (read) sont deux mondes. La cuisine reçoit les commandes et prépare, la salle montre ce qui est prêt sur un tableau. Les deux sont optimisés pour leur job, et la salle peut être légèrement en retard sur la cuisine.

---

## Explication avancée

CQRS devient puissant combiné avec Event Sourcing : les commands produisent des events stockés comme source de vérité, et les projections construisent des read models multiples (SQL, Elasticsearch, cache) à partir de ces events. Cela permet de créer de nouveaux read models a posteriori en rejouant l'historique. La cohérence éventuelle impose de gérer les cas où le client lit ses propres écritures avant que la projection ne soit à jour (read-your-writes).

---

## Points critiques à retenir

* [CRITIQUE] Cohérence éventuelle entre write et read
* [CRITIQUE] Ne pas appliquer sur des CRUD simples (sur-ingénierie)
* [IMPORTANT] Projections idempotentes
* [IMPORTANT] Souvent combiné avec Event Sourcing
* [PIÈGE] Read-your-writes non trivial
