---
id: github
label: GitHub
category: service
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:58:41.856Z'
updatedAt: '2026-04-14T17:58:41.856Z'
relations:
  - targetId: git
    type: depends
    description: Plateforme d'hébergement construite sur Git
resources:
  - type: documentation
    title: Documentation officielle GitHub
    url: 'https://docs.github.com/fr'
  - type: vidéo
    title: Fireship – GitHub Pull Request in 100 Seconds
    url: 'https://www.youtube.com/watch?v=8lGpZkjnkt4'
  - type: blog
    title: GitHub Blog
    url: 'https://github.blog/'
  - type: cours
    title: GitHub Skills – Cours interactifs
    url: 'https://skills.github.com/'
  - type: documentation
    title: GitHub Actions Documentation
    url: 'https://docs.github.com/fr/actions'
---

## Résumé rapide

GitHub est la plus grande plateforme d'hébergement de code source au monde, basée sur Git. Elle offre la collaboration via les pull requests, la CI/CD avec GitHub Actions, la gestion de projets et un écosystème complet pour le développement open source et professionnel.

---

## Définition

GitHub est une plateforme web d'hébergement et de collaboration pour le développement logiciel, utilisant Git comme système de contrôle de version. Elle fournit l'hébergement de dépôts, les pull requests pour la revue de code, les issues pour le suivi de bugs, GitHub Actions pour la CI/CD, et GitHub Packages pour la distribution d'artefacts.

---

## Histoire

* Fondé en 2008 par Tom Preston-Werner, Chris Wanstrath et PJ Hyett
* Croissance explosive grâce à l'open source (Linux, Rails, Node.js)
* Rachat par Microsoft en 2018 pour 7,5 milliards de dollars
* Lancement de GitHub Actions (CI/CD) en 2019
* GitHub Copilot (IA) lancé en 2021
* Plus de 100 millions de développeurs en 2023

---

## Objectif

* Héberger du code source avec Git de manière fiable et accessible
* Faciliter la collaboration via les pull requests et la revue de code
* Fournir une plateforme CI/CD intégrée (GitHub Actions)
* Être le hub central de l'écosystème open source mondial

---

## Domaines d'utilisation

* Hébergement de projets open source
* Développement collaboratif en entreprise (GitHub Enterprise)
* CI/CD et automatisation (GitHub Actions)
* Gestion de projet (Issues, Projects, Milestones)

---

## Fonctionnement

* **Repositories** : hébergement de dépôts Git avec interface web
* **Pull Requests** : proposition de changements avec revue de code, discussions et CI
* **GitHub Actions** : workflows CI/CD déclenchés par des événements (push, PR, cron)
* **Issues** : suivi de bugs et de fonctionnalités avec labels et assignation
* **GitHub Pages** : hébergement de sites statiques directement depuis un dépôt

---

## Concepts clés

* **Repository** — Dépôt Git hébergé sur GitHub (public ou privé)
* **Pull Request (PR)** — Demande de fusion d'une branche avec revue de code
* **Issue** — Ticket de suivi (bug, feature, question)
* **GitHub Actions** — Système de CI/CD basé sur des workflows YAML
* **Fork** — Copie d'un dépôt pour contribuer sans accès direct
* **GitHub Pages** — Hébergement gratuit de sites statiques

---

## Exemple

```yaml
# .github/workflows/ci.yml — Workflow CI basique
name: CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm test
```

---

## Avantages

* Plateforme la plus populaire (effet réseau pour l'open source)
* GitHub Actions : CI/CD puissant et gratuit pour les projets publics
* Écosystème riche (Copilot, Pages, Packages, Security)
* Interface intuitive pour la revue de code et la collaboration
* Gratuit pour les dépôts publics et privés (limites sur Actions)

---

## Inconvénients

* Propriété de Microsoft (inquiétudes sur la dépendance)
* GitHub Actions peut devenir coûteux pour les projets privés intensifs
* Fonctionnalités de gestion de projet moins avancées que Jira
* Pannes occasionnelles qui impactent des millions de développeurs

---

## Pièges courants

* Committer des secrets (clés API, mots de passe) dans un dépôt public
* Ne pas protéger la branche main (push direct sans PR review)
* Ignorer les alertes de sécurité Dependabot
* Workflows GitHub Actions qui tournent en boucle (mauvaise configuration des triggers)

---

## À ne pas confondre

* GitHub vs Git (plateforme vs outil de versioning)
* GitHub vs GitLab (plateformes concurrentes, architectures différentes)
* GitHub Actions vs Jenkins (CI/CD intégré vs CI/CD auto-hébergé)
* Fork vs Clone (copie sur GitHub vs copie locale)

---

## Explication simplifiée

GitHub c'est comme un réseau social pour le code : tu y stockes tes projets, tu collabores avec d'autres développeurs, et tu peux proposer des améliorations à n'importe quel projet public. Les pull requests sont comme des propositions de changement que l'équipe peut discuter et approuver.

---

## Explication avancée

GitHub est une plateforme SaaS construite sur Git qui ajoute une couche de collaboration (PR, issues, discussions), d'automatisation (Actions, webhooks) et de sécurité (Dependabot, code scanning, secret scanning). GitHub Actions utilise des runners (machines virtuelles) qui exécutent des workflows définis en YAML, déclenchés par des événements GitHub. L'API REST et GraphQL permettent une intégration programmatique complète. Les GitHub Apps utilisent le protocole OAuth pour interagir avec les dépôts de manière sécurisée.

---

## Points critiques à retenir

* [CRITIQUE] Ne jamais committer de secrets dans un dépôt (même privé, utiliser les Secrets)
* [CRITIQUE] Protéger la branche main avec des branch protection rules
* [IMPORTANT] GitHub Actions est gratuit pour les projets publics (limité pour les privés)
* [IMPORTANT] Les pull requests sont le cœur du workflow collaboratif
* [PIÈGE] Un secret commité dans l'historique Git reste accessible même après suppression
* [PIÈGE] Attention aux permissions des GitHub Apps et Personal Access Tokens
