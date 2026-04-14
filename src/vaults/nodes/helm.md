---
id: helm
label: Helm
category: logiciel
priority: medium
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:58:51.863Z'
updatedAt: '2026-04-14T17:58:51.863Z'
relations:
  - target: kubernetes
    type: depends_on
    weight: 0.9
resources:
  - type: documentation
    title: Documentation officielle Helm
    url: 'https://helm.sh/docs/'
  - type: vidéo
    title: What is Helm in Kubernetes? – TechWorld with Nana
    url: 'https://www.youtube.com/watch?v=-ykwb1d0DXU'
  - type: documentation
    title: Artifact Hub – Registre de charts Helm
    url: 'https://artifacthub.io/'
  - type: blog
    title: Helm Best Practices
    url: 'https://helm.sh/docs/chart_best_practices/'
  - type: cours
    title: Helm for Kubernetes – Udemy
    url: >-
      https://www.udemy.com/course/helm-kubernetes-packaging-manager-for-developers-and-devops/
---

## Résumé rapide

Helm est le gestionnaire de paquets de Kubernetes. Il permet de définir, installer et mettre à jour des applications Kubernetes complexes grâce à des « charts », des paquets réutilisables contenant tous les manifestes nécessaires avec des valeurs configurables.

---

## Définition

Helm est un outil open source qui simplifie le déploiement et la gestion d'applications sur Kubernetes. Il utilise des « charts » (paquets pré-configurés) qui regroupent les manifestes Kubernetes avec un système de templates et de valeurs paramétrables.

---

## Histoire

* Créé en 2015 par Deis (racheté par Microsoft)
* Helm 2 utilisait un composant serveur (Tiller) dans le cluster
* Helm 3 (2019) a supprimé Tiller pour des raisons de sécurité
* Projet gradué de la CNCF
* Standard de facto pour le packaging Kubernetes

---

## Objectif

* Simplifier le déploiement d'applications Kubernetes complexes
* Permettre la réutilisation et le partage de configurations
* Gérer les versions et les rollbacks des déploiements
* Paramétrer les déploiements selon les environnements

---

## Domaines d'utilisation

* Déploiement d'applications sur Kubernetes
* Gestion de configurations multi-environnements (dev, staging, prod)
* Distribution d'applications open source pour Kubernetes
* Automatisation des déploiements dans les pipelines CI/CD
* Standardisation des déploiements en entreprise

---

## Fonctionnement

* Un chart contient des templates YAML et un fichier values.yaml
* Les templates utilisent le langage Go template
* Helm rend les templates en manifestes Kubernetes concrets
* Les releases sont versionnées et peuvent être rollbackées
* Les charts peuvent avoir des dépendances vers d'autres charts

---

## Concepts clés

* Chart : paquet Helm contenant templates et valeurs par défaut
* Release : instance d'un chart déployé dans un cluster
* Values : fichier de configuration pour personnaliser un chart
* Repository : dépôt de charts partagés
* Template : manifeste Kubernetes paramétrable avec Go template

---

## Exemple

```bash
# Ajouter un repository
helm repo add bitnami https://charts.bitnami.com/bitnami

# Installer une application
helm install mon-nginx bitnami/nginx --set replicaCount=3

# Avec un fichier de valeurs personnalisé
helm install mon-app ./mon-chart -f values-prod.yaml

# Mettre à jour
helm upgrade mon-app ./mon-chart -f values-prod.yaml

# Rollback
helm rollback mon-app 1
```

---

## Avantages

* Simplifie considérablement les déploiements Kubernetes
* Gestion des versions et rollback facile
* Réutilisation via les repositories de charts
* Paramétrage flexible via les fichiers de valeurs
* Large catalogue de charts communautaires (Artifact Hub)

---

## Inconvénients

* Le langage de template Go peut être complexe
* Débogage des templates parfois difficile
* Risque de charts mal maintenus dans les repositories publics
* Surcouche d'abstraction qui peut masquer les détails Kubernetes

---

## Pièges courants

* Ne pas versionner les charts et les fichiers de valeurs
* Utiliser des charts communautaires sans les auditer
* Oublier de gérer les secrets séparément (ne pas les mettre dans values.yaml)
* Ne pas tester les charts avec helm template avant de déployer
* Ignorer les hooks Helm pour les migrations de base de données

---

## À ne pas confondre

* Helm vs Kustomize : Helm utilise des templates, Kustomize des overlays
* Chart vs manifeste : un chart est un paquet de manifestes paramétrables
* Release vs Deployment : une release est un concept Helm, un Deployment est un objet Kubernetes
* Helm 2 vs Helm 3 : Helm 3 n'utilise plus Tiller

---

## Explication simplifiée

Helm est comme un installateur d'applications pour Kubernetes. Au lieu de créer manuellement tous les fichiers de configuration, on utilise un « chart » qui contient tout ce qu'il faut, et on peut personnaliser les réglages selon ses besoins.

---

## Explication avancée

Helm fonctionne comme un moteur de rendu de templates côté client. Les charts définissent des templates Go qui sont rendus avec les valeurs fournies pour produire des manifestes Kubernetes valides. Helm 3 stocke les métadonnées des releases dans des Secrets Kubernetes (par défaut) dans le namespace cible. Le mécanisme de dépendances permet de composer des applications complexes à partir de sous-charts. Les hooks permettent d'exécuter des actions à des moments précis du cycle de vie (pre-install, post-upgrade, etc.).

---

## Points critiques à retenir

* [CRITIQUE] Helm est le gestionnaire de paquets standard pour Kubernetes
* [CRITIQUE] Les charts encapsulent des templates et des valeurs configurables
* [IMPORTANT] Helm 3 a supprimé Tiller et fonctionne côté client uniquement
* [IMPORTANT] Toujours versionner les charts et utiliser des fichiers de valeurs par environnement
* [PIÈGE] Ne jamais stocker de secrets dans values.yaml
* [PIÈGE] Toujours auditer les charts communautaires avant utilisation
