---
id: docker
label: Docker
category: logiciel
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:58:28.275Z'
updatedAt: '2026-04-14T17:58:28.275Z'
relations:
  - target: kubernetes
    type: related
    weight: 0.9
  - target: containerd
    type: uses
    weight: 0.8
resources:
  - type: documentation
    title: Documentation officielle Docker
    url: 'https://docs.docker.com/'
  - type: vidéo
    title: Docker Tutorial for Beginners – TechWorld with Nana
    url: 'https://www.youtube.com/watch?v=3c-iBn73dDE'
  - type: cours
    title: Docker Mastery – Udemy (Bret Fisher)
    url: 'https://www.udemy.com/course/docker-mastery/'
  - type: blog
    title: Docker Blog officiel
    url: 'https://www.docker.com/blog/'
  - type: documentation
    title: Docker Hub – Registre d'images
    url: 'https://hub.docker.com/'
---

## Résumé rapide

Docker est une plateforme de conteneurisation qui permet d'empaqueter une application et ses dépendances dans un conteneur léger et portable. Il a révolutionné le déploiement logiciel en garantissant la cohérence entre les environnements de développement, de test et de production.

---

## Définition

Docker est un outil open source qui automatise le déploiement d'applications dans des conteneurs logiciels. Un conteneur encapsule le code, les bibliothèques et les configurations nécessaires pour exécuter une application de manière isolée et reproductible.

---

## Histoire

* Créé en 2013 par Solomon Hykes au sein de dotCloud
* Basé sur les technologies Linux (cgroups, namespaces)
* A popularisé la conteneurisation auprès du grand public
* Docker Inc. fondée pour soutenir le projet
* Le runtime containerd a été extrait et donné à la CNCF en 2017

---

## Objectif

* Simplifier le déploiement d'applications
* Garantir la reproductibilité des environnements
* Isoler les applications les unes des autres
* Accélérer les cycles de développement et de livraison

---

## Domaines d'utilisation

* Développement local (environnements uniformes)
* Intégration continue et déploiement continu (CI/CD)
* Microservices
* Cloud computing
* Tests automatisés

---

## Fonctionnement

* Utilise le noyau Linux (namespaces pour l'isolation, cgroups pour les ressources)
* Les images Docker sont construites couche par couche via un Dockerfile
* Les conteneurs sont des instances d'images en cours d'exécution
* Docker Engine orchestre la création, le démarrage et l'arrêt des conteneurs
* Le registre Docker Hub stocke et distribue les images

---

## Concepts clés

* Image : modèle immuable contenant le code et les dépendances
* Conteneur : instance d'exécution d'une image
* Dockerfile : fichier de description pour construire une image
* Volume : stockage persistant attaché à un conteneur
* Réseau Docker : communication entre conteneurs

---

## Exemple

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["python", "app.py"]
```

```bash
docker build -t mon-app .
docker run -p 8000:8000 mon-app
```

---

## Avantages

* Portabilité entre environnements (dev, staging, prod)
* Légèreté par rapport aux machines virtuelles
* Démarrage rapide des conteneurs
* Écosystème riche (Docker Hub, Docker Compose)
* Facilite les architectures microservices

---

## Inconvénients

* Sécurité : les conteneurs partagent le noyau hôte
* Complexité de gestion en production à grande échelle (nécessite un orchestrateur)
* Persistance des données nécessite une configuration spécifique
* Courbe d'apprentissage pour le réseau et les volumes

---

## Pièges courants

* Utiliser des images trop volumineuses (préférer les variantes slim ou alpine)
* Ne pas gérer correctement les volumes pour les données persistantes
* Lancer des processus en tant que root dans les conteneurs
* Oublier de nettoyer les images et conteneurs inutilisés
* Confondre COPY et ADD dans le Dockerfile

---

## À ne pas confondre

* Conteneur vs machine virtuelle : un conteneur partage le noyau, une VM a son propre OS
* Docker vs containerd : Docker est l'outil utilisateur, containerd est le runtime sous-jacent
* Image vs conteneur : l'image est le modèle, le conteneur est l'instance en exécution
* Docker Compose vs Kubernetes : Compose est pour le développement local, Kubernetes pour la production

---

## Explication simplifiée

Docker est comme une boîte standardisée dans laquelle on met tout ce dont une application a besoin pour fonctionner. On peut ensuite déplacer cette boîte sur n'importe quel ordinateur et l'application marchera exactement de la même façon.

---

## Explication avancée

Docker repose sur les primitives du noyau Linux : les namespaces fournissent l'isolation des processus, du réseau et du système de fichiers, tandis que les cgroups contrôlent l'allocation des ressources (CPU, mémoire). Les images sont construites par couches utilisant un système de fichiers en union (overlay2), permettant le partage efficace des couches communes. Le daemon Docker communique avec containerd pour la gestion du cycle de vie des conteneurs, qui lui-même utilise runc pour l'exécution conforme à la spécification OCI.

---

## Points critiques à retenir

* [CRITIQUE] Docker utilise l'isolation au niveau du noyau, pas de la virtualisation complète
* [CRITIQUE] Les images sont immuables et construites par couches
* [IMPORTANT] Docker Compose permet d'orchestrer plusieurs conteneurs localement
* [IMPORTANT] Les volumes sont essentiels pour la persistance des données
* [PIÈGE] Ne jamais stocker de secrets dans les images Docker
* [PIÈGE] Toujours spécifier une version précise des images de base
