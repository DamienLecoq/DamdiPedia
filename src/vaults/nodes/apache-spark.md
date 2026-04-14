---
id: apache-spark
label: Apache Spark
category: logiciel
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:58:01.497Z'
updatedAt: '2026-04-14T17:58:01.497Z'
relations: []
resources:
  - type: documentation
    title: Apache Spark Documentation
    url: 'https://spark.apache.org/docs/latest/'
  - type: livre
    title: Learning Spark – O'Reilly
    url: 'https://pages.databricks.com/definitive-guide-spark.html'
  - type: cours
    title: Databricks Academy
    url: 'https://www.databricks.com/learn/training/home'
---

## Résumé rapide

Apache Spark est un moteur de calcul distribué open-source, successeur de Hadoop MapReduce, offrant traitement en mémoire, SQL, streaming et machine learning sur de gros volumes de données.

---

## Définition

Spark est un framework de calcul parallèle qui distribue des jobs sur un cluster de machines, en traitant les données principalement en mémoire (RDD/DataFrame) pour être 10-100x plus rapide que MapReduce sur disque.

---

## Histoire

* Créé à UC Berkeley AMPLab par Matei Zaharia en 2009
* Open-source en 2010, projet Apache en 2013
* Lancement de Databricks en 2013 par les créateurs
* DataFrames et Spark SQL en 2015 (révolution)
* Structured Streaming en 2016

---

## Objectif

* Traiter des données massives (TB-PB) efficacement
* Unifier batch, streaming, SQL, ML en une plateforme
* Remplacer Hadoop MapReduce
* Offrir des abstractions haut-niveau (DataFrames)
* Scaler horizontalement

---

## Domaines d'utilisation

* ETL et pipelines data
* Analytics à grande échelle
* Machine learning distribué (MLlib)
* Streaming temps réel
* Data lakes et data warehouses

---

## Fonctionnement

* **Driver** — Programme principal qui orchestre
* **Executors** — Workers exécutant les tâches
* **Cluster Manager** — YARN, K8s, standalone
* **RDD / DataFrame** — Collections distribuées
* **Lazy evaluation** — Les transformations sont différées

---

## Concepts clés

* **RDD** — Resilient Distributed Dataset (bas niveau)
* **DataFrame** — Table distribuée typée
* **Dataset** — DataFrame typé (Scala/Java)
* **Transformation** — Opération lazy (map, filter)
* **Action** — Déclenche l'exécution (count, collect)
* **Partition** — Unité de parallélisme

---

## Exemple

```python
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, avg

spark = SparkSession.builder.appName('analytics').getOrCreate()

df = spark.read.parquet('s3://data/orders/')

result = (df
    .filter(col('status') == 'completed')
    .groupBy('country')
    .agg(avg('amount').alias('avg_amount'))
    .orderBy(col('avg_amount').desc()))

result.write.mode('overwrite').parquet('s3://data/analytics/')
```

---

## Avantages

* 10-100x plus rapide que MapReduce (in-memory)
* API unifiée pour batch, streaming, SQL, ML
* Multi-langages (Scala, Java, Python, R, SQL)
* Écosystème riche (Delta Lake, MLlib, GraphX)
* Scaling massif (plusieurs Po)

---

## Inconvénients

* Consommation mémoire importante
* Courbe d'apprentissage (Scala/Python/API)
* Debugging distribué complexe
* Overhead pour petits datasets
* Configuration fine parfois nécessaire

---

## Pièges courants

* `collect()` sur un gros DataFrame = OOM driver
* Mauvais partitionnement (skew)
* Oublier de cache() les DataFrames réutilisés
* Trop de small files à la lecture
* Shuffles non maîtrisés (joins)

---

## À ne pas confondre

* Spark vs Hadoop MapReduce (in-memory vs disque)
* Spark vs Flink (micro-batch vs vrai streaming)
* RDD vs DataFrame (bas niveau vs optimisé)

---

## Explication simplifiée

Spark c'est un moteur qui prend un gros tableau (des millions ou milliards de lignes), le découpe en morceaux, envoie chaque morceau à une machine différente pour le traiter en parallèle, puis recombine les résultats. Idéal pour analyser des données trop grosses pour une seule machine.

---

## Explication avancée

Spark construit un DAG logique à partir des transformations, que le Catalyst optimizer (pour DataFrames) optimise en plan physique efficace. Les partitions sont co-localisées avec les données (principe de Hadoop) pour éviter les transferts. Les shuffles (joins, groupBy) sont l'opération la plus coûteuse : redistribution réseau massive. Tungsten optimise la sérialisation et la gestion mémoire off-heap. Structured Streaming traite les streams comme des tables en croissance continue. Databricks pousse Spark vers Photon, un moteur C++ vectorisé.

---

## Points critiques à retenir

* [CRITIQUE] Jamais `collect()` sur un gros DataFrame
* [CRITIQUE] Partitionnement équilibré (éviter le skew)
* [IMPORTANT] Cache les DataFrames réutilisés
* [IMPORTANT] Broadcast joins pour les petites tables
* [PIÈGE] Shuffles = coût énorme, à minimiser
