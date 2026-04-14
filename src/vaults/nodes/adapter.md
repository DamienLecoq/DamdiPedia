---
id: adapter
label: Adapter (Pattern)
category: concept
priority: medium
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:57:54.831Z'
updatedAt: '2026-04-14T17:57:54.831Z'
relations:
  - target: design-patterns
    type: part_of
    weight: 0.95
  - target: poo
    type: related
    weight: 0.7
resources:
  - type: blog
    title: Refactoring Guru – Adapter
    url: 'https://refactoring.guru/design-patterns/adapter'
  - type: livre
    title: Design Patterns (GoF)
    url: 'https://www.goodreads.com/book/show/85009.Design_Patterns'
  - type: vidéo
    title: Adapter Pattern Explained
    url: 'https://www.youtube.com/watch?v=2PKQtcJjYvc'
---

## Résumé rapide

Adapter est un pattern structurel qui permet à des classes d'interfaces incompatibles de collaborer, en enveloppant une classe existante dans une nouvelle interface attendue par le client.

---

## Définition

Le pattern Adapter agit comme un traducteur entre deux interfaces : le client appelle une interface cible, l'adapter traduit ces appels vers l'interface réelle d'un service tiers, sans modifier aucun des deux.

---

## Histoire

* Décrit dans "Design Patterns" du Gang of Four (1994)
* Pattern structurel classique
* Omniprésent dans l'intégration de bibliothèques tierces
* Base des architectures hexagonales et Clean

---

## Objectif

* Réutiliser du code existant dont l'interface ne correspond pas
* Découpler le client d'une implémentation concrète
* Faciliter l'intégration de libs tierces
* Permettre de remplacer une lib sans toucher au client

---

## Domaines d'utilisation

* Intégration d'APIs tierces
* Migration d'une lib à une autre
* Tests unitaires (fakes adapters)
* Architecture hexagonale (ports & adapters)
* Legacy wrapping

---

## Fonctionnement

* **Target** — Interface attendue par le client
* **Adaptee** — Classe existante incompatible
* **Adapter** — Implémente Target en déléguant à Adaptee
* Le client ne voit que Target, ignore Adaptee

---

## Concepts clés

* **Object Adapter** — Via composition (recommandé)
* **Class Adapter** — Via héritage multiple
* **Wrapper** — Synonyme fréquent
* **Anti-corruption layer** — Adapter en DDD
* **Bridge vs Adapter** — Design vs legacy

---

## Exemple

```typescript
// Target (attendu par le client)
interface PaymentGateway {
  pay(amount: number, currency: string): Promise<string>;
}

// Adaptee (lib tierce avec API différente)
class StripeClient {
  async charge(amountCents: number, curr: string, src: string) {
    return { id: 'ch_123', status: 'ok' };
  }
}

// Adapter
class StripeAdapter implements PaymentGateway {
  constructor(private stripe: StripeClient) {}
  async pay(amount: number, currency: string): Promise<string> {
    const result = await this.stripe.charge(
      Math.round(amount * 100),
      currency,
      'tok_default'
    );
    return result.id;
  }
}

// Client
const gateway: PaymentGateway = new StripeAdapter(new StripeClient());
await gateway.pay(42.50, 'EUR');
```

---

## Avantages

* Réutilisation de code sans modification
* Découplage client ↔ lib tierce
* Facilite les tests (adapter fake)
* Permet de changer d'implémentation
* Isole les breaking changes

---

## Inconvénients

* Ajoute une couche d'indirection
* Peut proliférer si mal utilisé
* Conversion de types parfois coûteuse
* Peut masquer des incohérences sémantiques

---

## Pièges courants

* Adapter "fuyant" exposant des détails de l'adaptee
* Adapter qui fait de la logique métier (pas son rôle)
* Mélanger Adapter et Facade
* Créer un adapter quand une simple fonction suffirait

---

## À ne pas confondre

* Adapter vs Facade (interface différente vs simplifiée)
* Adapter vs Decorator (interface vs comportement)
* Adapter vs Bridge (runtime vs conception)

---

## Explication simplifiée

Tu as une prise électrique européenne et un appareil américain. Tu ne refais pas ton installation, tu ne changes pas l'appareil : tu utilises un adaptateur qui fait le lien. En code, c'est exactement ça : un petit bout de code qui traduit une interface en une autre.

---

## Explication avancée

L'Object Adapter via composition est préféré au Class Adapter via héritage multiple (souvent impossible en Java/C#). En architecture hexagonale, les adapters implémentent des ports définis par le domaine, inversant la dépendance : le domaine dicte l'interface, l'infrastructure s'y adapte. Cela permet d'avoir plusieurs adapters pour un même port (Stripe, PayPal, fake en test). Le pattern "Anti-corruption layer" en DDD est un adapter entre bounded contexts pour protéger le modèle interne des terminologies externes.

---

## Points critiques à retenir

* [CRITIQUE] Adapter ne doit pas contenir de logique métier
* [CRITIQUE] Préférer la composition à l'héritage
* [IMPORTANT] Base de l'architecture hexagonale
* [IMPORTANT] Permet de tester via fakes
* [PIÈGE] Adapter fuyant = couplage masqué
