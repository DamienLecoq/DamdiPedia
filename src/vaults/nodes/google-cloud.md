---
id: google-cloud
label: Google Cloud
category: service
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:58:46.263Z'
updatedAt: '2026-04-14T17:58:46.263Z'
relations:
  - target: kubernetes
    type: related
    weight: 0.8
resources:
  - type: documentation
    title: Google Cloud Documentation
    url: 'https://cloud.google.com/docs'
  - type: cours
    title: Google Cloud Skills Boost
    url: 'https://www.cloudskillsboost.google/'
  - type: vidéo
    title: Google Cloud Tech YouTube
    url: 'https://www.youtube.com/googlecloudtech'
---

## Résumé rapide

Google Cloud Platform (GCP) est la plateforme cloud de Google, troisième en parts de marché. Elle excelle en data analytics, machine learning, Kubernetes et réseau global.

---

## Définition

GCP est une plateforme cloud publique construite sur l'infrastructure interne de Google (qui fait tourner Search, Gmail, YouTube), offrant compute, storage, databases, data analytics et services IA de pointe.

---

## Histoire

* App Engine lancé en 2008 (premier service)
* Compute Engine en 2013
* Open-source de Kubernetes en 2014 (issu de Borg)
* BigQuery devient la référence du data warehouse serverless
* Vertex AI unifie l'offre ML en 2021

---

## Objectif

* Offrir l'infrastructure Google au public
* Dominer le data analytics et ML
* Fournir des services Kubernetes-first
* Simplifier le big data via BigQuery

---

## Domaines d'utilisation

* Data analytics à grande échelle (BigQuery)
* Machine learning et IA (Vertex AI)
* Applications conteneurisées (GKE)
* Serverless (Cloud Run, Functions)

---

## Fonctionnement

* Infrastructure globale via le réseau privé de Google
* **Projects** — Isolation et facturation
* **IAM** — Gestion des permissions
* **Deployment Manager / Terraform** — IaC
* Services serverless privilégiés

---

## Concepts clés

* **BigQuery** — Data warehouse serverless
* **Cloud Run** — Containers serverless
* **GKE** — Google Kubernetes Engine
* **Vertex AI** — Plateforme ML unifiée
* **Cloud Storage** — Stockage objet
* **Cloud Functions** — Functions as a Service

---

## Exemple

```bash
# gcloud CLI : créer un projet
gcloud projects create mon-projet-123

# Déployer sur Cloud Run
gcloud run deploy mon-api \
  --image gcr.io/mon-projet/api:latest \
  --region europe-west1 \
  --allow-unauthenticated
```

---

## Avantages

* Réseau privé mondial ultra-performant
* BigQuery : data warehouse serverless exceptionnel
* Kubernetes natif et très mature
* Facturation par seconde (granulaire)
* Services IA de pointe (Gemini, Vertex)

---

## Inconvénients

* Moins de services que AWS
* Parts de marché plus faibles (moins d'experts)
* Documentation parfois incomplète en français
* Support entreprise historiquement plus faible

---

## Pièges courants

* Oublier des buckets Cloud Storage (facture continue)
* Permissions IAM héritées (principe d'héritage)
* Quotas par défaut parfois restrictifs
* BigQuery : scanner accidentellement des téraoctets

---

## À ne pas confondre

* Cloud Run vs GKE (serverless vs managed K8s)
* BigQuery vs Cloud SQL (analytics vs OLTP)
* Cloud Functions vs Cloud Run (functions vs containers)

---

## Explication simplifiée

Google Cloud c'est le cloud de Google, fait avec la même techno qui fait tourner YouTube et Gmail. Il est particulièrement bon pour analyser des téraoctets de données (BigQuery) et faire tourner des applications dans Kubernetes.

---

## Explication avancée

GCP bénéficie du réseau privé de Google (Jupiter, B4) offrant une latence mondiale exceptionnelle. BigQuery sépare compute et storage, permettant de scanner des PB en secondes. GKE est considéré comme l'implémentation Kubernetes de référence, puisque Google est le créateur du projet. Vertex AI unifie AutoML, entraînement custom, déploiement et monitoring.

---

## Points critiques à retenir

* [CRITIQUE] BigQuery facture au volume scanné — utiliser `LIMIT` et filtres
* [CRITIQUE] IAM hérite des policies parent — attention aux permissions
* [IMPORTANT] Cloud Run pour serverless simple, GKE pour besoins K8s
* [IMPORTANT] Labels pour le cost tracking
* [PIÈGE] Requêtes `SELECT *` sur BigQuery coûtent une fortune
