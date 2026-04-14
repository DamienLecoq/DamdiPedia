---
id: github-actions
label: GitHub Actions
category: service
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:58:43.023Z'
updatedAt: '2026-04-14T17:58:43.023Z'
relations:
  - target: github
    type: part_of
    weight: 0.9
resources:
  - type: documentation
    title: GitHub Actions Documentation
    url: 'https://docs.github.com/en/actions'
  - type: vidéo
    title: GitHub Actions Tutorial – TechWorld with Nana
    url: 'https://www.youtube.com/watch?v=R8_veQiYBjI'
  - type: autre
    title: Awesome Actions
    url: 'https://github.com/sdras/awesome-actions'
---

## Résumé rapide

GitHub Actions est la plateforme CI/CD intégrée à GitHub, permettant d'automatiser les workflows de build, test et déploiement directement depuis le dépôt via des fichiers YAML.

---

## Définition

GitHub Actions est un système d'automatisation basé sur des événements (push, PR, schedule) qui exécute des workflows définis en YAML, composés de jobs et de steps tournant sur des runners GitHub-hosted ou self-hosted.

---

## Histoire

* Annoncé en octobre 2018
* Lancé en novembre 2019
* Devient gratuit pour les repos publics
* Marketplace avec des milliers d'actions communautaires
* Standard CI/CD pour les projets open-source

---

## Objectif

* Intégrer CI/CD directement dans GitHub
* Automatiser build, test, release, deploy
* Offrir un écosystème d'actions réutilisables
* Supporter tous les langages et plateformes

---

## Domaines d'utilisation

* Intégration continue (build + test)
* Déploiement continu (staging, production)
* Automatisation de releases et tags
* Linting, sécurité (CodeQL), dependency updates

---

## Fonctionnement

* Workflows en YAML dans `.github/workflows/`
* Déclenchés par des événements (push, PR, cron)
* **Job** — Groupe de steps sur un runner
* **Step** — Commande shell ou `uses: action@v1`
* **Runner** — Machine qui exécute le job

---

## Concepts clés

* **Workflow** — Fichier YAML complet
* **Job** — Ensemble de steps, exécuté en parallèle par défaut
* **Step** — Action individuelle (shell ou action réutilisable)
* **Action** — Composant réutilisable depuis Marketplace
* **Runner** — ubuntu-latest, windows-latest, macos-latest, self-hosted
* **Secrets** — Variables chiffrées (API keys, tokens)

---

## Exemple

```yaml
name: CI
on:
  push:
    branches: [main]
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm test
      - run: npm run build
```

---

## Avantages

* Intégré nativement à GitHub
* Gratuit pour les repos publics
* Marketplace avec milliers d'actions
* Support matrix builds (multi-versions)
* Runners hébergés ou self-hosted

---

## Inconvénients

* Quotas limités sur repos privés gratuits
* Débogage local limité (act partiel)
* Couplage fort à GitHub
* Secrets scoping parfois complexe

---

## Pièges courants

* Secrets loggés par erreur dans les outputs
* Utiliser `@main` au lieu de version pinned (supply chain)
* Permissions GITHUB_TOKEN trop larges
* Workflows qui se déclenchent en boucle

---

## À ne pas confondre

* GitHub Actions vs Jenkins (serverless vs serveur dédié)
* GitHub Actions vs GitLab CI (plateforme-spécifique)
* Action vs Workflow

---

## Explication simplifiée

GitHub Actions c'est le robot qui fait le travail répétitif à ta place : à chaque push, il build ton projet, lance les tests, et si tout passe, il peut même déployer en production. Le tout défini dans un simple fichier YAML.

---

## Explication avancée

GitHub Actions orchestre des jobs via un graphe de dépendances (needs) sur des runners isolés. Chaque action peut être une image Docker, du JavaScript ou une composite action. Le GITHUB_TOKEN a des permissions limitées au repo. Les secrets sont chiffrés au repos de l'organisation, injectés au runtime sans être loggés.

---

## Points critiques à retenir

* [CRITIQUE] Pinner les actions (`@v4` minimum, idéalement SHA complet)
* [CRITIQUE] Ne jamais logger les secrets
* [IMPORTANT] `permissions:` minimales sur GITHUB_TOKEN
* [IMPORTANT] Matrix pour tester multi-versions
* [PIÈGE] Workflows qui se déclenchent mutuellement (boucle)
