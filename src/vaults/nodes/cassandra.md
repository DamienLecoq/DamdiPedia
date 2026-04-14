---
id: cassandra
label: Cassandra
category: bdd
priority: medium
status: learning
last_quiz_score: null
next_review: null
ease_factor: 2.5
interval: 1
createdAt: '2026-04-14T17:58:12.509Z'
updatedAt: '2026-04-14T17:58:12.509Z'
relations:
  - target: java
    type: related
    weight: 0.7
resources:
  - type: documentation
    title: Documentation officielle Apache Cassandra
    url: 'https://cassandra.apache.org/doc/latest/'
  - type: vidéo
    title: freeCodeCamp – Apache Cassandra Course
    url: 'https://www.youtube.com/watch?v=J-cSy5MeMOA'
  - type: blog
    title: The Last Pickle Blog (Cassandra)
    url: 'https://thelastpickle.com/blog/'
  - type: cours
    title: DataStax Academy
    url: 'https://www.datastax.com/dev'
  - type: autre
    title: DataStax Astra – Cassandra Cloud
    url: 'https://www.datastax.com/products/datastax-astra'
---

## Résumé rapide

Apache Cassandra est une base de données NoSQL distribuée, conçue pour gérer de très grands volumes de données sur des clusters de centaines de nœuds avec une haute disponibilité et aucun point de défaillance unique.

---

## Définition

Apache Cassandra est un SGBD NoSQL orienté colonnes larges (wide-column store), distribué et décentralisé. Inspiré de DynamoDB (Amazon) et Bigtable (Google), il offre une disponibilité maximale, une scalabilité linéaire et une réplication multi-datacenter.

---

## Histoire

* Développé initialement par Facebook en 2008 pour la recherche dans la boîte de réception
* Donné à la fondation Apache en 2009
* Utilisé par Netflix, Apple, Instagram, Discord et d'autres entreprises à très grande échelle
* Cassandra 4.0 (2021) : version la plus testée de l'histoire du projet
* DataStax propose une distribution commerciale et un service cloud (Astra)

---

## Objectif

* Fournir une base de données à haute disponibilité sans point de défaillance unique
* Supporter la scalabilité linéaire (ajout de nœuds = plus de capacité)
* Permettre la réplication multi-datacenter et multi-cloud
* Gérer des volumes massifs de données en écriture

---

## Domaines d'utilisation

* Messagerie et réseaux sociaux (Facebook, Discord)
* Catalogue de contenus (Netflix)
* IoT et données de capteurs (séries temporelles)
* Systèmes de recommandation
* Applications nécessitant une disponibilité 99.999%

---

## Fonctionnement

* Architecture **peer-to-peer** : tous les nœuds sont égaux (pas de master)
* **Consistent hashing** : distribution automatique des données sur le ring
* **Réplication** configurable par keyspace (facteur de réplication)
* **Tunable consistency** : choix entre performance et cohérence (ONE, QUORUM, ALL)
* **SSTable** : stockage sur disque avec compaction périodique (LSM-tree)

---

## Concepts clés

* **Partition Key** — Détermine sur quel nœud la donnée est stockée
* **Clustering Key** — Ordonne les données à l'intérieur d'une partition
* **Consistency Level** — Nombre de réplicas requis pour confirmer une opération
* **Keyspace** — Équivalent d'une base de données (contient les tables)
* **Compaction** — Fusion des SSTables pour optimiser l'espace et les lectures
* **Gossip Protocol** — Communication inter-nœuds pour la détection de pannes

---

## Exemple

```cql
-- CQL (Cassandra Query Language)

-- Création d'un keyspace avec réplication
CREATE KEYSPACE ecommerce
WITH replication = {
    'class': 'NetworkTopologyStrategy',
    'datacenter1': 3,
    'datacenter2': 3
};

USE ecommerce;

-- Création de table avec partition key et clustering key
CREATE TABLE commandes_par_client (
    client_id UUID,
    date_commande TIMESTAMP,
    commande_id UUID,
    montant DECIMAL,
    statut TEXT,
    PRIMARY KEY (client_id, date_commande)
) WITH CLUSTERING ORDER BY (date_commande DESC);

-- Insertion
INSERT INTO commandes_par_client (client_id, date_commande, commande_id, montant, statut)
VALUES (uuid(), toTimestamp(now()), uuid(), 89.99, 'validee');

-- Requête (doit inclure la partition key)
SELECT * FROM commandes_par_client
WHERE client_id = 550e8400-e29b-41d4-a716-446655440000
AND date_commande >= '2025-01-01';
```

---

## Avantages

* Aucun point de défaillance unique (architecture peer-to-peer)
* Scalabilité linéaire (ajouter des nœuds = plus de capacité)
* Performances d'écriture exceptionnelles
* Réplication multi-datacenter native
* Consistance ajustable par requête
* Éprouvé à très grande échelle (Netflix, Apple, Discord)

---

## Inconvénients

* Modèle de données contraint (pas de jointures, pas de GROUP BY flexible)
* Requêtes limitées par la partition key (dénormalisation obligatoire)
* Complexité opérationnelle (compaction, repair, monitoring)
* Pas de transactions ACID au sens classique (Lightweight Transactions limitées)
* Latence en lecture plus élevée que les SGBD relationnels pour les petits volumes

---

## Pièges courants

* Concevoir le schéma sans connaître les requêtes à l'avance (query-driven design obligatoire)
* Créer des partitions trop volumineuses (> 100 Mo = dégradation des performances)
* Utiliser des Lightweight Transactions (LWT) de manière intensive (très lent)
* Ne pas monitorer la compaction et les tombstones
* Faire des requêtes sans la partition key (ALLOW FILTERING = scan complet)

---

## À ne pas confondre

* Cassandra vs MongoDB (wide-column vs document)
* CQL vs SQL (syntaxe similaire mais sémantique différente)
* Partition Key vs Primary Key (distribution vs unicité)
* Cassandra vs HBase (peer-to-peer vs master-slave)

---

## Explication simplifiée

Cassandra est une base de données distribuée sur plusieurs serveurs. Si un serveur tombe en panne, les autres continuent de fonctionner sans interruption. Elle est conçue pour stocker d'énormes quantités de données et ne jamais s'arrêter. Netflix l'utilise pour gérer ses millions d'utilisateurs.

---

## Explication avancée

Cassandra utilise un LSM-tree (Log-Structured Merge-tree) pour le stockage : les écritures vont d'abord dans un commit log puis dans un memtable en mémoire, avant d'être flushées en SSTables sur disque. Le consistent hashing avec virtual nodes (vnodes) distribue les données uniformément sur le ring. Le gossip protocol (protocole épidémique) propage l'état du cluster entre nœuds. La tunable consistency permet de choisir le compromis CAP par opération : QUORUM (majorité) offre un bon équilibre entre cohérence et disponibilité, tandis que ONE maximise la performance.

---

## Points critiques à retenir

* [CRITIQUE] Le modèle de données est query-driven — concevoir les tables à partir des requêtes
* [CRITIQUE] La partition key détermine la distribution — une mauvaise clé = hotspots
* [IMPORTANT] Limiter la taille des partitions à < 100 Mo pour de bonnes performances
* [IMPORTANT] ALLOW FILTERING fait un scan complet — à éviter absolument en production
* [PIÈGE] Les tombstones (marqueurs de suppression) s'accumulent et dégradent les performances
* [PIÈGE] CQL ressemble à SQL mais les jointures et sous-requêtes n'existent pas
