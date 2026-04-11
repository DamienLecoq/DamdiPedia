---
id: git
label: Git
category: logiciel
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-11T14:14:44.215Z'
updatedAt: '2026-04-11T14:15:05.868Z'
relations:
  - target: linux
    type: related
    weight: 0.7
  - target: json
    type: related
    weight: 0.5
resources:
  - type: documentation
    title: Documentation officielle Git
    url: 'https://git-scm.com/doc'
  - type: documentation
    title: Git Reference
    url: 'https://git-scm.com/docs'
  - type: vidéo
    title: freeCodeCamp – Git & GitHub Full Course
    url: 'https://www.youtube.com/watch?v=RGOj5yH7evk'
  - type: vidéo
    title: Fireship – Git in 100 Seconds
    url: 'https://www.youtube.com/watch?v=hwP7WQkmECE'
  - type: blog
    title: Atlassian – Git Tutorials
    url: 'https://www.atlassian.com/git/tutorials'
  - type: blog
    title: GitHub Blog
    url: 'https://github.blog/'
  - type: cours
    title: Codecademy – Learn Git
    url: 'https://www.codecademy.com/learn/learn-git'
  - type: livre
    title: Pro Git – Scott Chacon
    url: 'https://git-scm.com/book/fr/v2'
  - type: autre
    title: Learn Git Branching – Exercices visuels
    url: 'https://learngitbranching.js.org/?locale=fr_FR'
  - type: autre
    title: 'Oh Shit, Git!?! – Guide de secours'
    url: 'https://ohshitgit.com/'
---

## Résumé rapide

Git est le système de contrôle de version distribué le plus utilisé au monde. Il permet de suivre l'historique des modifications du code, de collaborer en équipe via des branches, et de revenir à n'importe quel état précédent du projet.

---

## Définition

Git est un système de contrôle de version distribué (DVCS) qui enregistre les modifications de fichiers au fil du temps, permettant de rappeler des versions antérieures, de travailler en parallèle via des branches, et de fusionner les contributions de plusieurs développeurs.

---

## Histoire

* Créé en 2005 par Linus Torvalds pour le développement du noyau Linux
* Remplace BitKeeper après un conflit de licence
* Conçu pour la vitesse, l'intégrité et le support du développement distribué
* GitHub (2008), GitLab et Bitbucket popularisent Git massivement
* Aujourd'hui utilisé par 90%+ des développeurs

---

## Objectif

* Tracer chaque modification du code source
* Permettre le travail en parallèle (branches)
* Faciliter la collaboration en équipe (merge, pull requests)
* Garantir l'intégrité de l'historique (hashes SHA)

---

## Domaines d'utilisation

* Développement logiciel (tout langage, tout projet)
* Documentation et sites web (Markdown, Hugo, Jekyll)
* Infrastructure as Code (Terraform, Ansible)
* Data science (versioning de notebooks, datasets)

---

## Fonctionnement

* Chaque développeur a une **copie complète** du dépôt (distribué)
* Les modifications sont regroupées en **commits** (snapshots)
* Chaque commit est identifié par un **hash SHA-1**
* Les **branches** permettent de travailler en parallèle
* Le **merge** combine les branches, Git résout les conflits automatiquement quand possible

---

## Concepts clés

* **Repository** — Dépôt contenant l'historique complet du projet
* **Commit** — Snapshot des modifications avec un message descriptif
* **Branch** — Ligne de développement indépendante
* **Merge** — Fusion de deux branches
* **Remote** — Dépôt distant (GitHub, GitLab, Bitbucket)
* **Staging area (index)** — Zone de préparation des modifications avant commit

---

## Exemple

```bash
# Initialiser un dépôt
git init

# Workflow quotidien
git add fichier.js          # Ajouter au staging
git commit -m "Fix login"   # Créer un commit
git push origin main        # Envoyer au remote

# Branches
git checkout -b feature     # Créer et basculer sur une branche
git merge feature           # Fusionner feature dans la branche courante

# Historique
git log --oneline --graph   # Visualiser l'historique
git diff HEAD~1             # Voir les dernières modifications
```

---

## Structure / Architecture

* **Working directory** — Fichiers sur le disque (état actuel)
* **Staging area (index)** — Fichiers préparés pour le prochain commit
* **Local repository** — Historique complet en local (.git/)
* **Remote repository** — Dépôt partagé (GitHub, GitLab)

---

## Workflows courants

* **Feature branching** — Une branche par fonctionnalité
* **Git Flow** — Branches develop, release, hotfix (complexe)
* **Trunk-based** — Commits directs sur main, feature flags
* **Forking** — Fork + pull request (open source)

---

## Avantages

* Distribué (chaque clone est un backup complet)
* Branches ultra-légères et rapides
* Historique complet et intègre (SHA)
* Écosystème riche (GitHub, GitLab, hooks, CI/CD)
* Standard universel

---

## Inconvénients

* Courbe d'apprentissage pour les concepts avancés
* Messages d'erreur parfois cryptiques
* Gestion des fichiers binaires peu efficace
* L'historique peut devenir complexe (merge spaghetti)

---

## Pièges courants

* `git push --force` sur main (écrase l'historique des autres)
* Committer des secrets (mots de passe, clés API) → difficile à supprimer
* Gros fichiers binaires dans le dépôt (utiliser Git LFS)
* Ne pas committer assez souvent (gros commits monolithiques)
* Merge conflicts mal résolus (code cassé)

---

## À ne pas confondre

* Git vs GitHub (outil vs plateforme)
* Merge vs rebase (fusion avec commit vs réécriture linéaire)
* Pull vs fetch (fetch + merge vs fetch seul)
* Reset vs revert (réécrire l'historique vs créer un commit inverse)

---

## Explication simplifiée

Git c'est comme un "Ctrl+Z" surpuissant pour ton code : il enregistre chaque modification que tu fais, te permet de revenir en arrière, et de travailler à plusieurs sur le même projet sans écraser le travail des autres.

---

## Explication avancée

Git modélise l'historique comme un DAG (Directed Acyclic Graph) de commits. Chaque commit pointe vers un arbre (tree) qui référence des blobs (contenu des fichiers) et d'autres trees. Les objets sont stockés dans un content-addressable store (.git/objects) indexé par hash SHA-1. Les branches sont de simples pointeurs vers des commits (fichiers de 40 octets dans .git/refs/), ce qui rend le branching O(1). Le merge utilise un algorithme three-way basé sur l'ancêtre commun.

---

## Points critiques à retenir

* [CRITIQUE] Git est distribué : chaque clone contient l'historique complet
* [CRITIQUE] Commit = snapshot, pas un diff (même si `git diff` montre des diffs)
* [IMPORTANT] Staging area = étape intermédiaire entre le working dir et le commit
* [IMPORTANT] Ne jamais `push --force` sur une branche partagée
* [PIÈGE] Secrets commités = dans l'historique pour toujours (même après suppression)
* [PIÈGE] `git reset --hard` = perte de travail non-commité, irréversible
