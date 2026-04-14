---
id: npm
label: npm
category: logiciel
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:59:26.117Z'
updatedAt: '2026-04-14T17:59:26.117Z'
relations:
  - target: nodejs
    type: part_of
    weight: 0.95
  - target: javascript
    type: related
    weight: 0.8
resources:
  - type: documentation
    title: npm Documentation
    url: 'https://docs.npmjs.com/'
  - type: blog
    title: npm Blog
    url: 'https://github.blog/tag/npm/'
  - type: cours
    title: npm Crash Course – Traversy Media
    url: 'https://www.youtube.com/watch?v=jHDhaSSKmB0'
---

## Résumé rapide

npm (Node Package Manager) est le gestionnaire de paquets par défaut de Node.js, hébergeant le plus grand registre de bibliothèques au monde avec plus de 2 millions de packages.

---

## Définition

npm est à la fois un CLI pour gérer les dépendances d'un projet JavaScript/Node.js, un registre public de packages, et un format de manifeste (`package.json`) décrivant un projet, ses dépendances et ses scripts.

---

## Histoire

* Créé par Isaac Schlueter en 2010
* Acquis par GitHub en 2020, puis par Microsoft
* `package-lock.json` introduit en 2017 (npm 5)
* Workspaces ajoutés en 2020 (npm 7)
* Concurrencé par Yarn puis pnpm

---

## Objectif

* Installer et gérer les dépendances JavaScript
* Publier et distribuer des packages
* Exécuter des scripts de build/test
* Verrouiller les versions pour reproductibilité

---

## Domaines d'utilisation

* Tous les projets Node.js et JavaScript modernes
* Frontend (React, Vue, Angular)
* Backend (Express, NestJS)
* CLI tools et outils de build

---

## Fonctionnement

* `package.json` — Manifeste du projet
* `package-lock.json` — Versions figées
* `node_modules/` — Dépendances installées
* Résolution de versions via semver
* Scripts exécutés via `npm run`

---

## Concepts clés

* **package.json** — Manifeste (nom, version, deps, scripts)
* **package-lock.json** — Lockfile reproductible
* **semver** — Versioning sémantique (major.minor.patch)
* **dependencies / devDependencies** — Runtime vs dev
* **Workspaces** — Monorepo natif
* **Scope** — `@org/package` pour l'organisation

---

## Exemple

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "test": "vitest"
  },
  "dependencies": {
    "react": "^18.3.0",
    "axios": "^1.6.0"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "vitest": "^1.0.0"
  }
}
```

```bash
npm install        # Installe toutes les deps
npm install axios  # Ajoute une dep
npm run build      # Exécute le script build
npm ci             # Install reproductible (CI)
npm audit          # Scan de failles
```

---

## Avantages

* Plus grand registre de packages au monde
* Inclus nativement avec Node.js
* Scripts intégrés
* Workspaces pour monorepos
* Audit de sécurité intégré

---

## Inconvénients

* `node_modules` souvent énorme
* Historique de failles dans les packages
* Performance inférieure à pnpm
* Résolution de deps parfois instable
* `package-lock.json` peut générer des conflits

---

## Pièges courants

* `npm install` au lieu de `npm ci` en CI
* Ne pas commiter le lockfile
* Installer des packages en global sans besoin
* Ignorer les warnings `npm audit`
* Installer des deps avec `* ` ou `latest`

---

## À ne pas confondre

* npm vs Yarn vs pnpm (gestionnaires alternatifs)
* dependencies vs devDependencies
* `npm install` vs `npm ci`

---

## Explication simplifiée

npm c'est l'app store pour ton projet JavaScript. Tu écris dans un fichier ce dont ton projet a besoin (React, axios…), tu tapes `npm install`, et npm télécharge tout et gère les versions pour toi.

---

## Explication avancée

npm utilise un algorithme de résolution hoisting : les dépendances communes sont remontées à la racine de `node_modules` pour éviter la duplication, au prix d'un graphe plat parfois non déterministe. Le lockfile fige précisément les versions installées. Les supply chain attacks (typosquatting, dependency confusion, compromission de mainteneur) sont un vecteur réel, d'où l'importance de `npm audit`, des scopes privés, et des SBOM. Les alternatives pnpm (content-addressable store) et Yarn Berry (PnP) résolvent différemment le problème.

---

## Points critiques à retenir

* [CRITIQUE] `npm ci` en CI, pas `npm install`
* [CRITIQUE] Commiter le lockfile, toujours
* [IMPORTANT] `npm audit` régulièrement
* [IMPORTANT] Pinner les versions critiques
* [PIÈGE] Attaques supply chain fréquentes
