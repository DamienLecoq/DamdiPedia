---
id: event-driven-architecture
label: Event-Driven Architecture
category: concept
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:58:33.104Z'
updatedAt: '2026-04-14T17:58:33.104Z'
relations:
  - target: microservices
    type: related
    weight: 0.8
  - target: domain-driven-design
    type: related
    weight: 0.7
resources:
  - type: livre
    title: Designing Event-Driven Systems – Ben Stopford
    url: 'https://www.confluent.io/designing-event-driven-systems/'
  - type: blog
    title: Martin Fowler – Event Driven
    url: 'https://martinfowler.com/articles/201701-event-driven.html'
  - type: vidéo
    title: Event-Driven Architecture Explained
    url: 'https://www.youtube.com/watch?v=STKCRSUsyP0'
---

## Résumé rapide

L'architecture orientée événements (EDA) est un style où les composants communiquent via la production et consommation d'événements asynchrones, favorisant le découplage et la scalabilité.

---

## Définition

EDA est un pattern architectural où les services émettent des événements immuables représentant des faits du passé, et où d'autres services réagissent à ces événements de manière asynchrone, typiquement via un broker (Kafka, RabbitMQ, NATS).

---

## Histoire

* Racines dans le Publish/Subscribe des années 80
* Popularisé par les architectures SOA et ESB
* Renaissance avec Kafka (LinkedIn, 2011)
* Fondation des architectures microservices modernes
* Base théorique de CQRS et Event Sourcing

---

## Objectif

* Découpler producteurs et consommateurs
* Permettre la scalabilité horizontale
* Absorber les pics de charge via buffering
* Faciliter l'ajout de nouveaux consommateurs
* Supporter le temps réel et l'analytics

---

## Domaines d'utilisation

* Microservices asynchrones
* Pipelines data et ETL temps réel
* Systèmes de notifications
* IoT et télémétrie
* Trading et finance

---

## Fonctionnement

* **Producer** — Émet un événement
* **Broker** — Stocke et distribue (Kafka, RabbitMQ)
* **Consumer** — Souscrit et réagit
* Les événements sont immuables et horodatés
* Communication asynchrone et non bloquante

---

## Concepts clés

* **Event** — Fait du passé immuable
* **Topic / Stream** — Canal logique d'événements
* **Producer / Consumer** — Émetteur / récepteur
* **Event Bus / Broker** — Infrastructure de routage
* **Choreography vs Orchestration** — Décentralisé vs central
* **Event Sourcing** — Stocker les events comme source de vérité

---

## Exemple

```typescript
// Producer
await kafka.send({
  topic: 'order.created',
  messages: [{ key: orderId, value: JSON.stringify({
    orderId, customerId, items, createdAt: Date.now()
  })}]
});

// Consumer
await consumer.subscribe({ topic: 'order.created' });
await consumer.run({
  eachMessage: async ({ message }) => {
    const event = JSON.parse(message.value.toString());
    await sendConfirmationEmail(event);
  }
});
```

---

## Avantages

* Découplage fort producteur/consommateur
* Scalabilité horizontale naturelle
* Résilience (buffer en cas de pic)
* Ajout de consommateurs sans toucher au producteur
* Audit trail intégré

---

## Inconvénients

* Debugging complexe (flux asynchrone)
* Cohérence éventuelle (pas transactionnelle)
* Risque de duplication (at-least-once delivery)
* Schéma d'événements à gouverner
* Monitoring délicat

---

## Pièges courants

* Oublier l'idempotence des consumers
* Schéma d'événements non versionné
* Chaînes d'événements impossibles à tracer
* Utiliser des events pour des appels synchrones (mauvais usage)

---

## À ne pas confondre

* EDA vs Request/Response (async vs sync)
* Choreography vs Orchestration (décentralisé vs central)
* Event vs Command (fait passé vs intention)

---

## Explication simplifiée

Au lieu d'appeler directement un service comme un coup de téléphone, tu publies un événement "commande créée" sur un tableau d'affichage. Tous les services intéressés (facturation, expédition, emails) le lisent et réagissent chacun de leur côté, sans se connaître.

---

## Explication avancée

EDA favorise la cohérence éventuelle plutôt que transactionnelle. Les patterns associés incluent Outbox (pour garantir l'atomicité write+publish), Saga (pour coordonner des transactions distribuées), CQRS (séparer lecture/écriture). Kafka offre une sémantique at-least-once par défaut, forçant les consumers à être idempotents. Les schema registries (Avro, Protobuf) gouvernent l'évolution des événements pour maintenir la compatibilité.

---

## Points critiques à retenir

* [CRITIQUE] Consumers doivent être idempotents
* [CRITIQUE] Pattern Outbox pour la cohérence write+publish
* [IMPORTANT] Schema registry pour versionner les events
* [IMPORTANT] Événement = fait passé immuable, pas commande
* [PIÈGE] Debugging difficile sans tracing distribué
