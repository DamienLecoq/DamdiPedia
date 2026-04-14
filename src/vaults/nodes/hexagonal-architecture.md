---
id: hexagonal-architecture
label: Hexagonal Architecture
category: concept
priority: medium
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:58:53.058Z'
updatedAt: '2026-04-14T17:58:53.058Z'
relations:
  - target: clean-architecture
    type: related
    weight: 0.9
  - target: solid
    type: related
    weight: 0.7
resources:
  - type: blog
    title: Alistair Cockburn – Hexagonal Architecture
    url: 'https://alistair.cockburn.us/hexagonal-architecture/'
  - type: vidéo
    title: Hexagonal Architecture Explained
    url: 'https://www.youtube.com/watch?v=fGaJHEgonKg'
  - type: blog
    title: Netflix – Ready for changes with Hexagonal Architecture
    url: >-
      https://netflixtechblog.com/ready-for-changes-with-hexagonal-architecture-b315ec967749
---

## Résumé rapide

L'architecture hexagonale (Ports & Adapters), proposée par Alistair Cockburn, isole le cœur métier des détails techniques via des ports (interfaces) et des adapters (implémentations), rendant l'application testable et indépendante des technologies.

---

## Définition

L'architecture hexagonale place la logique métier au centre d'un hexagone. Les ports (interfaces) définissent les interactions avec l'extérieur, et les adapters implémentent ces ports pour chaque technologie concrète (web, DB, message queue).

---

## Histoire

* Proposée par Alistair Cockburn en 2005
* Inspirée par DIP (Dependency Inversion Principle)
* Précède Onion Architecture et Clean Architecture
* Popularisée par le monde DDD et microservices
* Référence pour les architectures testables

---

## Objectif

* Isoler la logique métier de l'infrastructure
* Permettre de changer les adapters sans toucher le cœur
* Rendre les tests unitaires triviaux
* Supporter plusieurs "faces" d'une même application

---

## Domaines d'utilisation

* Applications avec logique métier riche
* Microservices nécessitant testabilité
* Systèmes devant supporter plusieurs UIs (web, API, CLI)
* Projets long-terme évolutifs

---

## Fonctionnement

* **Cœur (domain)** — Logique métier pure
* **Ports primaires** — Ce que l'appli offre (use cases)
* **Ports secondaires** — Ce dont l'appli a besoin (repos)
* **Adapters primaires** — REST, CLI, GraphQL, tests
* **Adapters secondaires** — Postgres, Kafka, Redis

---

## Concepts clés

* **Port** — Interface définie par le cœur
* **Adapter** — Implémentation d'un port
* **Driver (primaire)** — Déclenche le use case
* **Driven (secondaire)** — Est appelé par le use case
* **Inversion de dépendance** — Adapter dépend du port
* **Tests** — Adapters remplacés par des fakes

---

## Exemple

```typescript
// Port secondaire (défini par le domaine)
interface OrderRepository {
  save(order: Order): Promise<void>;
  findById(id: string): Promise<Order | null>;
}

// Port primaire (use case)
interface PlaceOrderUseCase {
  execute(customerId: string, items: Item[]): Promise<Order>;
}

// Cœur métier (indépendant de tout)
class PlaceOrderService implements PlaceOrderUseCase {
  constructor(private repo: OrderRepository) {}
  async execute(customerId: string, items: Item[]) {
    const order = Order.create(customerId, items);
    await this.repo.save(order);
    return order;
  }
}

// Adapter secondaire (Postgres)
class PgOrderRepository implements OrderRepository {
  async save(o: Order) { /* SQL */ }
  async findById(id: string) { /* SQL */ }
}

// Adapter primaire (Express)
app.post('/orders', async (req, res) => {
  const order = await useCase.execute(req.body.customerId, req.body.items);
  res.json(order);
});
```

---

## Avantages

* Testabilité extrême (fakes à la place des adapters)
* Indépendance technologique du cœur
* Plusieurs adapters pour une même appli (web + CLI)
* Refactorings infra sans toucher le métier
* Alignement avec DDD

---

## Inconvénients

* Boilerplate important
* Sur-ingénierie pour les CRUD simples
* Courbe d'apprentissage
* Parfois confondu avec Clean Architecture

---

## Pièges courants

* Ports qui fuient des détails d'infrastructure
* Cœur qui importe une lib ORM
* Trop de ports (granularité excessive)
* Anemic domain model

---

## À ne pas confondre

* Hexagonal vs Clean Architecture (très proches)
* Port vs Adapter (interface vs implémentation)
* Primaire vs secondaire (entrant vs sortant)

---

## Explication simplifiée

Imagine ton code métier au centre d'un hexagone. Autour, il y a des trous (les ports). Dans chaque trou, tu peux brancher différentes choses (adapters) : une interface web, une base Postgres, un test unitaire. Tu peux débrancher Postgres et brancher MongoDB sans toucher au cœur.

---

## Explication avancée

L'architecture hexagonale applique le Dependency Inversion Principle : au lieu que le domaine dépende de l'infra, l'infra dépend des ports définis par le domaine. Cette inversion permet aux tests de remplacer l'infrastructure par des fakes (in-memory repository, stub HTTP). En pratique, elle chevauche Clean Architecture et Onion Architecture — elles partagent le même esprit avec des nuances de terminologie et de nombre de couches. Netflix et de nombreuses entreprises l'ont adoptée pour leurs microservices critiques.

---

## Points critiques à retenir

* [CRITIQUE] Ports définis par le domaine, jamais l'inverse
* [CRITIQUE] Cœur sans aucune dépendance framework
* [IMPORTANT] Tests unitaires avec fakes in-memory
* [IMPORTANT] Plusieurs adapters pour une même appli
* [PIÈGE] Ne pas confondre ports et DAOs techniques
