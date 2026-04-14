---
id: noyau
label: Noyau (Kernel)
category: concept
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:59:25.111Z'
updatedAt: '2026-04-14T17:59:25.111Z'
relations: []
resources:
  - type: livre
    title: Linux Kernel Development – Robert Love
    url: 'https://www.goodreads.com/book/show/8474407'
  - type: documentation
    title: The Linux Kernel Documentation
    url: 'https://www.kernel.org/doc/html/latest/'
  - type: vidéo
    title: What is a Kernel – Computerphile
    url: 'https://www.youtube.com/watch?v=RqvCNb7fKsg'
---

## Résumé rapide

Le noyau est le cœur d'un système d'exploitation qui gère les ressources matérielles (CPU, mémoire, périphériques) et fournit les services aux programmes utilisateurs via des appels système.

---

## Définition

Le noyau est le programme fondamental d'un OS, chargé en mémoire au démarrage et restant actif en permanence. Il isole les processus utilisateurs du matériel et gère l'accès concurrent aux ressources partagées.

---

## Histoire

* UNIX (1969) popularise le concept de noyau
* Linux créé par Linus Torvalds en 1991
* Darwin (macOS) basé sur XNU hybride en 2001
* Windows NT avec noyau hybride depuis 1993
* Le noyau Linux domine serveurs, mobile (Android) et embarqué

---

## Objectif

* Gérer le matériel de bas niveau
* Ordonnancer les processus et threads
* Gérer la mémoire virtuelle
* Fournir un système de fichiers
* Gérer la sécurité et les permissions

---

## Domaines d'utilisation

* Tous les systèmes d'exploitation
* Serveurs et cloud (Linux)
* Mobile (Linux pour Android, XNU pour iOS)
* Embarqué et IoT (Linux, FreeRTOS)
* Supercalculateurs

---

## Fonctionnement

* **User space** — Applications, pas d'accès direct au matériel
* **Kernel space** — Code privilégié avec accès total
* **System calls** — Interface user → kernel
* **Drivers** — Gèrent le matériel spécifique
* **Scheduler** — Répartit le CPU entre processus

---

## Concepts clés

* **Ring 0 / Ring 3** — Niveaux de privilège CPU
* **System Call** — Appel au kernel (`read`, `write`, `fork`)
* **Driver** — Module gérant un périphérique
* **Scheduler** — Algorithme d'ordonnancement
* **Memory Management Unit (MMU)** — Mémoire virtuelle
* **Monolithique vs Microkernel** — Architecture

---

## Exemple

```bash
# Linux — voir la version du noyau
uname -r

# Lister les modules chargés
lsmod

# Charger un module
sudo modprobe vboxdrv

# Tracer les system calls
strace -c ls

# Messages du noyau
dmesg | tail
```

---

## Avantages

* Isolation des processus
* Gestion centralisée des ressources
* Abstraction du matériel
* Sécurité via privilèges
* Interopérabilité via API standard

---

## Inconvénients

* Bug dans le kernel = crash système (panic)
* Overhead des syscalls
* Complexité massive (Linux : 30M+ lignes)
* Attaques privilégiées catastrophiques

---

## Pièges courants

* Drivers propriétaires non à jour (NVIDIA legacy)
* Kernel panic mal diagnostiqués
* Syscalls en boucle serrée (syscall overhead)
* Ignorer les mises à jour de sécurité

---

## À ne pas confondre

* Noyau vs OS (composant central vs ensemble)
* Monolithique vs Microkernel (Linux vs Minix)
* User space vs Kernel space

---

## Explication simplifiée

Le noyau c'est le chef d'orchestre invisible de ton ordinateur. Quand tu ouvres un fichier, tu ne parles pas directement au disque dur — tu demandes au kernel, qui vérifie tes droits, organise l'accès au matériel, et te rend le contenu. Sans lui, chaque programme écraserait les autres.

---

## Explication avancée

Linux est monolithique modulaire : tout le code privilégié tourne dans un espace d'adressage unique pour la performance, mais des modules peuvent être chargés dynamiquement. Les microkernels (Minix, L4) déplacent les drivers en user space pour la robustesse, au prix d'IPCs coûteuses. eBPF permet d'exécuter du code sandboxé dans le kernel sans recompilation, révolutionnant l'observabilité (tracing) et le networking.

---

## Points critiques à retenir

* [CRITIQUE] Un bug kernel peut crasher tout le système
* [CRITIQUE] Les syscalls traversent le user/kernel boundary
* [IMPORTANT] Maintenir le kernel à jour (failles de sécurité)
* [IMPORTANT] eBPF pour l'observabilité moderne
* [PIÈGE] Boucles de syscalls = overhead énorme
