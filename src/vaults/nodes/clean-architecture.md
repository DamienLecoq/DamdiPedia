---
id: clean-architecture
label: Clean Architecture
category: concept
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:58:13.615Z'
updatedAt: '2026-04-14T17:58:13.615Z'
relations:
  - target: solid
    type: related
    weight: 0.9
  - target: poo
    type: related
    weight: 0.7
resources:
  - type: livre
    title: Clean Architecture – Robert C. Martin
    url: 'https://www.goodreads.com/book/show/18043011-clean-architecture'
  - type: blog
    title: The Clean Architecture – Uncle Bob
    url: >-
      https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html
  - type: vidéo
    title: Clean Architecture Explained
    url: 'https://www.youtube.com/watch?v=Nsjsiz2A9mg'
---

## Résumé rapide

Clean Architecture est une approche proposée par Robert C. Martin qui organise le code en couches concentriques, avec les règles métier au centre et les détails techniques (UI, DB, frameworks) à l'extérieur.

---

## Définition

Clean Architecture est un modèle d'architecture logicielle qui sépare les préoccupations en cercles concentriques : entités, use cases, adapters, frameworks. La règle de dépendance impose que le code des cercles externes dépende uniquement du code des cercles internes.

---

## Histoire

* Formalisée par Robert C. Martin (Uncle Bob) en 2012
* Synthèse de Hexagonal (Cockburn), Onion (Palermo), DCI
* Popularisée par le livre "Clean Architecture" (2017)
* Adoptée massivement dans le monde .NET et Java
* Référence pour les architectures testables

---

## Objectif

* Indépendance du framework
* Testabilité des règles métier sans UI ni DB
* Indépendance de la base de données
* Indépendance de l'UI
* Indépendance des agents externes

---

## Domaines d'utilisation

* Applications entreprise long-terme
* Projets avec logique métier complexe
* Codebases devant survivre à plusieurs frameworks
* Équipes valorisant la testabilité

---

## Fonctionnement

* **Entities** — Règles métier d'entreprise
* **Use Cases** — Règles métier applicatives
* **Interface Adapters** — Controllers, presenters, gateways
* **Frameworks & Drivers** — DB, UI, web, devices
* Règle de dépendance : vers l'intérieur uniquement

---

## Concepts clés

* **Dependency Rule** — Les dépendances pointent vers l'intérieur
* **Entity** — Objet métier pur
* **Use Case** — Orchestration d'entities
* **Port** — Interface définie par la couche interne
* **Adapter** — Implémentation de l'interface
* **Boundary** — Frontière entre couches

---

## Exemple

```typescript
// Entity (inner)
class Order {
  constructor(public items: Item[]) {}
  total() { return this.items.reduce((s, i) => s + i.price, 0); }
}

// Use case (inner, depends on port)
interface OrderRepo { save(o: Order): Promise<void>; }

class PlaceOrder {
  constructor(private repo: OrderRepo) {}
  async execute(items: Item[]) {
    const order = new Order(items);
    await this.repo.save(order);
  }
}

// Adapter (outer, implements port)
class PostgresOrderRepo implements OrderRepo {
  async save(o: Order) { /* SQL */ }
}
```

---

## Avantages

* Tests unitaires faciles (pas de mocks framework)
* Framework remplaçable
* Base de données remplaçable
* Code métier clair et isolé
* Longévité du code

---

## Inconvénients

* Boilerplate important
* Courbe d'apprentissage
* Sur-ingénierie pour petits projets
* Mapping entre couches verbeux

---

## Pièges courants

* Faire dépendre l'entity du framework ORM
* Use cases qui connaissent l'UI
* Trop de couches pour un CRUD simple
* Mélanger Clean Arch et DDD sans maîtrise

---

## À ne pas confondre

* Clean Architecture vs Hexagonal (variante proche)
* Clean Architecture vs MVC (pas équivalent)
* Clean Code vs Clean Architecture (code vs structure)

---

## Explication simplifiée

Imagine ton code comme un oignon : au cœur, tes règles métier pures. Autour, les cas d'usage. Encore autour, les adaptateurs. Dehors, les frameworks. Les couches extérieures dépendent des intérieures, jamais l'inverse. Tu peux changer de framework sans toucher au cœur.

---

## Explication avancée

Clean Architecture applique le Dependency Inversion Principle à l'échelle de l'architecture : les couches internes définissent des interfaces (ports) que les couches externes implémentent (adapters). Les entities encapsulent les invariants métier, les use cases orchestrent les entities via des ports. Le flux de contrôle va vers l'extérieur, mais les dépendances de compilation vont vers l'intérieur, grâce à l'injection de dépendances.

---

## Points critiques à retenir

* [CRITIQUE] Dépendances vers l'intérieur uniquement
* [CRITIQUE] Entities ne dépendent d'aucun framework
* [IMPORTANT] Use cases orchestrent, n'implémentent pas l'I/O
* [IMPORTANT] DI pour injecter les adapters
* [PIÈGE] Sur-ingénierie pour les petits projets
