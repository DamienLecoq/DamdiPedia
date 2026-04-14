---
id: prometheus
label: Prometheus
category: logiciel
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:59:41.918Z'
updatedAt: '2026-04-14T17:59:41.918Z'
relations:
  - target: grafana
    type: related
    weight: 0.9
  - target: kubernetes
    type: related
    weight: 0.8
resources:
  - type: documentation
    title: Prometheus Documentation officielle
    url: 'https://prometheus.io/docs/'
  - type: vidéo
    title: TechWorld with Nana – Prometheus Tutorial
    url: 'https://www.youtube.com/watch?v=h4Sl21AKiDg'
  - type: cours
    title: Prometheus Best Practices
    url: 'https://prometheus.io/docs/practices/naming/'
---

## Résumé rapide

Prometheus est un système de monitoring et d'alerting open-source, projet CNCF, conçu pour collecter des métriques via pull et les stocker en séries temporelles.

---

## Définition

Prometheus est une base de données de séries temporelles spécialisée dans le monitoring, avec un langage de requête dédié (PromQL), un modèle de pull par scraping HTTP et un système d'alerting intégré via AlertManager.

---

## Histoire

* Créé chez SoundCloud en 2012
* Inspiré de Borgmon (monitoring Google)
* Deuxième projet à rejoindre la CNCF (après Kubernetes) en 2016
* Diplômé CNCF en 2018
* Standard de facto pour le monitoring cloud-native

---

## Objectif

* Collecter des métriques en séries temporelles
* Offrir un langage de requête puissant (PromQL)
* Alerter sur des conditions critiques
* S'intégrer nativement avec Kubernetes

---

## Domaines d'utilisation

* Monitoring d'applications cloud-native
* Observabilité de Kubernetes
* Alerting SRE et DevOps
* Capacity planning et tendances

---

## Fonctionnement

* **Scraping** — Prometheus interroge les `/metrics` endpoints
* Les applis exposent métriques via clients instrumentés
* Stockage local en TSDB optimisé
* **PromQL** pour requêter et agréger
* **AlertManager** gère routing et déduplication des alertes

---

## Concepts clés

* **Counter** — Compteur monotone croissant (requêtes, erreurs)
* **Gauge** — Valeur instantanée (CPU, mémoire, temp)
* **Histogram / Summary** — Distribution (latences)
* **Labels** — Dimensions multi-valeurs sur les métriques
* **Scrape interval** — Fréquence de collecte
* **AlertManager** — Routing et silencing des alertes

---

## Exemple

```promql
# Taux de requêtes HTTP par seconde sur 5min
rate(http_requests_total[5m])

# 95e percentile de latence
histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))

# Alerter si erreur > 5%
sum(rate(http_requests_total{status=~"5.."}[5m])) 
  / sum(rate(http_requests_total[5m])) > 0.05
```

---

## Avantages

* Modèle pull simple et fiable
* PromQL puissant pour les séries temporelles
* Intégration native Kubernetes
* Découverte de services dynamique
* Écosystème d'exporters riche

---

## Inconvénients

* Pas fait pour les logs (utiliser Loki)
* Stockage local non réplique (long-term storage via Thanos/Cortex)
* PromQL a une courbe d'apprentissage
* Haute cardinalité peut exploser la mémoire

---

## Pièges courants

* Utiliser des labels à haute cardinalité (user_id, URL avec params)
* Oublier `rate()` sur un Counter
* Confondre Histogram et Summary
* Retention trop longue sans Thanos

---

## À ne pas confondre

* Prometheus vs Grafana (collecte vs visualisation)
* Counter vs Gauge (cumulatif vs instantané)
* Histogram vs Summary (serveur vs client quantiles)

---

## Explication simplifiée

Prometheus c'est le "tableau de bord" des systèmes modernes : toutes les 15 secondes, il va voir chaque serveur et lui demande "comment ça va ?" (CPU, mémoire, erreurs). Puis tu peux faire des graphes et alertes sur ces données.

---

## Explication avancée

Prometheus utilise un modèle pull via scraping HTTP des endpoints `/metrics` au format texte. Le TSDB stocke les séries en chunks compressés (Gorilla encoding). PromQL est un langage fonctionnel sur vecteurs de séries, supportant les opérations instantanées et range vectors. Pour le stockage long-terme et la haute disponibilité, Thanos ou Cortex agrègent plusieurs Prometheus.

---

## Points critiques à retenir

* [CRITIQUE] Labels à haute cardinalité explosent la mémoire
* [CRITIQUE] `rate()` obligatoire sur les Counters pour le taux
* [IMPORTANT] AlertManager pour le routing, pas Prometheus lui-même
* [IMPORTANT] Thanos/Cortex pour la rétention long-terme
* [PIÈGE] Prometheus n'est PAS une base de logs
