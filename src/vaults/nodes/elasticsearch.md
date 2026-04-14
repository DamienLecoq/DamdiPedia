---
id: elasticsearch
label: Elasticsearch
category: logiciel
priority: high
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:58:32.178Z'
updatedAt: '2026-04-14T17:58:32.178Z'
relations: []
resources:
  - type: documentation
    title: Elasticsearch Documentation
    url: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html'
  - type: cours
    title: Complete Guide to Elasticsearch
    url: 'https://www.udemy.com/course/elasticsearch-complete-guide/'
  - type: vidéo
    title: Elasticsearch in 100 Seconds
    url: 'https://www.youtube.com/watch?v=ZP0NmfyfsoM'
---

## Résumé rapide

Elasticsearch est un moteur de recherche et d'analytics distribué, basé sur Apache Lucene, offrant de la recherche full-text quasi temps réel et des agrégations complexes sur de gros volumes de données.

---

## Définition

Elasticsearch est une base de données orientée documents (JSON) et un moteur de recherche distribué qui indexe les données via Lucene, permettant des requêtes full-text, géospatiales, vectorielles et analytiques à l'échelle.

---

## Histoire

* Créé par Shay Banon en 2010
* Fondation d'Elastic Inc. en 2012
* Stack ELK (Elasticsearch, Logstash, Kibana) populaire
* Fork OpenSearch par AWS en 2021 (dispute de licence)
* Licence passée à SSPL/Elastic License

---

## Objectif

* Rechercher du texte rapidement à grande échelle
* Agréger et analyser des données massives
* Offrir un scaling horizontal natif
* Supporter la recherche temps réel
* Fournir une API REST standard

---

## Domaines d'utilisation

* Recherche produit e-commerce
* Logs centralisés (ELK stack)
* Observabilité applicative
* Recherche vectorielle / RAG pour IA
* Analytics temps réel

---

## Fonctionnement

* **Index** — Collection de documents
* **Shard** — Partition d'index (distribuée)
* **Replica** — Copie pour haute disponibilité
* **Document** — JSON indexé
* **Inverted index** — Structure Lucene sous-jacente
* **Query DSL** — JSON expressif

---

## Concepts clés

* **Index** — Équivalent d'une "base de données"
* **Shard** — Unité de parallélisme et distribution
* **Mapping** — Schéma des champs
* **Analyzer** — Tokenisation et normalisation
* **Aggregation** — Analytics (sum, avg, buckets)
* **k-NN Search** — Recherche vectorielle

---

## Exemple

```json
// Créer un index avec mapping
PUT /products
{
  "mappings": {
    "properties": {
      "name": { "type": "text", "analyzer": "french" },
      "price": { "type": "float" },
      "tags": { "type": "keyword" }
    }
  }
}

// Rechercher
POST /products/_search
{
  "query": {
    "bool": {
      "must":   [{ "match": { "name": "chaise bois" } }],
      "filter": [{ "range": { "price": { "lte": 200 } } }]
    }
  },
  "aggs": {
    "avg_price": { "avg": { "field": "price" } }
  }
}
```

---

## Avantages

* Recherche full-text rapide et puissante
* Scalabilité horizontale native
* Agrégations complexes temps réel
* Écosystème mature (Kibana, Beats, Logstash)
* API REST simple
* Recherche vectorielle intégrée

---

## Inconvénients

* Pas une base primaire (source of truth)
* Consommation mémoire élevée
* Gestion des mappings parfois rigide
* Cohérence éventuelle
* Licence non open-source depuis 2021

---

## Pièges courants

* Utiliser comme base transactionnelle
* Trop de shards (overhead)
* Mapping explosion (champs dynamiques)
* Oublier de forcer la refresh avant un test
* Re-index coûteux lors d'un changement de mapping

---

## À ne pas confondre

* Elasticsearch vs OpenSearch (fork)
* Elasticsearch vs Solr (concurrent sur Lucene)
* Elasticsearch vs SQL (full-text vs relationnel)

---

## Explication simplifiée

Elasticsearch c'est comme Google pour tes propres données. Tu lui donnes des documents (produits, articles, logs), il construit un index inversé ultra-rapide, et tu peux ensuite chercher "chaise en bois < 200€" en quelques millisecondes, même sur des millions de documents.

---

## Explication avancée

Elasticsearch distribue les données en shards (primary + replica) via consistent hashing. Chaque shard est un index Lucene complet utilisant un inverted index (mots → liste de documents). La recherche full-text passe par un analyzer (tokenizer + filters) qui normalise le texte à l'indexation ET à la requête. Les agrégations fonctionnent par buckets et metrics exécutés par shard puis fusionnés. Le modèle est near-real-time : un document est searchable ~1s après son écriture. La recherche vectorielle (HNSW) permet les cas d'usage IA et RAG.

---

## Points critiques à retenir

* [CRITIQUE] Ne jamais utiliser comme base primaire
* [CRITIQUE] Mapping explicite, éviter le dynamique
* [IMPORTANT] Shards count figé à la création
* [IMPORTANT] Replica pour HA et lecture
* [PIÈGE] Re-indexation coûteuse, prévoir alias
