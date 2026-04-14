---
id: observer
label: Observer
category: concept
priority: medium
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:59:29.074Z'
updatedAt: '2026-04-14T17:59:29.074Z'
relations:
  - targetId: design-patterns
    type: part_of
resources:
  - type: documentation
    title: Refactoring Guru – Observer
    url: 'https://refactoring.guru/design-patterns/observer'
  - type: blog
    title: Baeldung – Observer Pattern in Java
    url: 'https://www.baeldung.com/java-observer-pattern'
  - type: vidéo
    title: Christopher Okhravi – Observer Pattern
    url: 'https://www.youtube.com/watch?v=_BpmfnqjgzQ'
  - type: documentation
    title: SourceMaking – Observer
    url: 'https://sourcemaking.com/design_patterns/observer'
  - type: livre
    title: Head First Design Patterns
    url: 'https://www.amazon.com/dp/0596007124'
---

## Résumé rapide

L'Observer est un design pattern comportemental qui définit un mécanisme d'abonnement permettant à des objets (observers) d'être notifiés automatiquement lorsqu'un autre objet (subject) change d'état. C'est le fondement de la programmation événementielle et réactive.

---

## Définition

Le pattern Observer établit une relation un-à-plusieurs entre des objets : quand le sujet (subject) change d'état, tous ses observateurs (observers) enregistrés sont notifiés et mis à jour automatiquement. Les observateurs peuvent s'abonner et se désabonner dynamiquement.

---

## Histoire

* Défini dans le livre du Gang of Four (1994)
* Classé parmi les patterns comportementaux
* Fondation du modèle événementiel (Java AWT/Swing, .NET events)
* Inspiré le pattern Publish/Subscribe utilisé dans les systèmes distribués
* Base de la programmation réactive (RxJava, RxJS, Project Reactor)

---

## Objectif

* Définir un système de notification automatique entre objets
* Découpler le sujet de ses observateurs (le sujet ne connaît pas les détails des observers)
* Permettre l'ajout dynamique d'observateurs sans modifier le sujet
* Réagir aux changements d'état de manière déclarative

---

## Domaines d'utilisation

* Interfaces graphiques (événements bouton, souris, clavier)
* Systèmes de notification et d'alerte
* Programmation réactive (RxJava, RxJS)
* Systèmes de messagerie (publish/subscribe)
* Frameworks MVC/MVVM (liaison de données)

---

## Fonctionnement

Le pattern Observer repose sur 4 éléments :

1. **Subject (Sujet)** — L'objet observé qui maintient une liste d'observers
2. **Observer (Observateur)** — L'interface que doivent implémenter les objets intéressés
3. **subscribe/unsubscribe** — Méthodes pour s'abonner/se désabonner du sujet
4. **notify** — Le sujet parcourt la liste et appelle chaque observer quand il change d'état

---

## Concepts clés

* **Couplage faible** — Le sujet ne connaît ses observers que par leur interface
* **Push vs Pull** — Push : le sujet envoie les données ; Pull : l'observer les demande
* **Publication/Abonnement** — Variante où un médiateur (event bus) découple sujet et observers
* **Programmation réactive** — Extension moderne de l'Observer avec des flux asynchrones
* **Listener** — Nom commun en Java pour un observer (ActionListener, MouseListener)

---

## Exemple

```java
// ╔════════════════════════════════════════════════════════╗
// ║               DIAGRAMME UML                           ║
// ║                                                       ║
// ║  «interface»             «interface»                  ║
// ║  Subject                 Observer                     ║
// ║  ──────────────          ──────────────                ║
// ║  + subscribe(Observer)   + update(event): void        ║
// ║  + unsubscribe(Observer)                              ║
// ║  + notify(): void             ▲                       ║
// ║        ▲                      │                       ║
// ║        │               ┌──────┴──────┐                ║
// ║  EventManager     EmailAlert   LogObserver            ║
// ╚════════════════════════════════════════════════════════╝

import java.util.*;

// Interface Observer
interface EventListener {
    void update(String eventType, String data);
}

// Sujet (Subject)
class EventManager {
    private final Map<String, List<EventListener>> listeners = new HashMap<>();

    public void subscribe(String eventType, EventListener listener) {
        listeners.computeIfAbsent(eventType, k -> new ArrayList<>())
                 .add(listener);
    }

    public void unsubscribe(String eventType, EventListener listener) {
        listeners.getOrDefault(eventType, List.of()).remove(listener);
    }

    public void notify(String eventType, String data) {
        for (EventListener listener : listeners.getOrDefault(eventType, List.of())) {
            listener.update(eventType, data);
        }
    }
}

// Observers concrets
class EmailAlert implements EventListener {
    public void update(String eventType, String data) {
        System.out.println("Email envoyé pour : " + eventType + " → " + data);
    }
}

class LogObserver implements EventListener {
    public void update(String eventType, String data) {
        System.out.println("[LOG] " + eventType + " : " + data);
    }
}

// Utilisation
EventManager manager = new EventManager();
manager.subscribe("commande", new EmailAlert());
manager.subscribe("commande", new LogObserver());

manager.notify("commande", "Commande #1234 créée");
// Email envoyé pour : commande → Commande #1234 créée
// [LOG] commande : Commande #1234 créée
```

---

## Avantages

* Couplage faible entre sujet et observateurs
* Ajout/retrait d'observateurs à l'exécution sans modifier le sujet
* Respect du principe Open/Closed
* Fondation de la programmation événementielle et réactive
* Facilite la séparation des préoccupations

---

## Inconvénients

* Les observateurs sont notifiés dans un ordre non garanti
* Risque de fuites mémoire si les observers ne se désinscrivent pas
* Peut être difficile à déboguer (flux de notification implicite)
* Risque de cascades de notifications (un observer déclenche un autre événement)
* Performances dégradées avec un très grand nombre d'observateurs

---

## Pièges courants

* Oublier de se désabonner → fuites mémoire (surtout en Java avec des références fortes)
* Créer des boucles infinies de notifications (A notifie B qui notifie A)
* Modifier la liste des observers pendant une notification (ConcurrentModificationException)
* Trop de granularité dans les événements → difficile de suivre le flux
* Ne pas gérer les exceptions dans un observer (bloque la notification des suivants)

---

## À ne pas confondre

* Observer vs Pub/Sub — Observer est synchrone et direct, Pub/Sub est découplé via un broker
* Observer vs Mediator — L'Observer notifie directement, le Mediator centralise la communication
* Observer vs Callback — Un callback est un cas simple (1 seul listener), l'Observer gère N listeners
* Observer vs Event-Driven Architecture — L'Observer est un pattern local, l'EDA est une architecture distribuée

---

## Explication simplifiée

L'Observer, c'est comme s'abonner à une chaîne YouTube. Quand la chaîne publie une vidéo (changement d'état), tous les abonnés (observers) sont notifiés automatiquement. Tu peux t'abonner et te désabonner quand tu veux, et la chaîne ne sait rien de particulier sur toi.

---

## Explication avancée

L'Observer du GoF est un pattern synchrone en mémoire, mais il a donné naissance à des familles de solutions asynchrones. En Java, l'interface `java.util.Observer` (dépréciée depuis Java 9) a été remplacée par les PropertyChangeListener et les API réactives. Les bibliothèques réactives (RxJava, Project Reactor) étendent le concept avec les Observables/Flux qui supportent la back-pressure, la composition de flux et le traitement asynchrone. Dans les architectures distribuées, le pattern Pub/Sub (Kafka, RabbitMQ) applique le même principe à l'échelle du réseau.

---

## Points critiques à retenir

* [CRITIQUE] Observer = relation un-à-plusieurs avec notification automatique
* [CRITIQUE] Toujours se désabonner pour éviter les fuites mémoire
* [IMPORTANT] Fondation de toute la programmation événementielle et réactive
* [IMPORTANT] En Java moderne, préférer PropertyChangeListener ou les API réactives à java.util.Observer
* [PIÈGE] Attention aux cascades de notifications et aux boucles infinies
* [PIÈGE] Gérer les exceptions dans chaque observer pour ne pas bloquer la chaîne de notification
