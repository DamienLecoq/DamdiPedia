---
id: gitlab-ci
label: GitLab CI
category: service
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:58:44.141Z'
updatedAt: '2026-04-14T17:58:44.141Z'
relations: []
resources:
  - type: documentation
    title: GitLab CI/CD Documentation
    url: 'https://docs.gitlab.com/ee/ci/'
  - type: cours
    title: GitLab CI/CD Course – TechWorld with Nana
    url: 'https://www.youtube.com/watch?v=qP8kir2GUgo'
  - type: blog
    title: GitLab Pipeline Efficiency
    url: 'https://docs.gitlab.com/ee/ci/pipelines/pipeline_efficiency.html'
---

## Résumé rapide

GitLab CI est la solution CI/CD intégrée à GitLab, permettant de définir des pipelines YAML (`.gitlab-ci.yml`) exécutés sur des runners hébergés ou self-hosted, avec une excellente intégration au reste de GitLab.

---

## Définition

GitLab CI est un outil d'intégration et de déploiement continus qui lit un fichier `.gitlab-ci.yml` à la racine du projet, définit des stages et des jobs exécutés sur des runners, et intègre les résultats directement dans l'UI GitLab.

---

## Histoire

* Intégré à GitLab depuis 2012
* Runners open-source en Go
* Auto DevOps en 2017
* Devient l'une des solutions CI/CD les plus complètes
* Concurrencé par GitHub Actions

---

## Objectif

* Automatiser build, test, déploiement
* Intégrer CI/CD dans la plateforme Git
* Supporter les runners self-hosted
* Offrir une approche DevOps complète
* Faciliter la conformité et la sécurité

---

## Domaines d'utilisation

* CI/CD de tous types de projets
* Pipelines multi-environnements
* Compliance et audit
* Auto DevOps (CI par défaut)
* Monorepos et projets multi-services

---

## Fonctionnement

* `.gitlab-ci.yml` définit stages et jobs
* Runners (shell, Docker, K8s) exécutent les jobs
* Stages s'exécutent séquentiellement
* Jobs d'un même stage en parallèle
* Artefacts et cache partagés entre jobs

---

## Concepts clés

* **Pipeline** — Exécution complète d'un run
* **Stage** — Groupe séquentiel de jobs
* **Job** — Unité d'exécution
* **Runner** — Agent exécutant les jobs
* **Artifact** — Fichier produit, partagé aux jobs suivants
* **Cache** — Réutilisation d'outils/deps

---

## Exemple

```yaml
stages:
  - build
  - test
  - deploy

variables:
  NODE_VERSION: '20'

default:
  image: node:20-alpine
  cache:
    paths: [node_modules/]

install:
  stage: build
  script:
    - npm ci
  artifacts:
    paths: [node_modules/]

test:
  stage: test
  needs: [install]
  script:
    - npm test

deploy_prod:
  stage: deploy
  needs: [test]
  only: [main]
  script:
    - ./deploy.sh
  environment:
    name: production
    url: https://app.example.com
```

---

## Avantages

* Intégré nativement à GitLab
* Runners auto-hostables (contrôle total)
* Pipelines déclaratifs puissants
* Environments et deployments natifs
* Security scans intégrés (SAST, DAST)
* Monorepo-friendly

---

## Inconvénients

* Couplage GitLab
* YAML complexe sur pipelines larges
* Runners à maintenir (si self-hosted)
* Debugging parfois difficile
* Quota selon le plan

---

## Pièges courants

* Cache partagé non versionné (deps obsolètes)
* `only`/`rules` non à jour
* Secrets exposés dans les logs
* Runners partagés entre projets critiques
* Artefacts trop volumineux

---

## À ne pas confondre

* GitLab CI vs GitHub Actions (similaires, plateformes différentes)
* Stage vs Job
* Cache vs Artifact (optimisation vs passage de données)

---

## Explication simplifiée

GitLab CI c'est le système automatique qui prend ton code à chaque push : il le build, lance les tests, scanne la sécurité, et si tout va bien, le déploie. Tu décris tout ça dans un simple fichier YAML à la racine du projet.

---

## Explication avancée

GitLab CI exécute les jobs via des runners indépendants (shell, Docker executor le plus courant, Kubernetes executor pour les gros clusters). Le cache distingué de l'artifact : le premier est une optimisation (peut être perdu), le second est une garantie (passé aux jobs suivants). Les `rules` remplacent `only/except` et permettent des conditions complexes. Parent-child pipelines et Multi-project pipelines orchestrent des workflows complexes. GitLab intègre nativement SAST, DAST, secret detection, dependency scanning sans configuration.

---

## Points critiques à retenir

* [CRITIQUE] Masquer les secrets (jamais dans les logs)
* [CRITIQUE] Pinner les versions d'images et de tools
* [IMPORTANT] Cache pour speed, Artifacts pour passage entre jobs
* [IMPORTANT] `needs:` pour paralléliser hors stages
* [PIÈGE] Runners partagés = isolation à vérifier
