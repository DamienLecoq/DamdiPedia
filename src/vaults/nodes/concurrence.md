---
id: concurrence
label: Concurrence
category: concept
priority: medium
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-11T09:59:30.343Z'
updatedAt: '2026-04-11T09:59:30.343Z'
relations:
  - target: java
    type: used_by
    weight: 0.7
  - target: python
    type: used_by
    weight: 0.6
  - target: linux
    type: related
    weight: 0.5
  - target: jvm
    type: related
    weight: 0.6
resources:
  - type: documentation
    title: Oracle – Java Concurrency Tutorial
    url: 'https://docs.oracle.com/javase/tutorial/essential/concurrency/'
  - type: vidéo
    title: Jakob Jenkov – Java Concurrency
    url: 'https://www.youtube.com/watch?v=mTGdtC9f4EU'
  - type: blog
    title: Baeldung – Java Concurrency
    url: 'https://www.baeldung.com/java-concurrency'
  - type: livre
    title: Java Concurrency in Practice – Brian Goetz
    url: 'https://www.amazon.com/dp/0321349601'
  - type: autre
    title: Visualizing Concurrency – Go Blog
    url: 'https://go.dev/blog/waza-talk'
---

## Résumé rapide

La concurrence permet à un programme d'exécuter plusieurs tâches en même temps (ou en alternance). Elle est essentielle pour exploiter les processeurs multi-cœurs et gérer des opérations simultanées (réseau, I/O, utilisateurs multiples).

---

## Définition

La concurrence est la capacité d'un programme à gérer plusieurs tâches dont les exécutions se chevauchent dans le temps. Elle ne signifie pas nécessairement l'exécution simultanée (parallélisme), mais la gestion structurée de plusieurs flux d'exécution.

---

## Histoire

* Concepts fondamentaux définis dans les années 1960 (Dijkstra, sémaphores)
* Threads POSIX (pthreads) dans les années 1990
* Java intègre les threads dès sa version 1.0 (1995)
* java.util.concurrent ajouté en Java 5 (2004)
* Tendance actuelle : coroutines (Kotlin), virtual threads (Java 21), async/await

---

## Objectif

* Exploiter les processeurs multi-cœurs
* Gérer des I/O simultanées sans bloquer (réseau, fichiers)
* Améliorer la réactivité des applications
* Traiter des requêtes utilisateurs en parallèle

---

## Domaines d'utilisation

* Serveurs web (traitement de requêtes simultanées)
* Applications temps réel (chat, jeux, trading)
* Traitement de données massives (Big Data, pipelines)
* Interfaces utilisateur (ne pas bloquer le thread UI)

---

## Fonctionnement

* Le programme crée plusieurs **threads** (fils d'exécution)
* Chaque thread exécute du code de manière indépendante
* Les threads partagent la même mémoire (heap) mais ont leur propre stack
* Un **scheduler** (OS ou runtime) alterne entre les threads
* Des mécanismes de **synchronisation** protègent les données partagées

---

## Concepts clés

* **Thread** — Unité d'exécution la plus légère gérée par l'OS
* **Mutex / Lock** — Verrou exclusif pour protéger une section critique
* **Deadlock** — Blocage mutuel entre threads qui s'attendent l'un l'autre
* **Race condition** — Bug causé par un accès concurrent non-protégé
* **Thread pool** — Groupe de threads réutilisables (ExecutorService en Java)
* **Atomic** — Opérations indivisibles (AtomicInteger, CAS)

---

## Exemple

```java
ExecutorService pool = Executors.newFixedThreadPool(4);

for (int i = 0; i < 10; i++) {
    final int task = i;
    pool.submit(() -> {
        System.out.println("Task " + task + " on " + Thread.currentThread().getName());
    });
}

pool.shutdown();
```

---

## Structure / Architecture

* **Thread principal** — Point d'entrée de l'application
* **Worker threads** — Threads qui exécutent les tâches
* **Thread pool** — Gestion d'un nombre fixe de threads réutilisables
* **Queue** — File d'attente des tâches à exécuter
* **Synchronizers** — Barriers, CountDownLatch, Semaphore

---

## Modèles de concurrence

* **Threads + locks** — Modèle classique (Java, C++)
* **Async / await** — Modèle non-bloquant (JavaScript, Python, C#)
* **Acteurs** — Messages entre entités isolées (Akka, Erlang)
* **CSP** — Channels et goroutines (Go)
* **Virtual threads** — Threads ultra-légers gérés par le runtime (Java 21)

---

## Avantages

* Meilleure utilisation du CPU (multi-cœurs)
* Applications plus réactives
* Meilleur débit pour les serveurs
* Traitement parallèle des données

---

## Inconvénients

* Complexité accrue du code
* Bugs difficiles à reproduire (race conditions, deadlocks)
* Difficile à débugger et tester
* Overhead de synchronisation

---

## Pièges courants

* Race condition : accès concurrent sans synchronisation
* Deadlock : deux threads qui s'attendent mutuellement
* Starvation : un thread n'obtient jamais l'accès à la ressource
* Sur-synchronisation : trop de locks → perte de performance
* Partager des objets mutables entre threads

---

## À ne pas confondre

* Concurrence vs parallélisme (structurel vs exécution simultanée)
* Thread vs process (mémoire partagée vs isolée)
* Synchrone vs asynchrone (bloquant vs non-bloquant)
* Lock vs Atomic (verrou explicite vs opération CAS)

---

## Explication simplifiée

La concurrence, c'est comme un chef de cuisine qui gère plusieurs plats en même temps. Il ne les prépare pas tous simultanément, mais il alterne entre eux intelligemment pour que tout soit prêt à temps.

---

## Explication avancée

La concurrence repose sur des modèles formels (CSP, acteurs) et des primitives bas-niveau (mutex, sémaphores, barrières mémoire). Le Java Memory Model (JMM) définit les garanties de visibilité et d'ordonnancement entre threads. Les modèles modernes (virtual threads, coroutines) découplent le thread logique du thread OS pour supporter des millions de tâches concurrentes avec un overhead minimal.

---

## Points critiques à retenir

* [CRITIQUE] La concurrence gère plusieurs tâches dont l'exécution se chevauche
* [CRITIQUE] Les données partagées doivent être protégées (synchronisation)
* [IMPORTANT] Concurrence ≠ parallélisme
* [IMPORTANT] Les thread pools évitent de créer/détruire des threads en permanence
* [PIÈGE] Race condition = bug silencieux, difficile à reproduire
* [PIÈGE] Deadlock = blocage complet, souvent en production uniquement
