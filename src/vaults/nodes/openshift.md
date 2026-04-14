---
id: openshift
label: OpenShift
category: service
priority: medium
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:59:30.058Z'
updatedAt: '2026-04-14T17:59:30.058Z'
relations:
  - target: kubernetes
    type: extends
    weight: 0.9
resources:
  - type: documentation
    title: Documentation officielle OpenShift
    url: 'https://docs.openshift.com/'
  - type: vidéo
    title: OpenShift Explained – IBM Technology
    url: 'https://www.youtube.com/watch?v=KTN_QBuDplo'
  - type: blog
    title: Red Hat OpenShift Blog
    url: 'https://www.redhat.com/en/blog/channel/red-hat-openshift'
  - type: cours
    title: Introduction to OpenShift – Red Hat Training
    url: >-
      https://www.redhat.com/en/services/training/do180-introduction-containers-kubernetes-red-hat-openshift
  - type: documentation
    title: OpenShift Developer Sandbox (gratuit)
    url: 'https://developers.redhat.com/developer-sandbox'
---

## Résumé rapide

OpenShift est une plateforme Kubernetes d'entreprise développée par Red Hat. Elle ajoute des fonctionnalités de sécurité, de CI/CD intégré, d'interface web et de gestion opérationnelle au-dessus de Kubernetes, facilitant l'adoption en entreprise.

---

## Définition

OpenShift est une plateforme de conteneurs d'entreprise basée sur Kubernetes, développée par Red Hat. Elle fournit des outils supplémentaires pour le développement, le déploiement et la gestion d'applications conteneurisées avec un accent sur la sécurité et la productivité des développeurs.

---

## Histoire

* Lancé par Red Hat en 2011 (version PaaS originale)
* OpenShift 3 (2015) a adopté Kubernetes comme base
* OpenShift 4 (2019) a introduit les Operators et CoreOS
* Racheté avec Red Hat par IBM en 2019
* Disponible en version cloud managée (ROSA, ARO) et on-premise

---

## Objectif

* Fournir une plateforme Kubernetes prête pour l'entreprise
* Simplifier l'expérience développeur sur Kubernetes
* Renforcer la sécurité par défaut
* Offrir un support commercial et une certification Red Hat

---

## Domaines d'utilisation

* Grandes entreprises nécessitant un support commercial
* Déploiements hybrides (cloud + on-premise)
* Environnements réglementés (banque, santé, gouvernement)
* Plateformes de développement internes
* Migration d'applications legacy vers les conteneurs

---

## Fonctionnement

* Basé sur Kubernetes avec des couches supplémentaires
* Utilise CoreOS comme système d'exploitation des nœuds
* Operators pour la gestion automatisée des composants
* Console web intégrée pour la gestion et le monitoring
* Pipeline CI/CD intégré via Tekton

---

## Concepts clés

* Route : exposition HTTP/HTTPS des services (équivalent Ingress amélioré)
* BuildConfig : construction automatique d'images dans le cluster
* DeploymentConfig : extension du Deployment Kubernetes
* Operator : automatisation de la gestion d'applications complexes
* Project : namespace Kubernetes enrichi avec des quotas et des rôles

---

## Exemple

```bash
# Connexion au cluster
oc login https://api.mon-cluster.openshift.com

# Créer un nouveau projet
oc new-project mon-app

# Déployer depuis un dépôt Git (Source-to-Image)
oc new-app python~https://github.com/user/mon-app.git

# Exposer l'application
oc expose service/mon-app

# Voir les routes
oc get routes
```

---

## Avantages

* Sécurité renforcée par défaut (Security Context Constraints)
* Console web intuitive et complète
* CI/CD intégré avec Tekton Pipelines
* Support commercial Red Hat
* Source-to-Image (S2I) pour le build automatisé

---

## Inconvénients

* Coût de licence élevé
* Plus rigide que Kubernetes vanilla (restrictions de sécurité)
* Certaines fonctionnalités Kubernetes sont masquées ou modifiées
* Dépendance à l'écosystème Red Hat
* Mises à jour plus contrôlées (versions de Kubernetes en retard)

---

## Pièges courants

* Essayer d'utiliser des conteneurs root (interdit par défaut)
* Ignorer les Security Context Constraints (SCC)
* Confondre les commandes oc et kubectl (compatibles mais pas identiques)
* Sous-estimer les prérequis d'infrastructure
* Ne pas utiliser les Operators disponibles dans le catalogue

---

## À ne pas confondre

* OpenShift vs Kubernetes : OpenShift est une distribution Kubernetes enrichie
* Route vs Ingress : la Route est spécifique à OpenShift et plus complète
* oc vs kubectl : oc est un superset de kubectl avec des commandes additionnelles
* OpenShift vs Rancher : deux distributions Kubernetes concurrentes

---

## Explication simplifiée

OpenShift, c'est Kubernetes avec tout ce qu'il faut pour une entreprise : un tableau de bord graphique, une sécurité renforcée et un support technique. C'est comme acheter un ordinateur déjà configuré plutôt que d'assembler toutes les pièces soi-même.

---

## Explication avancée

OpenShift 4 est basé sur un noyau Kubernetes étendu par des Operators qui gèrent le cycle de vie de la plateforme elle-même (Cluster Version Operator). Les nœuds utilisent Red Hat CoreOS avec des mises à jour atomiques via Machine Config Operator. Les Security Context Constraints (SCC) étendent les PodSecurityPolicies de Kubernetes pour un contrôle fin des privilèges. Le routeur HAProxy intégré gère les Routes avec terminaison TLS, re-encryption et passthrough. L'Operator Lifecycle Manager (OLM) permet d'installer et de mettre à jour des Operators depuis le catalogue OperatorHub.

---

## Points critiques à retenir

* [CRITIQUE] OpenShift est basé sur Kubernetes avec des couches entreprise
* [CRITIQUE] La sécurité est renforcée par défaut (pas de conteneurs root)
* [IMPORTANT] Les Operators gèrent automatiquement les composants complexes
* [IMPORTANT] Support commercial et certification Red Hat inclus
* [PIÈGE] Les conteneurs doivent fonctionner en non-root par défaut
* [PIÈGE] Certaines configurations Kubernetes vanilla ne fonctionnent pas directement
