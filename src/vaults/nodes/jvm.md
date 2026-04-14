---
id: jvm
label: JVM
category: concept
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:59:04.288Z'
updatedAt: '2026-04-14T17:59:04.288Z'
relations:
  - target: garbage-collection
    type: uses
    weight: 0.8
resources:
  - type: documentation
    title: Oracle – JVM Specification
    url: 'https://docs.oracle.com/javase/specs/jvms/se17/html/'
  - type: documentation
    title: OpenJDK Wiki
    url: 'https://wiki.openjdk.org/'
  - type: vidéo
    title: JVM Architecture Explained – Java Brains
    url: 'https://www.youtube.com/watch?v=ZBJ0u9MaKtM'
  - type: blog
    title: Baeldung – JVM Internals
    url: 'https://www.baeldung.com/jvm-internals'
  - type: blog
    title: InfoQ – JVM Performance
    url: 'https://www.infoq.com/jvm/'
  - type: livre
    title: Java Performance – Scott Oaks
    url: 'https://www.amazon.com/dp/1492056111'
  - type: autre
    title: VisualVM – Outil de monitoring JVM
    url: 'https://visualvm.github.io/'
---

## Résumé rapide

La JVM (Java Virtual Machine) est la machine virtuelle qui exécute le bytecode Java. Elle assure la portabilité du code, gère la mémoire automatiquement et optimise les performances à l'exécution grâce au compilateur JIT.

---

## Définition

La JVM est une machine virtuelle qui interprète et exécute le bytecode produit par le compilateur Java (ou d'autres langages JVM comme Kotlin et Scala), en le traduisant en instructions natives pour le système hôte.

---

## Histoire

* Créée en 1995 avec Java chez Sun Microsystems
* Conçue pour résoudre le problème de portabilité ("Write Once, Run Anywhere")
* HotSpot JVM (1999) introduit le JIT compiler
* Aujourd'hui : OpenJDK est l'implémentation de référence (open source)
* Alternatives : GraalVM, Azul Zing, Eclipse OpenJ9

---

## Objectif

* Exécuter du bytecode de manière portable (indépendamment du système)
* Gérer automatiquement la mémoire (Garbage Collection)
* Optimiser les performances à l'exécution (JIT)
* Fournir un environnement d'exécution sécurisé (sandboxing)

---

## Domaines d'utilisation

* Toute application Java / Kotlin / Scala
* Serveurs d'applications d'entreprise
* Applications Android (via ART, dérivé de la JVM)
* Big Data (Hadoop, Spark, Kafka)

---

## Fonctionnement

* Le code source est compilé en **bytecode** (.class)
* Le **ClassLoader** charge les classes nécessaires dynamiquement
* L'**interpréteur** exécute le bytecode instruction par instruction
* Le **JIT compiler** (Just-In-Time) compile les hot paths en code natif
* Le **Garbage Collector** libère automatiquement la mémoire inutilisée

---

## Concepts clés

* **Bytecode** — Code intermédiaire portable, indépendant de la plateforme
* **ClassLoader** — Charge dynamiquement les classes en mémoire
* **JIT (Just-In-Time)** — Compile le bytecode en code natif à l'exécution
* **Heap** — Zone mémoire pour les objets, gérée par le GC
* **Stack** — Zone mémoire pour les appels de méthodes et variables locales
* **JMM (Java Memory Model)** — Spécification du comportement mémoire en concurrence

---

## Exemple

```bash
# Compilation : source → bytecode
javac Main.java

# Exécution : la JVM interprète/compile le bytecode
java Main

# Inspection du bytecode
javap -c Main.class
```

---

## Structure / Architecture

* **ClassLoader subsystem** — Loading, Linking, Initialization
* **Runtime Data Areas** — Heap, Stack, Method Area, PC Registers
* **Execution Engine** — Interpreter, JIT Compiler, GC
* **Native Interface (JNI)** — Appels vers du code natif (C/C++)

---

## Syntaxe et spécificités

* La JVM n'est pas liée à Java uniquement (Kotlin, Scala, Groovy, Clojure)
* Options de configuration : `-Xmx` (heap max), `-Xms` (heap initial), `-XX:+UseG1GC`
* Profiling avec JMX, JFR (Java Flight Recorder)
* Monitoring avec VisualVM, JConsole

---

## Gestion de la mémoire

* **Young Generation** — Objets récemment créés (Eden, Survivor spaces)
* **Old Generation** — Objets à longue durée de vie
* **Metaspace** — Métadonnées des classes (remplace PermGen depuis Java 8)
* Différents GC : Serial, Parallel, G1 (défaut), ZGC, Shenandoah

---

## Avantages

* Portabilité totale (bytecode identique partout)
* Optimisations dynamiques via le JIT
* Gestion mémoire automatique (GC)
* Écosystème multi-langage (Java, Kotlin, Scala…)
* Maturité et stabilité (25+ ans)

---

## Inconvénients

* Temps de démarrage plus lent (chargement JVM + warm-up JIT)
* Consommation mémoire significative (overhead JVM)
* Pauses GC possibles (atténuées par ZGC/Shenandoah)
* Complexité du tuning en production

---

## Pièges courants

* Mauvais dimensionnement du heap (-Xmx trop petit ou trop grand)
* Ignorer les métriques GC en production
* Fuites mémoire (objets référencés mais inutilisés)
* Ne pas utiliser le bon GC pour son use case

---

## À ne pas confondre

* JVM vs JRE vs JDK (runtime vs SDK)
* Interpréteur vs JIT (les deux coexistent dans la JVM)
* Heap vs Stack (objets vs appels de méthodes)
* GC pause vs GC throughput (latence vs débit)

---

## Explication simplifiée

La JVM est un programme qui fait tourner tes programmes Java. Elle traduit le bytecode en instructions que ton ordinateur comprend, peu importe le système (Windows, Linux, Mac).

---

## Explication avancée

La JVM implémente un modèle d'exécution en deux phases : interprétation initiale du bytecode, puis compilation JIT des chemins chauds (méthodes fréquemment appelées). Le profiling adaptatif permet au JIT d'appliquer des optimisations agressives (inlining, escape analysis, loop unrolling) que même un compilateur statique ne peut pas faire car il manque d'informations runtime.

---

## Points critiques à retenir

* [CRITIQUE] La JVM exécute du bytecode, pas du code source directement
* [CRITIQUE] Le JIT compile le bytecode en code natif à l'exécution
* [IMPORTANT] Le Garbage Collector gère la mémoire automatiquement
* [IMPORTANT] La JVM supporte plusieurs langages (Java, Kotlin, Scala…)
* [PIÈGE] Mauvais tuning du heap = performances dégradées ou OutOfMemoryError
* [PIÈGE] Le temps de démarrage peut être un problème pour les microservices
