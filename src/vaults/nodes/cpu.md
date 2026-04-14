---
id: cpu
label: CPU
category: matériel
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:58:17.794Z'
updatedAt: '2026-04-14T17:58:17.794Z'
relations: []
resources:
  - type: livre
    title: Computer Organization and Design – Patterson & Hennessy
    url: 'https://www.goodreads.com/book/show/11679774'
  - type: vidéo
    title: Crash Course Computer Science – CPUs
    url: 'https://www.youtube.com/watch?v=FZGugFqdr60'
  - type: blog
    title: How CPUs Work
    url: 'https://www.howtogeek.com/394267/what-is-a-cpu/'
---

## Résumé rapide

Le CPU (Central Processing Unit) est le processeur principal d'un ordinateur, exécutant les instructions des programmes via un cycle fetch-decode-execute sur des milliards d'opérations par seconde.

---

## Définition

Un CPU est un circuit intégré qui exécute les instructions machine d'un programme. Il contient des unités de calcul (ALU), des registres, une unité de contrôle et des caches, tous synchronisés par une horloge à plusieurs GHz.

---

## Histoire

* Intel 4004 : premier microprocesseur commercial (1971)
* x86 dominé par Intel depuis 1978 (8086)
* ARM émerge pour le mobile dans les années 90
* Multi-cœurs grand public à partir de 2005 (Pentium D)
* Apple Silicon (M1) relance ARM sur desktop en 2020

---

## Objectif

* Exécuter les instructions des programmes
* Orchestrer les accès mémoire et I/O
* Fournir de la puissance de calcul
* Supporter multiple cœurs et threads

---

## Domaines d'utilisation

* Tous les ordinateurs, serveurs, smartphones
* Embarqué et IoT (microcontrôleurs)
* Supercalcul (clusters CPU)
* Machines virtuelles et conteneurs

---

## Fonctionnement

* **Fetch** — Charge l'instruction depuis la RAM
* **Decode** — Interprète l'opcode
* **Execute** — Exécute sur l'ALU
* **Writeback** — Écrit le résultat
* **Pipeline** — Plusieurs instructions en parallèle
* **Out-of-order** — Réordonne pour l'efficacité

---

## Concepts clés

* **Cœur (Core)** — Unité d'exécution indépendante
* **Thread** — Flux d'exécution (SMT = hyperthreading)
* **Cache L1/L2/L3** — Mémoire rapide proche du CPU
* **Fréquence** — Cycles d'horloge par seconde
* **ISA** — Jeu d'instructions (x86, ARM, RISC-V)
* **TDP** — Enveloppe thermique

---

## Exemple

```bash
# Linux — infos CPU
lscpu

# Nombre de cœurs
nproc

# Utilisation en temps réel
htop

# Benchmark simple
sysbench cpu --threads=8 run
```

---

## Avantages

* Flexibilité (exécute n'importe quel code)
* Écosystème logiciel massif
* Multi-cœurs pour parallélisme
* Caches pour la performance
* Compatibilité ascendante (x86)

---

## Inconvénients

* Moins efficace que GPU pour le parallélisme massif
* Limite de fréquence (mur thermique)
* Complexité grandissante (spéculation → Spectre/Meltdown)
* Consommation énergétique

---

## Pièges courants

* Confondre cœurs physiques et threads logiques
* Oublier les caches (cache miss = 100x plus lent)
* False sharing en programmation multithread
* Ignorer l'affinité CPU pour le temps réel

---

## À ne pas confondre

* CPU vs GPU (généraliste vs parallèle massif)
* Cœur vs Thread (physique vs logique)
* x86 vs ARM (CISC vs RISC)

---

## Explication simplifiée

Le CPU c'est le cerveau de l'ordinateur. Il lit les instructions une par une (super vite — des milliards par seconde) et les exécute. Plus il a de cœurs, plus il peut faire de choses en parallèle, comme plusieurs cerveaux en un.

---

## Explication avancée

Les CPU modernes utilisent un pipeline profond (14-20 étages), l'exécution spéculative, le branch prediction et l'out-of-order execution pour masquer la latence mémoire. Les caches L1 (~1ns), L2 (~3ns), L3 (~12ns) et RAM (~100ns) forment une hiérarchie. SIMD (AVX, NEON) exécute une instruction sur plusieurs données. Les vulnérabilités Spectre/Meltdown ont exploité la spéculation, obligeant à ajouter des mitigations coûteuses en performance.

---

## Points critiques à retenir

* [CRITIQUE] Cache miss = ~100x plus lent qu'un hit
* [CRITIQUE] False sharing tue les perfs multithread
* [IMPORTANT] L1/L2/L3 hiérarchie, optimiser la localité
* [IMPORTANT] SIMD pour les calculs vectoriels
* [PIÈGE] Plus de threads ≠ toujours plus rapide
