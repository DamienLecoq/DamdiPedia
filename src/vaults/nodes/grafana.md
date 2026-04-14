---
id: grafana
label: Grafana
category: logiciel
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:58:48.240Z'
updatedAt: '2026-04-14T17:58:48.240Z'
relations:
  - target: prometheus
    type: uses
    weight: 0.9
resources:
  - type: documentation
    title: Grafana Documentation officielle
    url: 'https://grafana.com/docs/grafana/latest/'
  - type: vidéo
    title: Grafana Tutorial for Beginners
    url: 'https://www.youtube.com/watch?v=UFMESHH9zY4'
  - type: blog
    title: Grafana Labs Blog
    url: 'https://grafana.com/blog/'
---

## Résumé rapide

Grafana est une plateforme open-source de visualisation et de dashboards pour les métriques, logs et traces. Elle s'interface avec de nombreuses sources de données (Prometheus, Loki, Elasticsearch, InfluxDB).

---

## Définition

Grafana est un outil de dashboarding et d'observabilité qui agrège des données de multiples sources (TSDB, logs, bases SQL) pour créer des visualisations interactives, des alertes et des rapports.

---

## Histoire

* Créé par Torkel Ödegaard en 2014 (fork de Kibana)
* Fondation de Grafana Labs en 2014
* Ajout de Loki (logs) en 2018, Tempo (traces) en 2020
* Grafana Cloud offre la version managée
* Standard de facto pour les dashboards d'observabilité

---

## Objectif

* Unifier la visualisation de métriques multi-sources
* Offrir des dashboards interactifs riches
* Alerter sur des conditions complexes
* Faciliter la collaboration via partage de dashboards

---

## Domaines d'utilisation

* Observabilité d'infrastructure et d'applications
* Business dashboards (KPIs temps réel)
* Monitoring IoT et capteurs
* Analyse de logs (via Loki)

---

## Fonctionnement

* Connecte des data sources (Prometheus, Loki, MySQL, etc.)
* Dashboards composés de panneaux (graphs, stats, tables)
* Requêtes envoyées aux sources dans leur langage natif
* Templating via variables pour filtrer dynamiquement
* Alerting unifié (depuis Grafana 8)

---

## Concepts clés

* **Data Source** — Connexion à Prometheus, Loki, SQL, etc.
* **Dashboard** — Ensemble de panels
* **Panel** — Visualisation (graph, gauge, heatmap)
* **Variable** — Filtre dynamique (dropdown)
* **Alert** — Règle déclenchant une notification
* **Provisioning** — Dashboards en YAML (as-code)

---

## Exemple

```yaml
# Dashboard provisioning YAML
apiVersion: 1
providers:
  - name: 'default'
    folder: 'Production'
    type: file
    options:
      path: /var/lib/grafana/dashboards
```

```json
// Panel query example (PromQL)
{
  "expr": "rate(http_requests_total[5m])",
  "legendFormat": "{{method}} {{path}}"
}
```

---

## Avantages

* Support de nombreuses data sources
* Dashboards très customisables
* Communauté riche (dashboards partagés)
* Alerting unifié
* Open-source avec version cloud managée

---

## Inconvénients

* Alerting parfois moins puissant que AlertManager
* Configuration des permissions complexe
* Dashboards peuvent devenir ingérables
* Requêtes lourdes peuvent surcharger les data sources

---

## Pièges courants

* Requêtes trop fréquentes (surcharge de la source)
* Dashboards avec trop de panels (lenteur)
* Variables non contraintes (cardinalité explosive)
* Oublier le time range sur une alerte

---

## À ne pas confondre

* Grafana vs Prometheus (visualisation vs collecte)
* Grafana vs Kibana (agnostique vs Elasticsearch only)
* Dashboard vs Alert

---

## Explication simplifiée

Grafana c'est ton tableau de bord de pilotage. Tu branches tes sources de données (métriques Prometheus, logs, bases SQL), tu crées des graphes, tu mets des alertes — et tu as une vue en temps réel de tout ce qui tourne.

---

## Explication avancée

Grafana ne stocke pas de données par lui-même : il envoie des requêtes aux data sources dans leur langage natif (PromQL, LogQL, SQL) et rendu le résultat. Le templating permet de construire des dashboards paramétrables via variables. Grafana Loki partage les labels de Prometheus pour corréler métriques et logs.

---

## Points critiques à retenir

* [CRITIQUE] Grafana visualise, Prometheus stocke
* [IMPORTANT] Provisioning YAML pour dashboards as-code
* [IMPORTANT] Variables pour dashboards réutilisables
* [IMPORTANT] Loki pour les logs (partage les labels Prometheus)
* [PIÈGE] Trop de panels par dashboard dégrade les perfs
