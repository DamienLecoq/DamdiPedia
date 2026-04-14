---
id: garbage-collection
label: Garbage Collection
category: concept
priority: medium
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:58:40.057Z'
updatedAt: '2026-04-14T17:58:40.057Z'
relations: []
resources:
  - type: documentation
    title: Oracle – Garbage Collection Tuning Guide
    url: 'https://docs.oracle.com/en/java/javase/17/gctuning/'
  - type: vidéo
    title: Coding with John – Java Garbage Collection
    url: 'https://www.youtube.com/watch?v=XXOaCV5xm9s'
  - type: blog
    title: Baeldung – JVM Garbage Collectors
    url: 'https://www.baeldung.com/jvm-garbage-collectors'
  - type: blog
    title: InfoQ – Understanding GC Pauses
    url: 'https://www.infoq.com/articles/G1-One-Garbage-Collector-To-Rule-Them-All/'
  - type: livre
    title: Java Performance – Scott Oaks
    url: 'https://www.amazon.com/dp/1492056111'
---

## Résumé rapide

Le Garbage Collection (GC) est un mécanisme automatique de gestion de la mémoire qui libère les objets inutilisés sans intervention du développeur. Essentiel dans les langages comme Java et Python, il évite les fuites mémoire manuelles mais peut causer des pauses.

---

## Définition

Le Garbage Collection est un processus automatique de récupération de la mémoire occupée par des objets qui ne sont plus référencés par le programme. Il fait partie du runtime du langage (JVM, interpréteur Python…).

---

## Histoire

* Inventé par John McCarthy en 1959 pour Lisp
* Longtemps considéré comme trop lent pour la production
* Adopté par Java (1995) comme alternative à la gestion manuelle du C/C++
* Aujourd'hui présent dans la majorité des langages modernes
* Algorithmes de plus en plus performants (ZGC, Shenandoah : pauses < 1ms)

---

## Objectif

* Libérer automatiquement la mémoire inutilisée
* Éviter les fuites mémoire (memory leaks)
* Éviter les erreurs de double-free et use-after-free
* Simplifier le travail du développeur

---

## Domaines d'utilisation

* Langages managés (Java, C#, Python, Go, JavaScript)
* Applications serveur à longue durée de vie
* Tout environnement utilisant une machine virtuelle

---

## Fonctionnement

* Le GC identifie les objets **accessibles** (via des références depuis les racines)
* Les objets **non-accessibles** sont marqués pour suppression
* La mémoire est **libérée** et éventuellement **compactée**
* Le cycle se répète périodiquement ou quand la mémoire est insuffisante

---

## Concepts clés

* **Racines GC** — Points de départ du traçage (variables locales, champs statiques, threads)
* **Mark & Sweep** — Algorithme de base : marquer les vivants, supprimer les morts
* **Generations** — Young Gen (objets récents), Old Gen (objets durables)
* **Stop-the-world** — Pause de l'application pendant le GC
* **Concurrent GC** — Collecte en parallèle avec l'application (G1, ZGC)
* **Compaction** — Réorganiser la mémoire pour éviter la fragmentation

---

## Exemple

```java
public class Main {
    public static void main(String[] args) {
        // L'objet est créé sur le heap
        Object obj = new Object();

        // La référence est supprimée
        obj = null;

        // L'objet est maintenant éligible au GC
        // Il sera libéré lors du prochain cycle de collecte
    }
}
```

---

## Structure / Architecture

* **Young Generation** — Eden + Survivor spaces (objets à courte durée de vie)
* **Old Generation** — Objets ayant survécu à plusieurs cycles GC
* **Metaspace** — Métadonnées des classes (Java 8+)
* **Minor GC** — Collecte dans la Young Gen (rapide, fréquent)
* **Major GC / Full GC** — Collecte dans tout le heap (lent, rare)

---

## Algorithmes courants (Java)

* **Serial GC** — Simple, mono-thread, pour petites apps
* **Parallel GC** — Multi-thread, optimisé pour le débit
* **G1 GC** — Défaut depuis Java 9, bon compromis débit/latence
* **ZGC** — Pauses < 1ms, pour les apps sensibles à la latence
* **Shenandoah** — Concurrent, pauses ultra-courtes

---

## Avantages

* Pas de gestion mémoire manuelle (ni malloc/free, ni new/delete)
* Élimine les bugs de double-free et use-after-free
* Simplifie le développement
* Les GC modernes sont très performants

---

## Inconvénients

* Pauses imprévisibles (stop-the-world)
* Overhead CPU (le GC consomme des ressources)
* Moins de contrôle fin sur la mémoire
* Peut masquer des problèmes de conception (créer trop d'objets)

---

## Pièges courants

* Fuites mémoire logiques (références conservées inutilement dans des caches, listeners)
* Appeler `System.gc()` en pensant contrôler le GC (c'est juste une suggestion)
* Ignorer les métriques GC en production
* Créer trop d'objets temporaires dans les boucles (pression GC)

---

## À ne pas confondre

* GC vs gestion manuelle (malloc/free en C)
* Minor GC vs Full GC (fréquent/rapide vs rare/lent)
* Fuite mémoire vs OOM (cause vs conséquence)
* Reference counting vs tracing GC (Python vs Java)

---

## Explication simplifiée

Le Garbage Collector, c'est comme un service de nettoyage automatique : quand tu n'utilises plus un objet, il le détecte et libère la place en mémoire. Tu n'as pas à ranger toi-même.

---

## Explication avancée

Le GC générationnel repose sur l'hypothèse générationnelle : la majorité des objets meurent jeunes. En séparant le heap en Young et Old Generation, le GC peut collecter fréquemment la Young Gen (Minor GC rapide) et rarement la Old Gen (Major GC coûteux). Les GC concurrents modernes (G1, ZGC) minimisent les pauses en effectuant la majorité du travail en parallèle avec les threads applicatifs.

---

## Points critiques à retenir

* [CRITIQUE] Le GC libère automatiquement la mémoire des objets non-référencés
* [CRITIQUE] Stop-the-world = pause de l'application pendant la collecte
* [IMPORTANT] L'hypothèse générationnelle : la plupart des objets meurent jeunes
* [IMPORTANT] Choisir le bon GC selon le use case (débit vs latence)
* [PIÈGE] Les fuites mémoire sont possibles même avec un GC
* [PIÈGE] `System.gc()` ne garantit pas une collecte immédiate
