---
id: processus-et-threads
label: Processus et Threads
category: concept
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:59:40.889Z'
updatedAt: '2026-04-14T17:59:40.889Z'
relations:
  - target: noyau
    type: related
    weight: 0.8
resources:
  - type: livre
    title: Operating Systems – Three Easy Pieces
    url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/'
  - type: vidéo
    title: Processes and Threads – Computerphile
    url: 'https://www.youtube.com/watch?v=exbKr6fnoUw'
  - type: documentation
    title: Linux Man Pages – pthreads
    url: 'https://man7.org/linux/man-pages/man7/pthreads.7.html'
---

## Résumé rapide

Un processus est une instance isolée d'un programme avec son propre espace mémoire, tandis qu'un thread est une unité d'exécution légère partageant la mémoire du processus parent. Les deux sont les briques du multitâche.

---

## Définition

Un processus encapsule un programme en cours d'exécution avec ses ressources (mémoire, fichiers ouverts, PID). Un thread est un flux d'exécution au sein d'un processus, partageant l'espace d'adressage avec les autres threads du même processus.

---

## Histoire

* Concept de processus dans Multics (années 60)
* Threads popularisés par les années 80 (Mach, Solaris)
* POSIX threads standardisés en 1995
* Multi-core force la programmation multithread depuis 2005
* Async/await moderne comme alternative légère

---

## Objectif

* Permettre le multitâche
* Isoler les programmes les uns des autres
* Utiliser les multi-cœurs en parallèle
* Partager efficacement les ressources

---

## Domaines d'utilisation

* Tous les OS modernes
* Serveurs web (pool de threads)
* Jeux (thread render, thread physique)
* Calcul scientifique parallèle
* Applications UI (thread UI + workers)

---

## Fonctionnement

* **Processus** — Espace mémoire isolé, PID unique
* **Thread** — Partage le heap, pile propre
* **Context switch** — Sauvegarde/restauration du contexte
* **Scheduler** — Décide quel thread tourne
* **Synchronisation** — Mutex, sémaphore, condition

---

## Concepts clés

* **PID** — Process ID
* **TID** — Thread ID
* **Fork** — Crée un processus enfant
* **Mutex / Lock** — Exclusion mutuelle
* **Deadlock** — Blocage mutuel
* **Race condition** — Accès concurrent non synchronisé

---

## Exemple

```python
import threading
from multiprocessing import Process

# Thread (partage la mémoire)
def worker(n):
    print(f"Thread {n}")

t = threading.Thread(target=worker, args=(1,))
t.start()
t.join()

# Process (mémoire isolée)
p = Process(target=worker, args=(2,))
p.start()
p.join()
```

```bash
# Lister processus et threads
ps -eLf
top -H
```

---

## Avantages

* Processus : isolation forte, robustesse
* Threads : partage mémoire rapide, légers
* Exploitation multi-cœurs
* Parallélisme et concurrence
* Abstraction du scheduler

---

## Inconvénients

* Synchronisation complexe (deadlocks, races)
* Context switches coûteux
* Debug multithread difficile
* Memory corruption en C/C++ partagé

---

## Pièges courants

* Race conditions non détectées
* Deadlocks croisés sur plusieurs mutex
* Trop de threads (context switch storm)
* GIL en Python limitant le parallélisme CPU

---

## À ne pas confondre

* Processus vs Thread (isolation vs partage)
* Concurrent vs Parallèle (entrelacé vs simultané)
* Thread vs Coroutine (OS vs user-land)

---

## Explication simplifiée

Un processus c'est comme une maison avec ses propres murs et ses propres affaires. Un thread c'est un habitant de la maison — plusieurs habitants partagent les affaires, donc ils doivent s'entendre pour ne pas tout casser (les mutex, c'est les règles de la maison).

---

## Explication avancée

Sous Linux, processus et threads sont tous deux des `task_struct`, différenciés par les flags de `clone()` (notamment `CLONE_VM` pour partager l'espace mémoire). Le scheduler CFS (Completely Fair Scheduler) attribue équitablement le CPU via un arbre rouge-noir. Les primitives de synchronisation modernes incluent les futex (fast user-space mutex) qui évitent un syscall dans le cas non contesté. Les modèles async (Go goroutines, Rust async) multiplexent des millions de tâches sur quelques threads OS.

---

## Points critiques à retenir

* [CRITIQUE] Race conditions silencieuses en l'absence de tests
* [CRITIQUE] Toujours libérer les mutex (try/finally)
* [IMPORTANT] Éviter de partager l'état mutable entre threads
* [IMPORTANT] Thread pools > création à la volée
* [PIÈGE] GIL Python ne permet pas le parallélisme CPU pur
