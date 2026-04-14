---
id: apache-airflow
label: Apache Airflow
category: logiciel
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:58:00.461Z'
updatedAt: '2026-04-14T17:58:00.461Z'
relations:
  - target: python
    type: related
    weight: 0.8
resources:
  - type: documentation
    title: Apache Airflow Documentation
    url: 'https://airflow.apache.org/docs/'
  - type: cours
    title: Airflow Fundamentals – Astronomer
    url: 'https://academy.astronomer.io/'
  - type: vidéo
    title: Airflow Tutorial – Marc Lamberti
    url: 'https://www.youtube.com/@MarcLamberti'
---

## Résumé rapide

Apache Airflow est un orchestrateur open-source pour programmer, planifier et surveiller des workflows de données (ETL, pipelines ML) définis en Python sous forme de DAGs.

---

## Définition

Airflow est une plateforme d'orchestration de workflows où chaque pipeline est défini comme un DAG (Directed Acyclic Graph) en Python. Le scheduler exécute les tâches selon leurs dépendances, le worker les lance, et la UI permet monitoring et debug.

---

## Histoire

* Créé chez Airbnb par Maxime Beauchemin en 2014
* Open-source en 2015, Apache Incubator en 2016
* Top-level Apache project en 2019
* Airflow 2.0 avec TaskFlow API en 2020
* Fondé de Astronomer, leader managé

---

## Objectif

* Orchestrer des pipelines de données complexes
* Planifier et surveiller des tâches récurrentes
* Fournir une UI de debug et retry
* Supporter des intégrations multiples (S3, BigQuery, Kubernetes)
* Permettre les pipelines as code

---

## Domaines d'utilisation

* ETL et data pipelines
* Orchestration ML (training, batch inference)
* Reporting et automatisation
* Workflows Kubernetes
* Data warehouse refresh

---

## Fonctionnement

* **DAG** — Python décrivant tâches et dépendances
* **Scheduler** — Planifie les DAG runs
* **Executor** — Celery, Kubernetes, Local
* **Worker** — Exécute les task instances
* **Metadata DB** — État des runs (Postgres, MySQL)

---

## Concepts clés

* **DAG** — Graph de tâches
* **Task** — Opération individuelle
* **Operator** — Type de tâche (Bash, Python, S3ToBQ)
* **XCom** — Partage de petites données entre tasks
* **Sensor** — Attend une condition
* **TaskFlow API** — Décorateurs Python modernes

---

## Exemple

```python
from airflow.decorators import dag, task
from datetime import datetime

@dag(schedule='@daily', start_date=datetime(2025, 1, 1), catchup=False)
def etl_sales():
    @task
    def extract():
        return {'rows': 1000}

    @task
    def transform(data):
        return {'cleaned': data['rows'] - 10}

    @task
    def load(data):
        print(f"Loaded {data['cleaned']} rows")

    load(transform(extract()))

etl_sales()
```

---

## Avantages

* Pipelines as code en Python
* UI riche pour monitoring
* Écosystème d'opérateurs énorme
* Retries, alertes, backfills natifs
* Scalable (Celery, Kubernetes executors)

---

## Inconvénients

* Courbe d'apprentissage
* Lourdeur pour petits workflows
* XCom limité pour gros volumes
* Debugging parfois complexe
* Gestion des dépendances Python

---

## Pièges courants

* Logique lourde dans le code top-level d'un DAG
* XCom pour passer de gros datasets
* Schedule interval mal compris (`start_date`)
* Tâches non idempotentes (replays douloureux)
* DAG parsing lent (ralentit le scheduler)

---

## À ne pas confondre

* Airflow vs Prefect / Dagster (concurrents modernes)
* Airflow vs cron (orchestration vs planification brute)
* Operator vs Sensor (action vs attente)

---

## Explication simplifiée

Airflow c'est un chef d'orchestre pour tes traitements de données : "d'abord extraire depuis cette API, puis nettoyer, puis charger dans la base, puis envoyer un rapport — et fais-le tous les matins à 6h". Si une étape échoue, tu peux la relancer depuis la UI.

---

## Explication avancée

Airflow parse les fichiers DAG en Python à intervalles réguliers pour construire la représentation en base. Le scheduler crée des DAG runs selon le schedule et instancie des task instances que les workers picks via leur executor. Les XCom servent à passer de petites données entre tasks, mais doivent rester légers (la DB metadata est le goulot). Les sensors doivent être "deferrable" pour ne pas occuper un worker slot inutilement. Airflow 2 a modernisé l'API avec TaskFlow (décorateurs) et amélioré le scheduler pour le parallélisme.

---

## Points critiques à retenir

* [CRITIQUE] Tâches idempotentes obligatoires (retry/backfill)
* [CRITIQUE] Pas de logique lourde au top-level des DAGs
* [IMPORTANT] XCom pour petites données seulement
* [IMPORTANT] Deferrable sensors pour ne pas bloquer des slots
* [PIÈGE] `start_date` + `schedule_interval` trompeurs
