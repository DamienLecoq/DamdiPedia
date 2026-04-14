---
id: kubernetes
label: Kubernetes
category: logiciel
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:59:09.824Z'
updatedAt: '2026-04-14T17:59:09.824Z'
relations:
  - target: docker
    type: uses
    weight: 0.9
  - target: helm
    type: related
    weight: 0.8
resources:
  - type: documentation
    title: Documentation officielle Kubernetes
    url: 'https://kubernetes.io/fr/docs/home/'
  - type: vidéo
    title: Kubernetes Tutorial for Beginners – TechWorld with Nana
    url: 'https://www.youtube.com/watch?v=X48VuDVv0do'
  - type: cours
    title: Certified Kubernetes Administrator (CKA) – Udemy
    url: >-
      https://www.udemy.com/course/certified-kubernetes-administrator-with-practice-tests/
  - type: blog
    title: Kubernetes Blog officiel
    url: 'https://kubernetes.io/blog/'
  - type: documentation
    title: Kubernetes Cheat Sheet
    url: 'https://kubernetes.io/docs/reference/kubectl/cheatsheet/'
---

## Résumé rapide

Kubernetes (K8s) est un système d'orchestration de conteneurs open source qui automatise le déploiement, la mise à l'échelle et la gestion d'applications conteneurisées. Il est devenu le standard de facto pour exécuter des applications en production dans le cloud.

---

## Définition

Kubernetes est une plateforme open source d'orchestration de conteneurs, initialement développée par Google et maintenant maintenue par la CNCF. Elle permet de gérer des clusters de machines exécutant des conteneurs de manière déclarative et automatisée.

---

## Histoire

* Développé par Google à partir de son système interne Borg
* Rendu open source en 2014
* Donné à la CNCF en 2015
* Devenu le standard d'orchestration de conteneurs
* Écosystème massif avec des centaines de projets complémentaires

---

## Objectif

* Automatiser le déploiement et la mise à l'échelle des conteneurs
* Assurer la haute disponibilité des applications
* Fournir une abstraction déclarative de l'infrastructure
* Permettre le déploiement multi-cloud et hybride

---

## Domaines d'utilisation

* Déploiement d'applications microservices en production
* Plateformes cloud (GKE, EKS, AKS)
* Intégration et déploiement continu
* Applications à haute disponibilité
* Edge computing et IoT

---

## Fonctionnement

* Architecture maître-noeud (control plane + worker nodes)
* Déclaration de l'état souhaité via des manifestes YAML
* Le control plane maintient l'état réel conforme à l'état souhaité
* Boucle de réconciliation continue
* Planification automatique des pods sur les nœuds disponibles

---

## Concepts clés

* Pod : plus petite unité déployable (un ou plusieurs conteneurs)
* Service : exposition réseau stable pour un ensemble de pods
* Deployment : gestion déclarative des réplicas et mises à jour
* Namespace : isolation logique des ressources dans un cluster
* ConfigMap / Secret : gestion de la configuration et des secrets

---

## Exemple

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mon-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: mon-app
  template:
    metadata:
      labels:
        app: mon-app
    spec:
      containers:
      - name: mon-app
        image: mon-app:1.0
        ports:
        - containerPort: 8080
---
apiVersion: v1
kind: Service
metadata:
  name: mon-app-service
spec:
  selector:
    app: mon-app
  ports:
  - port: 80
    targetPort: 8080
  type: LoadBalancer
```

---

## Avantages

* Auto-scaling horizontal et vertical
* Auto-healing (redémarrage automatique des pods défaillants)
* Mises à jour progressives (rolling updates) sans interruption
* Abstraction de l'infrastructure sous-jacente
* Écosystème riche et communauté active

---

## Inconvénients

* Complexité d'apprentissage et d'exploitation élevée
* Surcharge opérationnelle pour les petites applications
* Consommation de ressources par le control plane
* Débogage plus difficile que sur une infrastructure traditionnelle

---

## Pièges courants

* Déployer Kubernetes pour des applications trop simples
* Ne pas définir de limites de ressources (CPU, mémoire) sur les pods
* Ignorer les politiques réseau (NetworkPolicy)
* Ne pas configurer de sondes de santé (liveness, readiness probes)
* Stocker des secrets en clair dans les manifestes YAML

---

## À ne pas confondre

* Pod vs conteneur : un pod peut contenir plusieurs conteneurs
* Service vs Ingress : le Service expose en interne, l'Ingress gère le trafic externe
* Deployment vs StatefulSet : Deployment pour les applications sans état, StatefulSet pour celles avec état
* Kubernetes vs Docker Compose : Kubernetes est pour la production, Compose pour le développement

---

## Explication simplifiée

Kubernetes est comme un chef d'orchestre pour les conteneurs. On lui dit combien d'instances d'une application on veut, et il se charge de les déployer, de les surveiller et de les redémarrer automatiquement en cas de problème.

---

## Explication avancée

Kubernetes implémente une architecture déclarative basée sur des boucles de réconciliation (controllers). Le control plane comprend l'API Server (point d'entrée), etcd (stockage distribué de l'état), le Scheduler (placement des pods) et le Controller Manager (boucles de contrôle). Les worker nodes exécutent kubelet (agent), kube-proxy (réseau) et le runtime de conteneurs (containerd). Les Custom Resource Definitions (CRD) et les Operators permettent d'étendre Kubernetes pour gérer des ressources personnalisées.

---

## Points critiques à retenir

* [CRITIQUE] Kubernetes orchestre les conteneurs de manière déclarative
* [CRITIQUE] Le pod est l'unité de base, pas le conteneur
* [IMPORTANT] Les Deployments gèrent les mises à jour progressives
* [IMPORTANT] Toujours définir des limites de ressources et des sondes de santé
* [PIÈGE] Ne pas utiliser Kubernetes si l'application est trop simple
* [PIÈGE] Ne jamais stocker de secrets en clair dans les manifestes
