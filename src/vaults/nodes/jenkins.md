---
id: jenkins
label: Jenkins
category: logiciel
priority: medium
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:59:00.833Z'
updatedAt: '2026-04-14T17:59:00.833Z'
relations: []
resources:
  - type: documentation
    title: Jenkins Documentation
    url: 'https://www.jenkins.io/doc/'
  - type: cours
    title: Jenkins Tutorial – TechWorld with Nana
    url: 'https://www.youtube.com/watch?v=7KCS70sCoK0'
  - type: livre
    title: Jenkins 2 Up & Running
    url: 'https://www.oreilly.com/library/view/jenkins-2-up/9781491979587/'
---

## Résumé rapide

Jenkins est un serveur d'intégration continue open-source écrit en Java, pionnier du CI/CD, avec un écosystème massif de plugins et la possibilité de définir des pipelines en code (Jenkinsfile).

---

## Définition

Jenkins est une plateforme d'automatisation extensible qui exécute des pipelines de build, test et déploiement en réponse à des événements (push Git, webhook, cron). Elle orchestre des agents distribués pour exécuter les jobs.

---

## Histoire

* Fork de Hudson en 2011 (dispute avec Oracle)
* Projet historique du CI open-source
* Pipeline as Code (Jenkinsfile) en 2016
* Concurrencé par GitHub Actions, GitLab CI, CircleCI
* Toujours très présent en entreprise

---

## Objectif

* Automatiser le build, les tests et les déploiements
* Intégrer n'importe quel outil via plugins
* Exécuter sur infrastructure self-hosted
* Supporter des pipelines complexes multi-étapes

---

## Domaines d'utilisation

* CI/CD d'applications Java, legacy, multi-langages
* Pipelines complexes avec orchestration fine
* Environnements on-premise stricts
* Organisations à politique de sécurité forte

---

## Fonctionnement

* **Master** — Coordinateur et UI
* **Agents** — Workers exécutant les jobs
* **Jenkinsfile** — Pipeline en code (Groovy)
* **Plugins** — Extensions (>1800 disponibles)
* **Déclaratif ou scripté** — Deux syntaxes de pipeline

---

## Concepts clés

* **Job** — Unité d'automatisation
* **Pipeline** — Séquence de stages
* **Stage** — Étape logique (Build, Test, Deploy)
* **Node / Agent** — Machine exécutant un job
* **Plugin** — Extension du cœur
* **Shared Library** — Code pipeline réutilisable

---

## Exemple

```groovy
// Jenkinsfile déclaratif
pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh 'npm ci'
        sh 'npm run build'
      }
    }
    stage('Test') {
      steps {
        sh 'npm test'
      }
    }
    stage('Deploy') {
      when { branch 'main' }
      steps {
        sh './deploy.sh'
      }
    }
  }
  post {
    failure { mail to: 'team@ex.com', subject: 'Build failed' }
  }
}
```

---

## Avantages

* Écosystème plugins énorme
* Self-hosted (contrôle total)
* Pipeline as Code
* Multi-langages et multi-plateformes
* Communauté mature

---

## Inconvénients

* UI datée
* Maintenance lourde (updates, plugins cassants)
* Sécurité complexe (CVEs fréquents)
* Configuration legacy via UI
* Moins adapté au cloud-native

---

## Pièges courants

* Plugins obsolètes créant des failles
* Jobs freestyle non versionnés
* Credentials stockés en clair
* Master surchargé (pas d'agents)

---

## À ne pas confondre

* Jenkins vs GitHub Actions (self-hosted vs intégré GitHub)
* Master vs Agent
* Declarative vs Scripted pipeline

---

## Explication simplifiée

Jenkins c'est le vieux sage du CI/CD : il existe depuis longtemps, il sait tout faire (avec des plugins), il tourne sur tes propres serveurs. En contrepartie, il faut l'entretenir comme un jardin — les plugins qui deviennent obsolètes, les mises à jour, la sécurité.

---

## Explication avancée

Jenkins repose sur un master coordonnant des agents distribués (SSH, JNLP, Kubernetes). Le Pipeline as Code via Jenkinsfile a modernisé l'outil, mais l'héritage des jobs freestyle reste courant. Les shared libraries Groovy permettent de factoriser les patterns de pipeline. L'écosystème plugin est à double tranchant : très extensible mais source de CVEs fréquents et de casses lors des upgrades. Kubernetes plugin permet d'exécuter des agents éphémères dans un cluster, alignant Jenkins avec le cloud-native.

---

## Points critiques à retenir

* [CRITIQUE] Maintenir plugins à jour (sécurité)
* [CRITIQUE] Pipeline as Code (Jenkinsfile) versionné
* [IMPORTANT] Agents distribués, master non surchargé
* [IMPORTANT] Credentials plugin, jamais en clair
* [PIÈGE] Plugins obsolètes = dette + failles
