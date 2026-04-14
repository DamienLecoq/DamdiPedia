---
id: pnpm
label: pnpm
category: logiciel
priority: medium
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:59:36.587Z'
updatedAt: '2026-04-14T17:59:36.587Z'
relations:
  - target: npm
    type: related
    weight: 0.9
  - target: nodejs
    type: part_of
    weight: 0.8
resources:
  - type: documentation
    title: pnpm Documentation
    url: 'https://pnpm.io/'
  - type: blog
    title: Why pnpm?
    url: 'https://pnpm.io/motivation'
  - type: vidéo
    title: pnpm Crash Course
    url: 'https://www.youtube.com/watch?v=8h5vIX5IZNQ'
---

## Résumé rapide

pnpm est un gestionnaire de paquets JavaScript alternatif à npm, plus rapide et économe en espace disque grâce à un store content-addressable partagé entre projets via hardlinks.

---

## Définition

pnpm (performant npm) utilise un store global unique sur le disque où chaque version de chaque package est stockée une seule fois. Les `node_modules` de chaque projet utilisent des hardlinks et symlinks vers ce store, réduisant drastiquement l'espace et le temps d'installation.

---

## Histoire

* Créé par Zoltan Kochan en 2016
* Adopté par Vue, Vite, Prisma, Next.js (team)
* Support des workspaces excellents
* Devient l'alternative préférée à npm/Yarn en 2022+
* Performances reconnues dans les monorepos

---

## Objectif

* Réduire l'espace disque via store partagé
* Accélérer les installations (parallélisme, cache)
* Garantir une résolution stricte des dépendances
* Supporter naturellement les monorepos

---

## Domaines d'utilisation

* Monorepos à multiples packages
* Projets avec beaucoup de dépendances
* CI/CD où la vitesse compte
* Développeurs multi-projets

---

## Fonctionnement

* Store global (`~/.pnpm-store/`) unique
* `node_modules` avec hardlinks vers le store
* Structure non-flat (stricte)
* Workspaces intégrés
* Lockfile `pnpm-lock.yaml`

---

## Concepts clés

* **Content-addressable store** — Stocké une fois, lié N fois
* **Hardlink** — Lien au niveau système de fichiers
* **Non-flat node_modules** — Seules les deps déclarées sont accessibles
* **Workspaces** — Monorepo natif via `pnpm-workspace.yaml`
* **Filters** — Opérations ciblées (`--filter`)

---

## Exemple

```yaml
# pnpm-workspace.yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

```bash
pnpm install              # Installation initiale
pnpm add lodash           # Ajouter une dep
pnpm add -D typescript    # Dev dep
pnpm --filter web build   # Build uniquement le package "web"
pnpm -r test              # Tests sur tout le workspace
```

---

## Avantages

* Économie disque massive (jusqu'à 10x)
* Installation plus rapide que npm
* Résolution stricte (évite les deps phantom)
* Workspaces de premier ordre
* Compatible avec package.json standard

---

## Inconvénients

* Moins universellement supporté (certains tools cassent)
* Layout non-flat surprenant
* Certaines CI nécessitent setup spécifique
* Hardlinks limités sur certains FS (exFAT)

---

## Pièges courants

* Outils attendant node_modules plat (ex : anciens bundlers)
* Oublier d'activer corepack
* Monter un volume Docker qui casse les hardlinks
* `pnpm install` en CI au lieu de `--frozen-lockfile`

---

## À ne pas confondre

* pnpm vs npm (store partagé vs copies)
* pnpm vs Yarn (hardlinks vs hoist/PnP)
* Hardlink vs Symlink

---

## Explication simplifiée

pnpm c'est npm en plus malin : au lieu de copier les mêmes packages dans chaque projet, il les stocke une seule fois sur ton disque et crée des raccourcis. Résultat : 10x moins d'espace et installation plus rapide.

---

## Explication avancée

Le store pnpm est content-addressable : chaque fichier est indexé par son hash, garantissant l'unicité. Les hardlinks exposent ces fichiers dans les `node_modules` des projets sans duplication ni coût de copie. Le layout non-flat (chaque package n'accède qu'à ses propres deps déclarées) élimine les "phantom dependencies" — un bug où un package utilise une dépendance qu'il n'a pas déclarée. pnpm offre d'excellentes primitives monorepo avec `--filter` et parallélisation des tâches.

---

## Points critiques à retenir

* [CRITIQUE] `pnpm install --frozen-lockfile` en CI
* [CRITIQUE] Docker : attention aux hardlinks entre stages
* [IMPORTANT] Activer via corepack pour lock la version
* [IMPORTANT] Filters pour monorepos (`--filter`)
* [PIÈGE] Certains outils legacy cassent sur node_modules non-flat
